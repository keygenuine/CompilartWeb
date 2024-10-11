import { Component, OnInit } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { FormModule } from '@coreui/angular';
import { InputGroupTextDirective } from '@coreui/angular';
import {HttpServiceService} from './../../http-service.service'
import { FormsModule } from '@angular/forms'; // Importa o FormsModule
import { NgModule } from '@angular/core';
import { computeMsgId, NotExpr } from '@angular/compiler';
import {MatPaginatorModule} from '@angular/material/paginator';
import {PageEvent} from '@angular/material/paginator';
import {JsonPipe} from '@angular/common';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Subscription } from 'rxjs';
import { ChartService } from 'src/app/chart.service';
export interface fornecedor{
  id: any,
  fantasia: any,
  cnpj: any,
  cidade: any,
  estado: any,
  contato: any
}
@Component({
  selector: 'app-fornecedor',
  standalone: true,
  imports: [SharedModule,InputGroupTextDirective,FormModule,FormsModule,MatPaginatorModule,JsonPipe,MatSlideToggleModule,MatInputModule,MatFormFieldModule],
  templateUrl: './fornecedor.component.html',
  styleUrl: './fornecedor.component.scss'
})
export class FornecedorComponent {
  length = 1000;
  pageSize = 20;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent?: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    // this.length = e.length;
    // this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    if(Number(this.pageSize) !== Number(e.pageSize)){
      // this.pageSize = e.pageSize  

    }
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }



  tabelas = [[true]] as any
  tabelasbkp = [] as any

  atualizacaoFornecedor = [ ] as any
  // alterarPreco(index:any,venda:any,item:any){
  //   this.fornecedores[index].venda = venda.value
  //   this.exibirFornecedor[item][index].venda = venda.value
  //   this.atualizacaoFornecedor.push(this.exibirFornecedor[item][index])
    
  // }
  mudacor(item:any,i:any){
    this.tabelas[item][i] = true
    item == 0? this.tabelasbkp[i]=true : ''
  }
  atualizarProduto(){
    this.httpConfigService.updateProduto(this.atualizacaoFornecedor).subscribe(e=>{

    })
  }
  exibirAtualizacoes(){
    this.exibirFornecedor[0] = this.atualizacaoFornecedor
    for (let c=0; c < this.atualizacaoFornecedor.length;c++){
      this.tabelas[0][c]= true
    }
    // console.log(this.exibirFornecedor[0])
    this.pageIndex = 0
  } 
  buscarFornecedor(){
    this.httpConfigService.ConsultarFornecedor().subscribe(e=>{
      this.fornecedores = e.fornecedor
      let contador = 0
      this.exibirFornecedor[contador] = []
      this.length = Number(e.fornecedor.length) 
      // this.pageSize = 20
      for (let n in e.fornecedor){
        if(this.exibirFornecedor[contador].length<this.pageSize-1){
          if(contador == 0) {
            this.fornecedorsalve.push(e.fornecedor[n])
          } 
          this.exibirFornecedor[contador].push(e.fornecedor[n])
          this.contadorDeTabela[contador]=contador  
          this.tabelas[contador] = [false]
        }else {
          this.exibirFornecedor[contador].push(e.fornecedor[n])
          this.contadorDeTabela[contador]=contador  
          this.tabelas[contador] = [false]
          // console.log(this.exibirFornecedor[contador].length) 
          
          contador++
          this.exibirFornecedor[contador] = []
        }
      }
    })

  }
  desfazerAtualizacoes(){
    this.atualizacaoFornecedor = []
    this.exibirFornecedor[0] = this.fornecedorsalve
    for (let n in this.tabelas){
      this.tabelas[n] = [false]
    }
    this.buscarFornecedor()
  }
  fornecedores=[
    {
      id: 1,
      fantasia: "PADRÃO",
      cnpj: 'null',
      cidade: "LAVRAS",
      estado: "Minas Gerais",
      contato: null
    }
  ]
  exibirFornecedor = [] as any
  fornecedoresFiltrados: fornecedor[] = this.fornecedores;
  fornecedorsalve = [] as any
  filtrarPorNome(nome: string) {
    if(nome == ''){
      this.exibirFornecedor[0] = this.fornecedorsalve
      this.pageIndex = 0
    }else{
      this.fornecedoresFiltrados = this.fornecedores.filter(p => p.fantasia.toLowerCase().includes(nome.toLowerCase()) || p.cnpj.includes(nome));
      this.exibirFornecedor[0] = this.fornecedoresFiltrados
      this.pageIndex = 0

    }

  }
  contadorDeTabela = [] as any
  contador = 1
  dark = false
  cor = 'white' 
  private onGlobalVariableChange(newValue: string) {
    let cor = {
      branco:'#ffe5e5',
      transparente:'rgba(255, 255, 255, 0)',
      vermelho:'#af4e55',
      azulClaro:'#84b6f4',
      azul: '#7CBCCB'

    }
    if (newValue == 'dark') {
      this.dark = true
      this.cor = 'dark'
      const c = document.querySelectorAll('.datepick')
      c.forEach(f=>{
        // f?.setAttribute('style','color:black')
        
        (f as HTMLElement).style.color = 'white';
        (f as HTMLElement).style.borderColor = 'white';
        (f as HTMLElement).style.backgroundColor = '#212631b6';
      })
    }else{
      this.cor = 'white'
      const c = document.querySelectorAll('.datepick')
      c.forEach(f=>{
        // f?.setAttribute('style','color:black')
        (f as HTMLElement).style.color = '';
        (f as HTMLElement).style.borderColor = '';
        (f as HTMLElement).style.backgroundColor = 'rgb(0,0,0)';
      })


    }

  }
  private subscription?: Subscription;
  ngOnInit(): void {
    this.buscarFornecedor()
    // this.httpConfigService.ConsultarProduto().subscribe(e=>{
    //   this.produtos = e.produtos
    //   this.unidadeMedida = e.unidade
    //   let contador = 0
    //   this.exibirFornecedor[contador] = []
    //   this.length = Number(e.produtos.length) 
    //   // this.pageSize = 20
    //   for (let n in e.produtos){
    //     if(this.exibirFornecedor[contador].length<this.pageSize-1){
    //       if(contador == 0) {
    //         this.fornecedorsalve.push(e.produtos[n])
    //       } 
    //       this.exibirFornecedor[contador].push(e.produtos[n])
    //       this.contadorDeTabela[contador]=contador  
    //       this.tabelas[contador] = [false]
    //     }else {
    //       this.exibirFornecedor[contador].push(e.produtos[n])
    //       this.contadorDeTabela[contador]=contador  
    //       this.tabelas[contador] = [false]
    //       // console.log(this.exibirFornecedor[contador].length) 
          
    //       contador++
    //       this.exibirFornecedor[contador] = []
    //     }
    //   }
    // })
    this.subscription = this.chartService.myGlobalVariable$.subscribe(
      (newValue) => {
        this.onGlobalVariableChange(newValue); // Dispara a função quando a variável mudar
      }
    );
  }

  constructor(
    private chartService: ChartService,  
    private httpConfigService: HttpServiceService
  ) { }

  
}
