from flask import Flask
from flask_cors import CORS
from routes.patients_routes import patients_bp  # Import uniquement ce dont tu as besoin
import psycopg2

app = Flask(__name__)
CORS(app)

# ✅ Enregistrement du blueprint sans redondance de /api
app.register_blueprint(patients_bp)

if __name__ == '__main__':
    app.run(debug=True)
