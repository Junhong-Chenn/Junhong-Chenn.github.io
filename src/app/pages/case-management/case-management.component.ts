import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as XLSX from 'xlsx';
import { CaseManagementService } from 'src/app/services/case-management.service';
import {NzUploadFile} from "ng-zorro-antd/upload";


export interface ExcelData<T = any> {
  header: string[];
  results: T[];
  meta: { sheetName: string };
  formula?: any;
}

@Component({
  selector: 'app-case-management',
  templateUrl: './case-management.component.html',
  styleUrls: ['./case-management.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CaseManagementComponent implements OnInit {
  radioValue = 'Actived';
  listOfBeneficiary: any[] = [];
  caseType = [
    {
      key: 'Actived',
      value: 'Actived Case'
    },
    {
      key: 'Closed',
      value: 'Closed Case'
    }
  ];
  showDetail = false;
  serviceData: any;
  caseDetail = null;
  fileList: NzUploadFile[] = [];
  excelData: NzUploadFile[] = [];
  constructor(
    private caseManagementService: CaseManagementService
  ) { }

  ngOnInit(): void {
    this.getServiceData();
    this.getBeneficiaryData();
  }

  onCaseTypeChange(event: any) {
    this.radioValue = event;
    this.getBeneficiaryData();
  }

  openDetail() {
    this.caseDetail = null;
    this.showDetail = true;
  }

  getServiceData() {
    this.caseManagementService.getServiceData().subscribe(res => {
      console.log('res',res)
      this.serviceData = res;
    })
  }

  closeDetail() {
    this.showDetail = false;
  }

  saveDetail(event: any) {
    console.log('event',event);
    this.listOfBeneficiary.push(event);
  }

  getBeneficiaryData() {
    this.caseManagementService.getBeneficiaryData().subscribe((res :any) => {
      if (this.radioValue == 'Actived') {
        this.listOfBeneficiary = res.beneficiaries.filter((el: any) => { return !el.caseClosure})
      } else {
        this.listOfBeneficiary = res.beneficiaries.filter((el: any) => { return el.caseClosure})
      }
    })
  }

  edit(item: any) {
    this.caseDetail = item;
    this.showDetail = true;
  }

  importExcelData(event: any) {
    this.readerData(event).then((res: any) => {
      this.excelData = res?.[0]?.results;
      this.excelData.forEach((el: any) => {
        el.developGoal = el.developGoal || [];
        el.servicePlanList = el.servicePlanList || [];
        this.listOfBeneficiary.push(el);
      });
    });

  }

  readerData(rawFile: any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async e => {
        try {
          const data = e.target && e.target.result;
          const workbook = XLSX.read(data, { type: 'array', cellDates: true });
          const excelData = this.getExcelData(workbook);
          resolve(excelData);
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsArrayBuffer(rawFile);
    });
  }
  getHeaderRow(sheet: XLSX.WorkSheet) {
    if (!sheet || !sheet['!ref']) return [];
    const headers: string[] = [];
    const range = XLSX.utils.decode_range(sheet['!ref']);

    const R = range.s.r;
    let i = 0;
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
      let hdr = '__EMPTY_' + i; // <-- replace with your desired default
      if (C === 0) hdr = '__EMPTY';
      if (cell && cell.t) {
        hdr = XLSX.utils.format_cell(cell);
      } else {
        i++;
      }
      headers.push(hdr);
    }
    return headers;
  }

  getExcelData(workbook: XLSX.WorkBook) {
    const excelData: ExcelData[] = [];
    for (const sheetName of workbook.SheetNames) {
      const worksheet = workbook.Sheets[sheetName];
      const header: string[] = this.getHeaderRow(worksheet);
      let results = XLSX.utils.sheet_to_json(worksheet, {
        raw: true,
        blankrows: true,
      }) as object[];
      results = results.map((row: object) => {
        return row;
      });

      excelData.push({
        header,
        results,
        meta: {
          sheetName,
        },
      });
    }
    return excelData;
  }

  beforeUpload(file: NzUploadFile): boolean {
    this.importExcelData(file);
    return false;
  };

}
