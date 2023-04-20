
# proyecto-ispc-ecommerce

## EnBalde - Heladería

Venta de productos cerrados de Heladería. El usuario tendrá la posibilidad, mediante un catálogo, de elegir helados por pote de diversos pesos. Habrá variedad de gustos. Cada pote será de sabores fijos. Una vez finalizada la elección la página lo dirigirá a la sección carrito en donde podrá agregar o quitar artículos, decidir la forma de abonar y si solicita delivery o retira en sucursal. Concluida la compra se emitirá un aviso de transacción efectuada y el administrador recibirá el aviso de la compra.


**[Notas aclaratorias:](https://github.com/NataliaAlvarezIspc/proyecto-ispc-ecommerce/wiki/Notas-aclaratorias)**

Decidimos crear un proyecto desde cero dado que el proyecto anterior era de una naturaleza muy distinta (ya que una de las condiciones para la selección era que fuese un proyecto poco común, no simplemente "un carrito de compras"). 
El proyecto anterior era un el sistema de subastas, en el cual la venta no era posible si no había una puja, la puja no era posible si no había un lote y un lote no era posible si no existía un artículo.  Para mantener la integridad del sistema, se decidió no agregar un e-commerce que permitiera ventas directas sin pujas. Agregar un e-commerce haría que existan ventas que romperían con esa regla fundamental de nuestro sistema, que existan ventas sin pujas, lo que habría requerido agregar una segunda tabla de ventas o código adicional para validar si la venta provenía de subasta o era directa. Esto hubiese complejizado el sistema, dejándolo muy difícil de testear. Debido al limitado tiempo con el que contamos para implementar la solución y para evitar complicaciones, se decidió que esta opción no era viable.

Link al repositorio anterior: [BidOn Subastas](https://github.com/rpgrca/proyecto-ispc-fullstack)



## Documentación

* [IEEE830](https://github.com/NataliaAlvarezIspc/proyecto-ispc-ecommerce/wiki/IEEE830)
* [Diagrama de casos de uso](https://github.com/NataliaAlvarezIspc/proyecto-ispc-ecommerce/wiki/Diagrama-de-Casos-de-Uso)
* [Diagrama de clases](https://github.com/NataliaAlvarezIspc/proyecto-ispc-ecommerce/wiki/Diagrama-de-clases)
* [Diagrama Entidad Relación](https://github.com/NataliaAlvarezIspc/proyecto-ispc-ecommerce/wiki/Diagrama-Entidad-Relaci%C3%B3n)
* [Diagrama Relacional](https://github.com/NataliaAlvarezIspc/proyecto-ispc-ecommerce/wiki/Diagrama-Relacional)
* [Mapa del sitio](https://github.com/NataliaAlvarezIspc/proyecto-ispc-ecommerce/wiki/Mapa-del-sitio)
