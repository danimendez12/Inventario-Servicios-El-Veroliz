from flask import Flask, request, jsonify
from flask_cors import CORS
from database import get_db_connection, close_db_connection

app = Flask(__name__)
CORS(app)  # esto es lo que peticiones desde el frontend

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    conn = get_db_connection()
    if not conn:
        return jsonify({'success': False, 'message': 'Error de conexión'}), 500

    try:
        cur = conn.cursor()
        cur.execute("SELECT contraseña FROM usuario WHERE nombre = %s", (username,))
        result = cur.fetchone()
        cur.close()
        if result and result[0] == password:
            return jsonify({'success': True})
        else:
            return jsonify({'success': False, 'message': 'Credenciales incorrectas'}), 401
    finally:
        close_db_connection(conn)

@app.route('/api/inventario', methods=['GET'])
def obtener_inventario():
    conn = get_db_connection()
    if not conn:
        return jsonify({'success': False, 'message': 'Error de conexión'}), 500
    try:
        cur = conn.cursor()
        cur.execute('SELECT * FROM obtener_inventario_completo(NULL);')
        columnas = [desc[0] for desc in cur.description]
        datos = cur.fetchall()
        inventario = []
        for fila in datos:
            item = dict(zip(columnas, fila))
            # Determinar estado según cantidad
            cantidad = item.get('cantidad', 0)
            try:
                cantidad_num = int(cantidad)
            except (ValueError, TypeError):
                cantidad_num = 0
            if cantidad_num == 0:
                item['estado'] = 'Vacío'
            elif cantidad_num < 10:
                item['estado'] = 'Bajo'
            else:
                item['estado'] = 'En stock'
            inventario.append(item)
        cur.close()
        return jsonify({'success': True, 'inventario': inventario})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})
    finally:
        close_db_connection(conn)

if __name__ == '__main__':
    app.run(debug=True)
