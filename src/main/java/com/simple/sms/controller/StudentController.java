package com.simple.sms.controller;

import com.simple.sms.model.Student;
import com.simple.sms.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

// If using @RequestMapping then you don't specify for each endpoint
// @RequestMapping("/api/students")
@RestController
public class StudentController {

    // Instantiate a student service object using autowired
    private final StudentService studentService;
    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // ####################### Create #######################
    @PostMapping("/api/students/add")
    public void addStudent(@RequestBody Student student) {
        studentService.addStudent(student);
    }

    // ####################### Read #######################
    @GetMapping( "/api/students")
    public List<Student> getAllStudents() {
        return studentService.findAll();
    }

    @GetMapping("/api/students/{id}")
    public Student getStudentById(@PathVariable String id) {
        return studentService.getStudentById(id);
    }

    // This GET endpoint shows an example of how to specify the return type
    @GetMapping(value="/api/students/{id}/average", produces=MediaType.APPLICATION_JSON_VALUE)
    public HashMap<String, Double> getStudentGradeAverageById(@PathVariable String id) {
        return new HashMap<>() {{
            put("average", studentService.getStudentAverageById(id));
        }};
    }

    // ####################### Update #######################
    @PutMapping("/api/students/{id}")
    @ResponseBody
    public Student updateStudentById(@PathVariable String id, @RequestBody Student updatedStudent) {
        return studentService.updateStudent(id, updatedStudent);
    }

    @PutMapping("/api/students/{id}/updateGrade")
    @ResponseBody
    public String updateStudentGrade(@PathVariable String id, @RequestBody HashMap<String, Object> body) {
        String courseName = (String) body.get("course");
        int grade = (int) body.get("grade");

        boolean gradeUpdated = studentService.updateStudentGrade(id, courseName, grade);

        if (!gradeUpdated) {
            return "Grade update failed: No student found with that id.";
        } else {
            return "Grade update successful!";
        }
    }

    // ####################### Delete #######################
    @DeleteMapping("/api/students/{id}/delete")
    public void deleteStudentById(@PathVariable String id) {
        studentService.deleteStudentById(id);
    }
}
