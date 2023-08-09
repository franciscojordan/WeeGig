package com.jpa.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.jpa.entities.User;

@RestController
public class LoginController {

	@CrossOrigin(origins = "http://localhost:5174")
    @PostMapping("/authentication")
    public AuthenticationResponse authenticate(@RequestBody Credentials credentials) {

        String username = credentials.getUsername();
        String password = credentials.getPassword();

        if ("veaz.24@gmail.com".equals(username) && "1234".equals(password)) {
            User user = new User(1, "victor", "aguilar", "veaz.24@gmail.com", "Y7021602D", "24/11/1995", 611168737, 1, 0);
            return new AuthenticationResponse("success", user);
        } else {
        	System.out.println("Hi");
            return new AuthenticationResponse("failure", null);
        } 
    }

    public static class Credentials {
        private String username;
        private String password;

        // Getters y setters

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
    
    public static class AuthenticationResponse {
        private String status;
        private User user;

        public AuthenticationResponse(String status, User user) {
            this.setStatus(status);
            this.setUser(user);
        }

		public String getStatus() {
			return status;
		}

		public void setStatus(String status) {
			this.status = status;
		}

		public User getUser() {
			return user;
		}

		public void setUser(User user) {
			this.user = user;
		}


    }
}

