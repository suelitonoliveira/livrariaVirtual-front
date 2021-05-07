import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-delete',
  templateUrl: './categoria-delete.component.html',
  styleUrls: ['./categoria-delete.component.css']
})
export class CategoriaDeleteComponent implements OnInit {

  categoria: Categoria = {
    id: '',
    nome: '',
    descricao: ''
  }

  constructor(private service: CategoriaService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.categoria.id = this.route.snapshot.paramMap.get('id')!
    this.findById()
  }

  findById():void{
    this.service.findById(this.categoria.id!).subscribe((resposta) =>{
      this.categoria.nome = resposta.nome
      this.categoria.descricao = resposta.descricao
    })
  }
  delete(): void{
    this.service.delete(this.categoria.id!).subscribe((resposta) =>{
      this.router.navigate(['categoria'])
      this.service.mensagem('Categoria Deletada com Sucesso!')
    }, err => {
      for (let i = 0; i < err.error.errors.length; i++) {
        this.service.mensagem(err.error.errors[i].message)
      }
    })
  }
  cancel(): void{
    this.router.navigate(['categorias'])
  }
}
