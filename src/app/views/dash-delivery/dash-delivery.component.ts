import {HttpServiceService} from './../../http-service.service'
import { ElementRef, ViewChild, AfterViewInit, Component, inject, OnInit, } from '@angular/core';
import { ColorModeService, ThemeDirective } from '@coreui/angular';
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
export interface delivery{
  origem:any,
  total:any,
  ticketMedio:any,
  NumeroPedidos:any
}
@Component({
  selector: 'app-dash-delivery',
  standalone: true,
  imports: [
    SharedModule,
  ],
  templateUrl: './dash-delivery.component.html',
  styleUrl: './dash-delivery.component.scss'
})
export class DashDeliveryComponent implements OnInit, AfterViewInit {
  widget = {
    total: 0,
    porDia:{} as any,
    numeroVendas:0,
    ticketMedio:0,
    cancelamentos:0
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
  private faturamentoChart: any
  private chartMotoboy: any
  private chartBairros: any
  private vendasPorProdutoChart: any
  private estoqueProdutoChart: any
  private chartIfood: any
  private chartUpzap: any
  private chartEstabelecimento: any
  private chartAiqfome: any
  private chartUaiRango: any
  private chartBairrosDelivery: any
  private chartFaturamentoWidget: any
  private chartTicketMedioWidget: any
  private chartCancelamentosWidget: any
  private chartVendasWidget: any
  @ViewChild('faturamentoChartRef') faturamentoChartRef!: ElementRef;
  @ViewChild('chartMotoboyRef') chartMotoboyRef!: ElementRef;
  @ViewChild('chartBairrosRef') chartBairrosRef!: ElementRef;
  @ViewChild('vendasPorProdutoChartRef') vendasPorProdutoChartRef!: ElementRef;
  @ViewChild('estoqueProdutoChartRef') estoqueProdutoChartRef!: ElementRef;
  @ViewChild('chartBairrosDeliveryRef') chartBairrosDeliveryRef!: ElementRef;
  @ViewChild('chartFaturamentoWidgetRef') chartFaturamentoWidgetRef!: ElementRef;
  @ViewChild('chartTicketMedioWidgetRef') chartTicketMedioWidgetRef!: ElementRef;
  @ViewChild('chartCancelamentosWidgetRef') chartCancelamentosWidgetRef!: ElementRef;
  @ViewChild('chartVendasWidgetRef') chartVendasWidgetRef!: ElementRef;
  @ViewChild('chartAiqfomeRef') chartAiqfomeRef!: ElementRef;
  @ViewChild('chartIfoodRef') chartIfoodRef!: ElementRef;
  @ViewChild('chartUpzapRef') chartUpzapRef!: ElementRef;
  @ViewChild('chartEstabelecimentoRef') chartEstabelecimentoRef!: ElementRef;
  
  @ViewChild('chartUaiRangoRef') chartUaiRangoRef!: ElementRef;
  
  @ViewChild('graficoFaturamentoRef')  graficoFaturamentoRef!: ElementRef;
  
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
    this.buscarDados('2024-01-01','2024-08-01')

    this.faturamentoChart = this.chartService.newchart1('faturamentoChart', this.getContext(this.faturamentoChartRef), 'faturamento')
    this.vendasPorProdutoChart = this.chartService.newchart1('vendasPorProdutoChart', this.getContext(this.vendasPorProdutoChartRef), 'vendasPorProduto','bar','Qtd. Vendida')
    this.estoqueProdutoChart = this.chartService.newchart1('estoqueProdutoChart', this.getContext(this.estoqueProdutoChartRef), 'estoqueProduto','bar')
    this.chartMotoboy = this.chartService.newchart1('chartMotoboyDelivery', this.getContext(this.chartMotoboyRef), 'chartMotoboy','bar')
    this.chartBairrosDelivery = this.chartService.newchart1('chartBairrosDelivery', this.getContext(this.chartBairrosDeliveryRef), 'vendasPorBairros','pie')

    this.chartFaturamentoWidget = this.chartService.newchart1('chartFaturamentoWidget', this.getContext(this.chartFaturamentoWidgetRef), 'widget', 'bar','Vendas R$')
    this.chartTicketMedioWidget = this.chartService.newchart1('chartTicketMedioWidget', this.getContext(this.chartTicketMedioWidgetRef), 'widget', 'line', 'Ticket Medio R$')
    this.chartCancelamentosWidget = this.chartService.newchart1('chartCancelamentosWidget', this.getContext(this.chartCancelamentosWidgetRef), 'widget', 'line','Numero de Cancelamentos')
    this.chartVendasWidget = this.chartService.newchart1('chartVendasWidget', this.getContext(this.chartVendasWidgetRef), 'widget', 'bar','Numero de Vendas')
    // newchart1(
    //   chartname:any,
    //   chartContext:any,
    //   tipoGrafico:any,
    //   type?:any,
    //   labelData?:any,
    //   corGrafico?:any
    // )
    try{
      this.chartAiqfome = this.chartService.newchart1('chartAiqfome', this.getContext(this.chartAiqfomeRef), 'delivery','','','#800080')
      this.chartIfood = this.chartService.newchart1('chartIfood', this.getContext(this.chartIfoodRef), 'delivery','','','red')
      this.chartUpzap = this.chartService.newchart1('chartUpzap', this.getContext(this.chartUpzapRef), 'delivery','','','green')
      this.chartEstabelecimento = this.chartService.newchart1('chartEstabelecimento', this.getContext(this.chartEstabelecimentoRef), 'delivery','','','black')
      this.chartUaiRango = this.chartService.newchart1('chartUaiRango', this.getContext(this.chartUaiRangoRef), 'delivery','','','orange')

    }catch(err){console.log(err)}
    this.cor == 'white' ? this.onGlobalVariableChange('white') : this.onGlobalVariableChange('dark')

  }

