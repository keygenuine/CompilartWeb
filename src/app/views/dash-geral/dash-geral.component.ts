
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
  selector: 'app-dash-geral',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dash-geral.component.html',
  styleUrl: './dash-geral.component.scss'
})
export class DashGeralComponent implements OnInit,AfterViewInit {
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

  private faturamentoChartGeral: any
  
  private vendasPorProdutoChartGeral: any
  private estoqueProdutoChartGeral: any
  
  private chartFaturamentoWidgetGeral: any
  private chartTicketMedioWidgetGeral: any
  private chartCancelamentosWidgetGeral: any
  private chartVendasWidgetGeral: any
  
  private chartVendaComandaGeral: any
  private chartVendaBalcaoGeral: any
  
  // private chartProdutividadeFuncionarioComanda:any
  // private chartMesaComanda:any
  @ViewChild('faturamentoChartGeralRef') faturamentoChartGeralRef!: ElementRef;

  // @ViewChild('chartVendaBalcaoGeralRef') chartVendaBalcaoGeralRef!: ElementRef;
  @ViewChild('chartVendaComandaGeralRef') chartVendaComandaGeralRef!: ElementRef;
  
  @ViewChild('chartFaturamentoWidgetGeralRef') chartFaturamentoWidgetGeralRef!: ElementRef;
  @ViewChild('chartTicketMedioWidgetGeralRef') chartTicketMedioWidgetGeralRef!: ElementRef;
  @ViewChild('chartCancelamentosWidgetGeralRef') chartCancelamentosWidgetGeralRef!: ElementRef;
  @ViewChild('chartVendasWidgetGeralRef') chartVendasWidgetGeralRef!: ElementRef;

