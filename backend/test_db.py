from database import get_db_connection, close_db_connection

# Conectar a la base de datos
def main():
    conn = get_db_connection()
    if conn is None:
        print("No se pudo conectar a la base de datos.")
        return
    try:
        cur = conn.cursor()
        # Consultar los datos de la tabla usuario
        cur.execute("SELECT * FROM usuario;")
        usuarios = cur.fetchall()
        print("Usuarios en la base de datos:")
        for usuario in usuarios:
            print(usuario)
        cur.close()
    except Exception as e:
        print(f"Error al consultar la base de datos: {e}")
    finally:
        close_db_connection(conn)

if __name__ == "__main__":
    main()

