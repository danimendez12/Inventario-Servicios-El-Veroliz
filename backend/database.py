import os
import psycopg2
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Configuración de la base de datos
DB_URL = os.getenv("DATABASE_URL")


def get_db_connection():
    """Establece la conexión a la base de datos."""
    try:
        conn = psycopg2.connect(DB_URL, sslmode='require')  # 'sslmode=require' es para conexiones seguras
        print("Conexión a la base de datos establecida correctamente.")
        return conn
    except psycopg2.Error as e:
        print(f"Error al conectar a la base de datos: {e}")
        return None

def close_db_connection(conn):
    """Cierra la conexión a la base de datos."""
    if conn:
        conn.close()
