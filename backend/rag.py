# from llama_index.core import VectorStoreIndex, ServiceContext, Settings
# from llama_index.llms.openai import OpenAI
# from llama_index.readers.github import GithubRepositoryReader, GithubClient
# import openai
# from pinecone import Pinecone
# import requests
# import json


# # Initialize Pinecone with your API key
# def initialize_pinecone():
#     pc = Pinecone(api_key="168a71c8-41f2-40e8-88ef-e98abdd74dba")

#     # Create or connect to an index
#     index_name = "gitvizind"
#     index = pc.Index(index_name)
#     return index


# def initialize_llm():
#     llm = OpenAI(model="gpt-4", api_key="sk-svcacct-gYetjb4Ki6n9bgg9QxdtdgeRc8Y92c_7hPfUd2_kq8sTLsR2G4nM0Z-mYCxdcmp6T3BlbkFJAiHehGCG0TwzMby10W1lFBuuNgTVmNQDDNU_8bh4Zhkopjh5L285W45B-UD-w3QA")
#     return llm

# # Function to query Pinecone for the top K vectors
# def query_pinecone(query, top_k=5):
#     index = initialize_pinecone()
#     # Make the HTTP request to OpenAI embeddings API
#     headers = {
#         "Content-Type": "application/json",
#         "Authorization": f"Bearer sk-svcacct-gYetjb4Ki6n9bgg9QxdtdgeRc8Y92c_7hPfUd2_kq8sTLsR2G4nM0Z-mYCxdcmp6T3BlbkFJAiHehGCG0TwzMby10W1lFBuuNgTVmNQDDNU_8bh4Zhkopjh5L285W45B-UD-w3QA"  # Replace with your OpenAI API key
#     }

#     data = {
#         "input": query,
#         "model": "text-embedding-ada-002"  # GPT's embedding model
#     }

#     response = requests.post("https://api.openai.com/v1/embeddings", headers=headers, json=data)

#     # Check for response status
#     if response.status_code != 200:
#         raise Exception(f"Error fetching embeddings: {response.text}")

#     query_embedding = response.json()['data'][0]['embedding']

#     # Query Pinecone to fetch top K most relevant vectors
#     results = index.query(
#         vector=query_embedding,
#         top_k=top_k,
#         include_metadata=True  # Get metadata along with the vectors
#     )
#     return results

# # Function to generate a response using GPT-4
# def generate_response_with_gpt4(retrieved_data, query):
#     llm = initialize_llm()
#     # Convert Pinecone metadata into JSON string format
#     retrieved_json = json.dumps([item['metadata'] for item in retrieved_data['matches']], indent=2)

#     # Create a prompt with the retrieved data and user query
#     prompt = f"""Based on the following retrieved data (in JSON format): {retrieved_json}, please provide a detailed answer to the following query: {query}

# Your response should be comprehensive and cover various aspects of Git repositories, including but not limited to:

# 1. Commits: Provide detailed information about relevant commits, including:
#    - Commit IDs
#    - Commit messages
#    - Authors
#    - Dates
#    - Files changed
#    - Line changes (additions, deletions, modifications)

# 2. File changes: When discussing file changes, include:
#    - Specific files modified
#    - Nature of changes (e.g., additions, deletions, updates)
#    - Line numbers affected, if available
#    - Content of changes, if relevant

# 3. Authors: When mentioning authors, provide:
#    - Full names (if available)
#    - Email addresses (if available)
#    - Their contributions and patterns in committing

# 4. Repositories: If discussing repositories, mention:
#    - Repository names
#    - Descriptions
#    - Main branches
#    - Notable features or characteristics

# 5. Time-based information: Include relevant dates and times for commits, providing context for the timeline of changes.

# 6. Patterns and Insights: If applicable, highlight any patterns, trends, or insights that can be derived from the data.

# For specific query types, please follow these guidelines:

# - For queries about specific file changes (e.g., "In which commit did package.json change?"):
#   List all relevant commits, detailing the changes made to the file in each commit.

# - For queries about author contributions (e.g., "List commits by [Author Name]"):
#   Provide a comprehensive list of commits by the author, including commit IDs, messages, and a summary of changes for each commit.

# - For queries about repository overview:
#   Summarize key information about the repository, including main contributors, frequently changed files, and notable commits.

