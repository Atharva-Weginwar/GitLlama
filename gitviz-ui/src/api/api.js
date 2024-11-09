import axios from "axios";

const baseURL = 'http://localhost:5000/api';

// const handleResponse = async (response) => {
//     if (!response.ok) {
//       const errorBody = await response.text();
//       throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
//     }
//     const contentType = response.headers.get("content-type");
//     if (contentType && contentType.indexOf("application/json") !== -1) {
//       return response.json();
//     } else {
//       return response.text();
//     }
// };

export const analyzeCommit = async (commitHash) => {
    const url = `${baseURL}/anaylyze-commit/${commitHash}`;
    return await fetch(url);
}

export const getCommitHistory = async (inputURL) => {
    
    const url = `${baseURL}/commits-history-frontend?url=${inputURL}`;
    return await axios.get(url);

    // Store input URL in local storage
}

export const processRepo = async (inputURL) => {
    const url = `${baseURL}/process-github-repo?url=${inputURL}`;
    return await axios.get(url);

    // Store input URL in local storage
}

export const resetPineConeIndex = async () => {
    const url = `${baseURL}/reset-pinecone-index`;
    return await fetch({
        url: url,
        method: 'POST'
    });
}

export const commitToPineCone = async () => {
    const url = `${baseURL}/push-commits-to-pinecone`;
    return await fetch({
        url: url,
        method: 'POST'
    });
}

export const analyzeRepo = async () => {
    const url = `${baseURL}/analyze-repository`;
    return await fetch({
        url: url
    });
}

export const sendChatMessage = async (prompt) => {
    const url = `${baseURL}/run-rag?query=${prompt}`;
    return await fetch(url);

    // Store input URL in local storage
}
