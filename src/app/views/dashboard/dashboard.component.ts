import { DOCUMENT, NgStyle } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, effect, inject, OnInit, Renderer2, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';
import { ChartOptions,
  ScaleOptions } from 'chart.js';
import { ViewChild } from '@angular/core';
import { Colors } from 'chart.js';
import { DeepPartial } from 'chart.js/dist/types/utils';
import { getStyle, hexToRgba } from '@coreui/utils';
import { ElementRef } from '@angular/core';
import {
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TextColorDirective
} from '@coreui/angular';
import { ContainerComponent } from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';

// import { DashboardChartsData, IChartProps } from './dashboard-charts-data';

import { BaseChartDirective } from 'ng2-charts';
interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  standalone: true,
  imports: [BaseChartDirective,ContainerComponent, TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, IconDirective, ReactiveFormsModule, ButtonGroupComponent, FormCheckLabelDirective, ChartjsComponent, NgStyle, CardFooterComponent, GutterDirective, ProgressBarDirective, ProgressComponent, CardHeaderComponent, TableDirective, AvatarComponent]
})
export class DashboardComponent implements OnInit,AfterViewInit {
  public mainChart:any
  public produtoEstoqueChart:any
  public vendasPorGrupoChart:any
  @ViewChild('mainChartCanvas') mainChartRef!: ElementRef;
  @ViewChild('canvasProduto') vendasPorGrupoRef!: ElementRef;
  ngAfterViewInit(): void {
    Chart.register(Colors)
    this.mainChart = this.newchart('chartsss','line')
    this.mainChart.options.elements.line.tension = 0.2
    this.mainChart.options.plugins.title.text = 'Faturamento'

    this.vendasPorGrupoChart = this.newchart('vendasPorGrupoChart','bar',true)
    this.vendasPorGrupoChart.data.datasets[0].data=[10,70,40,60]
    this.vendasPorGrupoChart.data.labels=['Coca-cola','suco','agua','bebidas']
    this.vendasPorGrupoChart.options.plugins.title.text = 'Vendas Por Grupo'
    this.vendasPorGrupoChart.update()
    
    this.produtoEstoqueChart = this.newchart('produtoEstoqueChart','pie',true)
    this.produtoEstoqueChart.data.datasets[0].data=[10,20,40,60]
    this.produtoEstoqueChart.data.labels=['Coca-cola','suco','agua','bebidas']
    this.produtoEstoqueChart.options.plugins.title.text = 'Estoque produtos'
    
    this.produtoEstoqueChart.options.scales.y.display = false
    this.produtoEstoqueChart.options.scales.x.display = false
    this.produtoEstoqueChart.update()

  

    const canvas: HTMLCanvasElement = this.mainChartRef.nativeElement;
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
    const canvas1: HTMLCanvasElement = this.vendasPorGrupoRef.nativeElement;
    const context1: CanvasRenderingContext2D | null = canvas1.getContext('2d');
    if (context && context1) {
      var gradientFill = context.createLinearGradient(0, 0, 0, 450);
      gradientFill.addColorStop(0, '#3399FF'); // Branco no topo
      gradientFill.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparente na base
      this.mainChart.data.datasets[0].backgroundColor = gradientFill
      this.mainChart.data.datasets[0].borderColor = 'rgba(88, 86, 214, 0.473)'
      this.mainChart.data.datasets[0].borderWidth = 6
      this.mainChart.options.scales.x.grid.display = false
      this.mainChart.options.scales.y.display = false
      this.mainChart.options.scales.y.grid.display = false
      this.mainChart.update()
      
      var gradientFill1 = context1.createLinearGradient(0, 0, 0, 750);
      gradientFill1.addColorStop(0, '#3399FF'); //
      gradientFill1.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparente na base
      this.vendasPorGrupoChart.data.datasets[0].backgroundColor = gradientFill1
      this.vendasPorGrupoChart.data.datasets[0].borderColor = 'rgba(88, 86, 214, 0.473)'
      this.vendasPorGrupoChart.data.datasets[0].label = 'Vendas '
      this.vendasPorGrupoChart.options.scales.y.display = false
      this.vendasPorGrupoChart.update()

    }
  }
  public users: IUser[] = [
    {
      name: 'Yiorgos Avraamu',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Us',
      usage: 50,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Mastercard',
      activity: '10 sec ago',
      avatar: './assets/images/avatars/1.jpg',
      status: 'success',
      color: 'success'
    },
    {
      name: 'Avram Tarasios',
      state: 'Recurring ',
      registered: 'Jan 1, 2021',
      country: 'Br',
      usage: 10,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Visa',
      activity: '5 minutes ago',
      avatar: './assets/images/avatars/2.jpg',
      status: 'danger',
      color: 'info'
    },
    {
      name: 'Quintin Ed',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'In',
      usage: 74,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Stripe',
      activity: '1 hour ago',
      avatar: './assets/images/avatars/3.jpg',
      status: 'warning',
      color: 'warning'
    },
    {
      name: 'Enéas Kwadwo',
      state: 'Sleep',
      registered: 'Jan 1, 2021',
      country: 'Fr',
      usage: 98,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Paypal',
      activity: 'Last month',
      avatar: './assets/images/avatars/4.jpg',
      status: 'secondary',
      color: 'danger'
    },
    {
      name: 'Agapetus Tadeáš',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Es',
      usage: 22,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'ApplePay',
      activity: 'Last week',
      avatar: './assets/images/avatars/5.jpg',
      status: 'success',
      color: 'primary'
    },
    {
      name: 'Friderik Dávid',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Pl',
      usage: 43,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Amex',
      activity: 'Yesterday',
      avatar: './assets/images/avatars/6.jpg',
      status: 'info',
      color: 'dark'
    }
  ];
  public canvas:any
  public ctx:any
  public gradientStroke:any
  public chartColor:any

  labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  newchart(chartname?:any,types?:any,legend?:boolean){
    return new Chart(chartname,{
      type: types||'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Vendas Por Dia',
            data: [1,2,3,4,15,6,37,8,59,10,15,12],
            fill: true
          }
        ]
      },
      options:{
        plugins:{
          legend:{
            display:legend?true:false
          },
          colors:{
            enabled:true
          },
          title: {
            display: true,
            text: 'Custom Chart Title'
        }
        },
        scales: {
          x: {
              display: legend?true:false // Hides labels and chart lines of the x-axis
          },
          y:{
            display:true
          }
        },
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0.4
          },
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3
          }
        }
      }
    })
  }

  ngOnInit(): void {
    Chart.register(Colors)

  }
}
