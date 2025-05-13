from database import get_db_connection, close_db_connection
import models as m

def main():
    val = m.filtrar_productos(None,3,None)
    if val:
        print("Proceso exitoso",val)
    else:
        print("No se pudo")
if __name__ == "__main__":
    main()
