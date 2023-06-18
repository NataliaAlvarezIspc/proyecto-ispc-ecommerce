[![contrib][contrib-img]][contrib-url]
[![commit][commit-img]][commit-url]
[![discuss][discuss-img]][discuss-url]
[![issues][issues-img]][issues-url]
[![Python package][pipeline-img]][pipeline-url]

# proyecto-ispc-ecommerce

## EnBalde - Heladería

Venta de productos cerrados de Heladería. El usuario tendrá la posibilidad, mediante un catálogo, de elegir helados por pote de diversos pesos. Habrá variedad de gustos. Cada pote será de sabores fijos. Una vez finalizada la elección la página lo dirigirá a la sección carrito en donde podrá agregar o quitar artículos, decidir la forma de abonar y si solicita delivery o retira en sucursal. Concluida la compra se emitirá un aviso de transacción efectuada y el administrador recibirá el aviso de la compra.

**[Notas aclaratorias:](https://github.com/NataliaAlvarezIspc/proyecto-ispc-ecommerce/wiki/Notas-aclaratorias)**

Decidimos crear un proyecto desde cero dado que el proyecto anterior era de una naturaleza muy distinta (ya que una de las condiciones para la selección era que fuese un proyecto poco común, no simplemente "un carrito de compras"). 
El proyecto anterior era un el sistema de subastas, en el cual la venta no era posible si no había una puja, la puja no era posible si no había un lote y un lote no era posible si no existía un artículo.  Para mantener la integridad del sistema, se decidió no agregar un e-commerce que permitiera ventas directas sin pujas. Agregar un e-commerce haría que existan ventas que romperían con esa regla fundamental de nuestro sistema, que existan ventas sin pujas, lo que habría requerido agregar una segunda tabla de ventas o código adicional para validar si la venta provenía de subasta o era directa. Esto hubiese complejizado el sistema, dejándolo muy difícil de testear. Debido al limitado tiempo con el que contamos para implementar la solución y para evitar complicaciones, se decidió que esta opción no era viable.

Link al repositorio anterior: [BidOn Subastas](https://github.com/rpgrca/proyecto-ispc-fullstack)

## Modo de uso

El proyecto posee tres partes:
- Una parte de front-end ubicada en el directorio _front-end/enbalde_ realizada en Typescript con el framework Angular que corre en el puerto 4200.
- Una parte de back-end ubicada en el directorio _back-end/django_ realizada en Python con el framework Django que corre en el puerto 8000.
- Un servicio de pago ubicado en el directorio _front-end/enbaldePago_ realizado en Javascript con el framework Node que corre en el puerto 3000.

Para poder instalar y ejecutar el sitio web es necesario seguir las instrucciones indicadas en los archivos README.md de cada uno de estos directorios. Simplificando:
- Ingresar al directorio _front-end/enbalde_, ejecutar _npm install_ para instalar las dependencias y luego _ng serve_ para levantar el servidor de Angular.
- Ingresar al directorio _front-end/enbaldePago_, ejecutar _npm install_ para instalar las dependencias y luego _npm start_ para levantar el servidor de pago.
- Ingresar al directorio _back-end/django_, ejecutar _pip install -r requirements.txt_ para instalar las dependencias, crear la base de datos en MySQL, configurar la cuenta en _back-end/django/server/settings.py_, correr las migraciones y finalmente ejecutar _python manage.py runserver_ para levantar el servidor de back-end.

Luego es posible utilizar el sitio navegando a http://localhost:4200.

Para instrucciones más precisas leer los archivos README de cada directorio.

## Documentación

* [IEEE830](https://github.com/NataliaAlvarezIspc/proyecto-ispc-ecommerce/wiki/IEEE830)
* [Diagrama de casos de uso](https://github.com/NataliaAlvarezIspc/proyecto-ispc-ecommerce/wiki/Diagrama-de-Casos-de-Uso)
* [Diagrama de clases](https://github.com/NataliaAlvarezIspc/proyecto-ispc-ecommerce/wiki/Diagrama-de-clases)
* [Diagrama Entidad Relación](https://github.com/NataliaAlvarezIspc/proyecto-ispc-ecommerce/wiki/Diagrama-Entidad-Relaci%C3%B3n)
* [Diagrama Relacional](https://github.com/NataliaAlvarezIspc/proyecto-ispc-ecommerce/wiki/Diagrama-Relacional)
* [Mapa del sitio](https://github.com/NataliaAlvarezIspc/proyecto-ispc-ecommerce/wiki/Mapa-del-sitio)
* [Daily](https://github.com/NataliaAlvarezIspc/proyecto-ispc-ecommerce/discussions)
* [Planning, Review, Retrospective](https://github.com/NataliaAlvarezIspc/proyecto-ispc-ecommerce/wiki/Planning----Retrospective----Review)
* [Novedades del Grupo](https://github.com/NataliaAlvarezIspc/proyecto-ispc-ecommerce/wiki/Novedades-del-grupo)
* [Video Demo Srint 3](https://www.youtube.com/watch?v=t3DCGW4qhqg)
* [Video Final Sprint 4](https://www.youtube.com/watch?v=nAKpPReAxBE)

[commit-img]: https://img.shields.io/github/commit-activity/w/NataliaAlvarezIspc/proyecto-ispc-ecommerce/dev
[commit-url]: https://github.com/NataliaAlvarezIspc/proyecto-ispc-ecommerce/graphs/code-frequency
[contrib-img]: https://img.shields.io/github/contributors/NataliaAlvarezIspc/proyecto-ispc-ecommerce
[contrib-url]: https://github.com/NataliaAlvarezIspc/proyecto-ispc-ecommerce/graphs/contributors
[issues-img]: https://img.shields.io/github/issues/NataliaAlvarezIspc/proyecto-ispc-ecommerce
[issues-url]: https://github.com/NataliaAlvarezIspc/proyecto-ispc-ecommerce/issues
[discuss-img]: https://img.shields.io/github/discussions/NataliaAlvarezIspc/proyecto-ispc-ecommerce
[discuss-url]: https://github.com/NataliaAlvarezIspc/proyecto-ispc-ecommerce/discussions
[pipeline-img]: https://github.com/NataliaAlvarezIspc/proyecto-ispc-ecommerce/actions/workflows/python.yml/badge.svg
[pipeline-url]: https://github.com/NataliaAlvarezIspc/proyecto-ispc-ecommerce/actions/workflows/python.yml
