from pinecone import Pinecone
# Initialize Pinecone with your API key
def initilize_pinecone():
    pc = Pinecone(api_key="")

    # Create or connect to an index
    index_name = "gitvizind"
    index = pc.Index(index_name)
    return index

def reset_pinecone_index():
    index = initilize_pinecone()
    index.delete(delete_all=True)