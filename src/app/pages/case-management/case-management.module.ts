import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaseManagementRoutingModule } from './case-management-routing.module';
import { CaseManagementComponent } from './case-management.component';
import { CaseDetailComponent } from './caseDetail/caseDetail.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';

import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import {NzIconModule} from "ng-zorro-antd/icon";
@NgModule({
  declarations: [
    CaseManagementComponent,
    CaseDetailComponent
  ],
  exports: [
    CaseDetailComponent
  ],
  imports: [
    CommonModule,
    CaseManagementRoutingModule,
    NzRadioModule,
    NzTableModule,
    FormsModule,
    NzButtonModule,
    NzInputModule,
    NzFormModule,
    ReactiveFormsModule,
    NzDatePickerModule,
    NzSelectModule,
    NzTagModule,
    NzToolTipModule,
    NzCollapseModule,
    NzTimelineModule,
    NzCommentModule,
    NzUploadModule,
    NzSwitchModule,
    NzIconModule
  ]
})
export class CaseManagementModule { }
