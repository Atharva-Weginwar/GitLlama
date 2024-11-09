const Footer = () => {
    return (
        <div className="flex justify-center items-center capitalize text-white text-lg p-5 pb-7 gap-5">
            <h3>Powered by</h3>
            <div>
                <img src="../src/assets/LlamaIndex-logo.svg" alt="LlamaIndex Logo" />
            </div>
            <span>&</span>
            <div className="w-[200px]">
                <img src="../src/assets/Pinecone-logo.svg" alt="Pinecone Logo" />
            </div>
        </div>
    );
}

export default Footer;