const baseUrl = "https://localhost:7115/api/";
const studentsRoute = baseUrl + "Students/";


export let getAllStudents = async () => {
    const res = await axios.get(baseUrl + "Students/");
    return res.data;
};

export let getStudentById = async (id) => {
    const res = await axios.get(studentsRoute + id);
    return res.data;
};

export let postStudent = async (student) => {
    const res = await axios.post(studentsRoute, student)
    return res.data;
};

export let updateStudent = async (id, student) => {
    const res = await axios.put(studentsRoute + id, student);
    return res.data;
};

export let deleteStudent = async (id) => {
    const res = await axios.delete(studentsRoute + id);
    return res.data;
};