import { Component, Input } from '@angular/core';
import { Envio } from './modelo/modelo.envio';
import { EnviosService } from 'src/app/envios.service';

@Component({
  selector: 'app-abm-envios',
  templateUrl: './abm-envios.component.html',
  styleUrls: ['./abm-envios.component.css']
})

export class AbmEnviosComponent {
  @Input() envios: Envio [] = [];

  constructor(public enviosService : EnviosService) {
  }

  ngOnInit(): void {
    this.envios = this.enviosService.obtenerEnvios();
  }

  editar(envio: Envio) {
    alert(`Editando ${envio.nombre} (próximamente)`);
  }

  borrar(envio: Envio) {
    if (this.enviosService.borrar(envio)) {
      alert(`Borrando ${envio.nombre}`);
    }
    else
    {
      alert(`Error eliminando ${envio.nombre}`)
    }
  }

  crear() {
    alert("Creando tipo de envío nuevo (próximamente)");
  }
}
