package com.frontend.teamproject.domain.classes;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ValidResponse {
    private String status;
    private Object response;

    public ValidResponse(String status, Object response) {
        this.status = status;
        this.response = response;
    }

    public ValidResponse(Object response) {
        this.status = "OK";
        this.response = response;
    }
}
