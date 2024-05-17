package com.tericcabrel.authapi.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupChatReq {
    private List<Integer> userIds;
    private String chatName;
    private String chatImage;
}
