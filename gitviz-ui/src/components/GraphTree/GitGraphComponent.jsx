import React, { useEffect, useCallback } from "react";
import { createGitgraph, templateExtend, TemplateName } from "@gitgraph/js";
import data from "./commitsfrontend.json";

const jsonData = data;

const findMainBranch = (branches) => {
  const mainBranch = branches.find(
    (b) => b.branch.toLowerCase() === "master" || b.branch.toLowerCase() === "main"
  );
  return mainBranch || branches[0];
};

const GitGraphComponent = () => {
  const initializeGraph = useCallback(() => {
    const graphContainer = document.getElementById("gitgraph");
    if (!graphContainer) return;

    graphContainer.innerHTML = "";

    const myTemplate = templateExtend(TemplateName.Metro, {
      colors: ["#f1c40f", "#3498db", "#2ecc71", "#e74c3c", "#9b59b6"],
      branch: {
        lineWidth: 3,
        spacing: 25,
        label: {
          font: "normal 14px Arial, sans-serif",
          color: "#FFFFFF",
          bgColor: "#1E1E2E",
          strokeColor: "#3A3A4E",
          cursor: "pointer",
        },
      },
      commit: {
        spacing: 30,
        dot: {
          size: 10,
          strokeWidth: 2,
          strokeColor: "#1E1E2E",
          hover: {
            color: "#e84393",
            strokeColor: "#e84393",
            size: 12,
          },
        },
        message: {
          color: "#FFFFFF",
          font: "normal 14px Arial, sans-serif",
          displayAuthor: false,
          cursor: "pointer",
        },
        author: {
          color: "#B0B0B0",
          font: "normal 12px Arial, sans-serif",
        },
        hasTooltipInCompactMode: true,
        shouldDisplayTooltipsInCompactMode: true,
        tooltipHTMLFormatter: (commit) => {
          return `<div style="color:white;">${commit.subject}</div>`;
        },
      },
    });

    const gitgraph = createGitgraph(graphContainer, {
      template: myTemplate,
      orientation: "vertical",
      author: "GitViz",
    });

    const shortenDetails = (message) => {
      const maxLength = 30;
      return message.length > maxLength
        ? message.substring(0, maxLength - 3) + "..."
        : message;
    };

    // Initialize mappings
    const commitMap = {}; // Maps commit hashes to commit data
    const commitToBranchMap = {}; // Maps commit hashes to branch names
    const commitObjectMap = {}; // Maps commit hashes to GitGraph commit objects
    const branchMap = {}; // Maps branch names to branch instances

    // Build commitToBranchMap and commitMap
    jsonData.branches.forEach((branchData) => {
      const branchName = branchData.branch;
      branchData.commits.forEach((commit) => {
        commitToBranchMap[commit.commit_hash] = branchName;
        commitMap[commit.commit_hash] = commit;
      });
    });

    // Collect all commits
    let allCommits = [];
    jsonData.branches.forEach((branchData) => {
      branchData.commits.forEach((commit) => {
        allCommits.push({ ...commit, branch: branchData.branch });
      });
    });

    // Sort all commits by timestamp (earliest to latest)
    allCommits.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    // Find the main branch
    const mainBranch = findMainBranch(jsonData.branches);
    const mainBranchName = mainBranch.branch;

    // Create main branch
    const mainBranchInstance = gitgraph.branch({
      name: mainBranchName,
      onClick: () => alert(`Branch selected: ${mainBranchName}`),
    });
    branchMap[mainBranchName] = mainBranchInstance;

    // Process commits in chronological order
    allCommits.forEach((commit) => {
      const {
        commit_hash,
        previous_commit,
        branch: branchName,
        message,
        author,
        timestamp,
      } = commit;
      const authorName = author?.name || "Anonymous";

      // Create branch if it doesn't exist
      if (!branchMap[branchName]) {
        let fromBranch = mainBranchInstance; // Default to main branch

        // Identify divergence point
        let divergenceCommitHash = null;

        if (branchName !== mainBranchName) {
          const branchCommitHashes = jsonData.branches
            .find((b) => b.branch === branchName)
            .commits.map((c) => c.commit_hash);

          let currentCommit = commit;
          let visitedCommits = new Set();

          // Traverse previous commits until we find a commit not in current branch
          while (currentCommit && currentCommit.previous_commit) {
            let prevCommits = Array.isArray(currentCommit.previous_commit)
              ? currentCommit.previous_commit
              : [currentCommit.previous_commit];

            let foundDivergence = false;
            for (let prevCommitHash of prevCommits) {
              if (!branchCommitHashes.includes(prevCommitHash)) {
                // Previous commit is not in current branch
                divergenceCommitHash = prevCommitHash;
                foundDivergence = true;
                break;
              }
            }
            if (foundDivergence) {
              break;
            }

            // Move to previous commit
            let nextCommitHash = Array.isArray(currentCommit.previous_commit)
              ? currentCommit.previous_commit[0]
              : currentCommit.previous_commit;

            if (visitedCommits.has(nextCommitHash)) {
              break; // Avoid infinite loops
            }
            visitedCommits.add(nextCommitHash);

            currentCommit = commitMap[nextCommitHash];
          }

          // Set fromBranch to divergence point
          if (divergenceCommitHash && commitObjectMap[divergenceCommitHash]) {
            fromBranch = commitObjectMap[divergenceCommitHash];
          }
        }

        // Create the branch
        branchMap[branchName] = gitgraph.branch({
          name: branchName,
          from: fromBranch,
          onClick: () => alert(`Branch selected: ${branchName}`),
        });
      }

      const branch = branchMap[branchName];

      // Skip if commit already exists
      if (commitObjectMap[commit_hash]) {
        return;
      }

      const commitOptions = {
        subject: shortenDetails(message),
        author: authorName,
        style: {
          dot: {
            size: 10,
            strokeWidth: 2,
            strokeColor: "#1E1E2E",
            cursor: "pointer",
          },
          message: {
            color: "#FFFFFF",
            font: "normal 14px Arial, sans-serif",
            cursor: "pointer",
          },
        },
        onClick: function (e) {
          console.log("Commit clicked");
          const formattedTimestamp = new Date(timestamp).toLocaleString();
          alert(
            `Full Message: ${message}\nAuthor: ${authorName}\nTimestamp: ${formattedTimestamp}`
          );
        },
      };

      if (Array.isArray(previous_commit) && previous_commit.length === 2) {
        // Merge commit
        const [parentHash1, parentHash2] = previous_commit;

        const parentBranchName1 = commitToBranchMap[parentHash1];
        const parentBranchName2 = commitToBranchMap[parentHash2];

        const sourceBranchName =
          parentBranchName1 !== branchName ? parentBranchName1 : parentBranchName2;
        const sourceBranch = branchMap[sourceBranchName];
        const targetBranch = branch;

        // Perform the merge
        if (sourceBranch && targetBranch) {
          targetBranch.merge({
            branch: sourceBranch,
            commitOptions: commitOptions,
          });

          // Store the merge commit object
          const mergeCommitObject =
            targetBranch.commits[targetBranch.commits.length - 1];
          commitObjectMap[commit_hash] = mergeCommitObject;
          commitToBranchMap[commit_hash] = branchName;
        }
      } else {
        // Regular commit
        const commitObject = branch.commit(commitOptions);
        // Store the commit object
        commitObjectMap[commit_hash] = commitObject;
        commitToBranchMap[commit_hash] = branchName;
      }
    });
  }, []);

  useEffect(() => {
    initializeGraph();

    const handleResize = () => {
      initializeGraph();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initializeGraph]);

  return (
    <div className="graph-wrapper">
      <button
        onClick={() => alert("Summarizing commits...")}
        className="summarize-button"
      >
        Summarize
      </button>
      <div id="gitgraph" />
    </div>
  );
};

export default GitGraphComponent;
