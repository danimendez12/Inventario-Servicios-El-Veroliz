import bcrypt

# Función para generar el hash de la contraseña
def hash_password(password: str) -> str:
    # Generar un "salt" (sal) aleatorio
    salt = bcrypt.gensalt()
    # Generar el hash de la contraseña con el salt
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')

# Ejemplo de uso
password = "Almebra0406"
hashed_password = hash_password(password)
print("Contraseña Hasheada:", hashed_password)



import psycopg2

DATABASE_URL = 'postgresql://admin:Uj7Wf6xFxM0cPgQkzl48bUDLlvbLt9hR@dpg-d0dt3949c44c73frmvq0-a.oregon-postgres.render.com/database_1wi1'

# Función para conectar con PostgreSQL
def conectar_db():
    conn = psycopg2.connect(DATABASE_URL, sslmode='require')  # 'sslmode=require' es para conexiones seguras
    return conn

# Función para guardar el usuario con la contraseña hasheada
def guardar_usuario(username: str, hashed_password: str):
    conn = conectar_db()
    cursor = conn.cursor()
    tipo = 2
    # Insertar el usuario y la contraseña hasheada en la base de datos
    cursor.execute(
        "INSERT INTO usuario (id_tipo_usuario,nombre, contraseña) VALUES (2,%s, %s)",
        (username, hashed_password)
    )
    conn.commit()
    cursor.close()
    conn.close()

def obtener_contraseña(id_usuario: int):
    conn = conectar_db()
    cursor = conn.cursor()

    # Ejecutar la consulta para obtener la contraseña
    cursor.execute("SELECT contraseña FROM usuario WHERE id = %s", (id_usuario,))

    # Obtener el resultado de la consulta
    resultado = cursor.fetchone()

    # Si se encuentra un resultado
    if resultado:
        hashed_password = resultado[0]
        cursor.close()
        conn.close()
        return hashed_password
    else:
        print("Usuario no encontrado.")
        cursor.close()
        conn.close()
        return None




def verificar_password(ingresada: str, stored_hashed_password: str) -> bool:
    if stored_hashed_password:  # Asegúrate de que el hash no sea None
        return bcrypt.checkpw(ingresada.encode('utf-8'), stored_hashed_password.encode('utf-8'))
    else:
        return False

