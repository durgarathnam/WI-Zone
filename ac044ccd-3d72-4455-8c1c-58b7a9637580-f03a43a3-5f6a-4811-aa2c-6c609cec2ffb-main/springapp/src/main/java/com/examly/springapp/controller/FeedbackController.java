package com.examly.springapp.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.exceptions.FeedbackNotFoundException;
import com.examly.springapp.model.Feedback;
import com.examly.springapp.service.FeedbackServiceImpl;

@RestController
@RequestMapping("/api/feedback")

public class FeedbackController {

  @Autowired

  private FeedbackServiceImpl feedbackService;

  private Logger logger=LoggerFactory.getLogger(FeedbackController.class);

  @PostMapping
  @PreAuthorize("hasAuthority('USER')")
  public ResponseEntity<Feedback> createFeedback(@RequestBody Feedback feedback) {
    logger.info("FEEDBACK CONTROLLER {}", feedback);
    Feedback feedbackCreated = feedbackService.createFeedback(feedback);
   
    if (feedbackCreated == null) {
      return ResponseEntity.status(409).build();
    }
    return ResponseEntity.status(201).body(feedbackCreated);
  }

  @GetMapping("/{feedbackId}")
  public ResponseEntity<Feedback> getFeedbackById(@PathVariable Long feedbackId) throws FeedbackNotFoundException {
    Feedback feedbackById = feedbackService.getFeedbackById(feedbackId);

    if (feedbackById == null) {
      return ResponseEntity.status(404).build();
    }
    return ResponseEntity.status(200).body(feedbackById);
  }
  @GetMapping
  public ResponseEntity<List<Feedback>> getAllFeedbacks() {
    List<Feedback> feedbacks=feedbackService.getAllFeedbacks();
    if(feedbacks.isEmpty()){
    return ResponseEntity.status(400).build();
    }
    return ResponseEntity.status(200).body(feedbacks);
  }

  @GetMapping("/user/{userId}")
  public ResponseEntity<List<Feedback>> getFeedbackByUserId(@PathVariable Long userId) {
    List<Feedback> feedbacks = feedbackService.getFeedbackByUserId(userId);
    if (feedbacks.isEmpty()) {
      return ResponseEntity.status(404).build();
    }
    return ResponseEntity.status(200).body(feedbacks);
  }

  @DeleteMapping("/{feedbackId}")
  public ResponseEntity<Boolean> deleteFeedback(@PathVariable Long feedbackId) {
    boolean deletedFeedback = feedbackService.deleteFeedback(feedbackId);
    if (deletedFeedback) {
      return ResponseEntity.status(200).body(deletedFeedback);
    }
    return ResponseEntity.status(404).body(deletedFeedback);
  }

}
