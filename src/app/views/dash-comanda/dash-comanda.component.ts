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
  selector: 'app-dash-comanda',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dash-comanda.component.html',
  styleUrl: './dash-comanda.component.scss'
})
export class DashComandaComponent implements  OnInit, AfterViewInit {
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
  private faturamentoChartComanda: any
  private vendasPorProdutoChartComanda: any
  private estoqueProdutoChartComanda: any
  
  private chartFaturamentoWidgetComanda: any
  private chartTicketMedioWidgetComanda: any
  private chartVendasWidgetComanda: any
  
  private chartComandasAbertasWidget: any
  
  
  private chartProdutividadeFuncionarioComanda:any
  private chartMesaComanda:any
  @ViewChild('faturamentoChartComandaRef') faturamentoChartComandaRef!: ElementRef;
  @ViewChild('chartProdutividadeFuncionarioComandaRef') chartProdutividadeFuncionarioComandaRef!: ElementRef;
  @ViewChild('vendasPorProdutoChartComandaRef') vendasPorProdutoChartComandaRef!: ElementRef;
  @ViewChild('estoqueProdutoChartComandaRef') estoqueProdutoChartComandaRef!: ElementRef;
  @ViewChild('chartBairrosDeliveryComandaRef') chartBairrosDeliveryComandaRef!: ElementRef;
  @ViewChild('chartFaturamentoWidgetComandaRef') chartFaturamentoWidgetComandaRef!: ElementRef;
  @ViewChild('chartTicketMedioWidgetComandaRef') chartTicketMedioWidgetComandaRef!: ElementRef;
  @ViewChild('chartComandasAbertasWidgetRef') chartComandasAbertasWidgetRef!: ElementRef;
  @ViewChild('chartVendasWidgetComandaRef') chartVendasWidgetComandaRef!: ElementRef;
  @ViewChild('chartMesaComandaRef') chartMesaComandaRef!: ElementRef;


  @ViewChild('chartUaiRangoRef') chartUaiRangoRef!: ElementRef;
  
  
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

    this.faturamentoChartComanda = this.chartService.newchart1('faturamentoChartComanda', this.getContext(this.faturamentoChartComandaRef), 'faturamento')
    this.vendasPorProdutoChartComanda = this.chartService.newchart1('vendasPorProdutoChartComanda', this.getContext(this.vendasPorProdutoChartComandaRef), 'vendasPorProduto','bar','Qtd. Vendida')
    this.estoqueProdutoChartComanda = this.chartService.newchart1('estoqueProdutoChartComanda', this.getContext(this.estoqueProdutoChartComandaRef), 'estoqueProduto','bar')
    
    this.chartFaturamentoWidgetComanda = this.chartService.newchart1('chartFaturamentoWidgetComanda', this.getContext(this.chartFaturamentoWidgetComandaRef), 'widget', 'bar','Vendas R$')
    this.chartTicketMedioWidgetComanda = this.chartService.newchart1('chartTicketMedioWidgetComanda', this.getContext(this.chartTicketMedioWidgetComandaRef), 'widget', 'line', 'Ticket Medio R$')
    this.chartVendasWidgetComanda = this.chartService.newchart1('chartVendasWidgetComanda', this.getContext(this.chartVendasWidgetComandaRef), 'widget', 'bar','Numero de Vendas')
    this.chartProdutividadeFuncionarioComanda = this.chartService.newchart1('chartProdutividadeFuncionarioComanda', this.getContext(this.chartProdutividadeFuncionarioComandaRef), 'produtividadeFuncionario','pie')
    this.chartMesaComanda = this.chartService.newchart1('chartMesaComanda', this.getContext(this.chartMesaComandaRef), 'mesas','bar')
    
    
    this.chartComandasAbertasWidget = this.chartService.newchart1('chartComandasAbertasWidgetRef', this.getContext(this.chartComandasAbertasWidgetRef), 'widget', 'line','Valor da Comanda Aberta')
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

