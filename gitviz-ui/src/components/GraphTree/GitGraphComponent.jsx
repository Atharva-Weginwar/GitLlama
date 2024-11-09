import React, { useEffect, useCallback } from "react";
import { createGitgraph, templateExtend, TemplateName } from "@gitgraph/js";
import data from "./commitsfrontend.json";

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
      },
    });

    const gitgraph = createGitgraph(graphContainer, {
      template: myTemplate,
      orientation: "vertical",
      author: "GitViz",
    });

    const commitMap = {};
    const branchMap = {};

    const allCommits = {};
    data.branches.forEach((branchData) => {
      branchData.commits.forEach((commit) => {
        allCommits[commit.commit_hash] = { ...commit, branch: branchData.branch };
      });
    });

    const getOrCreateBranch = (branchName, parentBranchOrCommit) => {
      if (branchMap[branchName]) return branchMap[branchName];

      const branch = gitgraph.branch({
        name: branchName,
        from: parentBranchOrCommit,
      });
      branchMap[branchName] = branch;
      return branch;
    };

    const processCommit = (commitHash) => {
      if (commitMap[commitHash]) return commitMap[commitHash];

      const commitData = allCommits[commitHash];
      if (!commitData) return null;

      const { previous_commit, branch: branchName } = commitData;

      let parentCommit = null;
      if (previous_commit) {
        parentCommit = processCommit(previous_commit);
      }

      let branch = branchMap[branchName];
      if (!branch) {
        if (parentCommit) {
          if (branchMap[parentCommit.branch.name]) {
            branch = getOrCreateBranch(branchName, parentCommit.commit);
          } else {
            branch = getOrCreateBranch(branchName, parentCommit.branch);
          }
        } else {
          branch = getOrCreateBranch(branchName, gitgraph);
        }
      }

      const commitOptions = {
        hash: commitData.commit_hash,
        subject: commitData.message,
        author: commitData.author.name,
        email: commitData.author.email,
        date: new Date(commitData.timestamp),
      };

      const commit = branch.commit(commitOptions);
      commitMap[commitHash] = { commit, branch };
      return { commit, branch };
    };

    Object.keys(allCommits).forEach(processCommit);

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
      <div id="gitgraph" style={{ height: "500px" }} />
    </div>
  );
};

export default GitGraphComponent;
