package com.simple.sms.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Collection;
import java.util.HashMap;
import java.util.Objects;
import java.util.UUID;

@Document("students")
public class Student {
    private String id;
    private String name;
    private int age;
    private HashMap<String, Integer> courseGrades = new HashMap<>();

    // Constructor
    public Student(
            @JsonProperty("id") String id,
            @JsonProperty("name") String name,
            @JsonProperty("age") int age,
            @JsonProperty("courseGrades") HashMap<String, Integer> courseGrades
    ) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.courseGrades = courseGrades;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public HashMap<String, Integer> getCourseGrades() {
        return this.courseGrades;
    }

    public void setCourseGrades(HashMap<String, Integer> courseGrades) {
        this.courseGrades = courseGrades;
    }

    public void updateGrade(String course, int grade) {
        this.courseGrades.put(course, grade);
    }

    public double calculateAverage() {
        Collection<Integer> grades = this.courseGrades.values();

        // grades.removeIf(grade -> grade == null);
        grades.removeIf(Objects::isNull); // filter out all null values

        int totalGrades = 0;
        for (Integer grade: this.courseGrades.values()) {
            totalGrades += grade;
        }

        return (double) totalGrades / this.courseGrades.size();
    }

    // Overriding Special Methods
    @Override
    public String toString() {
        return String.format("[%s]", this.name);
    }
}
