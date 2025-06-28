import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WifiScheme } from 'src/app/models/wifi-scheme.model';
import { WifiSchemeService } from 'src/app/services/wifi-scheme.service';
 
@Component({
  selector: 'app-user-view-scheme',
  templateUrl: './user-view-scheme.component.html',
  styleUrls: ['./user-view-scheme.component.css']
})
export class UserViewSchemeComponent implements OnInit {
  wifiScheme: WifiScheme[] = [];
  searchQuery: string = '';
  selectedRegion: string = '';
  appliedSchemes: number[] = []; // Store applied schemes by the user
  applied:boolean=true;
 
  constructor(private service: WifiSchemeService, private router: Router,private actRoute:ActivatedRoute) {}
 
  ngOnInit(): void {
    this.service.getAllWiFiSchemes().subscribe(data => {
      this.wifiScheme = data;
      this.applied=false;
    });
  }
  applyScheme(wifiSchemeId:number): void {
    this.router.navigate(['/useraddrequest', wifiSchemeId]);
 
  }
 
  filteredWifiSchemes(): WifiScheme[] {
    return this.wifiScheme.filter(scheme => {
      return (
        (!this.selectedRegion || scheme.region === this.selectedRegion) &&
        (!this.searchQuery || scheme.schemeName.toLowerCase().includes(this.searchQuery.toLowerCase()))
      );
    });
  }
 
  isSchemeApplied(wifiSchemeId: number): boolean {
    return this.appliedSchemes.includes(wifiSchemeId);
  }
 
}