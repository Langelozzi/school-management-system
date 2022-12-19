package com.simple.sms.service;

import com.simple.sms.model.Student;
import com.simple.sms.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StudentService {

    private final StudentRepository studentRepo;

    @Autowired
    public StudentService(StudentRepository studentRepo) {
        this.studentRepo = studentRepo;
    }

    // public void createStudents() {
    //     HashMap<String, Integer> courseGrades = new HashMap<>();
    //     courseGrades.put("COMP 1510", 95);
    //     courseGrades.put("COMP 1537", 90);
    //     courseGrades.put("COMP 1800", 93);
    //
    //     studentRepo.save(new Student("Lucas Angelozzi", 19, courseGrades));
    //     studentRepo.save(new Student("Bob Vance", 24, courseGrades));
    // }

    public List<Student> findAll() {
        return studentRepo.findAll();
    }

    public void addStudent(Student student) {
        studentRepo.save(student);
    }

    public boolean updateStudentGrade(String studentId, String courseName, int grade) {
        Student student = null;
        
        Optional<Student> studentRef = studentRepo.findById(studentId);
        if (studentRef.isPresent()) {
            student = studentRef.get();
        }

        if (student != null) {
            student.updateGrade(courseName, grade);
            studentRepo.save(student);
            return true;
        } else {
            return false;
        }
    }

    public void deleteStudentById(String id) {
        studentRepo.deleteById(id);
    }

    public double getStudentAverageById(String id) {
        Student student = null;

        Optional<Student> studentRef = studentRepo.findById(id);
        if (studentRef.isPresent()) {
            student = studentRef.get();
        }

        if (student != null) {
            return student.calculateAverage();
        } else {
            return -1;
        }
    }
}
