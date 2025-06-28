package com.examly.springapp.exceptions;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
@ExceptionHandler(DuplicateWiFiSchemeException.class)
public ResponseEntity<String> duplicateWiFiSchemeExceptionHandler(DuplicateWiFiSchemeException e){
    return ResponseEntity.status(409).body(e.getMessage());
}

@ExceptionHandler(WiFiSchemeDeletionException.class)
public ResponseEntity<String> WiFiSchemeDeletionExceptionHandler(WiFiSchemeDeletionException e){
    return ResponseEntity.status(404).body(e.getMessage());
}

@ExceptionHandler(WiFiSchemeException.class)
public ResponseEntity<String> WiFiSchemeExceptionHandler(WiFiSchemeException e){
    return ResponseEntity.status(404).body(e.getMessage());
}

@ExceptionHandler(WiFiSchemeRequestException.class)
public ResponseEntity<String> WiFiSchemeRequestExceptionHandler(WiFiSchemeRequestException e){
   return ResponseEntity.status(404).body(e.getMessage()); 
}

@ExceptionHandler(FeedbackNotFoundException.class)
public ResponseEntity<String> FeedbackNotFoundExceptionHandler(FeedbackNotFoundException e){
   return ResponseEntity.status(404).body(e.getMessage()); 
}
@ExceptionHandler(UserAlreadyExistsException.class)
public ResponseEntity<String> UserAlreadyExistsException(UserAlreadyExistsException e){
   return ResponseEntity.status(409).body(e.getMessage()); 
}

@ExceptionHandler(InvalidUsernameException.class)
public ResponseEntity<String> InvalidUsernameException(InvalidUsernameException e){
   return ResponseEntity.status(409).body(e.getMessage()); 
}

}
