import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    private _dialogRef: MatDialogRef<ClienteAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.cliForm = _fb.group({
      nombre: '',
      apellido: '',
      direccion: '',
      celular: '',
      fechaNacimiento: '',
    });
  }

  ngOnInit(): void {
    this.cliForm.patchValue(this.data);
  }

  closeDialog() {
    this._dialogRef.close();
  }

  onFormSubmit() {
    if (this.cliForm.valid) {
      if (this.data) {
        console.log(this.data.id, this.data);
        this.clientService.putCliente(this.data.id, this.data).subscribe({
          next: (data) => {
            data.Id = data.Id;
            data = this.cliForm.value;
            console.log(data);
            alert('Cliente se actualizo correctamente');
            this._dialogRef.close(true);

          },
        });
      } else {
        var cliente = this.cliForm.value;
        console.log(this.cliForm.value);
        this.clientService.postCliente(cliente).subscribe({
          next: (data) => {
            alert('Cliente registrado existosamente.');
            this._dialogRef.close(true);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    }
  }
}
