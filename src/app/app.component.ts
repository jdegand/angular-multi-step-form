import { Component, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-multi-step-form';

  step = 1;

  yearlyToggle = false;

  multiStep = new FormGroup({
    user: new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\S+@\S+\.\S+$/),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('[1]{1} [0-9]{3} [0-9]{3} [0-9]{3}'),
      ]),
    }),
    plans: new FormGroup({
      plan: new FormControl('', Validators.required),
    }),
    addons: new FormGroup({
      online: new FormControl(false),
      storage: new FormControl(false),
      profile: new FormControl(false),
    }),
  });

  costMap = {
    arcade: 9,
    advanced: 12,
    pro: 15,
    online: 1,
    storage: 2,
    profile: 2,
  };

  increaseStep() {
    this.step += 1;
  }

  decreaseStep() {
    this.step -= 1;
  }

  term() {
    this.yearlyToggle = !this.yearlyToggle;
  }

  change() {
    this.step = 2;
  }

  submit() {
    if (this.step == 1 && this.multiStep.controls.user.invalid) {
      return;
    }
    if (this.step == 2 && this.multiStep.controls.plans.invalid) {
      return;
    }
    this.increaseStep();
  }

}
