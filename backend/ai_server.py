from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from openai import OpenAI, APIError

# Load environment variables from .env
load_dotenv()

# Initialize Flask
app = Flask(__name__)
CORS(app)

# Set up OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Memory to store session per user
session_memory = {}

@app.route('/ask-ai', methods=['POST'])
def ask_ai():
    data = request.get_json()
    question = data.get('question', '')
    user_id = request.remote_addr

    # Restrict to food-related questions only
    banned_keywords = ['weather', 'birthday', 'name', 'age', 'location', 'politics']
    if any(term in question.lower() for term in banned_keywords):
        return jsonify({
            'answer': "Sorry, I am trained to only assist with food-related questions and concerns. If this was a food-related question, please try again."
        })

    # Start session memory for new users
    if user_id not in session_memory:
        session_memory[user_id] = []

    # Add user's question to memory
    session_memory[user_id].append({"role": "user", "content": question})
    messages = [{"role": "system", "content": "You are a friendly assistant that only answers questions about food, cooking, recipes, and cuisine."}] + session_memory[user_id]

    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            max_tokens=1500,
            temperature=0.6
        )
        reply = response.choices[0].message.content
        session_memory[user_id].append({"role": "assistant", "content": reply})

        return jsonify({'answer': reply.strip()})

    except APIError as e:
        return jsonify({'error': f"OpenAI API error: {str(e)}"}), 500

@app.route('/', methods=['GET'])
def root():
    return "MulticulturalFoods AI Server is running."

# Gunicorn compatibility
if __name__ != '__main__':
    application = app

# Local dev testing
if __name__ == '__main__':
    app.run(debug=True, port=5000)
