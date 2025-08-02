# 🎙️ Real-Time Interactive Interview Agent

A sophisticated AI-powered interview system that simulates human-like interview experiences using voice and text interaction. Built with modern web technologies and advanced AI capabilities.

## ✨ Features

### 🗣️ Voice & Text Communication
- **Web Speech API Integration**: Real-time speech-to-text and text-to-speech
- **Dual Input Support**: Seamlessly switch between voice and text input
- **Audio Visualization**: Real-time voice level monitoring and waveform display
- **Auto-speak**: AI responses are automatically spoken using natural-sounding voices

### 🤖 Advanced AI Pipeline
- **LangGraph Workflow**: Complex state management with conditional routing
- **Dynamic Question Generation**: Context-aware questions based on user responses
- **Real-time Evaluation**: Immediate feedback on answer quality and content
- **Adaptive Behavior**: AI adjusts questioning style based on candidate responses

### 🔄 Real-Time Communication
- **Socket.io Integration**: Instant bidirectional communication
- **Session Management**: Persistent interview sessions with state tracking
- **Connection Resilience**: Automatic reconnection and error handling

### 📊 Interview Management
- **Progress Tracking**: Visual progress indicators across interview phases
- **Phase-based Structure**: Greeting → Introduction → Technical → Behavioral → Closing
- **Response Analysis**: Quality scoring and key point extraction
- **Statistics Dashboard**: Real-time interview metrics and candidate insights

### 🎨 Modern UI/UX
- **Responsive Design**: Optimized for desktop and mobile devices
- **Smooth Animations**: Framer Motion powered transitions and interactions
- **Real-time Updates**: Live chat interface with typing indicators
- **Accessibility**: Screen reader friendly and keyboard navigation support

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 14, React 18, TailwindCSS
- **Backend**: Node.js, Express, Socket.io
- **AI Pipeline**: LangChain, LangGraph, Google Gemini
- **Voice**: Web Speech API (STT/TTS)
- **Real-time**: WebSocket communication
- **Animations**: Framer Motion

### System Components

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js UI    │    │  Socket.io      │    │   LangGraph     │
│                 │◄──►│   Server        │◄──►│   Workflow      │
│ • Voice Controls│    │                 │    │                 │
│ • Chat Interface│    │ • Session Mgmt  │    │ • State Machine │
│ • Progress Track│    │ • Real-time     │    │ • AI Tools      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Web Speech API │    │   Express API   │    │  Google Gemini  │
│                 │    │                 │    │                 │
│ • Speech-to-Text│    │ • Health Check  │    │ • Question Gen  │
│ • Text-to-Speech│    │ • Error Handle  │    │ • Evaluation    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern web browser with Web Speech API support
- Google Gemini API key (optional, for enhanced AI features)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd real-time-interview-agent
```

2. **Install dependencies**
```bash
# Install root dependencies
npm install

# Install all dependencies (client + server)
npm run install:all
```

3. **Environment Setup**

**Server Environment (.env)**:
```bash
cd server
cp .env.example .env
# Edit .env with your configuration
```

**Client Environment (.env.local)**:
```bash
cd client
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. **Start Development Servers**
```bash
# Start both client and server concurrently
npm run dev

# Or start individually:
npm run dev:server  # Backend only
npm run dev:client  # Frontend only
```

5. **Access the Application**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Health Check: http://localhost:5000/health

## 🎯 Usage Guide

### Starting an Interview

1. **Candidate Information**: Fill out your profile information
   - Full name (required)
   - Position applying for (required)
   - Years of experience (optional)
   - Key skills (optional)

2. **Interview Process**: The system guides you through:
   - **Greeting Phase**: Welcome and initial setup
   - **Introduction Phase**: Background and motivation questions
   - **Technical Phase**: Skills and project-based questions
   - **Behavioral Phase**: Situational and soft skills questions
   - **Closing Phase**: Final questions and wrap-up

3. **Interaction Methods**:
   - **Voice Input**: Click "Start Speaking" and talk naturally
   - **Text Input**: Type your responses in the chat interface
   - **Quick Actions**: Use predefined buttons for common requests

### Voice Features

- **Automatic Detection**: The system detects when you finish speaking
- **Real-time Transcription**: See your words transcribed in real-time
- **Audio Visualization**: Visual feedback shows your voice input level
- **Natural Speech**: AI responses are spoken with natural-sounding voices

### Interview Tools

- **Repeat Question**: Ask the AI to repeat the last question
- **Clarify Question**: Request clarification if you don't understand
- **Progress Tracking**: Monitor your progress through the interview phases
- **Response Evaluation**: Get immediate feedback on your answers

