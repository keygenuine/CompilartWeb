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
import {
  ButtonCloseDirective,
  ButtonDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ThemeDirective
} from '@coreui/angular';
import { ModalModule } from '@coreui/angular';
export interface produto{
  id:number,
  produto:string,
  custo:number,
  venda:number
}
@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [ModalModule,SharedModule,InputGroupTextDirective,FormModule,FormsModule,MatPaginatorModule,JsonPipe,MatSlideToggleModule,MatInputModule,MatFormFieldModule,ButtonDirective, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ThemeDirective, ButtonCloseDirective, ModalBodyComponent, ModalFooterComponent],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.scss'
})

export class ProdutosComponent implements OnInit {
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
  public visible = false;
  public visible1 = false;

  toggleLiveDemo() {
    this.visible = !this.visible;
  }
  toggleLiveDemo1() {
    this.visible1 = !this.visible1;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
  handleLiveDemoChange1(event: any) {
    this.visible1 = event;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }



  tabelas = [[true]] as any
  tabelasbkp = [] as any

  atualizacaoProdutos = [ ] as any
  alterarPreco(index:any,venda:any,item:any){
    this.produtos[index].venda = venda.value
    this.exibirProdutos[item][index].venda = venda.value
    this.atualizacaoProdutos.push(this.exibirProdutos[item][index])
    
  }
  mudacor(item:any,i:any){
    this.tabelas[item][i] = true
    item == 0? this.tabelasbkp[i]=true : ''
  }
  atualizarProduto(){
    console.log(this.tabelas)
    this.httpConfigService.updateProduto(this.atualizacaoProdutos).subscribe(e=>{

    })
  }
  exibirAtualizacoes(){
    this.exibirProdutos[0] = this.atualizacaoProdutos
    for (let c=0; c < this.atualizacaoProdutos.length;c++){
      this.tabelas[0][c]= true
    }
    // console.log(this.exibirProdutos[0])
    this.pageIndex = 0
  } 
  buscarProdutos(){
    this.httpConfigService.ConsultarProduto().subscribe(e=>{
      this.produtos = e.produtos
      this.unidadeMedida = e.unidade
      let contador = 0
      this.exibirProdutos[contador] = []
      this.length = Number(e.produtos.length) 
      // this.pageSize = 20
      for (let n in e.produtos){
        if(this.exibirProdutos[contador].length<this.pageSize-1){
          if(contador == 0) {
            this.produtossalve.push(e.produtos[n])
          } 
          this.exibirProdutos[contador].push(e.produtos[n])
          this.contadorDeTabela[contador]=contador  
          this.tabelas[contador] = [false]
        }else {
          this.exibirProdutos[contador].push(e.produtos[n])
          this.contadorDeTabela[contador]=contador  
          this.tabelas[contador] = [false]
          // console.log(this.exibirProdutos[contador].length) 
          
          contador++
          this.exibirProdutos[contador] = []
        }
      }
    })

  }
  desfazerAtualizacoes(){
    this.atualizacaoProdutos = []
    this.exibirProdutos[0] = this.produtossalve
    for (let n in this.tabelas){
      this.tabelas[n] = [false]
    }
    this.buscarProdutos()
  }
  produtos=[
    {id:35,produto:"cola-coca",custo:3.50,venda:5.00},
  ]
  unidadeMedida = [] as any
  exibirProdutos = [] as any
  produtosFiltrados: produto[] = this.produtos;
  produtossalve = [] as any
  filtrarPorNome(nome: string) {
    if(nome == ''){
      this.exibirProdutos[0] = this.produtossalve
      this.pageIndex = 0
    }else{
      this.produtosFiltrados = this.produtos.filter(p => p.produto.toLowerCase().includes(nome.toLowerCase()));
      this.exibirProdutos[0] = this.produtosFiltrados
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
      this.dark = false
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
    this.buscarProdutos()
    // this.httpConfigService.ConsultarProduto().subscribe(e=>{
    //   this.produtos = e.produtos
    //   this.unidadeMedida = e.unidade
    //   let contador = 0
    //   this.exibirProdutos[contador] = []
    //   this.length = Number(e.produtos.length) 
    //   // this.pageSize = 20
    //   for (let n in e.produtos){
    //     if(this.exibirProdutos[contador].length<this.pageSize-1){
    //       if(contador == 0) {
    //         this.produtossalve.push(e.produtos[n])
    //       } 
    //       this.exibirProdutos[contador].push(e.produtos[n])
    //       this.contadorDeTabela[contador]=contador  
    //       this.tabelas[contador] = [false]
    //     }else {
    //       this.exibirProdutos[contador].push(e.produtos[n])
    //       this.contadorDeTabela[contador]=contador  
    //       this.tabelas[contador] = [false]
    //       // console.log(this.exibirProdutos[contador].length) 
          
    //       contador++
    //       this.exibirProdutos[contador] = []
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
