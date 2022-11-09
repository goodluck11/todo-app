import {Type} from "@angular/core";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzPopoverModule} from "ng-zorro-antd/popover";
import {NzProgressModule} from "ng-zorro-antd/progress";
import {NzMessageModule} from "ng-zorro-antd/message";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";

export const NZ_MODULES: Array<Type<any>> = [
  NzGridModule,
  NzButtonModule,
  NzDropDownModule,
  NzInputModule,
  NzPopoverModule,
  NzProgressModule,
  NzMessageModule,
  NzPopconfirmModule
]
