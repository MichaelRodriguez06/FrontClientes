import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { Cliente } from 'src/app/models/cliente';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ClienteAddEditComponent } from '../cliente-add-edit/cliente-add-edit.component';
import { MatSort } from '@angular/material/sort';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';

export interface ClienteItems {
  Id: number;
  nombre: string;
  apellido: string;
  celular: string;
  direccion: string;
  fechaNacimiento: Date;
}

const COLUMS_SCHEMA = [
  { field: 'Id', header: 'Id' },
  { field: 'Nombre', header: 'Nombre' },
  { field: 'Apellido', header: 'Apellido' },
  { field: 'Direccion', header: 'Celular' },
  { field: 'Fecha', header: 'Direccion' },
  { field: 'Opciones' },
];

@Component({
  selector: 'app-tabla-clientes',
  templateUrl: './tabla-clientes.component.html',
  styleUrls: ['./tabla-clientes.component.css'],
})
export class TablaClientesComponent implements OnInit, AfterViewInit {
  public loading: boolean = true;
  columsSchema = COLUMS_SCHEMA;
  clientList: Cliente[] = [];
  dataSource: any;
  displayedColumns: string[] = [
    'Nombre',
    'Apellido',
    'Celular',
    'Direccion',
    'Fechanacimiento',
    'Options',
  ];

  cargando: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private matDialog: MatDialog,
    private clientService: ClientesService
  ) {
    this.getListClientes();
  }

  getListClientes() {
    this.cargando = true;
    this.clientService.getClientes().subscribe({
      next: (data) => {
        this.cargando = false;
        this.clientList = data.data;
        console.log(data);

        this.dataSource = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddEditClient() {
    const dialogRef = this.matDialog.open(ClienteAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (vale) => {
        if (vale) {
          this.getListClientes();
        }
      },
    });
  }

  openEditForm(data: any) {
    this.matDialog.open(ClienteAddEditComponent, {
      data,
    });
  }

  ngAfterViewInit() {
    // @ts-ignore
    // this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {}

  deleteCliente(id: number) {
    console.log(id);
    this.clientService.deleteCliente(id).subscribe({
      next: (data) => {
        alert('Empleado borrado correctamente');
        this.getListClientes();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  createClient() {}

  getStatusName(cliente: Cliente) {
    return 'FULL';
  }
}
