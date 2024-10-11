import { style } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Chart,registerables } from 'chart.js';
import { color } from 'chart.js/helpers';
import { Observable, Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private myGlobalVariableSubject = new BehaviorSubject<string>('light');
  public myGlobalVariable$ = this.myGlobalVariableSubject.asObservable();

  setGlobalVariable(newValue: string) {
    this.myGlobalVariableSubject.next(newValue);
  }
  getGlobalVariable() {
    return this.myGlobalVariableSubject.getValue();
  }
  public temaAtual: any;
  labels = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ];
  public colorChartX = 'white'
  newchart2(
    chartname:any,
    chartContext:any,
    tipoGrafico:any,
    type?:any,
    labelData?:any,
    corGrafico?:any
  ){
    let data = []
    let tituloGrafico:any
    let corFundoGrafico:any
    let displayLeganda:any
    let displayX=true
    let displayGridX=true
    let displayY=true
    let displayGridY=true
    let paddingBottom = 0
    let paddingTop = 0
    let typeChart:any = 'line'
    let legendPosition:any = 'top'
    let borderRad = 1
    let corVerde = '#00ff26'

    let borderColor = '#32ba4600'


    let lineTension = 0.4 
    let radiusPoint = 0
    let pointBackgroundColor = ''
    let label = 'Vendas R$'
    let index = 'x'
    let cor = {
      branco:'#ffe5e5',
      transparente:'rgba(255, 255, 255, 0)',
      vermelho:'#af4e55',
      azulClaro:'#84b6f4',
      azul: '#7CBCCB'

    }
    switch(tipoGrafico){
      case 'faturamento':
        lineTension = 0.2
        tituloGrafico = labelData||'Faturamento'
        displayLeganda = true
        displayX = false
        displayY = false
        paddingBottom = 20
        corFundoGrafico = chartContext?.createLinearGradient(0, 0, 0,650);
        corFundoGrafico?.addColorStop(0,'black'); // Transparente na base
        corFundoGrafico?.addColorStop(1,cor.transparente); // Branco no topo
        borderColor = 'rgba(255, 255, 255, 0.438)'
        break;

      }
    return new Chart(chartname,{
      type: type || 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: label || 'vendas Comanda R$',
            data: [1,2,3,4,15,6,37,48,59,10,15,12] ,
            fill: true,
            // backgroundColor:'#7cbdcb73',
            backgroundColor:'rgb(0,0,0,0)',
            borderRadius: borderRad,
            pointBackgroundColor:pointBackgroundColor,
            borderColor: '#7cbdcb'
            // color:'white'
          },
          {
            label: label || 'vendas Balcao R$',
            data: [1,32,23,4,15,6,37,8,59,12,15,12] ,
            fill: true,
            // backgroundColor:'#b04e587a',
            backgroundColor:'rgb(0,0,0,0)',
            borderRadius: borderRad,
            pointBackgroundColor:pointBackgroundColor,
            borderColor: '#b04e58'
            // color:'white'
          },
          {
            label: label || 'vendas Delivery R$',
            data: [11,2,3,14,15,6,37,8,69,10,15,12] ,
            fill: true,
            // backgroundColor:'#32ba4669',
            backgroundColor:'rgb(0,0,0,0)',
            borderRadius: borderRad,
            pointBackgroundColor:pointBackgroundColor,
            borderColor: '#32ba46'
            // color:'white'
          }
        ]
      },
      options:{
        plugins:{
          legend:{
            display: displayLeganda,
            position: legendPosition,
          },
          colors:{
            enabled:true
          },
          title: {
            display: true,
            text: tituloGrafico
          },
          
          
        },
        indexAxis: index,
        scales: {
          x: {
            beginAtZero: false,
              display:displayX , // Hides labels and chart lines of the x-axis
              grid:{
                display:displayGridX
              },
              ticks: {
                color: 'black'
              }
            },
          y:{
            beginAtZero: false,
              display:displayY,
              grid:{
                display:displayGridY
              },
              ticks: {
                color: 'black'
              }
          }
        },
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: lineTension
          },
          point: {
            radius: radiusPoint,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3
          }
        },
        layout:{
          padding:{
            bottom:paddingBottom,
            top:paddingTop
          }
        }
      }
    })
  }
  
  
  newchart1(
    chartname:any,
    chartContext:any,
    tipoGrafico:any,
    type?:any,
    labelData?:any,
    corGrafico?:any
  ){
    let data = []
    let tituloGrafico:any
    let corFundoGrafico:any
    let displayLeganda:any
    let displayX=true
    let displayGridX=true
    let displayY=true
    let displayGridY=true
    let paddingBottom = 0
    let paddingTop = 0
    let typeChart:any = 'line'
    let legendPosition:any = 'top'
    let borderRad = 1
    let corVerde = '#00ff26'

    let borderColor = '#32ba4600'


    let lineTension = 0.4 
    let radiusPoint = 0
    let pointBackgroundColor = ''
    let label = 'Vendas R$'
    let index = 'x'
    let cor = {
      branco:'#ffe5e5',
      transparente:'rgba(255, 255, 255, 0)',
      vermelho:'#af4e55',
      azulClaro:'#84b6f4',
      azul: '#7CBCCB'

    }
    switch(tipoGrafico){
      case 'faturamento':
        lineTension = 0.2
        tituloGrafico = labelData||'Faturamento'
        displayLeganda = true
        displayX = false
        displayY = false
        paddingBottom = 20
        corFundoGrafico = chartContext?.createLinearGradient(0, 0, 0,650);
        corFundoGrafico?.addColorStop(0,'black'); // Transparente na base
        corFundoGrafico?.addColorStop(1,cor.transparente); // Branco no topo
        borderColor = 'rgba(255, 255, 255, 0.438)'
        break;
      case 'vendasPorProduto':
        tituloGrafico = 'Vendas Por Produto'
        displayGridY = false
        radiusPoint = 5
        pointBackgroundColor = 'rgba(255, 255, 255, 1)'
        corFundoGrafico = chartContext.createLinearGradient(0, 0, 0, 1500);
        corFundoGrafico.addColorStop(0,cor.branco); 
        corFundoGrafico.addColorStop(1,cor.vermelho); 
        label = 'Qtd. Vendida'
        index = 'y'
        break;
      case 'estoqueProduto':
        tituloGrafico = 'Estoque do Top 10'
        type = type
        index = 'y'
        displayGridY = false
        legendPosition = 'top'
        label = 'qtd. Estoque'
        corFundoGrafico = chartContext.createLinearGradient(0, 0, 0, 700);
        corFundoGrafico.addColorStop(0,cor.azulClaro); 
        corFundoGrafico.addColorStop(0.1,cor.azul); 
        corFundoGrafico.addColorStop(0.5,cor.azulClaro); 
        corFundoGrafico.addColorStop(0.55,cor.azul); 
        corFundoGrafico.addColorStop(0.60,cor.azulClaro); 
        corFundoGrafico.addColorStop(0.70,cor.azulClaro); 
        corFundoGrafico.addColorStop(1,cor.azul); 
 
        corFundoGrafico.addColorStop(1,cor.azul); 
        break;
      case 'produtividadeFuncionario':
        tituloGrafico = 'Produtividade Funcionario'
        type = type
        index = 'y'
        displayGridY = false
        legendPosition = 'top'
        corFundoGrafico = chartContext.createLinearGradient(0, 0, 0, 700);
        corFundoGrafico.addColorStop(0,cor.azulClaro); 
        corFundoGrafico.addColorStop(0.1,cor.azul); 
        corFundoGrafico.addColorStop(0.5,cor.azulClaro); 
        corFundoGrafico.addColorStop(0.55,cor.azul); 
        corFundoGrafico.addColorStop(0.60,cor.azulClaro); 
        corFundoGrafico.addColorStop(0.70,cor.azulClaro); 
        corFundoGrafico.addColorStop(1,cor.azul); 
 
        corFundoGrafico.addColorStop(1,cor.azul); 
        break;
      case 'chartMotoboy':
        tituloGrafico = 'Produtividade Motoboy'  
        typeChart = 'line'
        displayGridY = false
        corFundoGrafico = chartContext.createLinearGradient(0, 0, 0, 700);
        corFundoGrafico.addColorStop(0,cor.branco); 
        corFundoGrafico.addColorStop(1,cor.azul); 
        break
      case 'vendasPorBairros':
        let cores = ['#5086c1','#6a9eda','#84b6f4','#b2dafa','#dcffff','#96c4c4','#aedddd','#c7f7f7','#36C5FF','#ffffff']

        tituloGrafico = 'Vendas Por Bairros'
        typeChart = 'bar'
        displayGridX = false
        borderRad = 5
        corFundoGrafico = cores
        legendPosition = 'left'
        // corFundoGrafico = chartContext.createLinearGradient(0, 0, 0, 700);
        // corFundoGrafico.addColorStop(0,corBranco); 
        // corFundoGrafico.addColorStop(1,corVerde);
        break
      case 'delivery':
        tituloGrafico = 'Vendas Por Dia' 
        displayY = false 
        displayGridY = false
        displayGridX = false
        corFundoGrafico = chartContext.createLinearGradient(0, 0, 0, 700);
        corFundoGrafico.addColorStop(0,corGrafico);
        corFundoGrafico.addColorStop(1,'rgba(0,0,0,0)'); 
        break
      case 'widget':
        displayY = false 
        displayX = false
        displayGridY = false
        displayGridX = false
        corFundoGrafico = 'rgba(255, 255, 255, 0.5)'
        displayLeganda = false
        radiusPoint = 2
        pointBackgroundColor = 'rgba(255, 255, 255, 1)'
        paddingBottom = 14
        typeChart = type
        label = labelData
        break
      case 'mesas':
        tituloGrafico = 'Mesas Abertas'
        type = type
        index = 'y'
        displayGridY = false
        legendPosition = 'top'
        corFundoGrafico = chartContext.createLinearGradient(0, 0, 0, 700);
        corFundoGrafico.addColorStop(0,cor.azulClaro); 
        corFundoGrafico.addColorStop(0.1,cor.azul); 
        corFundoGrafico.addColorStop(0.5,cor.azulClaro); 
        corFundoGrafico.addColorStop(0.55,cor.azul); 
        corFundoGrafico.addColorStop(0.60,cor.azulClaro); 
        corFundoGrafico.addColorStop(0.70,cor.azulClaro); 
        corFundoGrafico.addColorStop(1,cor.azul); 
  
        corFundoGrafico.addColorStop(1,cor.azul); 
        break;
      }
    return new Chart(chartname,{
      type: type || 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: label || 'vendas R$',
            data: [1,2,3,4,15,6,37,8,59,10,15,12] ,
            fill: true,
            backgroundColor:corFundoGrafico,
            borderRadius: borderRad,
            pointBackgroundColor:pointBackgroundColor,
            borderColor: borderColor
            // color:'white'
          }
        ]
      },
      options:{
        plugins:{
          legend:{
            display: displayLeganda,
            position: legendPosition,
          },
          colors:{
            enabled:true
          },
          title: {
            display: true,
            text: tituloGrafico
          },
          
          
        },
        indexAxis: index,
        scales: {
          x: {
            beginAtZero: false,
              display:displayX , // Hides labels and chart lines of the x-axis
              grid:{
                display:displayGridX
              },
              ticks: {
                color: 'black'
              }
            },
          y:{
            beginAtZero: false,
              display:displayY,
              grid:{
                display:displayGridY
              },
              ticks: {
                color: 'black'
              }
          }
        },
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: lineTension
          },
          point: {
            radius: radiusPoint,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3
          }
        },
        layout:{
          padding:{
            bottom:paddingBottom,
            top:paddingTop
          }
        }
      }
    })
  }
  colorChart(
    chart:any,
    context:any,
    corInicial?:any,
    corFinal?:any,
    height?:any 
  ) {
      var gradientFill = context.createLinearGradient(0, 0, 0, height||150);
      gradientFill.addColorStop(0, corInicial || 'rgba(255, 255, 255, 1)'); // Branco no topo
      gradientFill.addColorStop(1, corFinal || 'rgba(255, 255, 255, 0)'); // Transparente na base
      
      chart.data.datasets[0].backgroundColor = gradientFill
      chart.data.datasets[0].borderColor = 'white'
  }
  updateChartData(chart:any,data:(string|number)[][]){
    chart.data.labels=[]
    chart.data.datasets[0].data=[]
    data.forEach(e => {
      chart.data.labels.push(e[0])
      chart.data.datasets[0].data.push(e[1])
    });
    return chart
  }
  constructor() { }  
}
