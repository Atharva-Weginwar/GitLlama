from pinecone import Pinecone
from openai import OpenAI
from dateutil import parser
import requests
from collections import Counter
import base64
import io
from github import Github
import os
from together import Together
from fpdf import FPDF

# Initialize Pinecone
def initialize_pinecone():
    pc = Pinecone(api_key="")
    index_name = "gitvizind"
    index = pc.Index(index_name)
    return index
# Initialize OpenAI
def initialize_together():
    client = Together(api_key="")
    return client 
# GitHub token (replace with your own or use environment variable)
def initialize_github():
    GITHUB_TOKEN = ""
# Initialize GitHub object with authentication
    g = Github(GITHUB_TOKEN)
    return g

def fetch_latest_commit():
    index = initialize_pinecone()
    try:
        query_response = index.query(
            vector=[0] * 1536,  # Adjust this dimension if necessary
            top_k=1,
            include_metadata=True,
            sort="timestamp:desc"
        )
        
        if query_response.matches:
            latest_commit = query_response.matches[0]
            return latest_commit.id
        else:
            return None, None
    except Exception as e:
        return None, None

def fetch_commit_info(commit_id):
    index = initialize_pinecone()
    result = index.fetch(ids=[str(commit_id)])
    
    if commit_id in result['vectors']:
        commit_data = result['vectors'][commit_id]['metadata']
        return {
            'commit_hash': commit_id,
            'data': commit_data,
        }
    else:
        return None

def get_commit_chain(start_commit_id):
    commit_chain = []
    current_commit_id = start_commit_id

    while current_commit_id:
        commit_info = fetch_commit_info(current_commit_id)
        if commit_info:
            commit_chain.append(commit_info)
            current_commit_id = commit_info['data'].get('previous_commit')
        else:
            break

    return commit_chain

