import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppsStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos?: IngresoEgreso[] = []!  
  ingresosSubs?: Subscription;

  constructor( private store:Store<AppsStateWithIngreso>, private ingreseEgresoService:IngresoEgresoService) { }

  ngOnInit() {
    this.ingresosSubs = this.store.select('ingresosEgresos')
    .subscribe(({items})=> this.ingresosEgresos = items
    )
  }
  ngOnDestroy() {
    this.ingresosSubs?.unsubscribe();
  }

  borrar(uid:string){
  this.ingreseEgresoService.borrarIngresoEgreso(uid)
  .then(()=>Swal.fire('Borrado', 'item borrado', 'warning'))
  .catch(err=>Swal.fire('Borrado', err.message, 'error'));
  }

}
