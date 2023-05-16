import { Component, Input } from '@angular/core';
import { Envio } from './modelo/modelo.envio';
import { EnviosService } from 'src/app/envios.service';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-abm-envios',
  templateUrl: './abm-envios.component.html',
  styleUrls: ['./abm-envios.component.css']
})

export class AbmEnviosComponent {
  @Input() envios: Envio [] = [];

  constructor(private router: Router, public enviosService : EnviosService) {
  }

  ngOnInit(): void {
    this.envios = this.enviosService.obtenerEnvios();
  }

  crear() {
    alert("Creando tipo de envío nuevo (próximamente)");
  }
}
