import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Faq } from "../Faq";


@Component({
  templateUrl: "./faqKunde.html"
})

export class FaqKunde {
  alleKundeFaq: Array<Faq>;
  laster: string;
  public betalingIsCollapsed = true;
  public bestillingIsCollapsed = true;
  public avbestillingIsCollapsed = true;
  public kontaktOssIsCollapsed = true;
  disablebutton: Array<Boolean> = [];
  feilmelding: Array<Boolean> = [];


  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.hentAlleKundeFaq();
    this.disablebutton.fill(false);
    this.feilmelding.fill(false);
  }

  hentAlleKundeFaq() {
    this.http.get<Faq[]>("api/hentAlleKundeFaq/")
      .subscribe(data => {
        this.alleKundeFaq = data;
        this.laster = "";
      },
        error => console.log(error)
      );
  }


  like(id: number, j: number) {
      this.http.post("api/like", id)
        .subscribe(retur => {
          let faq = this.alleKundeFaq.find(x => x.id == id);
          faq.likes++;

        },
          error => console.log(error)
        );
  }


  dislike(id: number, j: number) {
      this.http.post("api/dislike", id)
        .subscribe(retur => {
          let faq = this.alleKundeFaq.find(x => x.id == id);
          faq.dislikes--;
        },
          error => console.log(error)
      );
  }


}