import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStoreService } from 'src/app/helpers/user-store.service';
import { WifiSchemeRequest } from 'src/app/models/wifi-scheme-request.model';
import { WifiScheme } from 'src/app/models/wifi-scheme.model';
import { WifiSchemeRequestService } from 'src/app/services/wifi-scheme-request.service';
import { WifiSchemeService } from 'src/app/services/wifi-scheme.service';
import { userObj, wifiSchemeObj } from 'src/app/models/init-Obj';

@Component({
  selector: 'app-useraddrequest',
  templateUrl: './useraddrequest.component.html',
  styleUrls: ['./useraddrequest.component.css']
})
export class UseraddrequestComponent implements OnInit {
  requestForm: FormGroup;
  formInvalid = false;
  requests: WifiSchemeRequest;
  wifiScheme: WifiScheme;
  wifiSchemeId: number;
  coverImageBase64: string = ''; // Add this property to hold the base64 string
  today:string;

  constructor(
    private fb: FormBuilder,
    private service: WifiSchemeRequestService,
    private router: Router,
    private userStore: UserStoreService,
    private route: ActivatedRoute,
    private wifiSchemeService: WifiSchemeService
  ) {}

  ngOnInit(): void {
    this.myCreateForm();
    this.wifiSchemeId = +(this.route.snapshot.paramMap.get('wifiSchemeId'));
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
    this.today = new Date().toISOString().split('T')[0];
  }

  myCreateForm() {
    this.requestForm = this.fb.group({
      streetName: new FormControl(null, [Validators.required]),
      landmark: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      zipcode: new FormControl(null, [Validators.required,Validators.pattern(/^\d{6}$/),Validators.maxLength(6)]),
      preferredSetupDate: new FormControl(null, [Validators.required]),
      timeSlot: new FormControl(null, [Validators.required]),
      comments: new FormControl(null,Validators.required),
      proof: new FormControl(null, [Validators.required])
    });
  }

  onFileChange(event): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.coverImageBase64 = reader.result as string;
        this.requestForm.patchValue({ proof: this.coverImageBase64 });
      };
    }
  }

  addRequest() {
    this.formInvalid = false;
    if (this.requestForm.valid && this.coverImageBase64) {
      this.requests = this.requestForm.value;
      this.requests.user = userObj;
      this.requests.wifiScheme = wifiSchemeObj;
      this.requests.user.userId = this.userStore.authUser.userId;
      this.requests.wifiScheme.wifiSchemeId = this.wifiSchemeId;
      this.requests.requestDate = new Date();
      this.requests.proof = this.coverImageBase64; // Ensure to include the base64 string of the image
      this.service.addWiFiSchemeRequest(this.requests).subscribe(() => {
        this.showModal();
      });
    } else {
      this.formInvalid = true;
      Object.keys(this.requestForm.controls).forEach((field) => {
        const control = this.requestForm.get(field);
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
      this.router.navigate(['/user-view-Schemes']);
    }
    this.formInvalid = false;
  }
 
  get streetName() {
    return this.requestForm.get('streetName');
  }
 
  get landmark() {
    return this.requestForm.get('landmark');
  }
 
  get city() {
    return this.requestForm.get('city');
  }
 
  get state() {
    return this.requestForm.get('state');
  }
 
  get zipcode() {
    return this.requestForm.get('zipcode');
  }
 
  get preferredSetupDate() {
    return this.requestForm.get('preferredSetupDate');
  }
 
  get timeSlot() {
    return this.requestForm.get('timeSlot');
  }
  get proof() {
    return this.requestForm.get('proof');
  }

  get comments(){
    return this.requestForm.get('comments');
  }
 
  gotoUserView() {
    this.router.navigate(['/user-view-Schemes']);
  }
}