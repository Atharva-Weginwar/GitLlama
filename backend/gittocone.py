from pinecone import Pinecone
import json
import openai
import requests

def initialize_pinecone():
    # Initialize Pinecone with your API key
    pc = Pinecone(api_key="")

    # Create or connect to an index
    index_name = "gitvizind"
    index = pc.Index(index_name)
    return index

def initialize_openai():
    # Initialize OpenAI (or another embedding service)
    openai.api_key =""  # Replace with your actual OpenAI API key

# Function to get embedding from OpenAI for commit messages or diffs
def get_embedding(text):
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer "  # Replace with your actual OpenAI API key
    }

    data = {
        "input": text,
        "model": "text-embedding-ada-002"  # Use OpenAI's text embedding model
    }

    # Make the HTTP request to OpenAI API
    response = requests.post("https://api.openai.com/v1/embeddings", headers=headers, json=data)

    # Check for errors in the response
    if response.status_code != 200:
        raise Exception(f"Error fetching embedding: {response.text}")

    # Extract the embedding from the response
    return response.json()['data'][0]['embedding']

# Function to create a summary of file changes
def create_file_change_summary(file):
    summary = f"File: {file['filename']} ({file['status']})\n"
    lines_added = sum(1 for line in file.get('lines_changed', []) if line['change_type'] == 'addition')
    lines_deleted = sum(1 for line in file.get('lines_changed', []) if line['change_type'] == 'deletion')
    summary += f"Lines added: {lines_added}, Lines deleted: {lines_deleted}\n"
    
    # Add a sample of changed lines (up to 3)
    for line in file.get('lines_changed', [])[:3]:
        summary += f"- {line['change_type'].capitalize()}: {line['content'][:50]}...\n"
    
    return summary.strip()

# Function to push commits data to Pinecone with proper embeddings
def push_commits_to_pinecone(json_file_path):
    index = initialize_pinecone()
    with open(json_file_path, 'r') as f:
        repo_data = json.load(f)

    for branch in repo_data['branches']:
        branch_name = branch['branch']

        for commit in branch['commits']:
            commit_hash = commit['commit_hash']
            commit_message = commit['message']
            author = commit['author']
            timestamp = commit['timestamp']
            previous_commit = commit.get('previous_commit') or ''
            files_changed = commit['files_changed']

            # Create a summary of file changes
            file_summaries = [create_file_change_summary(file) for file in files_changed]
            overall_summary = "\n\n".join(file_summaries[:5])  # Limit to 5 files for brevity

            # Create a text summary to use for embedding
            summary_text = f"""Commit: {commit_hash}
Message: {commit_message}
Branch: {branch_name}
Author: {author['name']} <{author.get('email', 'No email')}>
Timestamp: {timestamp or 'No timestamp'}
Previous Commit: {previous_commit}

File Changes Summary:
{overall_summary}
"""

            # Generate embedding for the commit
            vector = get_embedding(summary_text)

            # Metadata to store in Pinecone
            metadata = {
                "branch_name": branch_name,
                "commit_hash": commit_hash,
                "commit_message": commit_message,
                "previous_commit": previous_commit,
                "author_name": author['name'],
                "author_email": author.get('email', 'No email'),
                "timestamp": timestamp or 'No timestamp',
                "file_change_summary": overall_summary
            }

            # Remove any null values from metadata
            metadata = {k: v for k, v in metadata.items() if v is not None}

            # Push data to Pinecone (using the commit hash as the unique ID)
            index.upsert([(commit_hash, vector, metadata)])

            print(f"Pushed commit {commit_hash} from branch {branch_name} to Pinecone.")