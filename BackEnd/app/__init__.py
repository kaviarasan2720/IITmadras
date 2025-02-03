# app/__init__.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from .routes import api

# Create db instance
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    # Enable CORS for all routes
    CORS(app)

    # Register the blueprint
    app.register_blueprint(api, url_prefix='/api')

    # Configure the app
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@localhost/admission_app'  # Update with your MySQL credentials
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['UPLOAD_FOLDER'] = 'uploads'
    app.config['PDF_FOLDER'] = 'generated_pdfs'
    app.config['ALLOWED_EXTENSIONS'] = {'pdf', 'jpeg', 'jpg', 'png'}

    # Initialize the database
    db.init_app(app)
    
    return app
