from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all origins (adjust for production)

# Set OpenAI API Key
openai.api_key = os.getenv("OPENAI_API_KEY")

# Optional: Store short memory session per user/IP
session_memory = {}

@app.route('/ask-ai', methods=['POST'])
def ask_ai():
    data = request.get_json()
    question = data.get('question', '')
    user_id = request.remote_addr  # You can also pass user_id from frontend if needed

    # Validate for food-related question
    banned_keywords = ['weather', 'birthday', 'name', 'age', 'location', 'politics']
    if any(term in question.lower() for term in banned_keywords):
        return jsonify({
            'answer': "Sorry, I am trained to only assist with food-related questions and concerns. If this was a food-related question, please try again."
        })

    # Initialize memory for user
    if user_id not in session_memory:
        session_memory[user_id] = []

    # Build message history
    session_memory[user_id].append({"role": "user", "content": question})
    messages = [{"role": "system", "content": "You are a friendly assistant that only answers questions about food, cooking, recipes, and cuisine."}] + session_memory[user_id]

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o",
            messages=messages,
            max_tokens=1500,
            temperature=0.6
        )
        reply = response['choices'][0]['message']['content']
        session_memory[user_id].append({"role": "assistant", "content": reply})

        return jsonify({'answer': reply.strip()})

    except openai.error.OpenAIError as e:
        return jsonify({'error': str(e)}), 500

# Run the server
if __name__ == '__main__':
    app.run(debug=True)