  verTema() {
    console.log(this.chartService.temaAtual)
  }
  cardClass = [
    false,
    false,
    false,
    false,
  ]
  private subscription?: Subscription;
  public currentGlobalValue?: string;
  readonly #colorModeService = inject(ColorModeService);
  readonly colorMode = this.#colorModeService.colorMode;

  updateWidgets(widget:any){
    const diasDaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    this.chartFaturamentoWidget.data.datasets[0].data = []
    this.chartTicketMedioWidget.data.datasets[0].data = []
    this.chartCancelamentosWidget.data.datasets[0].data = []
    this.chartVendasWidget.data.datasets[0].data = []
    this.faturamentoChart.data.labels=[]
    this.chartFaturamentoWidget.data.labels = diasDaSemana
    this.chartTicketMedioWidget.data.labels = diasDaSemana
    this.chartCancelamentosWidget.data.labels = diasDaSemana
    this.chartVendasWidget.data.labels = diasDaSemana
    this.widget.total = 0
    this.widget.numeroVendas = 0
    this.widget.cancelamentos = 0
    this.widget.porDia = {}
    for (let n in widget){
      let e = widget[n]
      let data = new Date(e.DIA).toLocaleDateString('pt-br')
      let dia = new Date(e.DIA).getUTCDay()
      this.faturamentoChart.data.labels[n] = data
      this.faturamentoChart.data.datasets[0].data[n]=(Number(e.FATURAMENTO_DELIVERY).toFixed(2)|| 0)
      
      this.chartFaturamentoWidget.data.datasets[0].data[dia] = (Number(this.chartFaturamentoWidget.data.datasets[0].data[dia] || 0) + Number((e.FATURAMENTO_DELIVERY))).toFixed(2)
      this.chartTicketMedioWidget.data.datasets[0].data[dia] = (Number(this.chartTicketMedioWidget.data.datasets[0].data[dia] || 0) + (Number(e.FATURAMENTO_DELIVERY) / Number(e.NUMERO_VENDAS))).toFixed(2);
      this.chartCancelamentosWidget.data.datasets[0].data[dia]  = (Number(this.chartCancelamentosWidget.data.datasets[0].data[dia]||0) + (Number(e.VENDAS_CANCELADAS))).toFixed(0)
      this.chartVendasWidget.data.datasets[0].data[dia] = (Number(this.chartVendasWidget.data.datasets[0].data[dia] || 0) + (Number(e.NUMERO_VENDAS))).toFixed(0)


      this.widget.total += Number(e.FATURAMENTO_DELIVERY)
      this.widget.numeroVendas += Number(e.NUMERO_VENDAS)
      this.widget.cancelamentos += Number(e.VENDAS_CANCELADAS)        
    }
    this.faturamentoChart.update()
    this.chartFaturamentoWidget.update()
    this.chartTicketMedioWidget.update()
    this.chartCancelamentosWidget.update()
    this.chartVendasWidget.update()
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
    vendasDelivery: [
      {
        origem: "aiqfome",
        vendaTotal: 100,
        ticketMedio: 123,
        numeroDePedidos: 20,
        // cor:'#86137D'
      },
      {
        origem: "ifood",
        vendaTotal: 1200,
        ticketMedio: 111,
        numeroDePedidos: 45,
        // cor:'#EA1D29'
      },
      {
        origem: "uairango",
        vendaTotal: 1005,
        ticketMedio: 122,
        numeroDePedidos: 20,
        // cor:'#FF4F01'
      },
      {
        origem: "upzap",
        vendaTotal: 1450,
        ticketMedio: 121,
        numeroDePedidos: 44,
        // cor:'#78C67B'
      },
      {
        origem: "Estabelecimento",
        vendaTotal: 1450,
        ticketMedio: 121,
        numeroDePedidos: 44,
        // cor:'black'
      },
    ]
  }

