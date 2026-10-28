package com.loopnexus.crm.auth.controller;

import com.loopnexus.crm.auth.dto.LoginRequest;
import com.loopnexus.crm.auth.dto.LoginResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class AuthController {

    private static final String TARGET_EMAIL = "edwin@zenve.in";
    private static final String TARGET_PASSWORD = "edwin@123";

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        if (request == null || request.getEmail() == null || request.getPassword() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(LoginResponse.builder()
                    .success(false)
                    .message("Email and password are required.")
                    .build());
        }

        if (TARGET_EMAIL.equalsIgnoreCase(request.getEmail().trim()) && TARGET_PASSWORD.equals(request.getPassword())) {
            // Simulated secure JWT token for Edwin
            String simulatedJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
                "eyJzdWIiOiJlZHdpbkB6ZW52ZS5pbiIsIm5hbWUiOiJFZHdpbiIsInJvbGUiOiJJTlZFU1RPUl9SRUxBVElPTlMifQ." +
                "sflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

            LoginResponse response = LoginResponse.builder()
                .success(true)
                .token(simulatedJwt)
                .tokenType("Bearer")
                .name("Edwin")
                .email(TARGET_EMAIL)
                .initials("ED")
                .role("INVESTOR_RELATIONS")
                .availableRoles(List.of(
                    "SUPER_ADMIN",
                    "EXECUTIVE",
                    "INVESTOR_RELATIONS",
                    "CRM_DIRECTOR",
                    "OPS_MANAGER"
                ))
                .message("Authentication successful. Welcome Edwin.")
                .build();

            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body(LoginResponse.builder()
                .success(false)
                .message("Invalid email or password.")
                .build());
    }

    @GetMapping("/me")
    public ResponseEntity<LoginResponse> getCurrentUser(
            @RequestHeader(name = "Authorization", required = false) String authHeader) {
        // Return default Edwin profile for authenticated session
        return ResponseEntity.ok(LoginResponse.builder()
            .success(true)
            .name("Edwin")
            .email(TARGET_EMAIL)
            .initials("ED")
            .role("INVESTOR_RELATIONS")
            .availableRoles(List.of(
                "SUPER_ADMIN",
                "EXECUTIVE",
                "INVESTOR_RELATIONS",
                "CRM_DIRECTOR",
                "OPS_MANAGER"
            ))
            .build());
    }
}

