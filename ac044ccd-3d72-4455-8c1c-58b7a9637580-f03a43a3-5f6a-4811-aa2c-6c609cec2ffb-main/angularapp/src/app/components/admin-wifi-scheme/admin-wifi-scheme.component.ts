import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WifiScheme } from 'src/app/models/wifi-scheme.model';
import { WifiSchemeService } from 'src/app/services/wifi-scheme.service';

@Component({
  selector: 'app-admin-wifi-scheme',
  templateUrl: './admin-wifi-scheme.component.html',
  styleUrls: ['./admin-wifi-scheme.component.css']
})
export class AdminWifiSchemeComponent implements OnInit {
  wifiScheme: WifiScheme;
  addWifiSchemeForm: FormGroup;
  submitted: boolean = false;
  isEditing: boolean = false;
  wifiId: number;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private service: WifiSchemeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.addWifiSchemeForm = this.formBuilder.group({
      schemeName: ['', Validators.required],
      description: ['', Validators.required],
      region: ['', Validators.required],
      speed: ['', [Validators.required,Validators.pattern(/^[0-9]+mbps$/i)]],
      dataLimit: ['', [Validators.required,Validators.pattern(/^[0-9]+GB$/i)]],
      fee: ['', [Validators.required,Validators.min(500)]],
      availabilityStatus: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.wifiId = +params['id'];
      console.log(this.wifiId);
    })
    if (this.wifiId) {
      this.isEditing = true;
      this.loadWifiScheme(this.wifiId);
    }
  }

  loadWifiScheme(id: number): void {
    this.service.getWiFiSchemeById(id).subscribe(
      data => {
        this.wifiScheme = data;
        console.log(JSON.stringify(this.wifiScheme));
        this.addWifiSchemeForm.patchValue(this.wifiScheme);
      },
      error => (this.errorMessage = 'Error loading wifi scheme')
    );
  }

  get schemeName() {
    return this.addWifiSchemeForm.get('schemeName');
  }

  get description() {
    return this.addWifiSchemeForm.get('description');
  }

  get region() {
    return this.addWifiSchemeForm.get('region');
  }

  get speed() {
    return this.addWifiSchemeForm.get('speed');
  }

  get dataLimit() {
    return this.addWifiSchemeForm.get('dataLimit');
  }

  get fee() {
    return this.addWifiSchemeForm.get('fee');
  }

  get availabilityStatus() {
    return this.addWifiSchemeForm.get('availabilityStatus');
  }

  addOrUpdateWifiScheme(): void {
    this.submitted = true;
    if (this.addWifiSchemeForm.valid) {
      if (this.isEditing) {
        this.service.updateWiFiScheme(this.wifiId, this.addWifiSchemeForm.value).subscribe(
          () => this.closeModal(),
          error => (this.errorMessage = 'Error updating wifi scheme')
        );
      } else {
        console.log(JSON.stringify(this.addWifiSchemeForm.value));
        this.service.addWiFiScheme(this.addWifiSchemeForm.value).subscribe(
          () => this.closeModal(),
          error => (this.errorMessage = 'Error adding wifi scheme')
        );
      }
      this.showSuccessModal();
    }
  }
  showSuccessModal(): void {
    const modal = document.getElementById('successModal');
    modal.style.display = 'block';
  }


  closeModal(): void {
    // alert(this.isEditing ? 'WiFi Scheme Updated Successfully' : 'WiFi Scheme Added Successfully');
    const modal = document.getElementById('successModal');
    modal.style.display = 'none';
    this.addWifiSchemeForm.reset();
    this.submitted = false;
    this.router.navigate(['/admin-view-schemes']);
  }
  navigateToAdminViewScheme(): void {
    this.router.navigate(['/admin-view-schemes']);
  }


}
