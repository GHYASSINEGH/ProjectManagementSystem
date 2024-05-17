package com.tericcabrel.authapi.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserReq {
    private String fullName;
    private String profilePicture;
}
