from database import get_db_connection, close_db_connection

# Conectar a la base de datos
def main():
    conn = get_db_connection()
    if conn is None:
        print("No se pudo conectar a la base de datos.")
        return
    try:
        cur = conn.cursor()
        # Consultar las tablas existentes
        cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';")
        tables = cur.fetchall()
        print("Tablas en la base de datos:")
        for table in tables:
            print(f"- {table[0]}")
        cur.close()
    except Exception as e:
        print(f"Error al consultar la base de datos: {e}")
    finally:
        close_db_connection(conn)

if __name__ == "__main__":
    main()
