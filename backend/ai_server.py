from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all origins

# Set your OpenAI API key from environment variables
openai.api_key = os.getenv("OPENAI_API_KEY")

# Store conversation history per user
session_memory = {}

@app.route('/ask-ai', methods=['POST'])
def ask_ai():
    data = request.get_json()
    question = data.get('question', '')
    user_id = request.remote_addr

    # Block off-topic queries
    banned_keywords = ['weather', 'birthday', 'name', 'age', 'location', 'politics']
    if any(term in question.lower() for term in banned_keywords):
        return jsonify({
            'answer': "Sorry, I am trained to only assist with food-related questions and concerns. If this was a food-related question, please try again."
        })

    # Track user messages for context
    if user_id not in session_memory:
        session_memory[user_id] = []

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
        return jsonify({'error': f"OpenAI API error: {str(e)}"}), 500

@app.route('/', methods=['GET'])
def root():
    return "MulticulturalFoods AI Server is running."

# Required for gunicorn on Render
if __name__ != '__main__':
    application = app  # For gunicorn

# For local dev only
if __name__ == '__main__':
    app.run(debug=True, port=5000)
