
import {HttpServiceService} from './../../http-service.service'
import { ElementRef, ViewChild, AfterViewInit, Component, inject, OnInit, } from '@angular/core';
import { ColorModeService } from '@coreui/angular';
import { getStyle, hexToRgba } from '@coreui/utils';
import { Subscription } from 'rxjs';
import { Portuguese } from 'flatpickr/dist/l10n/pt.js';
import flatpickr from 'flatpickr';
import { SharedModule } from './../../shared/shared.module';
import Chart from 'chart.js/auto';
import { Colors } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { ChartService } from './../../chart.service'
import { indexOf } from 'lodash-es';
@Component({
  selector: 'app-dash-balcao',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dash-balcao.component.html',
  styleUrl: './dash-balcao.component.scss'
})
export class DashBalcaoComponent implements OnInit,AfterViewInit {
  widget = {
    total: 0,
    porDia:{} as any,
    numeroVendas:0,
    ticketMedio:0,
    comandasAbertas:0
  }
  produtosListaVendas = 0
  produtosListaCusto = 0
  estilo = '#d63384';
  labels = [
    'segunda',
    'terça',
    'quarta',
    'quinta',
    'sexta',
    'sabado',
    'domingo'
  ];
  datasets = [
    [{
      label: 'Faturamento',
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,255,255,.55)',
      pointBackgroundColor: getStyle('--azul'),
      pointHoverBorderColor: getStyle('--cui-primary'),
      data: [65, 59, 84, 84, 51, 55, 40]
    }], [{
      label: 'Ticket Medio',
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,255,255,.55)',
      pointHoverBorderColor: getStyle('--cui-info'),
      pointBackgroundColor: getStyle('--cui-warning'),
      data: [1, 18, 9, 17, 34, 22, 11]
    }], [{
      label: 'Cancelamentos',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',

      pointBackgroundColor: getStyle('--cui-info'),
      pointHoverBorderColor: getStyle('--cui-warning'),
      data: [78, 81, 80, 45, 34, 12, 40],
      fill: true
    }], [{
      label: 'Vendas',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
      barPercentage: 0.7
    }]
  ];
  optionsDefault = {
    plugins: {
      legend: {
        display: false
      }
    },
    maintainAspectRatio: true,
    scales: {
      x: {
        border: {
          display: false,
        },
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          display: false
        }
      },
      y: {

        display: false,
        grid: {
          display: false
        },
        ticks: {
          display: false
        }
      }
    },
    elements: {
      line: {
        borderWidth: 1,
        tension: 0.4
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4
      }
    }
  };
  bankname = [1, 18, 9, 171, 34, 22, 11]

  private faturamentoChartBalcao: any
  
  private vendasPorProdutoChartBalcao: any
  private estoqueProdutoChartBalcao: any
  
  private chartFaturamentoWidgetBalcao: any
  private chartTicketMedioWidgetBalcao: any
  private chartCancelamentosWidgetBalcao: any
  private chartVendasWidgetBalcao: any
  
  
  private chartProdutividadeFuncionarioComanda:any
  private chartMesaComanda:any
  @ViewChild('faturamentoChartBalcaoRef') faturamentoChartBalcaoRef!: ElementRef;
  
  @ViewChild('chartFaturamentoWidgetBalcaoRef') chartFaturamentoWidgetBalcaoRef!: ElementRef;
  @ViewChild('chartTicketMedioWidgetBalcaoRef') chartTicketMedioWidgetBalcaoRef!: ElementRef;
  @ViewChild('chartCancelamentosWidgetBalcaoRef') chartCancelamentosWidgetBalcaoRef!: ElementRef;
  @ViewChild('chartVendasWidgetBalcaoRef') chartVendasWidgetBalcaoRef!: ElementRef;

  @ViewChild('vendasPorProdutoChartBalcaoRef') vendasPorProdutoChartBalcaoRef!: ElementRef;
  @ViewChild('estoqueProdutoChartBalcaoRef') estoqueProdutoChartBalcaoRef!: ElementRef;

 
  
  
  getContext(chartRef: any) {
    let canvas: HTMLCanvasElement = chartRef.nativeElement;
    let context: CanvasRenderingContext2D | null = canvas.getContext('2d')
    return context
  }

  scroll(el: any) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    // Calcula a posição atual de rolagem e ajusta para cima em 100px
    const offset = 150;
    const currentScrollTop = window.pageYOffset;
    const elementRect = el.getBoundingClientRect();
    const elementTop = elementRect.top + currentScrollTop;
    const newScrollTop = elementTop - offset;

    // Ajusta a posição do scroll para cima em 100px
    window.scrollTo({
      top: newScrollTop,
      behavior: "smooth"
    });
  }
  produtoGraficoGrupo(produtos: any) {
    if (window.innerWidth < 800) {
      this.scroll(document.querySelector('#graficoGrupoScroll'))
    }
    // this.vendasPorProdutoChart.data.datasets[0].label = [produtos]
    // this.vendasPorProdutoChart.data.datasets[0].data = [100, 20, 44, 4, 15, 0, 7, 8, 159, 10, 15, 12]
    // this.vendasPorProdutoChart.update()
  }
  ngAfterViewInit(): void {
    flatpickr("#datePicker", {
      dateFormat: "Y-m-d",
      locale: Portuguese, 
    });
    Chart.register(Colors)
    Chart.register(zoomPlugin)
    this.buscarDados('2024-06-01','2024-08-01')

    this.faturamentoChartBalcao = this.chartService.newchart1('faturamentoChartBalcao', this.getContext(this.faturamentoChartBalcaoRef), 'faturamento')
    
    this.chartFaturamentoWidgetBalcao = this.chartService.newchart1('chartFaturamentoWidgetBalcao', this.getContext(this.chartFaturamentoWidgetBalcaoRef), 'widget', 'bar','Vendas R$')
    this.chartTicketMedioWidgetBalcao = this.chartService.newchart1('chartTicketMedioWidgetBalcao', this.getContext(this.chartTicketMedioWidgetBalcaoRef), 'widget', 'line', 'Ticket Medio R$')
    this.chartCancelamentosWidgetBalcao = this.chartService.newchart1('chartCancelamentosWidgetBalcao', this.getContext(this.chartVendasWidgetBalcaoRef), 'widget', 'bar','Numero de Cancelamentos')
    this.chartVendasWidgetBalcao = this.chartService.newchart1('chartVendasWidgetBalcao', this.getContext(this.chartCancelamentosWidgetBalcaoRef), 'widget', 'line','Numero de Vendas')

    this.vendasPorProdutoChartBalcao = this.chartService.newchart1('vendasPorProdutoChartBalcao', this.getContext(this.estoqueProdutoChartBalcaoRef), 'vendasPorProduto','bar','Qtd. Vendida')
    this.estoqueProdutoChartBalcao = this.chartService.newchart1('estoqueProdutoChartBalcao', this.getContext(this.estoqueProdutoChartBalcaoRef), 'estoqueProduto','bar')
    
    // newchart1(
    //   chartname:any,
    //   chartContext:any,
    //   tipoGrafico:any,
    //   type?:any,
    //   labelData?:any,
    //   corGrafico?:any
    // )
    this.cor == 'white' ? this.onGlobalVariableChange('white') : this.onGlobalVariableChange('dark')
  }

  verTema() {
    console.log(this.chartService.temaAtual)
  }

  private subscription?: Subscription;
  public currentGlobalValue?: string;
  readonly #colorModeService = inject(ColorModeService);
  readonly colorMode = this.#colorModeService.colorMode;

  updateWidgets(widgetVendas:any, widgetCancelamentos?:any){
    this.faturamentoChartBalcao.data.labels=[]

    const diasDaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    this.chartFaturamentoWidgetBalcao.data.datasets[0].data = []
    this.chartTicketMedioWidgetBalcao.data.datasets[0].data = []
    this.chartCancelamentosWidgetBalcao.data.datasets[0].data = []
    this.chartVendasWidgetBalcao.data.datasets[0].data = []

    this.chartFaturamentoWidgetBalcao.data.labels = diasDaSemana
    this.chartTicketMedioWidgetBalcao.data.labels = diasDaSemana
    this.chartCancelamentosWidgetBalcao.data.labels = diasDaSemana
    this.chartVendasWidgetBalcao.data.labels = diasDaSemana

    
    this.widget.total = 0
    this.widget.numeroVendas = 0
    this.widget.comandasAbertas = 0
    this.widget.porDia = {}
    for (let n in widgetVendas){
      let e = widgetVendas[n]
      let data = new Date(e.Datas).toLocaleDateString('pt-br')
      let dia = new Date(e.Datas).getUTCDay()
      this.faturamentoChartBalcao.data.labels[n] = data
      this.faturamentoChartBalcao.data.datasets[0].data[n]=(Number(e.total).toFixed(2)|| 0)
      
      this.chartFaturamentoWidgetBalcao.data.datasets[0].data[dia] = (Number(this.chartFaturamentoWidgetBalcao.data.datasets[0].data[dia] || 0) + Number((e.total))).toFixed(2)
      this.chartTicketMedioWidgetBalcao.data.datasets[0].data[dia] = (Number(this.chartTicketMedioWidgetBalcao.data.datasets[0].data[dia] || 0) + (Number(e.total) / Number(e.numero_vendas))).toFixed(2);
      this.chartVendasWidgetBalcao.data.datasets[0].data[dia] = (Number(this.chartVendasWidgetBalcao.data.datasets[0].data[dia] || 0) + (Number(e.numero_vendas) )).toFixed(2);
      
      this.widget.total += Number(e.total)
      this.widget.numeroVendas += Number(e.numero_vendas)    
    }
    for (let n in widgetCancelamentos){
      this.chartCancelamentosWidgetBalcao.data.labels[n] = `${widgetCancelamentos[n].data}`
      this.chartCancelamentosWidgetBalcao.data.datasets[0].data[n]= (Number(widgetCancelamentos[n].quantidade).toFixed(2)|| 0)
      // this.widget.comandasAbertas += 1

    }
    // console.log(widgetComandas)

    this.faturamentoChartBalcao.update()
    this.chartFaturamentoWidgetBalcao.update()
    this.chartTicketMedioWidgetBalcao.update()
    this.chartVendasWidgetBalcao.update()
    this.chartCancelamentosWidgetBalcao.update()
  }
  
  jsonServer = {
    listaDeProdutos: [
      { produto: 'refrigerante', custo: 200, venda: 200, id: 1 },
      { produto: 'agua', custo: 1010, venda: 2001, id: 5 },
      { produto: 'coca-cola', custo: 110, venda: 201, id: 104 },
      { produto: 'refeições', custo: 1500, venda: 4000, id: 86 },
      { produto: 'sucos', custo: 100, venda: 800, id: 88 },
    ],
    listaDeProdutos1:[
      { produto: 'refrigerante', custo: 200, venda: 200, id: 1 },
      { produto: 'agua', custo: 1010, venda: 2001, id: 5 },
    ],
  }

  updatechartEstoqueAndProduto(an:any){

    this.vendasPorProdutoChartBalcao.data.labels = []
    this.vendasPorProdutoChartBalcao.data.datasets[0].data = []
    this.estoqueProdutoChartBalcao.data.labels = []
    this.estoqueProdutoChartBalcao.data.datasets[0].data = []
    for (let produto in an){
      let produtos = an[produto].produto
      let vendas = Number(an[produto].total)
      let estoque = Number(an[produto].estoque)
      let qtdvenda = Number(an[produto].quantidade)
      this.vendasPorProdutoChartBalcao.data.labels.push(produtos)  
      this.vendasPorProdutoChartBalcao.data.datasets[0].data.push(qtdvenda) 
      this.estoqueProdutoChartBalcao.data.labels.push(produtos)  
      this.estoqueProdutoChartBalcao.data.datasets[0].data.push(estoque) 
      }
      this.vendasPorProdutoChartBalcao.update()
      this.estoqueProdutoChartBalcao.update()
  }
  updateListaDeProdutos(lista:any){
    this.produtosListaVendas = 0
    this.produtosListaCusto = 0 
    this.jsonServer.listaDeProdutos = []
    this.jsonServer.listaDeProdutos1 = []
    for (let index in lista){
      this.produtosListaVendas += Number(lista[index].venda)
      this.produtosListaCusto += Number(lista[index].custo)
      if(Number(index)<5){
        this.jsonServer.listaDeProdutos.push(lista[index])
        this.jsonServer.listaDeProdutos[Number(index)].venda = Number(this.jsonServer.listaDeProdutos[Number(index)].venda)
        this.jsonServer.listaDeProdutos[Number(index)].custo = Number(this.jsonServer.listaDeProdutos[Number(index)].custo)

      }else{
        this.jsonServer.listaDeProdutos1.push(lista[index])

      }
    }
  }
