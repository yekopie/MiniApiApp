const BASE_URL = "https://localhost:7115/api/Students"; 

export async function getAllStudents() {
    const response = await axios.get(BASE_URL);     
    return response.data;
}

export async function postStudent(student) {
    const response = await axios.post(BASE_URL, student);
    return response.data;
}

export async function updateStudent(id, student) {
    const response = await axios.put(`${BASE_URL}/${id}`, student);
    return response.data;
}

export async function deleteStudent(id) {
    await axios.delete(`${BASE_URL}/${id}`);
}