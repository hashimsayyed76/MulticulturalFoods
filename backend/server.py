from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure OpenAI
openai.api_key = os.getenv('OPENAI_API_KEY')

@app.route('/ask-ai', methods=['POST'])
def ask_ai():
    try:
        data = request.get_json()
        question = data.get('question', '')
        
        if not question:
            return jsonify({'error': 'No question provided'}), 400
        
        # Check if question is food-related (basic filter)
        food_keywords = ['food', 'recipe', 'cook', 'ingredient', 'dish', 'cuisine', 'meal', 'eat', 'flavor', 'spice', 'kitchen', 'chef', 'restaurant']
        is_food_related = any(keyword in question.lower() for keyword in food_keywords)
        
        if not is_food_related:
            return jsonify({
                'answer': "I'm a food-focused AI assistant! I can help you with recipes, cooking techniques, ingredients, cultural food traditions, and culinary questions. Please ask me something related to food and cooking!"
            })
        
        # Create a food-focused prompt
        system_prompt = """You are a helpful AI assistant specialized in food, cooking, recipes, and culinary culture. 
        You should only answer questions related to food, cooking, recipes, ingredients, culinary techniques, 
        food culture, and dining. If someone asks about non-food topics, politely redirect them to ask about food-related topics.
        Keep your responses informative, friendly, and focused on culinary knowledge."""
        
        # Make API call to OpenAI (if API key is available)
        if openai.api_key:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": question}
                ],
                max_tokens=500,
                temperature=0.7
            )
            
            answer = response.choices[0].message.content.strip()
        else:
            # Fallback response when no API key is available
            answer = generate_mock_response(question)
        
        return jsonify({'answer': answer})
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': 'Sorry, I encountered an error. Please try again later.'}), 500

def generate_mock_response(question):
    """Generate mock responses when OpenAI API is not available"""
    question_lower = question.lower()
    
    if any(word in question_lower for word in ['recipe', 'cook', 'how to make']):
        return "I'd be happy to help with cooking! For specific recipes, I recommend starting with fresh, quality ingredients and following traditional preparation methods. What type of cuisine or specific dish are you interested in? I can provide tips on techniques, ingredient substitutions, and cultural cooking methods."
    
    elif any(word in question_lower for word in ['ingredient', 'substitute', 'replace']):
        return "Great question about ingredients! Many ingredients can be substituted based on dietary needs or availability. For example, you can often substitute Greek yogurt for sour cream, coconut milk for dairy milk, or honey for sugar in many recipes. What specific ingredient are you looking to substitute?"
    
    elif any(word in question_lower for word in ['culture', 'tradition', 'history']):
        return "Food traditions are fascinating! Every culture has unique cooking methods, ingredients, and meal customs that have been passed down through generations. These traditions often reflect the geography, climate, and history of a region. Which cultural food tradition would you like to learn more about?"
    
    elif any(word in question_lower for word in ['spice', 'flavor', 'seasoning']):
        return "Spices and flavors are the heart of multicultural cooking! Different regions use unique spice combinations - like garam masala in Indian cuisine, za'atar in Middle Eastern dishes, or herbes de Provence in French cooking. The key is balancing flavors and understanding how spices complement each other."
    
    else:
        return "That's an interesting food question! I'm here to help with recipes, cooking techniques, ingredients, cultural food traditions, and culinary tips. Could you provide a bit more detail about what you'd like to know? I'm excited to share some delicious knowledge with you!"

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'MulticulturalFoods AI server is running!'})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)