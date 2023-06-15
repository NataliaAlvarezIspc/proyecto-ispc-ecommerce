## EnbaldePago

Para instalar las dependencias ejecute:

- npm install

Para ejecutar el servidor de pago ejecutar:

- npm run start

El servidor escucha en el puerto 3000 y posee 2 entry point:

- http://localhost:3000/autorizacion
  Para pedir autorización para cobrar. Se le envía como dato un texto a mostrar al cliente y la cantidad que se quiere debitar y retorna el HTML a mostrar con la página de pago y un ticket asignado a la operación.

- http://localhost:3000/pago
  Para realizar el pago, se le envía lo que el usuario seleccionó y el ticket y si el usuario aceptó y el ticket concuerda retorna un mensaje a mostrar y un número de transacción a grabarse como comprobante de pago. En caso de que el usuario rechace pagar retorna un mensaje a mostrar y una transacción vacía.
