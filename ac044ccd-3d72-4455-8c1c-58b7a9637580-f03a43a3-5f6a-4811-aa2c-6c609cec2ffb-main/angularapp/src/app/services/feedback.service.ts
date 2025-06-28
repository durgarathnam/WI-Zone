import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feedback } from '../models/feedback.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  apiUrl = "https://8080-fadbadfaddcabbbeddcbfaafaaacccecffb.premiumproject.examly.io/api/feedback";
  constructor(private http: HttpClient) {
  }
  sendFeedback(feedback: Feedback): Observable<Feedback> {
    console.log(JSON.stringify(feedback));
    return this.http.post<Feedback>(this.apiUrl, feedback);
  }

  getAllFeedbacksByUserId(userId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.apiUrl + '/user/' + userId);
  }

  deleteFeedback(feedbackId: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/' + feedbackId);
  }

  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.apiUrl);
  }
}
