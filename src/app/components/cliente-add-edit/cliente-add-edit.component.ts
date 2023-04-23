import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
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
  ) {
    this.cliForm = _fb.group({
      nombre: '',
      apellido: '',
      direccion: '',
      celular: '',
      fechaNacimiento: '',
    });
  }

  ngOnInit(): void {}

  onFormSubmit() {
    if (this.cliForm.valid) {
      var cliente = this.cliForm.value;
      console.log(this.cliForm.value);
      this.clientService.postCliente(cliente).subscribe({
        next: (data) => {
          alert("Cliente registrado existosamente.");
          this._dialogRef.close();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
