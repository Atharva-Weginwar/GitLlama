import os
import json
import urllib.parse
import logging
from flask import Blueprint, jsonify , request
from resetcone import reset_pinecone_index
from gitdata import process_repository
from gittocone import push_commits_to_pinecone
from rag import run_rag_process
from commit_summary import analyze_commit
from repo_summary import analyze_repository
from git_frontend import process_repository_frontend

api_routes = Blueprint('api_routes', __name__)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@api_routes.route('/reset-pinecone-index', methods=['POST'])
def reset_pinecone_endpoint():
    try:
        reset_pinecone_index()
        return jsonify({"message": "Pinecone index reset successfully"}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to reset Pinecone index: {str(e)}"}), 500

@api_routes.route('/commits-history-frontend', methods=['GET'])
def commits_history_frontend():
    repo_url = request.args.get('url')
    
    if not repo_url:
        return jsonify({"error": "No repository URL provided. Use ?url=<github_repo_url>"}), 400

    try:
        # Process the repository and get the data
        repo_data = process_repository_frontend(repo_url)

        # Define the file path
        file_path = r"C:\Users\pvbco\OneDrive\Desktop\GitLlama-main\GitLlama-main\frontend\src\components\GraphTree\commits_frontend.json"

        # Ensure the directory exists
        os.makedirs(os.path.dirname(file_path), exist_ok=True)

        # Write the JSON data to file
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(repo_data, f, indent=2)

        # Return the JSON data in the response as before
        return jsonify(repo_data), 200

    except Exception as e:
        return jsonify({"error": f"Failed to process repository: {str(e)}"}), 500


@api_routes.route('/process-github-repo', methods=['GET'])
def process_github_repo():
    repo_url = request.args.get('url')
    if not repo_url:
        return jsonify({"error": "No repository URL provided. Use ?url=<github_repo_url>"}), 400

    try:
        # Define the path for url.txt
        url_file_path = r"C:\Users\pvbco\OneDrive\Desktop\GitLlama-main\GitLlama-main\frontend\src\components\ChatBot\url.txt"
        
        # Create directories if they don't exist
        os.makedirs(os.path.dirname(url_file_path), exist_ok=True)
        
        # Write the URL to url.txt
        with open(url_file_path, 'w') as f:
            f.write(repo_url)

        # Set the filename to commit_history.json in the current directory
        filename = "commit_history_backend.json"
        file_path = os.path.abspath(filename)

        # Process the repository and write data to the file
        process_repository(repo_url, file_path, commit_limit_per_branch=50)

        return jsonify({
            "message": "Repository processed successfully",
            "file_path": file_path,
            "url_file_path": url_file_path
        }), 200

    except Exception as e:
        return jsonify({"error": f"Failed to process repository: {str(e)}"}), 500


@api_routes.route('/push-commits-to-pinecone', methods=['POST'])
def push_commits_to_pinecone_endpoint():
    # Set the filename to commit_history.json in the current directory
    filename = "commit_history_backend.json"
    json_file_path = os.path.abspath(filename)

    # Check if the file exists
    if not os.path.exists(json_file_path):
        return jsonify({"error": f"File not found: {json_file_path}. Please process a GitHub repository first."}), 404

    try:
        # Call the push_commits_to_pinecone function
        push_commits_to_pinecone(json_file_path)

        return jsonify({
            "message": "Commits successfully pushed to Pinecone",
            "file_processed": json_file_path
        }), 200

    except Exception as e:
        return jsonify({"error": f"Failed to push commits to Pinecone: {str(e)}"}), 500

@api_routes.route('/run-rag', methods=['GET'])
def run_rag_endpoint():
    # Get the query from the URL parameters
    query = request.args.get('query')
    if not query:
        return jsonify({"error": "No query provided. Please include a 'query' parameter in your request."}), 400

    # Decode the URL-encoded query
    decoded_query = urllib.parse.unquote(query)

    try:
        # Run the RAG process
        response = run_rag_process(decoded_query)

        return jsonify({
            "query": decoded_query,
            "response": response
        }), 200

    except Exception as e:
        return jsonify({"error": f"Failed to process query: {str(e)}"}), 500



def format_results(results):
    formatted_string = ""
    for commit in results:
        formatted_string += f"Commit: {commit['commit_hash']}\n"
        formatted_string += f"Commit Info:\n{commit['commit_info']}\n"
        formatted_string += f"AI Summary:\n{commit['ai_summary']}\n"
        formatted_string += f"Previous Commit Info:\n{commit['previous_commit_info']}\n"
        formatted_string += "-" * 50 + "\n\n"
    return formatted_string

@api_routes.route('/analyze-commit', methods=['GET'])
def analyze_commit_endpoint():
    commit_id = request.args.get('commit_id')
    if not commit_id:
        logger.warning("No commit ID provided in the request")
        return "Error: No commit ID provided. Please include a 'commit_id' parameter in your request.", 400

    try:
        logger.info(f"Analyzing commit with ID: {commit_id}")
        analysis_results = analyze_commit(commit_id)
        
        logger.info(f"Successfully analyzed commit: {commit_id}")
        # Format the results into a readable string
        result_string = format_results(analysis_results)
        
        return result_string, 200, {'Content-Type': 'text/plain; charset=utf-8'}

    except Exception as e:
        logger.error(f"Failed to analyze commit {commit_id}: {str(e)}")
        return f"Error: Failed to analyze commit: {str(e)}", 500

@api_routes.route('/analyze-repository', methods=['GET'])
def analyze_repository_endpoint():
    # Get the repo_url from the URL parameters
    repo_url = request.args.get('url')
    if not repo_url:
        logger.warning("No repository URL provided in the request")
        return "Error: No repository URL provided. Please include a 'url' parameter in your request.", 400

    try:
        logger.info(f"Analyzing repository: {repo_url}")
        analysis_results = analyze_repository(repo_url)
        
        # Format the results into a string
        result_string = format_analysis_results(analysis_results)
        
        logger.info(f"Successfully analyzed repository: {repo_url}")
        return result_string, 200, {'Content-Type': 'text/plain; charset=utf-8'}

    except Exception as e:
        logger.error(f"Failed to analyze repository {repo_url}: {str(e)}")
        return f"Error: Failed to analyze repository: {str(e)}", 500

def format_analysis_results(results):
    if "error" in results:
        return f"Error: {results['error']}"

    formatted_string = "Repository Analysis Results:\n\n"
    formatted_string += f"Commit Count: {results['commit_count']}\n\n"
    formatted_string += f"Repository Summary:\n{results['repository_summary']}\n\n"
    
    formatted_string += "Contributors:\n"
    for contributor, percentage in results['contributors'].items():
        formatted_string += f"- {contributor}: {percentage:.2f}%\n"
    
    formatted_string += "\nTech Stack:\n"
    for tech in results['tech_stack']:
        formatted_string += f"- {tech}\n"
    
    formatted_string += f"\nPDF Download Link: {results['download_link']}\n"

    return formatted_string