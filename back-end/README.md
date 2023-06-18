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

![image](https://github.com/NataliaAlvarezIspc/proyecto-ispc-ecommerce/assets/15602473/e47d6743-ab33-4691-a01c-fc704cb6ab31)

## Sin entorno virtual, o corriendo con entorno virtual

Instalar las dependencias del sistema (mysqlclient, django, pytest, etc) desde el directorio _back-end_:
```
python -m pip install -r requirements.txt
```

ó
```
pip install -r requirements.txt
```

![image](https://github.com/NataliaAlvarezIspc/proyecto-ispc-ecommerce/assets/15602473/c6a06e49-58ab-44f0-8591-d1209a598187)

## Configuración de base de datos

Una vez que todas fueron instaladas correctamente, editar el archivo en _django/settings.py_ con los datos de conexión a la base MySQL.

![image](https://github.com/NataliaAlvarezIspc/proyecto-ispc-ecommerce/assets/15602473/09ffc92b-7b0a-4d52-a43a-0860b0cd6e21)

Luego crear una base de datos vacía con el nombre seleccionado utilizando el cliente de MySQL o Workbench.

![image](https://github.com/NataliaAlvarezIspc/proyecto-ispc-ecommerce/assets/15602473/85756bdd-0c87-4c54-8eac-1728cfb8b6fb)

## Crear tablas para la aplicación

Desde el directorio _django_ verificar que todas las migraciones estén hechas utilizando el comando _python manage.py makemigrations_:

![image](https://github.com/NataliaAlvarezIspc/proyecto-ispc-ecommerce/assets/15602473/95d2e0b1-bdd3-41e8-9246-aea9d312de0c)

Y aplicar las migraciones a la base de datos creada utilizando el comando _python manage.py migrate_:

![image](https://github.com/NataliaAlvarezIspc/proyecto-ispc-ecommerce/assets/15602473/c8e38177-c93e-4231-b646-adc7517222ce)

## Crear cuenta de super usuario

Utilizar el comando _python manage.py createsuperuser_ para crear el super usuario:

![image](https://github.com/NataliaAlvarezIspc/proyecto-ispc-ecommerce/assets/15602473/a29086d2-b200-426a-b482-b83a563cdac5)

## Ejecución del servidor

Utilizar el comando _python manager.py runserver_ para ejecutar el servidor Django:

![image](https://github.com/NataliaAlvarezIspc/proyecto-ispc-ecommerce/assets/15602473/03c5d569-2449-4b1b-9827-543d6c0174ea)

Abrir el navegador en la url indicada, http://127.0.0.1:8000/admin para llegar a la página de inicio del administrador, e ingresar con el usuario y clave creados en el paso anterior.

![image](https://github.com/NataliaAlvarezIspc/proyecto-ispc-ecommerce/assets/15602473/5f51b812-00e2-4979-86a9-7d0d7d8d4920)

Al ingresar encontraremos la pantalla de _Django administration_ desde la cual es posible crear elementos para cada una de las tablas.

![image](https://github.com/NataliaAlvarezIspc/proyecto-ispc-ecommerce/assets/15602473/8dfecb51-bbd5-484e-bc0e-797ea95963d8)

## Configuración de correo electrónico

El formulario de contacto envía por correo electrónico los mensajes de los usuarios y los invitados como así también para recuperar la clave. Para ello debe configurar una cuenta SMTP de correo.

### Para usar con Gmail
Google Mail utiliza una clave especial para las aplicaciones, para ello se deben seguir los siguientes pasos:
1. Ir a la [página de la cuenta](https://myaccount.google.com/?pli=1) en Google.
1. Seleccionar "Security" entre las opciones de la izquierda.
1. Seleccionar "2-Step Verification", tal vez sea necesario ingresar la clave de correo.
1. En la parte inferior de la página seleccionar "App passwords".
1. Elegir "Other" y colocar "Enbalde" y presionar el botón Generate. Escribir la clave.
1. Editar en django/server/settings.py en TU_EMAIL colocar el correo electrónico de Google que se haya usado y en ACA_COLOCAR_HASH colocar la clave que anotamos en el punto anterior (los espacios no van).

El servidor debería ya estar configurado para enviar correo a través de Google Mail.

## Servicios provistos por el servidor

El back-end en Django provee los siguientes entry points:

- http://127.0.0.1:8000/api/usuarios : Manejo de usuarios
- http://127.0.0.1:8000/api/usuarios_admin : Creación de usuarios administrador
- http://127.0.0.1:8000/api/articulos : Manejo de artículos
- http://127.0.0.1:8000/api/tipo_articulos : Manejo de tipo de artículos
- http://127.0.0.1:8000/api/ofertas : Manejo de ofertas
- http://127.0.0.1:8000/api/envios : Manejo de envíos
- http://127.0.0.1:8000/api/carritos : Manejo del carrito de compras
- http://127.0.0.1:8000/api/compras : Listado de compras
- http://127.0.0.1:8000/api/ventas : Manejo de ventas
- http://127.0.0.1:8000/api/auth/login : Autenticación en el sistema
- http://127.0.0.1:8000/api/auth/logout : Autenticación en el sistema
- http://127.0.0.1:8000/api/auth/signup : Registración en el sistema
- http://127.0.0.1:8000/api/auth/password_reset : Recuperación de clave

## Alternativa: Script de inicialización de base de datos

**Alternativamente** se provee un script llamado _startup.sql_ dentro del directorio _back-end_ para crear la base de datos, las tablas y colocar algunos valores por defecto. Para utilizarlo hay ingresar hasta dicho directorio con línea de comando, asegurarse que se tiene al MySQL monitor o shell en el PATH de sistema, luego ejecutar _mysql -u <usuario> -p_ para que pregunte la clave para poder ingresar a la consola de MySQL y desde ahí ejecutar primero _drop database enbalde;_ (o el nombre que se haya elegido para la base de datos en el archivo dentro de _django/server/settings.py_) para borrar la base de datos existente y luego ejecutar el script con el comando _\\. startup.sql_ (barra invertida, punto, espacio, _startup.sql_)

El script creará dos usuarios, uno con nombre de usuario _admin_ y clave _123456_ que tendrá privilegios de administrador y uno con nombre de usuario _roberto_ y clave _123456_.

![image](https://github.com/NataliaAlvarezIspc/proyecto-ispc-ecommerce/assets/15602473/548f4ceb-06bf-47d0-977d-b19ab9ec7b95)

Es posible ejecutar el script _startup.sql_ directamente desde _MySQL Workbench_ o _phpMyAdmin_, sin embargo dichas instrucciones quedan por fuera del alcance de este documento.
