# backend/db.py

import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    return psycopg2.connect(
        host="localhost",
        database="dialyse_db",
        user="postgres",
        password="drakan",  # remplace ceci par ton vrai mot de passe PostgreSQL
        cursor_factory=RealDictCursor
    )
