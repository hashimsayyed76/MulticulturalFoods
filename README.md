
# 🌍 Multicultural Foods Web Application

**Multicultural Foods** is a culturally-focused web application that allows users to explore recipes from around the world. It aims to educate users on traditional dishes, their origins, and cultural significance. This project also features a custom AI chatbot that answers food-related questions only — deployed using Flask and OpenAI on Render, while Firebase handles frontend hosting and authentication.

---

## 🧠 Purpose

The purpose of this project is to:
- Promote cultural awareness through cuisine.
- Provide educational insights into the history and meaning behind different dishes.
- Offer an engaging platform with an AI assistant restricted to food-related topics.
- Enable users to browse, search, and save meals, and manage personal profiles.

---

## 🛠️ Technologies Used

### 💻 Frontend:
- **HTML, CSS, JavaScript**
- **Firebase Authentication** for secure login/register
- **Firebase Hosting** for web deployment

### 🧠 Backend:
- **Python (Flask), Gunicorn, and OpenAI** for AI-API support
- **Render** for backend deployment of Flask (always enabled)
- **Flask-CORS** for cross-origin support
- **Dotenv** to securely load API keys

---

## 🚀 Live URLs

- **Frontend (Firebase):**  
  [https://multiculturalfoods-8f667.web.app](https://multiculturalfoods-8f667.web.app)

- **Backend AI Server (Render):**  
  [https://multiculturalfoods.onrender.com](https://multiculturalfoods.onrender.com)

---

## 🔧 Running Locally

### ✅ Prerequisites

- Python 3.10+
- Node.js and Firebase CLI (for frontend, optional)
- An OpenAI API key (for backend)

### 📦 Backend Setup (Flask AI Server)

1. Clone the repo and navigate to the `backend` folder:

   ```bash
   git clone https://github.com/hashimsayyed76/MulticulturalFoods.git
   cd multiculturalfoods/backend
   ```

2. Create and activate a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file with your OpenAI key:

   ```
   OPENAI_API_KEY=your_openai_key_here
   ```

5. Run the Flask app locally:

   ```bash
   python ai_server.py
   ```

   Access the API at:  
   `http://localhost:5000/ask-ai`

---

### 🌐 Frontend Setup (Optional Local Testing)

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend/html
   ```

2. Open `index.html` in your browser directly or use a local server (e.g., `Live Server` in VS Code).

3. Make sure `askai.html` fetches the correct backend:

   ```javascript
   const BACKEND_URL = "https://multiculturalfoods.onrender.com/ask-ai";
   ```

---

## 🧠 AI Chatbot Behavior

- Accepts only food/cooking/recipe-related questions.
- Filters out off-topic questions using a list of banned keywords.
- Maintains user session context per IP using `request.remote_addr`.
- Returns helpful, informative, and polite food-specific answers via GPT-4o.

---

## 📁 Project Structure

```
MulticulturalFoods/
│
├── backend/
│   ├── ai_server.py (Flask Backend)
│   ├── requirements.txt
│   └── .env (No API Key in here, may need to contact Administrator for Key to run in Local. Secret protected for security measures).
│
├── frontend/
│   └── html/ (contains all HTML redirects)
│       ├── css/ (contains stylesheet)
|       ├── dishes/ (contains hardcoded images for index, includes background and logo in folder)
|       ├── flags/ (contains hardcoded images for index for countries)
│       └── js/ (contains authentication for console validation of scripts)
```

---

## 🔐 Environment Variables

| Key             | Description                |
|----------------|----------------------------|
| OPENAI_API_KEY | Your OpenAI API Key (GPT-4o) |

---

## ✨ Features

- 🔐 Secure user auth (Firebase)
- 🌎 Browse cuisines by country
- 🍽 Learn dish history & origins
- 🤖 AI food assistant
- 💾 Save meals and manage profile
- ⚡ Fully deployed using Render + Firebase

---

## 🧪 Future Enhancements

- Add support for user-generated recipes
- Introduce cuisine recommendation engine
- Enable multilingual support for international users
- Enhance AI to track deeper context with longer history

---

## 🤝 Contributors

- Moeez Zahid  
- Hashim S.  
- Umer K.
