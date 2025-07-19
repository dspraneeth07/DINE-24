
# DINE24 Restaurant Management System - Backend

## Overview
Flask-based backend API for DINE24 restaurant management system with MongoDB database integration and AI-powered chatbot functionality.

## Features
- **Table Reservation System**: Complete booking and management
- **Menu Management**: CRUD operations for restaurant menu
- **AI Chatbot**: Intelligent customer support and recommendations
- **Admin Dashboard**: Analytics and management interface  
- **Email Notifications**: Automated confirmation emails
- **Payment Integration**: Razorpay/Stripe integration
- **Real-time Analytics**: Business insights and reporting

## Tech Stack
- **Backend**: Flask (Python)
- **Database**: MongoDB
- **AI/ML**: OpenAI GPT, LangChain
- **Authentication**: JWT tokens
- **Caching**: Redis
- **Email**: SMTP/Flask-Mail
- **Deployment**: Gunicorn + Nginx

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout

### Reservations
- `POST /api/reservations` - Create new reservation
- `GET /api/reservations` - Get all reservations (Admin)
- `PUT /api/reservations/{id}` - Update reservation status
- `DELETE /api/reservations/{id}` - Cancel reservation

### Menu Management
- `GET /api/menu` - Get all menu items
- `POST /api/menu` - Add new menu item (Admin)
- `PUT /api/menu/{id}` - Update menu item (Admin)
- `DELETE /api/menu/{id}` - Delete menu item (Admin)

### AI Chatbot
- `POST /api/ai-chat` - Chat with AI assistant
- `GET /api/chat-logs` - Get chat history (Admin)

### Analytics
- `GET /api/analytics` - Get restaurant analytics (Admin)
- `GET /api/reports` - Generate reports (Admin)

## Installation & Setup

```bash
# Clone repository
git clone https://github.com/yourusername/dine24-backend.git
cd dine24-backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set environment variables
export FLASK_ENV=development
export MONGODB_URI=mongodb://localhost:27017/dine24
export SECRET_KEY=your-secret-key
export OPENAI_API_KEY=your-openai-key

# Run application
python app.py
```

## Database Schema

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
  "created_at": "datetime"
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
  "orders_placed": "number",
  "created_at": "datetime"
}
```

## Environment Variables
```
FLASK_ENV=development
SECRET_KEY=your-secret-key
MONGODB_URI=mongodb://localhost:27017/dine24
OPENAI_API_KEY=your-openai-api-key
MAIL_USERNAME=your-email
MAIL_PASSWORD=your-password
RAZORPAY_KEY_ID=your-razorpay-key
REDIS_URL=redis://localhost:6379
```

## Deployment
- **Production**: Gunicorn + Nginx
- **Cloud**: AWS EC2, Google Cloud, or DigitalOcean
- **Database**: MongoDB Atlas
- **Monitoring**: New Relic, DataDog

## Contributing
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch  
5. Create Pull Request

## License
MIT License - see LICENSE file for details