cor = ''

  buscarDados(dtInicial:any,dtFinal:any){
    let body={  inicial:dtInicial,final:dtFinal}  
    this.httpConfigService.ConsultarBalcao(body).subscribe((element:any)=>{
      let widget = element.balcao
      this.updateWidgets(element.balcao,element.cancelamentos)
      this.updateListaDeProdutos(element.produtos)
      this.updatechartEstoqueAndProduto(element.produtos)
    })   
  }
  ngOnInit(): void {
    this.subscription = this.chartService.myGlobalVariable$.subscribe(
      (newValue) => {
        this.onGlobalVariableChange(newValue); // Dispara a função quando a variável mudar
      }
    );
    Chart.register(Colors)
    Chart.register(zoomPlugin)
    this.buscarDados('2024-06-01','2024-08-01')
  }
  dark = false
  private onGlobalVariableChange(newValue: string) {
    this.dark = true
    let cor = {
      branco:'#ffe5e5',
      transparente:'rgba(255, 255, 255, 0)',
      vermelho:'#af4e55',
      azulClaro:'#84b6f4',
      azul: '#7CBCCB'

    }
    if (newValue == 'dark') {
      this.cor == 'dark'
      const b = document.querySelectorAll('#graficoFaturamento')
      const c = document.querySelectorAll('#datePicker')
      b.forEach(e=>{
        (e as HTMLElement).style.backgroundColor =  '#212631b6'
      })
      c.forEach(f=>{
        // f?.setAttribute('style','color:black')
        (f as HTMLElement).style.color = '';
        (f as HTMLElement).style.borderColor = '';
        (f as HTMLElement).style.backgroundColor = '#212631b6';
      })
      let corFundoGrafico = 'black'
      console.log(corFundoGrafico)
      this.faturamentoChartBalcao.data.datasets[0].backgroundColor = '#212631b6'
      this.faturamentoChartBalcao.data.datasets[0].borderColor = 'white'
      this.faturamentoChartBalcao.update()

      this.vendasPorProdutoChartBalcao.options.scales.y.ticks.color = 'white'
      this.estoqueProdutoChartBalcao.options.scales.y.ticks.color = 'white'

      
      this.chartFaturamentoWidgetBalcao.options.scales.y.ticks.color = 'white'
      this.chartTicketMedioWidgetBalcao.options.scales.y.ticks.color = 'white'
      this.chartCancelamentosWidgetBalcao.options.scales.y.ticks.color = 'white'
      this.chartVendasWidgetBalcao.options.scales.y.ticks.color = 'white'
      
      this.faturamentoChartBalcao.update()
      this.vendasPorProdutoChartBalcao.update()
      this.estoqueProdutoChartBalcao.update()
  
      this.chartFaturamentoWidgetBalcao.update()
      this.chartTicketMedioWidgetBalcao.update()
      this.chartCancelamentosWidgetBalcao.update()
      this.chartVendasWidgetBalcao.update()

    }else{
      console.log('oi')
      this.cor = 'white'
      const b = document.querySelectorAll('#graficoFaturamento')
      const c = document.querySelectorAll('#datePicker')
      b.forEach(e=>{
        (e as HTMLElement).style.backgroundColor = 'black';
      })
      c.forEach(f=>{
        // f?.setAttribute('style','color:black')
        (f as HTMLElement).style.color = '';
        (f as HTMLElement).style.borderColor = '';
        (f as HTMLElement).style.backgroundColor = 'rgb(0,0,0)';
      })
      let chartContext = this.getContext(this.faturamentoChartBalcaoRef)
      let corFundoGrafico = chartContext?.createLinearGradient(0, 0, 0,250);
      corFundoGrafico?.addColorStop(0,'black'); // Transparente na base
      corFundoGrafico?.addColorStop(1,cor.transparente); // Branco no topo
      this.faturamentoChartBalcao.data.datasets[0].backgroundColor = corFundoGrafico
      this.faturamentoChartBalcao.update()

      this.vendasPorProdutoChartBalcao.options.scales.y.ticks.color = 'black'
      this.estoqueProdutoChartBalcao.options.scales.y.ticks.color = 'black'
      
      this.chartFaturamentoWidgetBalcao.options.scales.y.ticks.color = 'black'
      this.chartTicketMedioWidgetBalcao.options.scales.y.ticks.color = 'black'
      this.chartCancelamentosWidgetBalcao.options.scales.y.ticks.color = 'black'
      this.chartVendasWidgetBalcao.options.scales.y.ticks.color = 'black'
      
      this.faturamentoChartBalcao.update()
      this.vendasPorProdutoChartBalcao.update()
      this.estoqueProdutoChartBalcao.update()
  
      this.chartFaturamentoWidgetBalcao.update()
      this.chartTicketMedioWidgetBalcao.update()
      this.chartCancelamentosWidgetBalcao.update()
      this.chartVendasWidgetBalcao.update()

    }

  }
  constructor(
    private chartService: ChartService,  
    private httpConfigService: HttpServiceService
  ) { }
}
