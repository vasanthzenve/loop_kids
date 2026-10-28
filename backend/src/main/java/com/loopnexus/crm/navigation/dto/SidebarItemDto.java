package com.loopnexus.crm.navigation.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SidebarItemDto {
    private String id;
    private String label;
    private String icon;
    private String path;
    private String badge;
    private List<String> requiredRoles;
}

