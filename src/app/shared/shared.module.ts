import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { DOCUMENT, NgStyle } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, effect, inject, OnInit, Renderer2, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';
import { ChartOptions,
  ScaleOptions } from 'chart.js';
import { ViewChild } from '@angular/core';
import { Colors } from 'chart.js';
import { getStyle, hexToRgba } from '@coreui/utils';
import { ElementRef } from '@angular/core';
import { CardModule } from '@coreui/angular';
import { cilOptions } from '@coreui/icons';
import zoomPlugin from 'chartjs-plugin-zoom';
import { NavComponent } from '@coreui/angular';
import {
  HeaderComponent,
  HeaderNavComponent,
  HeaderTogglerDirective,
  NavItemComponent,
  NavLinkDirective,
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
import { BaseChartDirective } from 'ng2-charts';
import { Tabs2Module } from '@coreui/angular';
import { ColorModeService } from '@coreui/angular';
import { subscribeOn, Subscription } from 'rxjs';
import { DropdownComponent } from '@coreui/angular';
import { textChangeRangeIsUnchanged } from 'typescript';
import { Portuguese } from 'flatpickr/dist/l10n/pt.js';
import { RouterLink } from '@angular/router';
import { WidgetStatAComponent, TemplateIdDirective, ThemeDirective,DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, DropdownDividerDirective } from '@coreui/angular';
import flatpickr from 'flatpickr';


@NgModule({
  declarations: [

  ],
  imports: [
    IconDirective, 
    RouterLink,
    WidgetStatAComponent, TemplateIdDirective, ThemeDirective,DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, DropdownDividerDirective,
    NgFor,
    Tabs2Module,
    DropdownComponent,
    CommonModule,
    RowComponent,
    HeaderComponent,
    HeaderNavComponent,
    HeaderTogglerDirective,
    NavItemComponent,
    NavLinkDirective,
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
    TableDirective,
    TextColorDirective,
    NgStyle,
    CardModule,
   
    
  ],
  exports: [
    IconDirective, 
    CardModule,
    RouterLink,
    WidgetStatAComponent, TemplateIdDirective, ThemeDirective,DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, DropdownDividerDirective,
    NgFor,
    NgStyle,
    Tabs2Module,
    RowComponent,
    CommonModule,
    RowComponent,
    HeaderComponent,
    HeaderNavComponent,
    HeaderTogglerDirective,
    NavItemComponent,
    NavLinkDirective,
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
    TableDirective,
    TextColorDirective,
    DropdownComponent
  ]
})
export class SharedModule { }
