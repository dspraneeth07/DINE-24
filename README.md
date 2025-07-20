
# DINE24 Restaurant Management System - Full Stack Web Application

**Developer:** MAMIDALA BHAVYA REDDY

## 🏗️ System Architecture & Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                           DINE24 SYSTEM FLOW                        │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   FRONTEND      │    │    BACKEND      │    │    DATABASE     │
│   (React.js)    │────│   (Flask API)   │────│   (MongoDB)     │
│                 │    │                 │    │                 │
│ • HTML/CSS/JS   │    │ • REST API      │    │ • Collections:  │
│ • User Interface│    │ • Authentication│    │   - reservations│
│ • Reservations  │    │ • Business Logic│    │   - menu_items  │
│ • Menu Display  │    │ • AI Integration│    │   - users       │
│ • AI Chat       │    │ • Data Processing│   │   - chat_logs   │
│ • Admin Panel   │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   EXTERNAL      │    │   AI SERVICES   │    │   SUPABASE      │
│   SERVICES      │    │                 │    │   INTEGRATION   │
│                 │    │ • Gemini API    │    │                 │
│ • Payment Gateway│    │ • Menu Context  │    │ • Edge Functions│
│ • Cloud Storage │    │ • Chat Support  │    │ • Real-time DB  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🤖 AI Chatbot Integration & Database Synchronization Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                    CHATBOT-DATABASE SYNC WORKFLOW                   │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    USER QUERY   │    │   FLASK BACKEND │    │    MONGODB      │
│                 │    │                 │    │   DATABASE      │
│ "Show me menu"  │───▶│ 1. Route Handler│───▶│ • menu_items    │
│ "Book a table"  │    │ 2. Query Parser │    │ • reservations  │
│ "What's special"│    │ 3. DB Connector │    │ • users         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CONTEXT       │    │   DATA FETCH    │    │   RESPONSE      │
│   BUILDING      │    │                 │    │   FORMATTING    │
│                 │    │ • Menu Items    │    │                 │
│ • User Intent   │────│ • Availability  │────│ • JSON Format   │
│ • Query Type    │    │ • Prices        │    │ • HTML Context  │
│ • Session Data  │    │ • Ratings       │    │ • Navigation    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔄 Gemini API Integration & Page Navigation Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│              GEMINI API PROCESSING & NAVIGATION FLOW                │
└─────────────────────────────────────────────────────────────────────┘

     USER INPUT                    PROCESSING LAYER              OUTPUT LAYER
┌─────────────────┐    ┌─────────────────────────────────────┐    ┌─────────────────┐
│                 │    │                                     │    │                 │
│ "Show me the    │───▶│        GEMINI API HANDLER          │───▶│   AI RESPONSE   │
│  vegetarian     │    │                                     │    │                 │
│  dishes"        │    │ 1. Context Preparation:             │    │ "Here are our   │
│                 │    │    - Menu data from MongoDB         │    │  delicious veg  │
│ "Book table     │    │    - User session info             │    │  options..."     │
│  for 4 people"  │    │    - Restaurant info               │    │                 │
│                 │    │                                     │    │ + NAVIGATION:   │
│ "What are       │    │ 2. Intent Recognition:             │    │   /menu         │
│  today's        │    │    - Menu inquiry → /menu          │    │   /reserve      │
│  specials?"     │    │    - Reservation → /reserve-table  │    │   /special      │
│                 │    │    - Specials → /todays-special    │    │                 │
└─────────────────┘    │                                     │    └─────────────────┘
         │              │ 3. Response Generation:            │             │
         │              │    - Natural language response    │             │
         ▼              │    - Navigation triggers          │             ▼
┌─────────────────┐    │    - Contextual information       │    ┌─────────────────┐
│   SESSION       │    │                                     │    │   PAGE          │
│   CONTEXT       │    │ 4. Database Integration:           │    │   REDIRECTION   │
│                 │    │    - Real-time menu prices        │    │                 │
│ • User History  │    │    - Availability status          │    │ • Automatic     │
│ • Preferences   │    │    - Special offers               │    │   routing       │
│ • Location      │    │    - Restaurant capacity          │    │ • Smooth        │
│ • Time          │    │                                     │    │   transition    │
└─────────────────┘    └─────────────────────────────────────┘    └─────────────────┘
         │                                │                                │
         └────────────────────────────────┼────────────────────────────────┘
                                          ▼
                              ┌─────────────────┐
                              │   FEEDBACK      │
                              │   LOOP          │
                              │                 │
                              │ • Chat history  │
                              │ • User ratings  │
                              │ • Performance   │
                              │   analytics     │
                              └─────────────────┘
