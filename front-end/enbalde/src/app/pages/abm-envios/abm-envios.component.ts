import { Component, Input } from '@angular/core';
import { Envio, EnvioClass } from './modelo/modelo.envio';

@Component({
  selector: 'app-abm-envios',
  templateUrl: './abm-envios.component.html',
  styleUrls: ['./abm-envios.component.css']
})

export class AbmEnviosComponent {
  @Input() envios: Envio [] = [
    new EnvioClass(1, "Retiro por tienda", 0),
    new EnvioClass(2, "Envío en las próximas 3 horas", 150),
    new EnvioClass(3, "Envío inmediato", 500)
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
