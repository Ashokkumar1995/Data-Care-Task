import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from './dialog/dialog.component';

export class MedicationBase {
  date: string = '';
  name: string = '';
  medication: string = '';
}
export class CodesBase {
  public date: string = '';
  public term: string = '';
}

export class PatientSubData {
  public bronchodilators: Bronchodilators = new Bronchodilators();
  public ics: ICS = new ICS();
  public asthmaDiagnaosisCode: AsthmaDiagnosisCode = new AsthmaDiagnosisCode();
  public respiratoryCode: RespiratoryCodes = new RespiratoryCodes();
  public actCode: ACTCode = new ACTCode();
  public asthmaReviewCode: AsthmaReviewCode = new AsthmaReviewCode();

  constructor(
    bronchodilators?: Bronchodilators,
    ics?: ICS,
    asthmaDiagnaosisCode?: AsthmaDiagnosisCode,
    respiratoryCode?: RespiratoryCodes,
    actCode?: ACTCode,
    asthmaReviewCode?: AsthmaReviewCode
  ) {}
}

export class PatientRecord {
  public id: string = '';
  public age: string = '';
  public gender: string = '';
  public subData: PatientSubData[] = [];

  constructor(
    id?: string,
    age?: string,
    gender?: string,
    subData?: PatientSubData[]
  ) {}
}

export class Bronchodilators extends MedicationBase {
  constructor(date: string = '', name: string = '', medication: string = '') {
    super();
    this.date = date;
    this.name = name;
    this.medication = medication;
  }
}

export class ICS extends MedicationBase {
  constructor(date: string = '', name: string = '', medication: string = '') {
    super();
    this.date = date;
    this.name = name;
    this.medication = medication;
  }
}

export class AsthmaDiagnosisCode extends CodesBase {
  constructor(date: string = '', term: string = '') {
    super();
    this.date = date;
    this.term = term;
  }
}
export class RespiratoryCodes extends CodesBase {
  constructor(date: string = '', term: string = '') {
    super();
    this.date = date;
    this.term = term;
  }
}

export class ACTCode extends CodesBase {
  public value: string = '';
  constructor(date: string = '', term: string = '', value: string = '') {
    super();
    this.date = date;
    this.term = term;
    this.value = value;
  }
}
export class AsthmaReviewCode extends CodesBase {
  constructor(date: string = '', term: string = '') {
    super();
    this.date = date;
    this.term = term;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'data-care';
  file: any;
  public records: any[] = [];
  showTable = false;
  @ViewChild('csvReader') csvReader: any;
  displayedColumns: string[] = ['id', 'age', 'gender', 'subData'];
  dataSource: PatientRecord[] = [];

  constructor(public dialog: MatDialog) {}

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { id: id, data: this.dataSource },
      panelClass: 'containerPanel',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  public upload(event: any): void {
    this.file = event.target.files[0];
    console.log(this.file);
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
    };
    fileReader.readAsText(this.file);
  }

