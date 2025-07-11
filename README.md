# MulticulturalFoods 🍽️🌍

A modern web application that introduces users to authentic global cuisines, featuring cultural backgrounds, recipes, and an AI-powered food assistant.

## Features

### 🔹 **Explore Global Cuisines**
- Browse dishes from Greece, India, Italy, Mexico, Thailand, and Turkey
- Learn about cultural significance and cooking traditions
- High-quality food photography and detailed descriptions

### 🔹 **Smart Search**
- Search by dish name, country, or ingredients
- Filter results by rating, country, or content
- Discover new recipes based on your preferences

### 🔹 **AI Food Assistant**
- Chat with our food-focused AI for cooking tips
- Get ingredient substitution suggestions
- Learn about cultural food traditions
- Receive personalized recipe recommendations

### 🔹 **Personal Features**
- Save favorite dishes to your collection
- User authentication and profiles
- Responsive design for all devices

## Technology Stack

### Frontend
- **Vanilla JavaScript** with modern ES6+ features
- **Vite** for fast development and building
- **CSS3** with custom properties and modern layouts
- **Responsive Design** with mobile-first approach

### Backend
- **Python Flask** for API endpoints
- **OpenAI GPT** integration for AI assistant
- **CORS** enabled for cross-origin requests
- **Environment-based configuration**

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8+
- OpenAI API key (optional, has fallback responses)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MulticulturalFoods
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   npm run install-backend
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your OpenAI API key
   ```

### Development

1. **Start the frontend development server**
   ```bash
   npm run dev
   ```

2. **Start the backend server** (in a new terminal)
   ```bash
   npm run start-backend
   ```

3. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## Project Structure

```
MulticulturalFoods/
├── src/
│   ├── auth/           # Authentication management
│   ├── pages/          # Page components
│   ├── router/         # Client-side routing
│   ├── main.js         # Application entry point
│   └── style.css       # Global styles
├── backend/
│   ├── server.py       # Flask API server
│   └── requirements.txt # Python dependencies
├── index.html          # Main HTML template
└── package.json        # Node.js configuration
```

## API Endpoints

### `/ask-ai` (POST)
Ask the AI assistant food-related questions.

**Request:**
```json
{
  "question": "How do I make authentic Greek moussaka?"
}
```

**Response:**
```json
{
  "answer": "To make authentic Greek moussaka, you'll need..."
}
```

### `/health` (GET)
Check if the backend server is running.

## Deployment Options

### Frontend Only
- **Netlify**: Drag and drop the `dist` folder after running `npm run build`
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Enable in repository settings

### Full Stack
- **Heroku**: Deploy both frontend and backend
- **Railway**: Modern deployment platform
- **DigitalOcean App Platform**: Scalable hosting

### Desktop Application
- **Electron**: Convert to desktop app
- **PyInstaller**: Create executable with Python backend

## Features in Detail

### Authentication System
- Local storage-based user management
- Registration with email validation
- Password reset functionality
- Session persistence

### Favorites System
- Heart icon interactions
- Local storage persistence
- Dynamic favorites page
- Easy removal from favorites

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interactions
- Accessible navigation

### AI Integration
- Food-focused responses only
- Fallback responses when API unavailable
- Context-aware suggestions
- Cultural cooking knowledge

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Team

- **Moeez Zahid** - Developer
- **Hashim S. Shaukat** - Developer  
- **Umer Kamran** - Developer

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Food images from [Pexels](https://pexels.com)
- Icons and emojis for cultural representation
- OpenAI for AI assistant capabilities
- BCS430 Senior Project at Farmingdale State College