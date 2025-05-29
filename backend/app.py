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
    print("entrandoooooo a obtener_inventario de app")
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
            
            # Mapear linea a texto
            if 'linea' in item:
                if item['linea'] == 1:
                    item['linea'] = 'Economica'
                elif item['linea'] == 2:
                    item['linea'] = 'Normal'
                elif item['linea'] == 3:
                    item['linea'] = 'Plus'
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

@app.route('/api/agregar_item', methods=['POST'])
def agregar_item():
    print("entrandoooooo a agregar_item de app")
    data = request.json
    producto = data.get('producto')
    categoria = data.get('categoria')
    hojas = data.get('hojas')
    cantidad = data.get('cantidad')
    linea = data.get('linea')
    minimo = data.get('minimo')

    conn = get_db_connection()

    if not conn:
        return jsonify({'success': False, 'message': 'Error de conexión'}), 500
    try:
        cur = conn.cursor()
        cur.execute("SELECT insertar_nuevo_item(%s, %s, %s, %s, %s, %s);", (producto, categoria, hojas, cantidad, linea, minimo))
        conn.commit()
        print("Resultado exitosooooo")
        cur.close()
        return jsonify({'success': True })
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})
    finally:
        close_db_connection(conn)

@app.route('/api/eliminar_item', methods=['DELETE'])
def eliminar_item():
    print("entrandoooooo a eliminar_item de app")
    print(request.json)
    data = request.json
    id_item = data.get('id')
    print(f"ID del item a eliminar: {id_item}")
    conn = get_db_connection()

    if not conn:
        return jsonify({'success': False, 'message': 'Error de conexión'}), 500
    try:
        cur = conn.cursor()
        cur.execute("SELECT eliminar_item(%s);", (id_item,))
        conn.commit()
        print("Borrado exitosooooo")
        cur.close()
        return jsonify({'success': True })
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})
    finally:
        close_db_connection(conn)

@app.route('/api/actualizar_item', methods=['PUT'])
def actualizar_item():
    print("entrandoooooo a actualizar_item de app")
    data = request.json
    objetivo = data.get('objetivo')
    producto = data.get('producto')
    categoria = data.get('categoria')
    hojas = data.get('hojas')
    cantidad = data.get('cantidad')
    linea = data.get('linea')
    minimo = data.get('minimo')

    conn = get_db_connection()

    if not conn:
        return jsonify({'success': False, 'message': 'Error de conexión'}), 500
    try:
        cur = conn.cursor()
        cur.execute("SELECT actualizar_item_existente(%s,%s, %s, %s, %s, %s, %s);", (objetivo, producto, categoria, hojas, cantidad, linea, minimo))
        conn.commit()
        print("Resultado exitosooooo")
        cur.close()
        return jsonify({'success': True })
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})
    finally:
        close_db_connection(conn)

@app.route('/api/agregar_existencia', methods=['POST'])
def agregar_existencia():
    data = request.json
    objetivo = data.get('objetivo')
    cantidad = data.get('cantidad')
    conn = get_db_connection()
   
    try:
        cur = conn.cursor()
        cur.execute("SELECT agregar_existencia(%s, %s);", (objetivo, cantidad))
        conn.commit()
        cur.close()
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})
    finally:
        close_db_connection(conn)

@app.route('/api/restar_existencia', methods=['POST'])
def restar_existencia():
    data = request.json
    objetivo = data.get('objetivo')
    cantidad = data.get('cantidad')
    conn = get_db_connection()
   
    try:
        cur = conn.cursor()
        cur.execute("SELECT restar_existencia(%s, %s);", (objetivo, cantidad))
        conn.commit()
        cur.close()
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})
    finally:
        close_db_connection(conn)


@app.route('/api/obtener_predicciones', methods=['GET'])
def obtener_predicciones():
    print("entrandoooooo a obtener_predicciones de app")
    conn = get_db_connection()
    if not conn:
        return jsonify({'success': False, 'message': 'Error de conexión'}), 500
    try:
        cur = conn.cursor()
        cur.execute('SELECT * FROM OBTENER_PREDICCIONES();')
        columnas = [desc[0] for desc in cur.description]
        datos = cur.fetchall()
        predicciones = []
        for fila in datos:
            item = dict(zip(columnas, fila))
            predicciones.append(item)
        cur.close()
        return jsonify({'success': True, 'predicciones': predicciones})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})
    finally:
        close_db_connection(conn)

@app.route('/api/obtener_ordenes', methods=['GET'])
def obtener_ordenes():
    print("entrandoooooo a obtener_ordenes de app")
    conn = get_db_connection()
    if not conn:
        return jsonify({'success': False, 'message': 'Error de conexión'}), 500
    try:
        cur = conn.cursor()
        cur.execute('SELECT * FROM VER_ORDENES();')
        columnas = [desc[0] for desc in cur.description]
        datos = cur.fetchall()
        ordenes = []
        for fila in datos:
            item = dict(zip(columnas, fila))
            ordenes.append(item)
        cur.close()
        return jsonify({'success': True, 'ordenes': ordenes})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})
    finally:
        close_db_connection(conn)


@app.route('/api/completar_orden', methods=['PUT'])
def completar_orden():
    print("entrandoooooo a completar_orden de app")
    print(request.json)
    data = request.json
    id_item = data.get('id')
    print(f"ID del item a eliminar: {id_item}")
    conn = get_db_connection()

    if not conn:
        return jsonify({'success': False, 'message': 'Error de conexión'}), 500
    try:
        cur = conn.cursor()
        cur.execute("SELECT completar_orden_compra(%s);", (id_item,))
        conn.commit()
        print("completado exitosooooo")
        cur.close()
        return jsonify({'success': True })
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})
    finally:
        close_db_connection(conn)


@app.route('/api/obtener_productos_orden', methods=['GET'])
def obtener_productos_orden():
    print("entrandoooooo a obtener_productos_orden de app")
    data = request.json
    id_item = data.get('id')
    print("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa", id_item)
    print(f"ID del item a eliminar: {id_item}")
    conn = get_db_connection()

    if not conn:
        return jsonify({'success': False, 'message': 'Error de conexión'}), 500
    try:
        cur = conn.cursor()
        cur.execute("SELECT ver_productos_orden(%s);", (id_item,))
        conn.commit()
        print("completado exitosooooo")
        cur.close()
        return jsonify({'success': True })
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})
    finally:
        close_db_connection(conn)
        
if __name__ == '__main__':
    app.run(debug=True)
