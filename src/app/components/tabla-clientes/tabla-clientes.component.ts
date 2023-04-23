import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { Cliente } from 'src/app/models/cliente';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ClienteAddEditComponent } from '../cliente-add-edit/cliente-add-edit.component';
import { MatSort } from '@angular/material/sort';

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
  { field: 'nombre', header: 'Nombre' },
  { field: 'apellido', header: 'Apellido' },
  { field: 'celular', header: 'Celular' },
  { field: 'direccion', header: 'Direccion' },
  { field: 'fechaNacimiento', header: 'Fecha de nacimiento' },
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
  dataSource = new MatTableDataSource<Cliente>(this.clientList);
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private matDialog: MatDialog,
    private clientService: ClientesService
  ) {}

  getListClientes() {
    this.clientService.getClientes().subscribe({
      next: (data) => {
        this.clientList = data.data;
        console.log(data);
        this.dataSource = new MatTableDataSource(data.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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
    this.matDialog.open(ClienteAddEditComponent);
  }

  ngAfterViewInit() {
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.getListClientes();
  }

  createClient() {}

  getStatusName(cliente: Cliente) {
    return 'FULL';
  }
}
