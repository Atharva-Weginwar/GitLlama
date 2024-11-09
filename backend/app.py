from flask import Flask
from flask_cors import CORS
from api_routes import api_routes

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes

# Register the blueprint
app.register_blueprint(api_routes, url_prefix='/api')

@app.route('/')
def home():
    return "Welcome to the GitHub Repository Analysis API!"

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)