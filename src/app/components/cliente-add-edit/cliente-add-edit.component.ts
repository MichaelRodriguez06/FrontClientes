import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { TablaClientesComponent } from 'src/app/components/tabla-clientes/tabla-clientes.component';
@Component({
  selector: 'app-cliente-add-edit',
  templateUrl: './cliente-add-edit.component.html',
  styleUrls: ['./cliente-add-edit.component.css'],
})
export class ClienteAddEditComponent implements OnInit {
  cliForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private clientService: ClientesService,
    private _dialogRef: MatDialogRef<ClienteAddEditComponent>
  ) // private tablaClientes: TablaClientesComponent
  {
    this.cliForm = _fb.group({
      nombre: '',
      apellido: '',
      direccion: '',
      celular: '',
      fechaNacimiento: '',
    });
  }

  ngOnInit(): void {}

  closeDialog() {
    this._dialogRef.close();
  }

  onFormSubmit() {
    if (this.cliForm.valid) {
      var cliente = this.cliForm.value;
      console.log(this.cliForm.value);
      this.clientService.postCliente(cliente).subscribe({
        next: (data) => {
          alert('Cliente registrado existosamente.');
          this._dialogRef.close();
          // this.tablaClientes.getListClientes();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