```

## 🚀 Features Overview

### 🍽️ Core Restaurant Features
- **Table Reservation System**: Complete booking and management with Flask backend
- **Dynamic Menu Management**: CRUD operations using MongoDB collections
- **Real-time Analytics**: Business insights and reporting dashboards
- **Order Processing**: Handle customer orders with database persistence

### 🤖 AI-Powered Features
- **Intelligent Chatbot**: Real-time customer support using Gemini API
- **Smart Recommendations**: AI-driven menu suggestions based on user preferences
- **Automated Navigation**: Context-aware page routing and user guidance
- **FAQ Assistance**: Instant responses to common restaurant inquiries

### 👨‍💼 Admin Features
- **Dashboard Analytics**: Comprehensive business overview with MongoDB data
- **User Management**: Customer and staff administration
- **Menu Control**: Add, edit, delete menu items with database synchronization
- **Reservation Management**: View and manage all bookings in real-time

## 🛠️ Technology Stack

| Technology | Purpose | Implementation Details |
|------------|---------|----------------------|
| ![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) | **Frontend Structure** | Semantic HTML for responsive restaurant interface |
| ![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) | **Styling & Design** | Custom CSS with modern layouts and animations |
| ![Flask](https://img.shields.io/badge/Flask-000000?style=flat&logo=flask&logoColor=white) | **Backend Framework** | Python web framework for API development and routing |
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white) | **Database** | NoSQL database for flexible document storage and real-time data |
| ![Gemini](https://img.shields.io/badge/Gemini_AI-4285F4?style=flat&logo=google&logoColor=white) | **AI Integration** | Google's Gemini API for intelligent chatbot responses |
| ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black) | **Frontend Framework** | Component-based UI development |
| ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white) | **Backend Services** | Authentication and edge functions |

## 📋 API Endpoints Reference

### 🔐 Authentication
```
POST /api/auth/login        - Admin login with session management
POST /api/auth/logout       - Admin logout and session cleanup
GET  /api/auth/verify       - JWT token verification
```

### 🍽️ Reservations (Flask + MongoDB)
```
POST /api/reservations      - Create new reservation in MongoDB
GET  /api/reservations      - Fetch all reservations from database
PUT  /api/reservations/{id} - Update reservation status
DELETE /api/reservations/{id} - Cancel reservation (soft delete)
```

### 📖 Menu Management (Flask + MongoDB)
```
GET    /api/menu           - Retrieve all menu items from MongoDB
POST   /api/menu           - Add new menu item to database
PUT    /api/menu/{id}      - Update menu item in MongoDB
DELETE /api/menu/{id}      - Remove menu item from database
```

### 🤖 AI Services (Gemini API Integration)
```
POST /api/ai-chat          - Process user query with Gemini API
GET  /api/chat-logs        - Retrieve chat history from MongoDB
POST /api/recommendations  - Get AI-powered food recommendations
GET  /api/navigation       - Handle chatbot page navigation
```

### 📊 Analytics & Reports
```
GET /api/analytics         - Generate restaurant analytics from MongoDB
GET /api/reports/daily     - Daily reports with database aggregation
GET /api/reports/monthly   - Monthly performance reports
```

## 🗄️ Database Schema (MongoDB Collections)

### Reservations Collection
```json
{
  "_id": "ObjectId",
  "full_name": "string",
  "email": "string", 
  "phone": "string",
  "num_people": "number",
  "arrival_date": "date",
  "arrival_time": "time",
  "table_number": "string",
  "status": "confirmed|pending|cancelled",
  "total_amount": "number",
  "purpose": "string",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### Menu Items Collection
```json
{
  "_id": "ObjectId",
  "name": "string",
  "category": "string",
  "price": "number",
  "offer_price": "number",
  "rating": "number",
  "is_veg": "boolean",
  "quantity": "string",
  "orders_placed": "number",
  "created_at": "datetime"
}
```

### Chat Logs Collection (AI Integration)
```json
{
  "_id": "ObjectId",
  "user_query": "string",
  "ai_response": "string",
  "intent_detected": "string",
  "navigation_triggered": "string",
  "session_id": "string",
  "timestamp": "datetime",
  "response_time": "number"
}
```

### Users Collection
```json
{
  "_id": "ObjectId",
  "username": "string",
  "password": "string (hashed)",
  "role": "admin|customer",
  "email": "string",
  "created_at": "datetime"
}
```

## 🚀 Installation & Setup

### Prerequisites
- Python 3.8+
- MongoDB 4.4+
- Node.js 16+
- Gemini API Key

### Quick Start
```bash
# Clone repository
git clone <repository-url>
cd dine24-restaurant

# Backend Setup (Flask)
cd flask_backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Frontend Setup
cd ../
npm install

# Environment Configuration
export FLASK_ENV=development
export MONGODB_URI=mongodb://localhost:27017/dine24
export SECRET_KEY=your-secret-key
export GEMINI_API_KEY=your-gemini-api-key

# Run Flask Backend
cd flask_backend && python app.py

# Run Frontend (separate terminal)
npm run dev
```

## 🔧 Configuration

### Environment Variables
```bash
# Flask Backend
FLASK_ENV=development
SECRET_KEY=your-super-secret-key
MONGODB_URI=mongodb://localhost:27017/dine24
GEMINI_API_KEY=your-gemini-api-key

# Frontend
VITE_API_URL=http://localhost:5000
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-key
```

### Production Deployment
```bash
# Flask Backend with Gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app

# Frontend Build
npm run build

# MongoDB Production Setup
mongod --dbpath /var/lib/mongodb --logpath /var/log/mongodb.log
```

## 🤖 AI Chatbot Technical Implementation

### Gemini API Integration
```python
# Flask route for AI chat processing
@app.route('/api/ai-chat', methods=['POST'])
def ai_chat():
    user_message = request.json.get('message')
    
    # Fetch context from MongoDB
    menu_items = db.menu_items.find()
    context = build_menu_context(menu_items)
    
    # Process with Gemini API
    response = gemini_client.generate_content(
        prompt=f"Context: {context}\nUser: {user_message}"
    )
    
    # Determine navigation
    navigation = detect_navigation_intent(user_message)
    
    # Store chat log
    db.chat_logs.insert_one({
        'user_query': user_message,
        'ai_response': response.text,
        'navigation_triggered': navigation,
        'timestamp': datetime.now()
    })
    
    return jsonify({
        'response': response.text,
        'navigation': navigation
    })
```

### Page Navigation Logic
```javascript
// Frontend navigation handler
const handleChatResponse = (response) => {
  if (response.navigation) {
    setTimeout(() => {
      navigate(response.navigation);
      toast.success(`Navigated to ${response.navigation}`);
    }, 1000);
  }
};
```

## 📊 System Monitoring

### Health Check
```bash
GET /api/health
```
Response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-20T10:30:00",
  "version": "1.0.0",
  "database": "connected",
  "ai_service": "active",
  "developer": "MAMIDALA BHAVYA REDDY"
}
```

### Performance Metrics
- **Database Response Time**: MongoDB query optimization
- **AI Response Time**: Gemini API latency monitoring
- **User Engagement**: Chat interaction analytics
- **Navigation Success**: Page redirection tracking

## 🔒 Security Features

- **Flask Security**: Secure session management and CSRF protection
- **MongoDB Security**: Database authentication and access control
- **API Security**: Rate limiting and input validation
- **AI Safety**: Content filtering and response monitoring

## 🧪 Testing

### Backend Testing (Flask)
```bash
# Unit tests for Flask routes
python -m pytest tests/test_routes.py

