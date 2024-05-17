package com.tericcabrel.authapi.dtos;

import java.util.List;

public class SelectedEmployeeDTO {
    private List<Long> selectedEmployeeIds;

    public List<Long> getSelectedEmployeeIds() {
        return selectedEmployeeIds;
    }

    public void setSelectedEmployeeIds(List<Long> selectedEmployeeIds) {
        this.selectedEmployeeIds = selectedEmployeeIds;
    }
}
