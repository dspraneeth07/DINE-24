
"""
DINE24 Restaurant Management System - Flask Backend
Mock implementation for resume showcase
"""

from flask import Flask, request, jsonify, session
from flask_cors import CORS
from datetime import datetime, timedelta
import os
from werkzeug.security import generate_password_hash, check_password_hash
import jwt

# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dine24-secret-key-2024')
CORS(app)

# Mock database connection (would be MongoDB in production)
class MockDatabase:
    def __init__(self):
        # Mock collections
        self.reservations = []
        self.menu_items = []
        self.users = []
        self.chat_logs = []
        
    def find_one(self, collection, query):
        """Mock find_one operation"""
        if collection == 'reservations':
            for item in self.reservations:
                if all(item.get(k) == v for k, v in query.items()):
                    return item
        elif collection == 'menu_items':
            for item in self.menu_items:
                if all(item.get(k) == v for k, v in query.items()):
                    return item
        return None
        
    def insert_one(self, collection, data):
        """Mock insert_one operation"""
        data['_id'] = len(getattr(self, collection)) + 1
        data['created_at'] = datetime.utcnow()
        getattr(self, collection).append(data)
        return {'inserted_id': data['_id']}

# Initialize mock database
db = MockDatabase()

# Authentication decorator
def token_required(f):
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(' ')[1]
        
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = data['user_id']
        except:
            return jsonify({'message': 'Token is invalid!'}), 401
        
        return f(current_user, *args, **kwargs)
    
    decorated.__name__ = f.__name__
    return decorated

# API Routes

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'DINE24 Flask Backend is running',
        'timestamp': datetime.utcnow().isoformat()
    })

@app.route('/api/auth/login', methods=['POST'])
def admin_login():
    """Admin login endpoint"""
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    # Mock admin credentials
    if username == 'admin' and password == 'admin123':
        token = jwt.encode({
            'user_id': 'admin',
            'exp': datetime.utcnow() + timedelta(hours=24)
        }, app.config['SECRET_KEY'])
        
        return jsonify({
            'success': True,
            'token': token,
            'user': {'id': 'admin', 'username': 'admin', 'role': 'admin'}
        })
    
    return jsonify({'success': False, 'message': 'Invalid credentials'}), 401

