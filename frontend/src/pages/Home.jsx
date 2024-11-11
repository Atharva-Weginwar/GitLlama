import { useContext, useState, useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { GraphContext } from "../App";
import "../App.css"; // Create this CSS file to hold the animation styles

const Home = () => {
  const [repoURL, setRepoURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setGraph } = useContext(GraphContext);

  const isValidGithubUrl = (url) => {
    const regex = /^https:\/\/github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-._]+$/;
    return regex.test(url);
  };

  const resetPineconeIndex = async () => {
    try {
      await fetch('http://localhost:8000/api/reset-pinecone-index', {
        method: 'POST'
      });
    } catch (error) {
      // Ignore error, continue execution
    }
  };

  const processGithubRepo = async (url) => {
    try {
      await fetch(`http://localhost:8000/api/process-github-repo?url=${url}`);
    } catch (error) {
      // Ignore error, continue execution
    }
  };

  const pushToPinecone = async () => {
    try {
      await fetch('http://localhost:8000/api/push-commits-to-pinecone', {
        method: 'POST'
      });
    } catch (error) {
      // Ignore error, continue execution
    }
  };

  const getCommitHistoryFrontend = async (url) => {
    try {
      await fetch(`http://localhost:8000/api/commits-history-frontend?url=${url}`);
    } catch (error) {
      // Ignore error, continue execution
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!isValidGithubUrl(repoURL)) {
      alert('Invalid GitHub Repository URL');
      return;
    }

    setIsLoading(true);
    
    try {
      await resetPineconeIndex();
      await processGithubRepo(repoURL);
      await pushToPinecone();
      await getCommitHistoryFrontend(repoURL);
      navigate('/view');
    } catch (error) {
      console.error('Error fetching commit history:', error);
      alert('Error loading commit history');
    } finally {
      setIsLoading(false);
    }
  };

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesConfig = {
    background: {
      color: { value: "#111827" },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "push" },
        onHover: { enable: true, mode: "repulse" },
      },
      modes: {
        push: { quantity: 4 },
        repulse: { distance: 200, duration: 0.4 },
      },
    },
    particles: {
      color: { value: "#ffffff" },
      links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.5, width: 1 },
      move: { direction: "none", enable: true, outModes: { default: "bounce" }, random: false, speed: 3, straight: false },
      number: { density: { enable: true, area: 800 }, value: 80 },
      opacity: { value: 0.5 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 5 } },
    },
    detectRetina: true,
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#111827", color: "#ffffff", position: "relative" }}>
      <Particles init={particlesInit} options={particlesConfig} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          position: "relative",
          zIndex: 1,
          gap: "20px",
          textAlign: "center",
          marginTop: "50px"
        }}
      >
        <div style={{ flex: "3", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img 
            src="../src/assets/gitllama-icon.png" 
            alt="GitLLama Logo" 
            style={{ width: "300px", height: "auto", marginTop: "20px" }} 
          />

          {/* Typewriter effect for "Powered by Llama3" */}
          <div className="typewriter" style={{ marginBottom: "20px", fontSize: "1.5em", fontWeight: "bold" }}>
            Powered by Llama3.2
          </div>

          <p style={{ fontSize: "1.1em", marginTop: "10px" }}>Enter your repository URL to begin</p>
          
          <div style={{ marginTop: "20px" }}>
            <input
              type="text"
              placeholder="Repository URL"
              value={repoURL}
              onChange={event => setRepoURL(event.target.value)}
              style={{
                padding: "6px",
                width: "550px",
                height: "50px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                marginRight: "5px",
                color: "#000",
              }}
            />
            <br></br>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              style={{ padding: "6px 6px", borderRadius: "5px", border: "none", backgroundColor: "#4CAF50", color: "#ffffff", marginTop: "10px", width: "100px" }}
            >
              {isLoading ? "Processing..." : "Submit"}
            </button>
          </div>

          <div className="flex flex-col justify-center items-center capitalize text-white text-lg" style={{ 
            marginTop: "250px", fontSize: "1.8em" }}>
            <h3>Built With</h3>

            <div className="grid grid-cols-3 gap-4 mt-2">
              <div className="flex justify-center items-start">
                <img src="../src/assets/meta-white.png" alt="Meta Logo" style={{ height: "100px", marginTop: "-30px" }} />
              </div>
              <div className="flex justify-center items-start">
                <img src="../src/assets/togetherai.png" alt="Together.ai Logo" style={{ height: "50px", width: "auto" }} />
              </div>
              <div className="flex justify-center items-start">
                <img src="../src/assets/mindsdb-icon.png" alt="Mindsdb Logo" style={{ height: "100px" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
