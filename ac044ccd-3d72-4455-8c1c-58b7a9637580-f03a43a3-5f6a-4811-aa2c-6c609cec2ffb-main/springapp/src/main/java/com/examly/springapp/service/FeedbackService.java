package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.exceptions.FeedbackNotFoundException;
import com.examly.springapp.model.Feedback;

public interface FeedbackService {

    Feedback createFeedback(Feedback feedback);

    Feedback getFeedbackById(Long feedbackId) throws FeedbackNotFoundException;
  
    List<Feedback> getAllFeedbacks();

    boolean deleteFeedback(Long feedbackId);

    List<Feedback> getFeedbackByUserId(Long userId);

}