## 🛠️ Development

### Project Structure

```
real-time-interview-agent/
├── client/                     # Next.js frontend
│   ├── app/
│   │   ├── components/        # React components
│   │   │   ├── InterviewInterface.js
│   │   │   ├── VoiceControls.js
│   │   │   ├── ChatMessage.js
│   │   │   ├── ProgressBar.js
│   │   │   ├── InterviewStats.js
│   │   │   └── WelcomeScreen.js
│   │   ├── context/           # React contexts
│   │   │   └── SocketContext.js
│   │   ├── globals.css        # Global styles
│   │   ├── layout.js          # Root layout
│   │   └── page.js            # Main page
│   ├── package.json
│   └── tailwind.config.js
├── server/                     # Node.js backend
│   ├── graph/                 # LangGraph components
│   │   ├── types.js           # Type definitions
│   │   ├── tools.js           # AI tools
│   │   ├── nodes.js           # Workflow nodes
│   │   └── graph.js           # Main graph logic
│   ├── index.js               # Server entry point
│   └── package.json
├── package.json               # Root package.json
└── README.md
```

### LangGraph Workflow

The interview system uses a sophisticated state machine with the following nodes:

- **startInterview**: Initialize the interview session
- **analyzeAnswer**: Process and evaluate user responses
- **generateNextQuestion**: Create contextually appropriate questions
- **generateFollowUp**: Ask follow-up questions for insufficient answers
- **repeatQuestion**: Repeat questions when requested
- **clarifyQuestion**: Rephrase questions for better understanding
- **concludeInterview**: End the interview gracefully

### Socket Events

**Client → Server**:
- `startInterview`: Begin new interview session
- `userMessage`: Send user response
- `endInterview`: Terminate interview
- `getInterviewStatus`: Request current status

**Server → Client**:
- `interviewStarted`: Interview initialization complete
- `agentResponse`: AI response with question/feedback
- `interviewCompleted`: Interview finished successfully
- `error`: Error messages and handling

## 🔧 Configuration

### Environment Variables

**Server (.env)**:
```bash
PORT=5000                                    # Server port
NODE_ENV=development                         # Environment
CLIENT_URL=http://localhost:3000            # Frontend URL
GOOGLE_API_KEY=your_google_api_key_here     # Gemini API key
MONGODB_URI=mongodb://localhost:27017/...   # Database (future)
SESSION_SECRET=your_session_secret          # Session security
```

**Client (.env.local)**:
```bash
NEXT_PUBLIC_SERVER_URL=http://localhost:5000  # Backend URL
```

### Customization

**Interview Questions**: Modify question sets in `server/graph/nodes.js`
**UI Styling**: Update Tailwind classes in component files
**Voice Settings**: Adjust speech parameters in `VoiceControls.js`
**AI Behavior**: Customize prompts and logic in `server/graph/tools.js`

## 🚀 Deployment

### Production Build

```bash
# Build client
npm run build

# Start production server
npm start
```

### Docker Deployment (Optional)

```dockerfile
# Dockerfile example
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 5000
CMD ["npm", "start"]
```

### Environment Setup

- Set `NODE_ENV=production`
- Configure proper CORS origins
- Set up SSL certificates for HTTPS
- Configure database connections
- Set up monitoring and logging

## 🧪 Testing

### Running Tests

```bash
# Frontend tests
cd client && npm test

# Backend tests
cd server && npm test

# Integration tests
npm run test:integration
```

### Browser Compatibility

- **Chrome/Edge**: Full support including Web Speech API
- **Firefox**: Limited speech recognition support
- **Safari**: Basic functionality, limited voice features
- **Mobile**: Responsive design, touch-optimized

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow ESLint and Prettier configurations
- Write comprehensive tests for new features
- Update documentation for API changes
- Ensure mobile responsiveness
- Test voice features across browsers

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **LangChain Team**: For the powerful AI orchestration framework
- **Socket.io Team**: For real-time communication capabilities
- **Vercel Team**: For Next.js and deployment platform
- **Tailwind Team**: For the utility-first CSS framework
- **Framer Team**: For smooth animation capabilities

## 🆘 Support

For support and questions:

- 📧 Email: support@interview-agent.com
- 🐛 Issues: [GitHub Issues](https://github.com/your-repo/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/your-repo/discussions)
- 📖 Documentation: [Wiki](https://github.com/your-repo/wiki)

---

**Built with ❤️ for the future of interviews**