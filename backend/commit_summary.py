import logging
from pinecone import Pinecone
from together import Together
from dateutil import parser

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Pinecone
def initialize_pinecone():
    pc = Pinecone(api_key="")
    index_name = "gitvizind"
    index = pc.Index(index_name)
    return index

# Initialize Together AI client (replacing OpenAI)
def initialize_together():
    client = Together(api_key="")
    return client 

def fetch_commit_info(commit_id):
    index = initialize_pinecone()
    result = index.fetch(ids=[commit_id])
    
    if commit_id in result['vectors']:
        commit_data = result['vectors'][commit_id]['metadata']
        return {
            'commit_hash': commit_id,
            'data': commit_data,
        }
    else:
        return None

def format_commit_info(commit_info):
    if not commit_info:
        return "No information found for this commit."
    
    data = commit_info['data']
    if not isinstance(data, dict):
        return f"Error: Expected dictionary for commit data, but got {type(data)}"
    
    formatted_info = f"Commit: {commit_info['commit_hash']}\n"
    formatted_info += f"Author: {data.get('author_name', 'Unknown')} <{data.get('author_email', 'Unknown')}>\n"
    formatted_info += f"Date: {data.get('timestamp', 'Unknown')}\n"
    
    if 'commit_message' in data and data['commit_message']:
        formatted_info += f"Message: {data['commit_message']}\n"
    
    formatted_info += f"Previous commit: {data.get('previous_commit', 'Unknown')}\n\n"
    
    if 'file_change_summary' in data:
        formatted_info += "File Changes Summary:\n"
        formatted_info += data['file_change_summary']
    
    return formatted_info

def summarize_commit(commit_info):
    client = initialize_together()  # Changed from initialize_openai()
    if not commit_info:
        logger.warning("No commit information provided for summarization.")
        return "No information available to summarize."

    data = commit_info['data']
    if not isinstance(data, dict):
        logger.error(f"Expected dictionary for commit data, but got {type(data)}")
        return f"Error: Expected dictionary for commit data, but got {type(data)}"
    
    file_change_summary = data.get('file_change_summary', 'No file change summary available.')
    commit_message = data.get('commit_message', 'No commit message available.')
    
    prompt = f"""
    Analyze the following git commit:
    Commit Hash: {commit_info['commit_hash']}
    Author: {data.get('author_name', 'Unknown')} <{data.get('author_email', 'Unknown')}>
    Date: {data.get('timestamp', 'Unknown')}
    
    Commit Message:
    {commit_message}
    
    File Changes Summary:
    {file_change_summary}
    
    Please provide a concise analysis of the commit's changes:
    1. Summarize the main changes in the commit.
    2. Identify the potential impact of these changes on the project's functionality.
    3. Note any patterns or significant modifications across files.
    4. Suggest possible reasons for these changes based on the commit message and file changes.

    Focus on the most important and impactful changes. Be concise but informative.
    """

    try:
        logger.info(f"Attempting to summarize commit {commit_info['commit_hash']}")
        # Changed from OpenAI to Together AI format
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
        summary = response.choices[0].message.content
        logger.info(f"Successfully summarized commit {commit_info['commit_hash']}")
        return summary
    except Exception as e:
        logger.error(f"Error during commit summarization: {str(e)}")
        return f"Error generating summary: {str(e)}"

def get_commit_chain(commit_id, depth=2):
    commit_chain = []
    current_commit_id = commit_id

    for _ in range(depth):
        commit_info = fetch_commit_info(current_commit_id)
        if not commit_info:
            break

        commit_chain.append(commit_info)
        current_commit_id = commit_info['data'].get('previous_commit')
        if not current_commit_id:
            break

    return commit_chain

def analyze_commit(commit_id):
    commit_chain = get_commit_chain(commit_id)
    results = []

    for commit in commit_chain:
        commit_info = format_commit_info(commit)
        ai_summary = summarize_commit(commit)
        
        previous_commit_id = commit['data'].get('previous_commit')
        previous_commit_info = "No previous commit information available."
        if previous_commit_id:
            previous_commit = fetch_commit_info(previous_commit_id)
            if previous_commit:
                previous_commit_info = format_commit_info(previous_commit)

        results.append({
            'commit_hash': commit['commit_hash'],
            'commit_info': commit_info,
            'ai_summary': ai_summary,
            'previous_commit_info': previous_commit_info
        })

    return results

# Example usage (not needed in the final code, but shown here for demonstration)
# if __name__ == "__main__":
#     example_commit_id = "3f226eaea9846992a87c006e26eb1cc0e7929033"
#     result = analyze_commit(example_commit_id)
#     print(result)