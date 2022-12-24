package com.simple.sms.service;

import com.simple.sms.model.Student;
import com.simple.sms.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    // Instantiate a student repository object using autowired
    private final StudentRepository studentRepo;
    @Autowired
    public StudentService(StudentRepository studentRepo) {
        this.studentRepo = studentRepo;
    }

    // GET
    public List<Student> findAll() {
        return studentRepo.findAll();
    }

    public Student getStudentById(String id) {
        Student student = null;

        Optional<Student> studentRef = studentRepo.findById(id);

        if (studentRef.isPresent()) {
            student = studentRef.get();
        }

        return student;
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

    // POST
    public void addStudent(Student student) {
        studentRepo.save(student);
    }

    //PUT
    public void updateStudent(String studentId, Student updatedStudent) {
        updatedStudent.setId(studentId);
        studentRepo.save(updatedStudent);
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

    // DELETE
    public void deleteStudentById(String id) {
        studentRepo.deleteById(id);
    }
}
