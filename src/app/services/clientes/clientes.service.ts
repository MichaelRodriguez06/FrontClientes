import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpApiResponse } from 'src/app/core/models/http-api-response';
import { AppRoutes } from 'src/app/core/services/app-routes';
import { HttpServices } from 'src/app/core/services/http/http.service';
import { Cliente } from 'src/app/models/cliente';

@Injectable({
  providedIn: 'root'
})

export class ClientesService {

  constructor(private server: HttpServices<Cliente>) { }

  getClientes(): Observable<HttpApiResponse<Cliente[]>> {
    return this.server.getList(AppRoutes.GET_LIST_CLIENTS);
  }

  postCliente(newClient: Cliente) {
    return this.server.post(AppRoutes.POST_CLIENT, newClient);
  }

}