@app.route('/api/reservations', methods=['POST'])
def create_reservation():
    """Create new table reservation"""
    try:
        data = request.get_json()
        
        # Validation
        required_fields = ['full_name', 'email', 'phone', 'num_people', 'arrival_date', 'arrival_time']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Create reservation object
        reservation = {
            'full_name': data['full_name'],
            'email': data['email'],
            'phone': data['phone'],
            'num_people': int(data['num_people']),
            'arrival_date': data['arrival_date'],
            'arrival_time': data['arrival_time'],
            'purpose': data.get('purpose', 'dining'),
            'table_number': data.get('table_number'),
            'status': 'confirmed',
            'total_amount': data.get('total_amount', 0),
            'order_items': data.get('order_items', [])
        }
        
        # Insert into database
        result = db.insert_one('reservations', reservation)
        reservation['id'] = result['inserted_id']
        
        return jsonify({
            'success': True,
            'message': 'Reservation created successfully',
            'reservation': reservation
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/reservations', methods=['GET'])
@token_required
def get_reservations(current_user):
    """Get all reservations (Admin only)"""
    return jsonify({
        'success': True,
        'reservations': db.reservations
    })

@app.route('/api/menu', methods=['GET'])
def get_menu():
    """Get restaurant menu items"""
    return jsonify({
        'success': True,
        'menu_items': db.menu_items
    })

@app.route('/api/menu', methods=['POST'])
@token_required
def add_menu_item(current_user):
    """Add new menu item (Admin only)"""
    try:
        data = request.get_json()
        
        # Validation
        required_fields = ['name', 'category', 'price', 'quantity']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        menu_item = {
            'name': data['name'],
            'category': data['category'],
            'price': float(data['price']),
            'offer_price': data.get('offer_price'),
            'quantity': data['quantity'],
            'rating': data.get('rating', 0),
            'is_veg': data.get('is_veg', True),
            'orders_placed': 0
        }
        
        result = db.insert_one('menu_items', menu_item)
        menu_item['id'] = result['inserted_id']
        
        return jsonify({
            'success': True,
            'message': 'Menu item added successfully',
            'menu_item': menu_item
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/ai-chat', methods=['POST'])
def ai_chat():
    """AI Chatbot endpoint for food recommendations and support"""
    try:
        data = request.get_json()
        message = data.get('message', '').lower()
        
        # Simple rule-based responses for demo
        responses = {
            'menu': 'Our popular dishes include Butter Chicken, Paneer Tikka, and Biryani. Would you like to know about any specific category?',
            'recommend': 'Based on your preferences, I recommend our Chef\'s Special Biryani and Chocolate Lava Cake for dessert!',
            'price': 'Our dishes range from ₹150-₹800. Most popular items are between ₹300-₹500.',
            'veg': 'We have excellent vegetarian options including Paneer Makhani, Dal Tadka, and Veg Biryani!',
            'table': 'We have tables for 2, 4, 6, and 8 people. Would you like me to check availability?',
            'timing': 'We are open from 11:00 AM to 11:00 PM daily. Kitchen closes at 10:30 PM.',
            'default': 'I\'m here to help with menu recommendations, reservations, and any questions about DINE24! How can I assist you?'
        }
        
        # Simple keyword matching
        response_text = responses['default']
        for keyword, response in responses.items():
            if keyword in message:
                response_text = response
                break
        
        # Log chat interaction
        chat_log = {
            'user_message': data.get('message'),
            'bot_response': response_text,
            'timestamp': datetime.utcnow()
        }
        db.chat_logs.append(chat_log)
        
        return jsonify({
            'success': True,
            'response': response_text
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/send-email', methods=['POST'])
def send_confirmation_email():
    """Send reservation confirmation email"""
    try:
        data = request.get_json()
        
        # Mock email sending (would integrate with email service)
        email_data = {
            'to': data.get('to'),
            'subject': data.get('subject'),
            'template': 'reservation_confirmation',
            'data': data.get('reservation_data'),
            'sent_at': datetime.utcnow()
        }
        
        # Log email (in production, would send actual email)
        print(f"Email sent to {email_data['to']}: {email_data['subject']}")
        
        return jsonify({
            'success': True,
            'message': 'Confirmation email sent successfully'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/analytics', methods=['GET'])
@token_required
def get_analytics(current_user):
    """Get restaurant analytics (Admin only)"""
    return jsonify({
        'success': True,
        'analytics': {
            'total_reservations': len(db.reservations),
            'total_menu_items': len(db.menu_items),
            'total_revenue': sum(r.get('total_amount', 0) for r in db.reservations),
            'popular_dishes': ['Biryani', 'Butter Chicken', 'Paneer Tikka'],
            'peak_hours': ['7:00 PM - 9:00 PM'],
            'customer_satisfaction': 4.5
        }
    })

if __name__ == '__main__':
    # Add some sample data
    sample_menu = [
        {
            'name': 'Butter Chicken',
            'category': 'Main Course',
            'price': 450,
            'quantity': '1 plate',
            'rating': 4.5,
            'is_veg': False,
            'orders_placed': 45
        },
        {
            'name': 'Paneer Tikka',
            'category': 'Appetizers',
            'price': 320,
            'quantity': '6 pieces',
            'rating': 4.3,
            'is_veg': True,
            'orders_placed': 32
        }
    ]
    
    for item in sample_menu:
        db.insert_one('menu_items', item)
    
    print("🍽️ DINE24 Flask Backend Server Starting...")
    print("📊 API Endpoints:")
    print("   - POST /api/auth/login")
    print("   - POST /api/reservations")
    print("   - GET  /api/reservations")
    print("   - GET  /api/menu")
    print("   - POST /api/menu")
    print("   - POST /api/ai-chat")
    print("   - POST /api/send-email")
    print("   - GET  /api/analytics")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
