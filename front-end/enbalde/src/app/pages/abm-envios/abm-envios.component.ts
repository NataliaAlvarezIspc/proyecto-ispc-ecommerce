import { Component, Input } from '@angular/core';
import { Envio, EnvioClass } from './modelo/modelo.envio';

@Component({
  selector: 'app-abm-envios',
  templateUrl: './abm-envios.component.html',
  styleUrls: ['./abm-envios.component.css']
})

export class AbmEnviosComponent {
  @Input() envios: Envio [] = [
    new EnvioClass(1, "Retiro en tienda"),
    new EnvioClass(2, "Envío hasta 3 km"),
    new EnvioClass(3, "Envío hasta 5 km"),
    new EnvioClass(4, "Envío a más de 5km de distancia")
  ];

  editar(envio: Envio) {
    alert(`Editando ${envio.nombre} (próximamente)`);
  }

  borrar(envio: Envio) {
    alert(`Borrando ${envio.nombre} (próximamente)`);
  }

  crear() {
    alert("Creando tipo de envío nuevo (próximamente)");
  }
}
