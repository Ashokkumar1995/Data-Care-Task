import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogOverviewExampleDialog {
  sabaDetails: any;
  subData: any;

  broncho: any = [];
  ics: any = [];
  adc: any = [];
  rsc: any = [];
  act: any = [];
  arc: any = [];
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
    this.subData = data.data.find((d: any) => d.id === data.id).subData;
    // this.loadSabaDetails();
    console.log(this.subData);

    this.subData.forEach((sd: any) => {
      if (sd.bronchodilators.date !== '') this.broncho.push(sd.bronchodilators);
      if (sd.ics.date !== '') this.ics.push(sd.ics);
      if (sd.asthmaDiagnaosisCode.date !== '')
        this.adc.push(sd.asthmaDiagnaosisCode);
      if (sd.respiratoryCode.date !== '') this.rsc.push(sd.respiratoryCode);
      if (sd.actCode.date !== '') this.act.push(sd.actCode);
      if (sd.asthmaReviewCode.date !== '') this.arc.push(sd.asthmaReviewCode);
    });

    // console.log(this.broncho);
    // console.log(this.ics);
  }

  loadSabaDetails(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
