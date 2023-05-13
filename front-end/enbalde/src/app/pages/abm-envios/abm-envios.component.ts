import { Component, Input } from '@angular/core';
import { Envio } from './modelo/modelo.envio';
import { EnviosService } from 'src/app/envios.service';

@Component({
  selector: 'app-abm-envios',
  templateUrl: './abm-envios.component.html',
  styleUrls: ['./abm-envios.component.css']
})

export class AbmEnviosComponent {
  constructor(public enviosService : EnviosService) {
  }

  ngOnInit(): void {
    this.envios = this.enviosService.obtenerEnvios();
  }

  @Input() envios: Envio [] = [];

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
