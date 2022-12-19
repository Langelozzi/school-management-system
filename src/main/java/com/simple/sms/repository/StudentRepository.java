package com.simple.sms.repository;

import com.simple.sms.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends MongoRepository<Student, String> {
    @Query("{}")
    List<Student> findAll();
}
