## Ejecución de pruebas unitarias

Las pruebas unitarias pueden ejecutarse utilizando el comando _python manage.py test --settings=server.test_settings_ (que utilizará una base de datos SQLite en memoria). No especificar el settings de prueba puede hacer que las pruebas tarden mucho tiempo o incluso arruinar los datos en una base MySQL.

![image](https://github.com/NataliaAlvarezIspc/proyecto-ispc-ecommerce/assets/15602473/b6019ac5-90a8-47c3-bbde-23c8156bb5cc)

## Ejecución del servidor

Utilizar el comando _python manager.py runserver_ para ejecutar el servidor Django:

![image](https://github.com/NataliaAlvarezIspc/proyecto-ispc-ecommerce/assets/15602473/03c5d569-2449-4b1b-9827-543d6c0174ea)

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