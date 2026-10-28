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
public class SidebarSectionDto {
    private String id;
    private String title;
    private List<SidebarItemDto> items;
}

