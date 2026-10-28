package com.loopnexus.crm.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private boolean success;
    private String token;
    private String tokenType;
    private String name;
    private String email;
    private String initials;
    private String role;
    private List<String> availableRoles;
    private String message;
}

