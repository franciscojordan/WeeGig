package com.jpa.entities;

import java.io.Serializable;
import java.util.Objects;

public class JobApplicationId implements Serializable {

    private int userId;
    private int jobId;

    public JobApplicationId() {
    }

    public JobApplicationId(int userId, int jobId) {
        this.userId = userId;
        this.jobId = jobId;
    }

    // Getters y Setters

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        JobApplicationId that = (JobApplicationId) o;
        return userId == that.userId &&
               jobId == that.jobId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, jobId);
    }
}
