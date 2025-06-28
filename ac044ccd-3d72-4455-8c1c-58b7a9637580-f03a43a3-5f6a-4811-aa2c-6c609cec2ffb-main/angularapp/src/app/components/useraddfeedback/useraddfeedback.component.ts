import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStoreService } from 'src/app/helpers/user-store.service';
import { Feedback } from 'src/app/models/feedback.model';
import { userObj, wifiSchemeObj } from 'src/app/models/init-Obj';
import { WifiScheme } from 'src/app/models/wifi-scheme.model';

import { FeedbackService } from 'src/app/services/feedback.service';
import { WifiSchemeService } from 'src/app/services/wifi-scheme.service';

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit {
  feedbackForm: FormGroup;
  feedbacks:Feedback;
  formInvalid = false;
  wifiScheme:WifiScheme
  wifiSchemeId:number;

  constructor( private fb: FormBuilder,
    private router: Router,
    private userStore:UserStoreService,
    private route:ActivatedRoute,
    private wifiSchemeService:WifiSchemeService,
    private service: FeedbackService) {}

  ngOnInit(): void {
    this.myCreateForm();
    this.wifiSchemeId=+(this.route.snapshot.paramMap.get('wifiSchemeId'));
      if (this.wifiSchemeId) {
        this.wifiSchemeService.getWiFiSchemeById(this.wifiSchemeId).subscribe(
          (scheme) => {
            this.wifiScheme = scheme;
          },
          (error) => {
            console.error('Error fetching WiFi scheme details:', error);
          }
        );
      }
  }

  myCreateForm() {
    this.feedbackForm = this.fb.group({
      feedbackText: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required])
    });
  }


  get feedbackText() {
    return this.feedbackForm.get('feedbackText');
  }

  get category() {
    return this.feedbackForm.get('category');
  }

  submitFeedback() {
    if (this.feedbackForm.valid) {
      console.log(JSON.stringify(this.feedbackForm.value));


      this.feedbacks=this.feedbackForm.value;
      this.feedbacks.user=userObj;
      this.feedbacks.wifiScheme=wifiSchemeObj;
      this.feedbacks.user.userId=this.userStore.authUser.userId;
      this.feedbacks.wifiScheme.wifiSchemeId=this.wifiSchemeId;
      this.feedbacks.date=new Date();
      console.log(JSON.stringify(this.feedbacks));
      this.service.sendFeedback(this.feedbacks).subscribe(()=>{this.showModal()});
      
      }
     else {
      
      Object.keys(this.feedbackForm.controls).forEach(field => {
        const control = this.feedbackForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  showModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  onModalClose(): void {
    const modal = document.getElementById('successModal');
    if (modal) {
      modal.style.display = 'none';
    }
    this.router.navigate(['/user-view-feedback'],);
  }


}