# Please format your response in a clear, structured manner, using markdown for better readability. Use bullet points or numbered lists where appropriate. If the query requires a specific format for the answer, adhere to that format.

# Remember to use all relevant information from the retrieved data to provide the most accurate and detailed response possible. If there's any ambiguity in the query or if multiple interpretations are possible, please address the most likely interpretation and mention alternative possibilities.

# Query: {query}"""

#     # Use GPT-4 to generate the response
#     response = llm.complete(prompt)
#     return response.text

# def run_rag_process(query):
#     # Query Pinecone for top K relevant results
#     retrieved_data = query_pinecone(query)

#     # Generate final response using GPT-4
#     final_response = generate_response_with_gpt4(retrieved_data, query)
#     return final_response


from llama_index.core import VectorStoreIndex, ServiceContext, Settings
from together import Together
from llama_index.readers.github import GithubRepositoryReader, GithubClient
from pinecone import Pinecone
import requests
import json


# Initialize Pinecone with your API key
def initialize_pinecone():
    pc = Pinecone(api_key="")

    # Create or connect to an index
    index_name = "gitvizind"
    index = pc.Index(index_name)
    return index


def initialize_llm():
    together = Together(api_key="")
    return together

# Function to query Pinecone for the top K vectors
def query_pinecone(query, top_k=5):
    index = initialize_pinecone()
    # Make the HTTP request to OpenAI embeddings API
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer "
    }

    data = {
        "input": query,
        "model": "text-embedding-ada-002"  # GPT's embedding model
    }

    response = requests.post("https://api.openai.com/v1/embeddings", headers=headers, json=data)

    # Check for response status
    if response.status_code != 200:
        raise Exception(f"Error fetching embeddings: {response.text}")

    query_embedding = response.json()['data'][0]['embedding']

    # Query Pinecone to fetch top K most relevant vectors
    results = index.query(
        vector=query_embedding,
        top_k=top_k,
        include_metadata=True  # Get metadata along with the vectors
    )
    return results

# Function to generate a response using Llama 3.2
def generate_response_with_llama32(retrieved_data, query):
    client = initialize_llm()
    # Convert Pinecone metadata into JSON string format
    retrieved_json = json.dumps([item['metadata'] for item in retrieved_data['matches']], indent=2)

    # Create a prompt with the retrieved data and user query
    prompt = f"""Based on the following retrieved data (in JSON format): {retrieved_json}, please provide a detailed answer to the following query: {query}

Your response should be comprehensive and cover various aspects of Git repositories, including but not limited to:

1. Commits: Provide detailed information about relevant commits, including:
   - Commit IDs
   - Commit messages
   - Authors
   - Dates
   - Files changed
   - Line changes (additions, deletions, modifications)

2. File changes: When discussing file changes, include:
   - Specific files modified
   - Nature of changes (e.g., additions, deletions, updates)
   - Line numbers affected, if available
   - Content of changes, if relevant

3. Authors: When mentioning authors, provide:
   - Full names (if available)
   - Email addresses (if available)
   - Their contributions and patterns in committing

4. Repositories: If discussing repositories, mention:
   - Repository names
   - Descriptions
   - Main branches
   - Notable features or characteristics

5. Time-based information: Include relevant dates and times for commits, providing context for the timeline of changes.

6. Patterns and Insights: If applicable, highlight any patterns, trends, or insights that can be derived from the data.

For specific query types, please follow these guidelines:

- For queries about specific file changes (e.g., "In which commit did package.json change?"):
  List all relevant commits, detailing the changes made to the file in each commit.

- For queries about author contributions (e.g., "List commits by [Author Name]"):
  Provide a comprehensive list of commits by the author, including commit IDs, messages, and a summary of changes for each commit.

- For queries about repository overview:
  Summarize key information about the repository, including main contributors, frequently changed files, and notable commits.

Query: {query}"""

    # Create messages array for Together AI chat completion
    response = client.chat.completions.create(
        model="meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that analyzes Git repository data and provides detailed responses."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=2048,
        temperature=0.7,
        top_p=0.7,
        top_k=50,
        repetition_penalty=1,
        stream=False
    )
    
    return response.choices[0].message.content

def run_rag_process(query):
    # Query Pinecone for top K relevant results
    retrieved_data = query_pinecone(query)

    # Generate final response using Llama 3.2
    final_response = generate_response_with_llama32(retrieved_data, query)
    return final_response