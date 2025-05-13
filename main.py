from database import get_db_connection, close_db_connection
import models as m

def main():
    val = m.eliminar_item(358)
    if val:
        print("Proceso exitoso")
    else:
        print("No se pudo")
if __name__ == "__main__":
    main()
