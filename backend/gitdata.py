from github import Github
import json

def initialize_github():
# GitHub Personal Access Token (replace with your actual token)
    GITHUB_TOKEN = ""

# Initialize GitHub object with authentication
    g = Github(GITHUB_TOKEN)
    return g
# Function to extract owner and repo name from GitHub URL

def extract_repo_info(repo_url):
    parts = repo_url.rstrip('/').split('/')
    owner = parts[-2]
    repo = parts[-1]
    return owner, repo

# Function to process the repository and generate the JSON structure
def process_repository(repo_url, output_file, commit_limit_per_branch=50):
    g = initialize_github()
    owner, repo_name = extract_repo_info(repo_url)

    # Get the repository object
    repo = g.get_repo(f"{owner}/{repo_name}")

    repo_data = {
        "repository": repo_name,
        "branches": []
    }

    print(f"Processing repository: {repo_name}")
    branches = repo.get_branches()
    print(f"Found {branches.totalCount} branches.\n")

    # Write the initial structure to the file
    with open(output_file, 'w') as f:
        f.write('{"repository": "' + repo_name + '", "branches": [\n')

    branch_count = 0

    for branch in branches:
        branch_name = branch.name
        branch_count += 1
        print(f"Processing branch {branch_count}/{branches.totalCount}: {branch_name}")

        # Get the commits for the branch and limit the number of commits processed
        commits = repo.get_commits(sha=branch_name)
        branch_data = {
            "branch": branch_name,
            "commits": []
        }

        commit_count = 0
        for commit in commits[:commit_limit_per_branch]:
            commit_sha = commit.sha
            commit_message = commit.commit.message
            author_name = commit.commit.author.name if commit.commit.author else "Unknown"
            author_email = commit.commit.author.email if commit.commit.author else "Unknown"
            timestamp = commit.commit.author.date.isoformat() if commit.commit.author and commit.commit.author.date else None
            parent_commit = commit.parents[0].sha if commit.parents else None

            # Get file changes in the commit
            files_changed = []
            for file in commit.files:
                file_data = {
                    "filename": file.filename,
                    "status": file.status,  # added, modified, removed, etc.
                    "additions": file.additions,
                    "deletions": file.deletions,
                    "changes": file.changes,
                    "patch": file.patch  # This contains the line-by-line diff
                }
                files_changed.append(file_data)

            commit_data = {
                "commit_hash": commit_sha,
                "message": commit_message,
                "author": {
                    "name": author_name,
                    "email": author_email
                },
                "timestamp": timestamp,
                "previous_commit": parent_commit,
                "files_changed": files_changed
            }

            branch_data["commits"].append(commit_data)
            commit_count += 1
            print(f"  Processed commit {commit_count}: {commit_sha}")

        # Check if it's the last branch, avoid adding the trailing comma
        if branch_count == branches.totalCount:
            append_to_json_file(branch_data, output_file, last_branch=True)
        else:
            append_to_json_file(branch_data, output_file)

        print(f"Finished processing branch: {branch_name}\n")

    # Close the JSON file properly
    with open(output_file, 'a') as f:
        f.write(']}')  # Closing the JSON object properly

    print("Repository processing complete!")

# Function to append data to JSON file incrementally
def append_to_json_file(data, output_file, last_branch=False):
    with open(output_file, 'a') as f:
        json.dump(data, f, indent=4)
        if not last_branch:
            f.write(',\n')  # Add comma for proper JSON structure if more data follows