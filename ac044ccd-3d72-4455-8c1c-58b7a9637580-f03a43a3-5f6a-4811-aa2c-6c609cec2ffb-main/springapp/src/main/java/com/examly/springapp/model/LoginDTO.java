package com.examly.springapp.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoginDTO {
  private long userId;
	private String userName;
	private String jwtToken;
	private String role;
}
