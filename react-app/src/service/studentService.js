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

export {
    getAllStudents,
    getStudentAverageGrade
};