# Database integration tests
python -m pytest tests/test_database.py

# AI integration tests
python -m pytest tests/test_ai_chat.py
```

### Frontend Testing
```bash
# Component tests
npm run test

# E2E tests for chatbot
npm run test:e2e
```

## 📈 Performance Optimization

### Database Optimization (MongoDB)
- **Indexing Strategy**: Optimized indexes for menu queries and reservations
- **Aggregation Pipelines**: Efficient data processing for analytics
- **Connection Pooling**: Optimized database connections

### AI Response Optimization
- **Context Caching**: Cache menu data for faster AI responses
- **Response Streaming**: Real-time chat experience
- **Intent Recognition**: Quick navigation detection

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch (`git checkout -b feature/new-feature`)
3. Test Flask backend and MongoDB integration
4. Verify AI chatbot functionality
5. Submit Pull Request with comprehensive testing

### Code Standards
- Follow PEP 8 for Python (Flask backend)
- Use ESLint for JavaScript/React frontend
- MongoDB query optimization
- AI response testing and validation

## 📝 Project Goals & Achievements

This DINE24 system demonstrates:
- **Full-stack Development**: Seamless integration of HTML/CSS frontend with Flask backend
- **Database Management**: Efficient MongoDB operations for restaurant data
- **AI Integration**: Real-time chatbot using Gemini API for enhanced user experience
- **User Experience**: Intuitive navigation and responsive design
- **Business Logic**: Complete restaurant management workflow

## 👨‍💻 Developer Information

**Name:** MAMIDALA BHAVYA REDDY  
**Role:** Full Stack Developer  
**Specialization:** Python Flask Development, MongoDB Database Design, AI Integration  
**Project:** DINE24 Restaurant Management System  

### Key Contributions:
- Designed and implemented Flask backend with RESTful API architecture
- Integrated MongoDB for efficient data storage and retrieval
- Developed AI-powered chatbot using Gemini API for customer support
- Created responsive frontend with HTML/CSS and React components
- Implemented real-time table reservation system with database synchronization

---

**Version:** 1.0.0  
**Last Updated:** January 2024  
**Maintained by:** MAMIDALA BHAVYA REDDY

### 🎯 Technical Highlights
- **Real-time AI Chat**: Gemini API integration for intelligent customer support
- **Database Sync**: MongoDB collections synchronized with Flask backend
- **Navigation Intelligence**: Context-aware page routing based on user queries
- **Responsive Design**: Mobile-first approach with modern CSS techniques
- **Performance Optimized**: Efficient database queries and AI response caching
