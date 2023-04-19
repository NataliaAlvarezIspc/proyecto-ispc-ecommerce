# Proyecto e-commerce ISPC

## Services

Dentro de este directorio se encuentran los servicios con parte de la lógica de negocio del sistema. Cada uno de estos servicios es llamado por uno o más controladores a pedido del front-end.

Los servicios reciben los datos que envía el front-end, los validan (el front-end posee validaciones pero algunas se vuelven a repetir aquí ya que un hacker podría contactar al entry point directamente sin pasar por los formularios del sitio web) y determinan los modelos a llamar para agregar, modificar, obtener o borrar información. En caso de ser necesario los servicios pueden retornar algún valor para que el controlador lo serialice y lo envíe al front-end.

Es posible colocar toda la lógica dentro de los controladores, sin embargo se decidió utilizar un acercamiento similar al que realiza Angular separando en servicios las posibles acciones que puede realizar.
