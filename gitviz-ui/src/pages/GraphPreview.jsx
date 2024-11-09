import GitGraphComponent from "../components/GraphTree/GitGraphComponent";
import Chatbot from "../components/ChatBot/ChatComponent";

const GraphPreview = () => {
  return (
    <div className="flex h-screen bg-darkBlue p-5">
      <div className="w-1/2 h-full">
        <GitGraphComponent />
      </div>
      <div className="w-1/2 h-full">
        <Chatbot />
      </div>
    </div>
  );
};

export default GraphPreview;
