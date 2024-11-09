import { useContext, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getCommitHistory, processRepo } from "../api/api";
import { useNavigate } from "react-router-dom";
import { GraphContext } from "../App";

const Home = () => {

  const [repoURL, setRepoURL] = useState('');
  const navigate = useNavigate();

  const {setGraph} = useContext(GraphContext);

  const handleSubmit = async () => {
    event.preventDefault();
    const {data} = await getCommitHistory(repoURL);
    const processRepoData = await processRepo(repoURL);

    console.log(data);

    setGraph(data);
    

    navigate('/view');
  }

  return (
    <div
      className="flex flex-col items-center justify-center w-full h-full bg-cover"
      style={{ backgroundImage: "url('../src/assets/background.jpg')" }}
    >
      <Header />  
      <h1 className="text-white text-2xl mt-10 animate-fadeIn"></h1>
      <div className="flex flex-1 items-center justify-center w-full text-center">
        <form onSubmit={() => handleSubmit()} className="max-w-[700px] w-full animate-fadeIn">
          <label
            htmlFor="input-url"
            className="block mb-4 text-2xl font-medium text-white dark:text-white animate-slideInDown"
          >
            Enter your Github Repo URL
          </label>
          <input
            type="text"
            id="input-url"
            className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all duration-300 ease-in-out hover:shadow-lg focus:shadow-lg animate-slideInDown"
            placeholder=""
            required
            onChange={event => setRepoURL(event.target.value)}
          />
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 animate-slideInDown"
          >
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
