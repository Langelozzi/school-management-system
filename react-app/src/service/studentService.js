// import axios
import axios from 'axios';
import configData from '../config.json';

async function getAllStudents() {
    const response = await axios.get(`${configData.apiUrl}/students`);
    return response.data;
}

async function getStudentAverageGrade(studentId) {
    const response = await axios.get(`${configData.apiUrl}/students/${studentId}/average`);
    return response.data;
}

async function postStudent(reqBody) {
    const response = await axios.post(
        `${configData.apiUrl}/students/add`,
        reqBody
    );
    return response;
}

async function deleteStudent(id) {
    const response = await axios.delete(`${configData.apiUrl}/students/${id}/delete`);
    return response;
}

async function putStudent(id, reqBody) {
    const response = await axios.put(
        `${configData.apiUrl}/students/${id}/update`,
        reqBody
    )
    return response;
}

export {
    getAllStudents,
    getStudentAverageGrade,
    postStudent,
    deleteStudent,
    putStudent
};