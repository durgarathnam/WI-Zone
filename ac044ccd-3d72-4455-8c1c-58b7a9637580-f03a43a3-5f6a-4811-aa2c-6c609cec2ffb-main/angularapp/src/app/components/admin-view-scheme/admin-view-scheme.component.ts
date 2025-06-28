import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WifiScheme } from 'src/app/models/wifi-scheme.model';
import { WifiSchemeService } from 'src/app/services/wifi-scheme.service';
 
@Component({
  selector: 'app-admin-view-scheme',
  templateUrl: './admin-view-scheme.component.html',
  styleUrls: ['./admin-view-scheme.component.css']
})
export class AdminViewSchemeComponent implements OnInit {
  wifiScheme: WifiScheme[] = [];
  searchQuery: string = '';
  selectedRegion: string = '';
  availableRegions: string[] = [];
  confirmDialogVisible: boolean = false;
  wifiSchemeIdToDelete: number | null = null;

  constructor(private service: WifiSchemeService, private router: Router) {}
 
  ngOnInit(): void {
    this.fetchWifiSchemes();
  }
 
  fetchWifiSchemes(): void {
    this.service.getAllWiFiSchemes().subscribe(
      data => {
        this.wifiScheme = data;
        this.updateAvailableRegions();
      },
      error => console.error('Error fetching Wi-Fi schemes:', error)
    );
  }

  updateAvailableRegions(): void {
    const regions = new Set(this.wifiScheme.map(scheme => scheme.region));
    this.availableRegions = Array.from(regions);
  }

  confirmDelete(wifiSchemeId: number): void {
    this.wifiSchemeIdToDelete = wifiSchemeId;
    this.confirmDialogVisible = true;
  }
 
  deleteConfirmed(): void {
    if (this.wifiSchemeIdToDelete !== null) {
      this.service.deleteWiFiScheme(this.wifiSchemeIdToDelete).subscribe(
        () => {
          this.wifiScheme = this.wifiScheme.filter(scheme => scheme.wifiSchemeId !== this.wifiSchemeIdToDelete);
          this.updateAvailableRegions();
          this.closeConfirmDialog();
        },
        error => console.error('Error deleting Wi-Fi scheme:', error)
      );
    }
  }
 
  closeConfirmDialog(): void {
    this.confirmDialogVisible = false;
    this.wifiSchemeIdToDelete = null;
  }

  editWifiScheme(WifiSchemeId: number) {
    if (WifiSchemeId) {
      this.router.navigate(['/admin-add-schemes'], { queryParams: { id: WifiSchemeId } });
    }
  }
 
  toggleAvailability(scheme: WifiScheme): void {
    const newStatus = scheme.availabilityStatus === 'available' ? 'unavailable' : 'available';
    this.service.updateWiFiScheme(scheme.wifiSchemeId, { ...scheme, availabilityStatus: newStatus }).subscribe(
      updatedScheme => {
        this.wifiScheme = this.wifiScheme.map(s => s.wifiSchemeId === updatedScheme.wifiSchemeId ? updatedScheme : s);
        this.updateAvailableRegions();
      },
      error => console.error('Error updating scheme:', error)
    );
  }
 
  filteredWifiSchemes(): WifiScheme[] {
    return this.wifiScheme.filter(scheme => {
      return (!this.selectedRegion || scheme.region === this.selectedRegion) &&
             (!this.searchQuery || scheme.schemeName.toLowerCase().includes(this.searchQuery.toLowerCase()));
    });
  }
}