  updateWidgets(widgetVendas:any, widgetComandas:any){
    const diasDaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    this.chartFaturamentoWidgetComanda.data.datasets[0].data = []
    this.chartTicketMedioWidgetComanda.data.datasets[0].data = []
    this.chartVendasWidgetComanda.data.datasets[0].data = []
    this.faturamentoChartComanda.data.labels=[]
    this.chartFaturamentoWidgetComanda.data.labels = diasDaSemana
    this.chartTicketMedioWidgetComanda.data.labels = diasDaSemana
    this.chartVendasWidgetComanda.data.labels = diasDaSemana

    this.widget.total = 0
    this.widget.numeroVendas = 0
    this.widget.comandasAbertas = 0
    this.widget.porDia = {}
    for (let n in widgetVendas){
      let e = widgetVendas[n]
      let data = new Date(e.Datas).toLocaleDateString('pt-br')
      let dia = new Date(e.Datas).getUTCDay()
      this.faturamentoChartComanda.data.labels[n] = data
      this.faturamentoChartComanda.data.datasets[0].data[n]=(Number(e.total).toFixed(2)|| 0)
      
      this.chartFaturamentoWidgetComanda.data.datasets[0].data[dia] = (Number(this.chartFaturamentoWidgetComanda.data.datasets[0].data[dia] || 0) + Number((e.total))).toFixed(2)
      this.chartTicketMedioWidgetComanda.data.datasets[0].data[dia] = (Number(this.chartTicketMedioWidgetComanda.data.datasets[0].data[dia] || 0) + (Number(e.total) / Number(e.numero_vendas))).toFixed(2);
      
      this.widget.total += Number(e.total)
      this.widget.numeroVendas += Number(e.numero_vendas)    
    }
    for (let n in widgetComandas){
      this.chartComandasAbertasWidget.data.labels[n] = `Comanda: ${widgetComandas[n].numero_comanda}`
      this.chartComandasAbertasWidget.data.datasets[0].data[n]= (Number(widgetComandas[n].total).toFixed(2)|| 0)
      this.widget.comandasAbertas += 1

    }

    this.faturamentoChartComanda.update()
    this.chartFaturamentoWidgetComanda.update()
    this.chartTicketMedioWidgetComanda.update()
    this.chartComandasAbertasWidget.update()
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

    this.vendasPorProdutoChartComanda.data.labels = []
    this.vendasPorProdutoChartComanda.data.datasets[0].data = []
    this.estoqueProdutoChartComanda.data.labels = []
    this.estoqueProdutoChartComanda.data.datasets[0].data = []
    for (let produto in an){
      let produtos = an[produto].produto
      let vendas = Number(an[produto].total)
      let estoque = Number(an[produto].estoque)
      let qtdvenda = Number(an[produto].quantidade)
      this.vendasPorProdutoChartComanda.data.labels.push(produtos)  
      this.vendasPorProdutoChartComanda.data.datasets[0].data.push(qtdvenda) 
      this.estoqueProdutoChartComanda.data.labels.push(produtos)  
      this.estoqueProdutoChartComanda.data.datasets[0].data.push(estoque) 
      }
      this.vendasPorProdutoChartComanda.update()
      this.estoqueProdutoChartComanda.update()
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
  updateChartProdutividade(funcionario:any){
    
    this.chartProdutividadeFuncionarioComanda.data.labels = []
    this.chartProdutividadeFuncionarioComanda.data.datasets[0].data = []
    for (let venda in funcionario){
      this.chartProdutividadeFuncionarioComanda.data.labels.push(funcionario[venda].nome)
      this.chartProdutividadeFuncionarioComanda.data.datasets[0].data.push(funcionario[venda].quantidade)
    }
    this.chartProdutividadeFuncionarioComanda.update()
  }
  updateChartMesa(mesas:any){
    this.chartMesaComanda.data.labels = []
    this.chartMesaComanda.data.datasets[0].data = []
    for (let mesa in mesas){
      this.chartMesaComanda.data.labels.push(mesas[mesa].descricao)
      this.chartMesaComanda.data.datasets[0].data.push((Number(mesas[mesa].valor)||0))
    }
    this.chartMesaComanda.update()

  }
  buscarDados(dtInicial:any,dtFinal:any){
    let body={  inicial:dtInicial,final:dtFinal}  
    this.httpConfigService.ConsultarComanda(body).subscribe((element:any)=>{
      let widget = element.comanda
      this.updateWidgets(element.comanda, element.comandas)
      this.updateListaDeProdutos(element.produtos)
      this.updatechartEstoqueAndProduto(element.produtos)
      this.updateChartProdutividade(element.produtividade)
      this.updateChartMesa(element.mesa)
    })   
  }
  ngOnInit(): void {
    this.subscription = this.chartService.myGlobalVariable$.subscribe(
      (newValue) => {
        this.onGlobalVariableChange(newValue); // Dispara a função quando a variável mudar
      }
    );
    console.log(this.cor=='white')
    Chart.register(Colors)
    Chart.register(zoomPlugin)
    this.buscarDados('2024-06-01','2024-08-01')
  }
  dark = false
  cor = ''
  private onGlobalVariableChange(newValue: any) {
    this.dark = true
    let cor = {
      branco:'#ffe5e5',
      transparente:'rgba(255, 255, 255, 0)',
      vermelho:'#af4e55',
      azulClaro:'#84b6f4',
      azul: '#7CBCCB'

    }
    this.verTema()
    if (newValue == ('dark' || 'black')) {
      const b = document.querySelectorAll('#graficoFaturamento')
      const c = document.querySelectorAll('#datePicker')
      this.cor = 'dark'
      b.forEach(e=>{
        (e as HTMLElement).style.backgroundColor =  '#212631b6'
      })
      c.forEach(f=>{
        // f?.setAttribute('style','color:black')
        (f as HTMLElement).style.color = '';
        (f as HTMLElement).style.borderColor = '';
        (f as HTMLElement).style.backgroundColor = '#212631b6';
      })

      this.vendasPorProdutoChartComanda.options.scales.y.ticks.color = 'white'
      this.faturamentoChartComanda.options.scales.y.ticks.color = 'white'
      this.estoqueProdutoChartComanda.options.scales.y.ticks.color = 'white'
      this.chartProdutividadeFuncionarioComanda.options.scales.x.ticks.color = 'white'
      this.chartMesaComanda.options.scales.y.ticks.color = 'white'
    
      
      this.vendasPorProdutoChartComanda.update()
      this.faturamentoChartComanda.update()
      this.estoqueProdutoChartComanda.update()
      this.chartProdutividadeFuncionarioComanda.update()
      this.chartMesaComanda.update()

    }else{
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
      let chartContext = this.getContext(this.faturamentoChartComandaRef)
      let corFundoGrafico = chartContext?.createLinearGradient(0, 0, 0,250);
      corFundoGrafico?.addColorStop(0,'black'); // Transparente na base
      corFundoGrafico?.addColorStop(1,cor.transparente); // Branco no topo
      this.faturamentoChartComanda.data.datasets[0].backgroundColor = corFundoGrafico
      this.faturamentoChartComanda.update()

      this.vendasPorProdutoChartComanda.options.scales.y.ticks.color = 'black'
      this.faturamentoChartComanda.options.scales.y.ticks.color = 'black'
      this.estoqueProdutoChartComanda.options.scales.y.ticks.color = 'black'
      this.chartProdutividadeFuncionarioComanda.options.scales.x.ticks.color = 'black'
      this.chartMesaComanda.options.scales.y.ticks.color = 'black'
    
      
      this.vendasPorProdutoChartComanda.update()
      this.faturamentoChartComanda.update()
      this.estoqueProdutoChartComanda.update()
      this.chartProdutividadeFuncionarioComanda.update()
      this.chartMesaComanda.update()

    }

  }
 


  constructor(
    private chartService: ChartService,  
    private httpConfigService: HttpServiceService
  ) { }

}
