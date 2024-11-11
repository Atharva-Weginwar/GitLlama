from flask import Flask, request, jsonify
from github import Github
import json
import os

def initialize_github():

    # GitHub Personal Access Token (replace with your actual token)
    GITHUB_TOKEN = ""
    # Initialize GitHub object with authentication
    g = Github(GITHUB_TOKEN)
    return g

# Initialize Flask app
app = Flask(__name__)

# Utility function to extract repo information from a URL
def extract_repo_info(repo_url):
    parts = repo_url.rstrip('/').split('/')
    owner = parts[-2]
    repo = parts[-1]
    return owner, repo

# Process repository to extract information
def process_repository_frontend(repo_url):
    g = initialize_github()
    owner, repo_name = extract_repo_info(repo_url)
    repo = g.get_repo(f"{owner}/{repo_name}")

    repo_data = {
        "repository": repo_name,
        "branches": []
    }

    branches = repo.get_branches()
    for branch in branches:
        branch_name = branch.name
        commits = repo.get_commits(sha=branch_name)
        branch_data = {
            "branch": branch_name,
            "commits": []
        }

        for commit in commits:
            previous_commits = []
            for parent in commit.parents:
                previous_commits.append(parent.sha)
                if len(previous_commits) == 2:
                    break

            commit_data = {
                "commit_hash": commit.sha,
                "message": commit.commit.message,
                "author": {
                    "name": commit.commit.author.name if commit.commit.author else "Unknown",
                    "email": commit.commit.author.email if commit.commit.author else "Unknown"
                },
                "previous_commits": previous_commits
            }
            branch_data["commits"].append(commit_data)

        repo_data["branches"].append(branch_data)

    return repo_data

