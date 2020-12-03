import { Component, OnInit } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { NgModule } from "@angular/core"
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Faq } from "../Faq";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  templateUrl: "sendSporsmaal.html"
})

export class SendSporsmaal {

  skjema: FormGroup;
  sendtInn: boolean = false;

  validering = {
    valgtTilhorighet: ["", Validators.required],
    temaer: ["", Validators.required],
    sporsmaal: ["", Validators.required],
    epost: [
      null, Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])
    ]
  }

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {
    this.skjema = fb.group(this.validering);
  }

  vedSubmit() {
    console.log("Skjemaet er submittet");
    console.log(this.skjema.value.valgtTilhorighet);
    console.log(this.skjema.value.temaer);
    console.log(this.skjema.value.sporsmaal);
    console.log(this.skjema.value.epost);
    this.lagreSporsmaal();
  }

  lagreSporsmaal() {
    const lagretSporsmaal= new Faq();

    lagretSporsmaal.tilhorighet = this.skjema.value.valgtTilhorighet;
    lagretSporsmaal.tema = this.skjema.value.temaer;
    lagretSporsmaal.sporsmaal = this.skjema.value.sporsmaal;
    lagretSporsmaal.svar = "";
    lagretSporsmaal.likes = 0;
    lagretSporsmaal.dislikes = 0;
    lagretSporsmaal.epost = this.skjema.value.epost;

    this.http.post("api/lagre", lagretSporsmaal)
      .subscribe(retur => {
        this.router.navigate(['/sendSporsmaal'])
          this.bekreftelse();
      },
        error => console.log(error)
      );
  };

  bekreftelse() {
    this.sendtInn = true;
  }
}
