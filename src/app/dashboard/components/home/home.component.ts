import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

import { Subscription, delay, filter } from 'rxjs';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';

import { productsState } from '../../../store/products/product.reducer';
import { loadproducts } from '../../../store/products/products.actions';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{

  //@ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @ViewChildren(BaseChartDirective) charts: QueryList<BaseChartDirective> | undefined;

  // Grafico de Barras
  chartBarLabels: string[] = [];
  chartBarType: ChartType = 'bar';
  chartBarData: ChartData<'bar'> = {
    labels: this.chartBarLabels,
    datasets: [ { data: [], label: 'Productos' }]
  }


  //Grafico de Donas
  chartDoughnutLabels: string[] = [];
  chartDoughnutType: ChartType = 'doughnut';
  chartDoughnutData: ChartData<'doughnut'> = {
    labels: this.chartBarLabels,
    datasets: [ { data: [], label: 'Productos' }]
  }

  chartBarOptions: ChartConfiguration['options']={
    responsive: true,
  }

  private clearSupcriptions!: Subscription;
  private store = inject( Store<productsState>);

  ngOnInit(): void {
    this.clearSupcriptions = this.store.select('products')
      .pipe(
        filter( ({products}) => products.length !== 0),
        delay(500)
        )
      .subscribe( ({products}) => {
        if( this.chartDoughnutData.datasets[0].data.length === 0){
          this.generateStadistics(products)
        }
      })
    this.store.dispatch( loadproducts())
  }

  ngOnDestroy(): void {
    if (this.clearSupcriptions) {
      this.clearSupcriptions.unsubscribe();
    }
  }

  generateStadistics(items:Product[]){
    items.forEach( (item:Product) => {
      this.chartBarLabels.push(item.name)
      this.chartBarData.datasets[0].data.push(item.account)
      this.chartDoughnutLabels.push(item.name)
      this.chartDoughnutData.datasets[0].data.push(item.account)
    })
    this.charts?.first.update()
    this.charts?.last.update()
  }

}
