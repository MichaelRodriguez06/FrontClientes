import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpApiResponse } from "../../models/http-api-response";


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
    providedIn: 'root'
})

export class HttpServices<T>{

    url = environment.apiUrl;

    constructor(private http: HttpClient) {

    }

    get(path: string, params: HttpParams = new HttpParams()): Observable<HttpApiResponse<T>> {
        return this.http.get<HttpApiResponse<T>>(`${this.url}/${path}`, { params });
    }

    getList(path: string, params: HttpParams = new HttpParams()): Observable<HttpApiResponse<T[]>> {
        return this.http.get<HttpApiResponse<T[]>>(`${this.url}/${path}`, { params });
    }

    put(id: number, data: any): Observable<any> {
        return this.http.put(`https://localhost:7068/clientes/${id}`, data)
    }

    post(path: string, body: Object = {}, options = httpOptions): Observable<HttpApiResponse<T>> {
        return this.http.post<HttpApiResponse<T>>(
            `${this.url}/${path}`,
            JSON.stringify(body),
            options
        );
    }

    patch(path: string, body: Object = {}): Observable<HttpApiResponse<T>> {
        return this.http.patch<HttpApiResponse<T>>(
            `${this.url}/${path}`,
            JSON.stringify(body)
        )
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`https://localhost:7068/clientes/${id}`)
    }

    postFile(path: string, form: Object = {}): Observable<HttpApiResponse<T>> {
        return this.http.post<HttpApiResponse<T>>(
            `${this.url}/${path}`,
            form,
            {
                reportProgress: true
            }
        )
    }
}
