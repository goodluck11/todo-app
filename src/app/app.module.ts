import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {SidebarComponent} from '@layout/sidebar/sidebar.component';
import {HeaderComponent} from '@layout/header/header.component';
import {MessageTileComponent} from '@pages/dashboard/message-tile/message-tile.component';
import {ChipComponent} from '@pages/dashboard/chip/chip.component';
import {en_US, NZ_I18N} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {MyLineChartComponent} from '@pages/my-line-chart/my-line-chart.component';
import {SharedModule} from "@shared/shared.module";
import { MetricBoxComponent } from '@pages/dashboard/metric-box/metric-box.component';
import { MetricWidgetComponent } from '@pages/dashboard/metric-widget/metric-widget.component';
import { TasksComponent } from '@pages/tasks/tasks.component';
import { TaskFormComponent } from '@pages/tasks/task-form/task-form.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    MessageTileComponent,
    ChipComponent,
    MyLineChartComponent,
    MetricBoxComponent,
    MetricWidgetComponent,
    TasksComponent,
    TaskFormComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