  updatechartEstoqueAndProduto(an:any){

    this.vendasPorProdutoChart.data.labels = []
    this.vendasPorProdutoChart.data.datasets[0].data = []
    this.estoqueProdutoChart.data.labels = []
    this.estoqueProdutoChart.data.datasets[0].data = []
    for (let produto in an){
      let produtos = an[produto].produto
      let vendas = Number(an[produto].venda)
      let estoque = Number(an[produto].estoque)
      let qtdvenda = Number(an[produto].quantidade)
      this.vendasPorProdutoChart.data.labels.push(produtos)  
      this.vendasPorProdutoChart.data.datasets[0].data.push(qtdvenda) 
      this.estoqueProdutoChart.data.labels.push(produtos)  
      this.estoqueProdutoChart.data.datasets[0].data.push(estoque) 
      }
      this.vendasPorProdutoChart.update()
      this.estoqueProdutoChart.update()
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
  updateChartMotoboy(entregas:any){
   
    
    this.chartMotoboy.data.labels = []
    this.chartMotoboy.data.datasets[0].data = []
    for (let entrega in entregas){
      this.chartMotoboy.data.labels.push(entregas[entrega].NOME_FUNCIONARIO)
      this.chartMotoboy.data.datasets[0].data.push(entregas[entrega].TOTAL_ENTREGAS)
    }
    this.chartMotoboy.update()
  }

  updateChartBairros(bairros:any){
    this.chartBairrosDelivery.data.labels = []
    this.chartBairrosDelivery.data.datasets[0].data = []
    // console.log(bairros)
    for (let entrega in bairros){
      // console.log(bairros[entrega].bairro)
      // console.log(bairros[entrega].vendas)
      this.chartBairrosDelivery.data.labels.push(bairros[entrega].bairro)
      this.chartBairrosDelivery.data.datasets[0].data.push(bairros[entrega].vendas)
    }
    this.chartBairrosDelivery.update()

  }
  buscarDados(dtInicial:any,dtFinal:any){
    let body={  inicial:dtInicial,final:dtFinal}  
    this.httpConfigService.ConsultarDelivery(body).subscribe((element:any)=>{
      let widget = element.widgetDelivery

      this.updateWidgets(widget)
      let deliveryCard = {"aiqfome":element.aiqfome,"ifood":element.ifood,"upzap":element.upzap,"estabelecimento":element.estabelecimento,"uairango":element.uairango}
      this.updateDeliveryCard(deliveryCard)
      this.updateListaDeProdutos(element.vendasProdutoDelivery.totais)
      this.updatechartEstoqueAndProduto(element.vendasProdutoDelivery.totais)
      this.updateChartMotoboy(element.produtividadeMotoboy)
      this.updateChartBairros(element.vendasPorBairro)
    })   
  }
  deliverys = [
  {
    origem:'ifood',
    total:0,
    ticketMedio:0,
    NumeroPedidos:0
  },
  {
    origem:'aiqfome',
    total:0,
    ticketMedio:0,
    NumeroPedidos:0
  },
  {
    origem:'upzap',
    total:0,
    ticketMedio:0,
    NumeroPedidos:0
  },
  {
    origem:'Estabelecimento',
    total:0,
    ticketMedio:0,
    NumeroPedidos:0
  },
  {
    origem:'uairango',
    total:0,
    ticketMedio:0,
    NumeroPedidos:0
  }
  ]
  updateCardDelivery(deliver:any,index:any,chart?:any){
    for(let venda in deliver){
      let total =  Number(deliver[venda].TOTAL)
      this.deliverys[1].total += Number(total)


    }
  }
  updateDeliveryCard(deliveryCard:any){
    for (let n in deliveryCard){
      let deliver = deliveryCard[n]    
      switch (n){
        case 'ifood':
          // this.updateCardDelivery(deliverys,0)

          break
          case 'aiqfome':  
          this.deliverys[1].total = 0
          this.deliverys[1].NumeroPedidos = 0
          this.chartAiqfome.data.labels = []
          this.chartAiqfome.data.datasets[0].data = []
          for(let venda in deliver){
              let date = new Date(deliver[venda].DATAS)
              let data = `${date.getDate()}/${date.getMonth()+1}`
              let total = Number(deliver[venda].TOTAL)
              let totalVendas = Number(deliver[venda].TOTAL_PEDIDOS)
              this.deliverys[1].total += total
              this.deliverys[1].NumeroPedidos += totalVendas
              this.chartAiqfome.data.labels.push(data)
              this.chartAiqfome.data.datasets[0].data.push(total)
              
            }
            this.chartAiqfome.update()

          break
        case 'upzap':
          // this.updateCardDelivery(deliveryCard[n],2)
          break
        case 'Estabelecimento':
          // this.updateCardDelivery(deliveryCard[n],3)
          break
        case 'uairango':
          // this.updateCardDelivery(deliveryCard[n],4)
          break
        }
      }
  }
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
      this.cor = 'dark'
      const b = document.querySelectorAll('#graficoFaturamento')
      // const c = document.querySelectorAll('#datePicker')
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
      // let grafico = this.getContext(this.faturamentoChartRef)
      // let corFundoGrafico = grafico?.createLinearGradient(0, 0, 0, 250);
      let corFundoGrafico = 'black'
      // corFundoGrafico?.addColorStop(0,'rgb(255,255,255,1)'); 
      // corFundoGrafico?.addColorStop(0.5,'rgb(255,255,255,0.5)'); 
      // corFundoGrafico?.addColorStop(1,'rgb(0,0,0,1)') 
      this.faturamentoChart.data.datasets[0].backgroundColor = '#212631b6'
      this.faturamentoChart.data.datasets[0].borderColor = 'white'
      this.faturamentoChart.update()

      this.vendasPorProdutoChart.options.scales.y.ticks.color = 'white'
      this.estoqueProdutoChart.options.scales.y.ticks.color = 'white'
      this.chartMotoboy.options.scales.x.ticks.color = 'white'
      this.chartBairrosDelivery.options.scales.y.ticks.color = 'white'
      
      this.chartFaturamentoWidget.options.scales.y.ticks.color = 'white'
      this.chartTicketMedioWidget.options.scales.y.ticks.color = 'white'
      this.chartCancelamentosWidget.options.scales.y.ticks.color = 'white'
      this.chartVendasWidget.options.scales.y.ticks.color = 'white'
      
      this.faturamentoChart.update()
      this.vendasPorProdutoChart.update()
      this.estoqueProdutoChart.update()
      this.chartMotoboy.update()
      this.chartBairrosDelivery.update()
  
      this.chartFaturamentoWidget.update()
      this.chartTicketMedioWidget.update()
      this.chartCancelamentosWidget.update()
      this.chartVendasWidget.update()

    }else{
      this.cor = 'white'
      const b = document.querySelectorAll('#graficoFaturamento')
      const c = document.querySelectorAll('.date')
      b.forEach(e=>{
        (e as HTMLElement).style.backgroundColor = 'black';
      })
      c.forEach(f=>{
        // f?.setAttribute('style','color:black')
        (f as HTMLElement).style.color = '';
        (f as HTMLElement).style.borderColor = '';
        (f as HTMLElement).style.backgroundColor = 'rgb(0,0,0)';
      })
      let chartContext = this.getContext(this.faturamentoChartRef)
      let corFundoGrafico = chartContext?.createLinearGradient(0, 0, 0,250);
      corFundoGrafico?.addColorStop(0,'black'); // Transparente na base
      corFundoGrafico?.addColorStop(1,cor.transparente); // Branco no topo
      this.faturamentoChart.data.datasets[0].backgroundColor = corFundoGrafico
      this.faturamentoChart.update()

      this.vendasPorProdutoChart.options.scales.y.ticks.color = 'white'
      this.estoqueProdutoChart.options.scales.y.ticks.color = 'white'
      this.chartMotoboy.options.scales.x.ticks.color = 'white'
      this.chartBairrosDelivery.options.scales.y.ticks.color = 'white'
      
      this.chartFaturamentoWidget.options.scales.y.ticks.color = 'white'
      this.chartTicketMedioWidget.options.scales.y.ticks.color = 'white'
      this.chartCancelamentosWidget.options.scales.y.ticks.color = 'white'
      this.chartVendasWidget.options.scales.y.ticks.color = 'white'
      
      this.faturamentoChart.update()
      this.vendasPorProdutoChart.update()
      this.estoqueProdutoChart.update()
      this.chartMotoboy.update()
      this.chartBairrosDelivery.update()
  
      this.chartFaturamentoWidget.update()
      this.chartTicketMedioWidget.update()
      this.chartCancelamentosWidget.update()
      this.chartVendasWidget.update()

    }

  }
  cor = ''
  ngOnInit(): void {
    this.subscription = this.chartService.myGlobalVariable$.subscribe(
      (newValue) => {
        this.onGlobalVariableChange(newValue); // Dispara a função quando a variável mudar
      }
    );
  }
  dark = false

  constructor(
    private chartService: ChartService,  
    private httpConfigService: HttpServiceService
  ) { }
}
