from database import get_db_connection, close_db_connection


def llamar_insertar_item(id_tipo_item: int, nombre: str, stock_minimo: int) -> bool:
    """
    Llama a la función insertar_item en PostgreSQL de forma segura.
    Retorna el ID del item insertado o -1 si ocurre un error.
    """
    query = "SELECT insertar_item(%s, %s, %s);"
    conn = get_db_connection()

    if not conn:
        return False

    try:
        with conn:
            with conn.cursor() as cur:
                cur.execute(query, (id_tipo_item, nombre, stock_minimo))
                result = cur.fetchone()
                return True if result else False

    except Exception as e:

        return False
    finally:
        close_db_connection(conn)


def actualizar_item(item_id: int, id_nuevo_tipo: int, nombre: str, stock_minimo: int) -> bool:
    """Actualiza un item existente."""
    query = "SELECT modificar_item(%s, %s, %s,%s);"
    conn = get_db_connection()
    if conn:
        try:
            with conn.cursor() as cur:
                cur.execute(query, (item_id, id_nuevo_tipo, nombre, stock_minimo))
                val = cur.fetchall()
                conn.commit()
                if val[0] == 1:
                    return True
                else:
                    return False
        except Exception as e:
            print(f"Error al actualizar item: {e}")
            conn.rollback()
            return False
        finally:
            close_db_connection(conn)
    return False


def eliminar_item(item_id: int) -> bool:
    """Elimina un item por su ID."""
    query = "SELECT eliminar_item(%s);"
    conn = get_db_connection()
    if conn:
        try:
            with conn.cursor() as cur:
                cur.execute(query, (item_id,))
                val = cur.fetchall()
                conn.commit()
                if val[0] == 1:
                    return True
                else:
                    return False
        except Exception as e:
            return False
        finally:
            conn.close()
    return False


def obtener_items():
    """
    Obtiene todos los registros de la vista 'vista_inventario'.
    """
    query = "SELECT * FROM vista_inventario;"
    conn = get_db_connection()

    if not conn:
        return []

    try:
        with conn.cursor() as cur:
            cur.execute(query)
            items = cur.fetchall()
            return items

    except Exception as e:
        return []

    finally:
        conn.close()



