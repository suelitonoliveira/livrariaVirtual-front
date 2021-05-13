import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { livro } from './livro-read-all/livro.model';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  baseUrl: String = environment.baseUrl

  constructor( private http: HttpClient, private _snack: MatSnackBar) { }

  findAllByCategoria(id_cat: String): Observable<livro[]>{
    const url = `${this.baseUrl}/livros?categoria=${id_cat}`
    return this.http.get<livro[]>(url)
  }

  findById(id: String): Observable<livro>{
    const url = `${this.baseUrl}/livros/${id}`
    return this.http.get<livro>(url)
  }

  update(livro: livro):Observable<livro>{
    const url = `${this.baseUrl}/livros/${livro.id}`
    return this.http.put<livro>(url,livro)
  }

  create(livro: livro,id_cat: String): Observable<livro>{
    const url = `${this.baseUrl}/livros?categoria=${id_cat}`
    return this.http.post<livro>(url, livro)
  }

  delete(id: String):Observable<void>{
    const url = `${this.baseUrl}/livros/${id}`
    return this.http.delete<void>(url)
  }


  mensagem(str: String): void{
    this._snack.open(`${str}`,`OK`,{
      horizontalPosition:`end`,
      verticalPosition: `top`,
      duration: 3000
    })
  }
}
