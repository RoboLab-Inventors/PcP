from flask import Flask, request, jsonify
from flask_cors import CORS
from llama_index.core import SimpleDirectoryReader, GPTVectorStoreIndex
from llama_index.llms.ollama import Ollama
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.core.node_parser import SimpleNodeParser

app = Flask(__name__)
CORS(app)

# 🚀 Load the LLM (use Mistral for stability)
try:
    llm = Ollama(model="mistral")  # Switch to Vicuna if needed: "vicuna:7b-q4_K_M"
except Exception as e:
    print(f"⚠️ Ollama Model Load Failed: {e}")
    llm = None  # Fallback if Ollama is broken

# 🚀 Use a stable Hugging Face embedding model
embed_model = HuggingFaceEmbedding(model_name="sentence-transformers/all-mpnet-base-v2")

# 🚀 Load & chunk documents
documents = SimpleDirectoryReader("datiOllama").load_data()
if not documents:
    raise ValueError("❌ No documents found in 'datiOllama'! Make sure the folder contains .txt, .md, or .pdf files.")

# Split documents into smaller chunks
parser = SimpleNodeParser.from_defaults(chunk_size=512, chunk_overlap=50)
nodes = parser.get_nodes_from_documents(documents)

# 🚀 Build the vector index
index = GPTVectorStoreIndex(nodes, embed_model=embed_model)

# 🚀 Set up query engine
system_prompt = (
    "Sei un assistente virtuale creato per rispondere a domande basate sui documenti forniti. Devi rispondere esclusivamente in italiano. Se non trovi informazioni nei documenti, ammetti di non sapere la risposta invece di inventarla. Sii chiaro, conciso e professionale. I documenti caricati descrivono un sito, di cui sei l'assistente intelligente, chiamato NicolAI."
    
)

query_engine = index.as_query_engine(llm=llm, similarity_top_k=5, system_prompt=system_prompt)


@app.route("/ask", methods=["POST"])
def ask():
    query = request.json.get("query")
    if not query:
        return jsonify({"error": "No query provided"}), 400

    # Query the index and return response
    try:
        response = query_engine.query(query) if llm else "⚠️ LLM not available."
        return jsonify({"response": str(response)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