def summarize_repository(commit_chain):
    client = initialize_together()
    commit_summaries = []
    for commit in commit_chain:
        summary = f"Commit: {commit['commit_hash'][:7]}\n"
        summary += f"Author: {commit['data'].get('author_name', 'Unknown')}\n"
        summary += f"Date: {commit['data'].get('timestamp', 'Unknown')}\n"
        summary += f"Message: {commit['data'].get('commit_message', 'No message')}\n"
        summary += f"Changes: {commit['data'].get('file_change_summary', 'No changes specified')[:200]}...\n\n"
        commit_summaries.append(summary)

    combined_summary = "\n".join(commit_summaries)


    prompt = f"""
Analyze the following summary of commits and issues from a Git repository and provide a comprehensive overview:

{combined_summary}

Please provide a detailed summary of the repository's development, including:

1. Main themes or areas of development across these commits
2. Significant features or changes introduced over time
3. Patterns in development practices or coding styles
4. The overall direction or goals of the project based on these changes
5. Potential challenges or areas of focus for future development
6. Any notable trends in commit frequency or size
7. Repository Issues Analysis (if issues exist in repository)

Instructions:

- Start each point with the numbered heading (e.g., "1. Main themes or areas of development across these commits:") followed by your analysis on a new line.
- Reference specific commits or changes where appropriate to support your analysis.
- Use only the information provided in the commit and issue summaries. Do not include assumptions or external information.
- For issue analysis (Point 7), include only if issues exist in the repository data:
  * Summarize top 5 issues with their current status (open/closed)
  * Analyze technical root causes based on related commits and patch files
  * Provide solution suggestions based on the existing tech stack
  * Include implementation recommendations with specific technical approaches
- Provide your analysis in a professional and analytical tone suitable for a technical audience.

**Example Output:**

1. Main themes or areas of development across these commits:
[Your analysis here]

2. Significant features or changes introduced over time:
[Your analysis here]

3. Patterns in development practices or coding styles:
[Your analysis here]

4. The overall direction or goals of the project based on these changes:
[Your analysis here]

5. Potential challenges or areas of focus for future development:
[Your analysis here]

6. Any notable trends in commit frequency or size:
[Your analysis here]

7. Repository Issues Analysis:
[Mention current existing issues if any, other wise state that "There are no current issues to analyze, however some issues existed in past and here is the analysis for those:"]

Issue #1: [Issue Title]
- Status: [Open/Closed]
- Technical Context: [Analysis based on commits and patches]
- Root Cause: [Technical analysis]
- Suggested Solution: [Technical approach based on codebase]
- Implementation Guide: [Specific steps and considerations]

Issue #2: [Issue Title]
- Status: [Open/Closed]
- Technical Context: [Analysis based on commits and patches]
- Root Cause: [Technical analysis]
- Suggested Solution: [Technical approach based on codebase]
- Implementation Guide: [Specific steps and considerations]



Technical Recommendations:
- [Technology-specific suggestions]
- [Implementation best practices]
- [Integration considerations]

Note: If no issues exist in the repository data, section 7 will be omitted from the analysis.
"""
    try:
        response = client.chat.completions.create(
            model="meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that analyzes git commits with a focus on file changes and their implications."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=1000,
            temperature=0.7,
            top_p=0.7,
            top_k=50,
            repetition_penalty=1,
            stop=["<|eot_id|>", "<|eom_id|>"],
            stream=False
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error generating repository summary: {str(e)}"

def analyze_contributors_and_tech_stack(commit_chain, repo_url):
    contributors = Counter()
    
    for commit in commit_chain:
        author = commit['data'].get('author_name', 'Unknown')
        contributors[author] += 1

    total_commits = sum(contributors.values())
    contributor_percentages = {name: (count / total_commits) * 100 for name, count in contributors.items()}

    tech_stack = get_tech_stack_from_github(repo_url)

    return contributor_percentages, tech_stack

def get_tech_stack_from_github(repo_url):
    g = initialize_github()
    try:
        _, _, _, owner, repo_name = repo_url.rstrip('/').split('/')
        
        repo = g.get_repo(f"{owner}/{repo_name}")
        languages = repo.get_languages()
        
        tech_stack = sorted(languages.items(), key=lambda x: x[1], reverse=True)
        
        return [lang for lang, _ in tech_stack[:5]]  # Top 5 languages
    except Exception as e:
        return []

def create_contribution_text(contributors, tech_stack):
    text = "**Contributors:**\n"
    for name, percentage in contributors.items():
        text += f"{name}: {percentage:.1f}%\n"
    
    text += "\n**Tech Stack:**\n"
    text += "\n".join(tech_stack)
    
    return text

class PDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 12)
        self.cell(0, 10, 'GitHub Repository Analysis', 0, 1, 'C')
        self.ln(10)

    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')

    def chapter_title(self, title):
        self.set_font('Arial', 'B', 16)
        self.cell(0, 10, title, 0, 1)
        self.ln(4)

    def chapter_body(self, body):
        self.set_font('Arial', '', 12)
        self.multi_cell(0, 10, body)
        self.ln()

def create_pdf(summary, contributors, tech_stack):
    pdf = PDF()
    pdf.add_page()

    pdf.chapter_title('Repository Summary')
    pdf.chapter_body(summary)

    pdf.add_page()
    pdf.chapter_title('Contributors and Tech Stack')
    contribution_text = create_contribution_text(contributors, tech_stack)
    pdf.chapter_body(contribution_text)

    pdf_output = pdf.output(dest="S").encode("latin-1")
    return pdf_output

def get_download_link(pdf_bytes, filename):
    b64 = base64.b64encode(pdf_bytes).decode()
    return f'<a href="data:application/pdf;base64,{b64}" download="{filename}">Download PDF</a>'

def analyze_repository(repo_url):
    latest_commit_id = fetch_latest_commit()
    if latest_commit_id:
        commit_chain = get_commit_chain(latest_commit_id)
        if commit_chain:
            repository_summary = summarize_repository(commit_chain)
            contributors, tech_stack = analyze_contributors_and_tech_stack(commit_chain, repo_url)
            pdf_bytes = create_pdf(repository_summary, contributors, tech_stack)
            download_link = get_download_link(pdf_bytes, "repository_analysis.pdf")
            
            return {
                "commit_count": len(commit_chain),
                "repository_summary": repository_summary,
                "contributors": contributors,
                "tech_stack": tech_stack,
                "download_link": download_link
            }
        else:
            return {"error": "Failed to retrieve commit chain."}
    else:
        return {"error": "No commits found in the repository."}

