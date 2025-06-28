import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WifiSchemeRequest } from '../models/wifi-scheme-request.model';

@Injectable({
  providedIn: 'root'
})

export class WifiSchemeRequestService {
  apiUrl: string = "https://8080-fadbadfaddcabbbeddcbfaafaaacccecffb.premiumproject.examly.io/api/wifiSchemeRequest";

  constructor(private http: HttpClient) { }

  getAllWiFiSchemeRequests():Observable<WifiSchemeRequest[]>{
    return this.http.get<WifiSchemeRequest[]>(this.apiUrl);
  }

  getWiFiSchemeRequestsByUserId(userId: number):Observable<WifiSchemeRequest[]>{
    return this.http.get<WifiSchemeRequest[]>(this.apiUrl+"/user/"+userId);
  }

  addWiFiSchemeRequest(wifiSchemeRequest: WifiSchemeRequest):Observable<WifiSchemeRequest>{
    return this.http.post<WifiSchemeRequest>(this.apiUrl, wifiSchemeRequest);
  }

  updateWiFiSchemeRequest(wifiSchemeRequestId: number, wifiSchemeRequest: WifiSchemeRequest):Observable<WifiSchemeRequest>{
    return this.http.put<WifiSchemeRequest>(this.apiUrl+"/"+wifiSchemeRequestId, wifiSchemeRequest);
  }

  deleteWiFiSchemeRequest(wifiSchemeRequestId: number):Observable<WifiSchemeRequest>{
    return this.http.delete<WifiSchemeRequest>(this.apiUrl+"/"+wifiSchemeRequestId);
  }

}
