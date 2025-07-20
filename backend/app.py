from flask import Flask
from flask_cors import CORS
from backend.routes.patients_routes import patients_bp
import psycopg2

app = Flask(__name__)
CORS(app)

# ✅ Enregistrement du blueprint sans redondance de /api
app.register_blueprint(patients_bp)

if __name__ == '__main__':
    app.run(debug=True)
