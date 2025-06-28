import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { WifiScheme } from '../models/wifi-scheme.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WifiSchemeService {


  apiUrl:string="https://8080-fadbadfaddcabbbeddcbfaafaaacccecffb.premiumproject.examly.io/api/wifiScheme";
  
  constructor(private http:HttpClient) {}

    public getAllWiFiSchemes():Observable<WifiScheme[]>{
    return this.http.get<WifiScheme[]>(this.apiUrl);
  }

  public getWiFiSchemeById(wifiSchemeId:number):Observable<WifiScheme>{
    return this.http.get<WifiScheme>(this.apiUrl+"/"+wifiSchemeId);
  }

  public addWiFiScheme(wifiScheme:WifiScheme):Observable<WifiScheme>{
    return this.http.post<WifiScheme>(this.apiUrl,wifiScheme);
  }

  public updateWiFiScheme(wifiSchemeId:number, wifiScheme:WifiScheme):Observable<WifiScheme>{
    return this.http.put<WifiScheme>(this.apiUrl+"/"+wifiSchemeId,wifiScheme);
  }

  public deleteWiFiScheme(wifiSchemeId:number): Observable<any>{
     return this.http.delete<WifiScheme>(this.apiUrl+"/"+wifiSchemeId);
  }


}