  @ViewChild('vendasPorProdutoChartGeralRef') vendasPorProdutoChartGeralRef!: ElementRef;
  @ViewChild('estoqueProdutoChartGeralRef') estoqueProdutoChartGeralRef!: ElementRef;

 
  
  
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
  }
  ngAfterViewInit(): void {
    flatpickr("#datePicker", {
      dateFormat: "Y-m-d",
      locale: Portuguese, 
    });
    Chart.register(Colors)
    Chart.register(zoomPlugin)
    this.buscarDados('2024-06-01','2024-08-01')

    this.faturamentoChartGeral = this.chartService.newchart1('faturamentoChartGeral', this.getContext(this.faturamentoChartGeralRef), 'faturamento')


    this.chartFaturamentoWidgetGeral = this.chartService.newchart1('chartFaturamentoWidgetGeral', this.getContext(this.chartFaturamentoWidgetGeralRef), 'widget', 'bar','Vendas R$')
    this.chartTicketMedioWidgetGeral = this.chartService.newchart1('chartTicketMedioWidgetGeral', this.getContext(this.chartTicketMedioWidgetGeralRef), 'widget', 'line', 'Ticket Medio R$')
    this.chartCancelamentosWidgetGeral = this.chartService.newchart1('chartCancelamentosWidgetGeral', this.getContext(this.chartVendasWidgetGeralRef), 'widget', 'bar','Numero de Cancelamentos')
    this.chartVendasWidgetGeral = this.chartService.newchart1('chartVendasWidgetGeral', this.getContext(this.chartCancelamentosWidgetGeralRef), 'widget', 'line','Numero de Vendas')

    this.vendasPorProdutoChartGeral = this.chartService.newchart1('vendasPorProdutoChartGeral', this.getContext(this.estoqueProdutoChartGeralRef), 'vendasPorProduto','bar','Qtd. Vendida')
    this.estoqueProdutoChartGeral = this.chartService.newchart1('estoqueProdutoChartGeral', this.getContext(this.estoqueProdutoChartGeralRef), 'estoqueProduto','bar')

    // this.chartVendaBalcaoGeral = this.chartService.newchart1('chartVendaBalcaoGeral', this.getContext(this.chartVendaBalcaoGeralRef), 'faturamento','line','Venda Balcao')
    this.chartVendaComandaGeral = this.chartService.newchart2('chartVendaComandaGeral', this.getContext(this.chartVendaComandaGeralRef), 'faturamento')
    this.cor == 'white' ? this.onGlobalVariableChange('white') : this.onGlobalVariableChange('dark')
    // newchart1(
    //   chartname:any,
    //   chartContext:any,
    //   tipoGrafico:any,
    //   type?:any,
    //   labelData?:any,
    //   corGrafico?:any
    // )
  }

  verTema() {
    console.log(this.chartService.temaAtual)
  }

  private subscription?: Subscription;
  public currentGlobalValue?: string;
  readonly #colorModeService = inject(ColorModeService);
  readonly colorMode = this.#colorModeService.colorMode;

  updateWidgets(widgetVendas:any, widgetCancelamentos?:any){
    this.faturamentoChartGeral.data.labels=[]

    const diasDaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    this.chartFaturamentoWidgetGeral.data.datasets[0].data = []
    this.chartTicketMedioWidgetGeral.data.datasets[0].data = []
    this.chartCancelamentosWidgetGeral.data.datasets[0].data = []
    this.chartVendasWidgetGeral.data.datasets[0].data = []

    this.chartFaturamentoWidgetGeral.data.labels = diasDaSemana
    this.chartTicketMedioWidgetGeral.data.labels = diasDaSemana
    this.chartCancelamentosWidgetGeral.data.labels = diasDaSemana
    this.chartVendasWidgetGeral.data.labels = diasDaSemana

    
    this.widget.total = 0
    this.widget.numeroVendas = 0
    this.widget.comandasAbertas = 0
    this.widget.porDia = {}
    for (let n in widgetVendas){
      let e = widgetVendas[n]
      let data = new Date(e.Datas).toLocaleDateString('pt-br')
      let dia = new Date(e.Datas).getUTCDay()
      this.faturamentoChartGeral.data.labels[n] = data
      this.faturamentoChartGeral.data.datasets[0].data[n]=(Number(e.total).toFixed(2)|| 0)

      this.chartFaturamentoWidgetGeral.data.datasets[0].data[dia] = (Number(this.chartFaturamentoWidgetGeral.data.datasets[0].data[dia] || 0) + Number((e.total))).toFixed(2)
      this.chartTicketMedioWidgetGeral.data.datasets[0].data[dia] = (Number(this.chartTicketMedioWidgetGeral.data.datasets[0].data[dia] || 0) + (Number(e.total) / Number(e.numero_vendas))).toFixed(2);
      this.chartVendasWidgetGeral.data.datasets[0].data[dia] = (Number(this.chartVendasWidgetGeral.data.datasets[0].data[dia] || 0) + (Number(e.numero_vendas) )).toFixed(2);
      
      this.widget.total += Number(e.total)
      this.widget.numeroVendas += Number(e.numero_vendas)    
    }
    // for (let n in widgetCancelamentos){
    //   this.chartCancelamentosWidgetGeral.data.labels[n] = `${widgetCancelamentos[n].data}`
    //   this.chartCancelamentosWidgetGeral.data.datasets[0].data[n]= (Number(widgetCancelamentos[n].quantidade).toFixed(2)|| 0)
    //   // this.widget.comandasAbertas += 1

    // }
  

    this.faturamentoChartGeral.update()
    this.chartFaturamentoWidgetGeral.update()
    this.chartTicketMedioWidgetGeral.update()
    this.chartVendasWidgetGeral.update()
    // this.chartCancelamentosWidgetGeral.update()
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

    this.vendasPorProdutoChartGeral.data.labels = []
    this.vendasPorProdutoChartGeral.data.datasets[0].data = []
    this.estoqueProdutoChartGeral.data.labels = []
    this.estoqueProdutoChartGeral.data.datasets[0].data = []
    for (let produto in an){
      let produtos = an[produto].produto
      let vendas = Number(an[produto].total)
      let estoque = Number(an[produto].estoque)
      let qtdvenda = Number(an[produto].quantidade)
      this.vendasPorProdutoChartGeral.data.labels.push(produtos)  
      this.vendasPorProdutoChartGeral.data.datasets[0].data.push(qtdvenda) 
      this.estoqueProdutoChartGeral.data.labels.push(produtos)  
      this.estoqueProdutoChartGeral.data.datasets[0].data.push(estoque) 
      }
      this.vendasPorProdutoChartGeral.update()
      this.estoqueProdutoChartGeral.update()
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


  buscarDados(dtInicial:any,dtFinal:any){

    let body={  inicial:dtInicial,final:dtFinal}  
    this.httpConfigService.ConsultarGeral(body).subscribe((element:any)=>{
      this.updateWidgets(element.geralFaturamento)
      this.updateListaDeProdutos(element.produtos)
      this.updatechartEstoqueAndProduto(element.produtos)
    })   
  }
  private onGlobalVariableChange(newValue: any) {
    let cor = {
      branco:'#ffe5e5',
      transparente:'rgba(255, 255, 255, 0)',
      vermelho:'#af4e55',
      azulClaro:'#84b6f4',
      azul: '#7CBCCB'

    }
    if (newValue == 'dark')  {
      this.cor == 'dark'
      const b = document.querySelectorAll('#graficoFaturamento')
         const c = document.querySelectorAll('.datepick')
      b.forEach(e=>{
        (e as HTMLElement).style.backgroundColor =  '#212631b6'
      })
      c.forEach(f=>{
        // f?.setAttribute('style','color:black')
        (f as HTMLElement).style.color = '';
        (f as HTMLElement).style.borderColor = '';
        (f as HTMLElement).style.backgroundColor = '#212631b6';
      })
      this.faturamentoChartGeral.data.datasets[0].backgroundColor = 'rgb(0,0,0,0)'
      this.faturamentoChartGeral.data.datasets[0].borderColor = 'white'
      this.faturamentoChartGeral.options.scales.y.ticks.color = 'white'
      this.faturamentoChartGeral.update()

      this.vendasPorProdutoChartGeral.options.scales.y.ticks.color = 'white'
      this.estoqueProdutoChartGeral.options.scales.y.ticks.color = 'white'

      
      this.chartFaturamentoWidgetGeral.options.scales.y.ticks.color = 'white'
      this.chartTicketMedioWidgetGeral.options.scales.y.ticks.color = 'white'
      this.chartCancelamentosWidgetGeral.options.scales.y.ticks.color = 'white'
      this.chartVendasWidgetGeral.options.scales.y.ticks.color = 'white'
      
      this.vendasPorProdutoChartGeral.update()
      this.estoqueProdutoChartGeral.update()
  
      this.chartFaturamentoWidgetGeral.update()
      this.chartTicketMedioWidgetGeral.update()
      this.chartCancelamentosWidgetGeral.update()
      this.chartVendasWidgetGeral.update()

    }else{
      this.cor = 'white'
      const b = document.querySelectorAll('#graficoFaturamento')
      const c = document.querySelectorAll('.datepick')
      b.forEach(e=>{
        (e as HTMLElement).style.backgroundColor = 'black';
      })
      c.forEach(f=>{
        // f?.setAttribute('style','color:black')
        (f as HTMLElement).style.color = '';
        (f as HTMLElement).style.borderColor = '';
        (f as HTMLElement).style.backgroundColor = 'rgb(0,0,0)';
      })
      let chartContext = this.getContext(this.faturamentoChartGeralRef)
      let corFundoGrafico = chartContext?.createLinearGradient(0, 0, 0,250);
      corFundoGrafico?.addColorStop(0,'black'); // Transparente na base
      corFundoGrafico?.addColorStop(1,cor.transparente); // Branco no topo
      this.faturamentoChartGeral.data.datasets[0].backgroundColor =corFundoGrafico
      this.faturamentoChartGeral.update()


      this.vendasPorProdutoChartGeral.options.scales.y.ticks.color = 'black'
      this.estoqueProdutoChartGeral.options.scales.y.ticks.color = 'black'
      
      this.chartFaturamentoWidgetGeral.options.scales.y.ticks.color = 'black'
      this.chartTicketMedioWidgetGeral.options.scales.y.ticks.color = 'black'
      this.chartCancelamentosWidgetGeral.options.scales.y.ticks.color = 'black'
      this.chartVendasWidgetGeral.options.scales.y.ticks.color = 'black'

      this.vendasPorProdutoChartGeral.update()
      this.estoqueProdutoChartGeral.update()
  
      this.chartFaturamentoWidgetGeral.update()
      this.chartTicketMedioWidgetGeral.update()
      this.chartCancelamentosWidgetGeral.update()
      this.chartVendasWidgetGeral.update()

    }

  }
  ngOnInit(): void {
    // this.faturamentoChartGeral.data.datasets.push(this.faturamentoChartGeral.data.datasets[0])
    
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
  cor =''

  constructor(
    private chartService: ChartService,  
    private httpConfigService: HttpServiceService
  ) { }
}
