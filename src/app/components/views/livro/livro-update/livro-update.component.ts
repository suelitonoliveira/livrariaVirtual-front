import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { livro } from '../livro-read-all/livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent implements OnInit {

  id_cat: String = ''
  livro: livro = {
    id: '',
    titulo: '',
    nomeAutor: '',
    texto: ''
  }

  titulo = new FormControl("", [Validators.minLength(3)]);
  nomeAutor = new FormControl("", [Validators.minLength(3)]);
  texto = new FormControl("", [Validators.minLength(10)]);

  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get("id_cat")!;
    this.livro.id = this.route.snapshot.paramMap.get("id")!;
    this.findById()
  }
  getMessage() {
    if (this.titulo.invalid) {
      return "O campo TITULO deve conter entre 3 e 100 caracteres";
    }
    if (this.nomeAutor.invalid) {
      return "O campo NOME DO AUTOR deve conter entre 3 e 100 caracteres";
    }
    if (this.texto.invalid) {
      return "O campo TEXTO deve conter entre 10 e 2000000 caracteres";
    }
    return false;
  }

  cancel(): void{
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
 }

findById(): void {
  this.service.findById(this.livro.id!).subscribe((resposta)=>{
    this.livro = resposta
  })
}

update(): void {
  this.service.update(this.livro).subscribe((reposta) =>{
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
    this.service.mensagem('Livro atualizado com sucesso!')
  }, err =>{
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
    this.service.mensagem('Falha ao atualizar livro! Tente mais tarde..')
  }) 
}

}