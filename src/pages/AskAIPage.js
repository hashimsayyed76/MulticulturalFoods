export class AskAIPage {
  render() {
    return `
      <div class="ai-container">
        <h2>Ask Our Food AI 🍽️</h2>
        <form id="aiForm">
          <div class="form-group">
            <label for="question">What would you like to know about food today?</label>
            <textarea id="question" name="question" rows="5" 
                      placeholder="Ask about recipes, cooking techniques, ingredients, cultural food traditions, or anything food-related!" 
                      required></textarea>
          </div>
          <button type="submit" class="btn btn-full">Ask AI</button>
        </form>

        <div class="ai-response" id="responseBox" style="display: none;">
          <strong>AI Response:</strong>
          <p id="aiOutput"></p>
        </div>
      </div>
    `
  }

  init() {
    document.getElementById('aiForm').addEventListener('submit', (e) => {
      e.preventDefault()
      this.handleAIQuery()
    })
  }

  async handleAIQuery() {
    const question = document.getElementById('question').value.trim()
    const output = document.getElementById('aiOutput')
    const responseBox = document.getElementById('responseBox')

    if (!question) {
      output.textContent = "Please enter a food-related question."
      responseBox.style.display = 'block'
      return
    }

    // Show loading state
    output.innerHTML = '<div class="loading"></div> Thinking...'
    responseBox.style.display = 'block'

    try {
      // Simulate AI response (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock AI responses based on keywords
      let response = this.generateMockResponse(question)
      
      output.textContent = response
    } catch (error) {
      output.textContent = "Sorry, I'm having trouble connecting right now. Please try again later!"
      console.error('AI Error:', error)
    }
  }

  generateMockResponse(question) {
    const lowerQuestion = question.toLowerCase()
    
    if (lowerQuestion.includes('recipe') || lowerQuestion.includes('cook')) {
      return "I'd be happy to help with cooking! For specific recipes, I recommend starting with fresh ingredients and following traditional preparation methods. What type of cuisine are you interested in? I can provide tips on techniques, ingredient substitutions, and cultural cooking methods."
    }
    
    if (lowerQuestion.includes('ingredient') || lowerQuestion.includes('substitute')) {
      return "Great question about ingredients! Many ingredients can be substituted based on dietary needs or availability. For example, you can often substitute Greek yogurt for sour cream, or use coconut milk instead of dairy milk in many recipes. What specific ingredient are you looking to substitute?"
    }
    
    if (lowerQuestion.includes('culture') || lowerQuestion.includes('tradition')) {
      return "Food traditions are fascinating! Every culture has unique cooking methods, ingredients, and meal customs that have been passed down through generations. These traditions often reflect the geography, climate, and history of a region. Which cultural food tradition would you like to learn more about?"
    }
    
    if (lowerQuestion.includes('spice') || lowerQuestion.includes('flavor')) {
      return "Spices and flavors are the heart of multicultural cooking! Different regions use unique spice combinations - like garam masala in Indian cuisine, za'atar in Middle Eastern dishes, or herbes de Provence in French cooking. The key is balancing flavors and understanding how spices complement each other."
    }
    
    // Default response
    return "That's an interesting food question! I'm here to help with recipes, cooking techniques, ingredients, cultural food traditions, and culinary tips. Could you provide a bit more detail about what you'd like to know? I'm excited to share some delicious knowledge with you!"
  }
}