  uploadListener($event: any): void {
    let text = [];
    let files = $event.srcElement.files;

    if (this.isFileValid(files[0])) {
      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
        // console.log(csvRecordsArray);
        let headersRow = this.getHeaderArray(csvRecordsArray);
        // console.log(headersRow);
        this.records = this.getData(csvRecordsArray, headersRow.length);
      };

      reader.onerror = function () {
        console.log('Error Occurred');
      };
    } else {
      alert('Please browse a valid file');
      this.fileReset();
    }
  }

  getSubData(index: number, csvData: any) {
    // let subData = new PatientSubData();
    // while (csvData[index] == '') {
    //   let currentRecord = (<string>csvData[index]).split(',');
    //   let bronchodilators = new Bronchodilators(
    //     currentRecord[3],
    //     currentRecord[4],
    //     currentRecord[5]
    //   );
    //   let ics = new ICS(currentRecord[6], currentRecord[7], currentRecord[8]);
    //   let adc = new AsthmaDiagnosisCode(currentRecord[9], currentRecord[10]);
    //   let rc = new RespiratoryCodes(currentRecord[11], currentRecord[12]);
    //   let actCode = new ACTCode(
    //     currentRecord[13],
    //     currentRecord[14],
    //     currentRecord[15]
    //   );
    //   let arc = new AsthmaReviewCode(currentRecord[16], currentRecord[17]);
    //   subData.bronchodilators.push(bronchodilators);
    //   subData.ics.push(ics);
    //   subData.asthmaDiagnaosisCode.push(adc);
    //   subData.respiratoryCode.push(rc);
    //   subData.actCode.push(actCode);
    //   subData.asthmaReviewCode.push(arc);
    //   index++;
    // }
    // return subData;
  }

  getSubRecords(startingIndex: number, endingIndex: number, data: any) {
    let firstRow = (<string>data[startingIndex]).split(',');
    let p = new PatientRecord();
    p.id = firstRow[0];
    p.age = firstRow[1];
    p.gender = firstRow[2];

    for (let i = startingIndex; i < endingIndex; i++) {
      let s = new PatientSubData();
      let currentRecord = (<string>data[i]).split(',');

      let bronchodilators = new Bronchodilators(
        currentRecord[3],
        currentRecord[4],
        currentRecord[5]
      );
      let ics = new ICS(currentRecord[6], currentRecord[7], currentRecord[8]);
      let adc = new AsthmaDiagnosisCode(currentRecord[9], currentRecord[10]);
      let rc = new RespiratoryCodes(currentRecord[11], currentRecord[12]);
      let actCode = new ACTCode(
        currentRecord[13],
        currentRecord[14],
        currentRecord[15]
      );
      let arc = new AsthmaReviewCode(currentRecord[16], currentRecord[17]);
      s.bronchodilators = bronchodilators;

      s.ics = ics;
      s.asthmaDiagnaosisCode = adc;
      s.respiratoryCode = rc;
      s.actCode = actCode;
      s.asthmaReviewCode = arc;

      // subData.bronchodilators.push(bronchodilators);
      // subData.ics.push(ics);

      // subData.asthmaDiagnaosisCode.push(adc);
      // subData.respiratoryCode.push(rc);
      // subData.actCode.push(actCode);
      // subData.asthmaReviewCode.push(arc);

      p.subData.push(s);
    }
    return p;
  }

  getData(csvRecordsArray: any, headerLength: any) {
    let patientDetails: PatientRecord[] = [];

    let startingIndex = 12;
    let j = 12;
    let patients: PatientRecord[] = [];

    for (let i = startingIndex; i < csvRecordsArray.length; i++) {
      let currentRecord = (<string>csvRecordsArray[i]).split(',');
      if (currentRecord[0] !== '' && i != 12) {
        // console.log(i, j);
        let p = this.getSubRecords(j, i, csvRecordsArray);
        patients.push(p);
        j = i;
      }
    }

    console.log(patients);
    this.dataSource = patients;
    this.showTable = true;
    // let p = new PatientRecord();
    // for (let i = 12; i < csvRecordsArray.length; i++) {

    //   let currentRecord = (<string>csvRecordsArray[i]).split(',');
    //   console.log(currentRecord.length);

    //   let bronchodilators = new Bronchodilators(
    //     currentRecord[3],
    //     currentRecord[4],
    //     currentRecord[5]
    //   );
    //   let ics = new ICS(currentRecord[6], currentRecord[7], currentRecord[8]);
    //   let adc = new AsthmaDiagnosisCode(currentRecord[9], currentRecord[10]);
    //   let rc = new RespiratoryCodes(currentRecord[11], currentRecord[12]);
    //   let actCode = new ACTCode(
    //     currentRecord[13],
    //     currentRecord[14],
    //     currentRecord[15]
    //   );
    //   let arc = new AsthmaReviewCode(currentRecord[16], currentRecord[17]);

    //   if (currentRecord[0] != '') {
    //     // Personal Details
    //     let id = currentRecord[0];
    //     let age = currentRecord[1];
    //     let gender = currentRecord[2];

    //     p = new PatientRecord(
    //       id,
    //       age,
    //       gender,
    //       [bronchodilators],
    //       [ics],
    //       [adc],
    //       [rc],
    //       [actCode],
    //       [arc]
    //     );
    //   }else{
    //     p.bronchodilators.push(bronchodilators);
    //     p.ics.push(ics);
    //     p.asthmaDiagnaosisCode.push(adc);
    //     p.respiratoryCode.push(rc);
    //     p.actCode.push(actCode);
    //     p.asthmaReviewCode.push(arc);
    //   }
    // }
    // console
    return patientDetails;
  }

  isFileValid(file: any) {
    return file.name.endsWith('.csv');
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[11]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.csvReader.nativeElement.value = '';
    this.records = [];
  }
}
