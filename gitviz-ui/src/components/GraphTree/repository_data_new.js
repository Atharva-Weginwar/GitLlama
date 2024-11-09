export const repoData = {
  repository: "example-repo",
  branches: [
    {
      branch: "main",
      commits: [
        {
          commit_hash: "1a2b3c4d5e6f7g8h9i0j1",
          message: "Initial commit",
          author: { name: "Alice Smith", email: "alice@example.com" },
          previous_commit: null,
          timestamp: "2024-10-01T10:00:00Z"
        },
        {
          commit_hash: "2b3c4d5e6f7g8h9i0j1k",
          message: "Add README file",
          author: { name: "Alice Smith", email: "alice@example.com" },
          previous_commit: "1a2b3c4d5e6f7g8h9i0j1",
          timestamp: "2024-10-02T10:00:00Z"
        },
        {
          commit_hash: "3c4d5e6f7g8h9i0j1k2l",
          message: "Implement feature A",
          author: { name: "Bob Johnson", email: "bob@example.com" },
          previous_commit: "2b3c4d5e6f7g8h9i0j1k",
          timestamp: "2024-10-03T11:00:00Z"
        },
        {
          commit_hash: "4d5e6f7g8h9i0j1k2l3m",
          message: "Fix bug in feature A",
          author: { name: "Alice Smith", email: "alice@example.com" },
          previous_commit: "3c4d5e6f7g8h9i0j1k2l",
          timestamp: "2024-10-04T12:00:00Z"
        },
        {
          commit_hash: "5e6f7g8h9i0j1k2l3m4n",
          message: "Merge branch 'feature-B' into 'main'",
          author: { name: "Alice Smith", email: "alice@example.com" },
          previous_commit: ["4d5e6f7g8h9i0j1k2l3m", "8h9i0j1k2l3m4n5o6p7q"],
          timestamp: "2024-10-05T13:00:00Z"
        }
      ]
    },
    {
      branch: "feature-B",
      commits: [
        {
          commit_hash: "6f7g8h9i0j1k2l3m4n5o",
          message: "Start feature B",
          author: { name: "Bob Johnson", email: "bob@example.com" },
          previous_commit: "2b3c4d5e6f7g8h9i0j1k",
          timestamp: "2024-10-02T14:00:00Z"
        },
        {
          commit_hash: "7g8h9i0j1k2l3m4n5o6p",
          message: "Complete feature B implementation",
          author: { name: "Bob Johnson", email: "bob@example.com" },
          previous_commit: "6f7g8h9i0j1k2l3m4n5o",
          timestamp: "2024-10-04T15:00:00Z"
        },
        {
          commit_hash: "8h9i0j1k2l3m4n5o6p7q",
          message: "Fix issue in feature B",
          author: { name: "Alice Smith", email: "alice@example.com" },
          previous_commit: "7g8h9i0j1k2l3m4n5o6p",
          timestamp: "2024-10-05T16:00:00Z"
        }
      ]
    }
  ]
};