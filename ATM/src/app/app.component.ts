import { UserService } from './user/user.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ACTION_TABLE, TABLE_TYPE_ACTION } from './shared/enums/type-action-table.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ATM';
  myForm: any;
  actionTable = ACTION_TABLE;
  typeAction = TABLE_TYPE_ACTION.VIEW;
  data = [
    {
      name: 'ATM 001', manufacturer: 'ABC Corp', type: 'Automated Teller Machine', serial_number: 123456789, image: ''
    },
    {
      name: 'ATM 002', manufacturer: 'XYZ Ltd', type: 'Automated Deposit Machine', serial_number: 987654321, image: ''
    },
    {
      name: 'ATM 003', manufacturer: 'DEF Inc', type: 'Multi-functional ATM', serial_number: 1122334455, image: ''
    },
  ];
  isShowForm = false;
  isShowTable = false;
  isAction = false;

  constructor(
    // private fb: FormBuilder,
    private userService: UserService,
  ) { }


  ngOnInit(): void {
    this.getData();
    this.initForm();
  }

  initForm() {
    // Khởi tạo FormGroup
    this.myForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      manufacturer: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      serial_number: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      image: new FormControl('',),
    });
  }

  getData() {
    //data test
    if (this.data.length != 0) {
      this.isShowTable = true;
    }
    // get list ATM
    this.userService.getListAtm(1).subscribe({
      next: (res) => {
        console.log(res);
        this.data = res;
        this.isShowTable = true;
      },
      error: (err) => {
      },
    });
  }

  showAddForm() {
    this.isShowForm = !this.isShowForm;
    this.isShowTable = !this.isShowTable;
  }

  handleAction(name: any, type: any) {
    console.log('action', type);

    switch (type) {
      case TABLE_TYPE_ACTION.EDIT:
        this.isShowTable = false;
        this.isShowForm = true;
        this.isAction = true;
        this.typeAction = type;
        // pass value ATM select
        console.log(name);
        const atmSelect = this.data.filter(e => e.name === name);
        this.myForm = new FormGroup({
          name: new FormControl(atmSelect[0].name, [Validators.required]),
          manufacturer: new FormControl(atmSelect[0].manufacturer, [Validators.required]),
          type: new FormControl(atmSelect[0].type, [Validators.required]),
          serial_number: new FormControl(atmSelect[0].serial_number, [Validators.required, Validators.pattern("^[0-9]*$")]),
          image: new FormControl(atmSelect[0].image,),
        });

        break;
      case TABLE_TYPE_ACTION.DELETE:
        this.typeAction = type;
        console.log('delete');

        break;

      default:
        break;
    }


  }

  // Submit Form
  onSubmit() {
    console.log(123);
    switch (this.typeAction) {
      case TABLE_TYPE_ACTION.NEW:
        if (this.myForm.valid) {
          this.userService.createATM(this.myForm).subscribe({
            next: (res) => {
              console.log(res);
            },
            error: (err) => {
            },
          });
        } else {
          console.log("Form chưa hợp lệ!");
        }
        break;
      case TABLE_TYPE_ACTION.VIEW:

        break;
      case TABLE_TYPE_ACTION.EDIT:
        if (this.myForm.valid) {
          this.userService.createATM(this.myForm).subscribe({
            next: (res) => {
              console.log(res);
            },
            error: (err) => {
            },
          });
        } else {
          console.log("Form chưa hợp lệ!");
        }
        break;
        case TABLE_TYPE_ACTION.DELETE:
        if (this.myForm.valid) {
          this.userService.createATM(this.myForm).subscribe({
            next: (res) => {
              console.log(res);
            },
            error: (err) => {
            },
          });
        } else {
          console.log("Form chưa hợp lệ!");
        }
        break;

      default:
        break;
    }
  }
}
