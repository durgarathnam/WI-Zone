package com.examly.springapp.service;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exceptions.FeedbackNotFoundException;
import com.examly.springapp.model.Feedback;
import com.examly.springapp.repository.FeedbackRepo;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    @Autowired
    private FeedbackRepo feedbackRepo;

    public Feedback createFeedback(Feedback feedback) {
        return feedbackRepo.save(feedback);
    }

    public Feedback getFeedbackById(Long feedbackId) throws FeedbackNotFoundException {
        Feedback feedbackFound = feedbackRepo.findById(feedbackId).orElse(null);
        if (feedbackFound == null) {
            throw new FeedbackNotFoundException("Feedback with " + feedbackId + " not found");
        }
        return feedbackFound;
    }

    public List<Feedback> getAllFeedbacks() {
        List<Feedback> feedbacks = feedbackRepo.findAll();
        if (feedbacks.isEmpty()) {
            return Collections.emptyList();
        }
        return feedbacks;

    }

    public boolean deleteFeedback(Long feedbackId) {
        Feedback feedbackFound = feedbackRepo.findById(feedbackId).orElse(null);

        if (feedbackFound == null) {
            return false;
        }
        feedbackRepo.deleteById(feedbackId);
        return true;

    }

    public List<Feedback> getFeedbackByUserId(Long userId) {
        List<Feedback> feedbacks = feedbackRepo.findByUser_userId(userId);
        if (feedbacks.isEmpty()) {
            return Collections.emptyList();
        }
        return feedbacks;

    }

}
