import { Component, OnInit } from '@angular/core';
import { WifiSchemeRequest } from 'src/app/models/wifi-scheme-request.model';
import { WifiScheme } from 'src/app/models/wifi-scheme.model';
import { WifiSchemeService } from 'src/app/services/wifi-scheme.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  schemes: WifiScheme[] = [];

  requests: WifiSchemeRequest[] =[];
  expandedRegion: string | null = null;


  constructor(private service : WifiSchemeService) { }

  getAllSchemes(){
    this.service.getAllWiFiSchemes().subscribe((data)=>{this.schemes=data})
  }

  ngOnInit(): void {
    this.getAllSchemes();

  }

  get totalSchemes():number{
    return this.schemes?.length;
  }

  get availableSchemes(): number{
    return this.schemes?.filter(scheme => scheme.availabilityStatus === 'available').length;
  } 

  get nonAvailableSchemes(): number{
    return this.schemes?.filter(scheme => scheme.availabilityStatus === 'unavailable').length;
  }

  get regionWiseFamousSchemes():{ region: string; scheme: WifiScheme}[] {
    const regions = this.schemes.reduce((acc, scheme) => {
      if(!acc[scheme.region]){
        acc[scheme.region] = scheme;
      }
      return acc;
    }, {} as {[region: string]:  WifiScheme});

    return Object.keys(regions).map(region => ({
      region, 
      scheme: regions[region]
    }));

    }

    toggleExpandRegion(region: string): void{
      this.expandedRegion = this.expandedRegion === region ? null : region;
    }

    getSchemeByRegion(region: string): WifiScheme[]{
      return this.schemes.filter(scheme => scheme.region === region);
    }

}
