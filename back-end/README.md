# Instalación de back-end

## Con entorno virtual

Crear un entorno virtual utilizando el comando
```
python -m venv x
```

El comando genera un entorno virtual dentro del directorio _x_.

En algunos sistemas (por ejemplo Linux Ubuntu) es _python3_ en lugar de _python_. La versión mínima a utilizar es 3.9. En otros sistemas como las variantes de SUSE python3 es **Python 3.6** por lo que hay que instalar primero una versión más moderna, por ejemplo con _sudo zypper install python310-base_ y luego utilizar _python3.10_ en lugar de _python3_.

Para activar el entorno virtual hay que ejecutar el script activate. El script se encuentra dentro del directorio x\scripts en distribuciones Windows:
```
x\Scripts\activate
```

o dentro de x/bin en distribuciones Linux:
```
source x/bin/activate
```

Si se ejecuta correctamente el prompt de sistema cambiará para tener _(x)_ al principio, esto indica que se está ejecutando en un entorno virtual. Para desactivar el entorno virtual hay que ejecutar el comando _deactivate_.

## Sin entorno virtual, o corriendo con entorno virtual

Instalar las dependencias del sistema (mysqlclient, django, pytest, etc) desde el directorio _back-end_:
```
python -m pip install -r requirements.txt
```

ó
```
pip install -r requirements.txt
```
