import { Component, OnInit } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { FormModule } from '@coreui/angular';
import { InputGroupTextDirective } from '@coreui/angular';
import {HttpServiceService} from './../../http-service.service'
export interface produto{
  id:number,
  produto:string,
  custo:number,
  venda:number
}
@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [SharedModule,InputGroupTextDirective,FormModule],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.scss'
})

export class ProdutosComponent implements OnInit {
  produtos=[
    {id:35,produto:"cola-coca",custo:3.50,venda:5.00},
  ]
  exibirProdutos:any
  produtosFiltrados: produto[] = this.produtos;
  filtrarPorNome(nome: string): void {
    this.produtosFiltrados = this.produtos.filter(p => p.produto.toLowerCase().includes(nome.toLowerCase()));
    this.exibirProdutos = this.produtosFiltrados
  }
  ngOnInit(): void {
    this.exibirProdutos = this.produtos
    this.httpConfigService.ConsultarProduto().subscribe(e=>{
    this.produtos = e.produtos
    })
  }
  constructor(
    private httpConfigService: HttpServiceService
  ) { }
  
}
