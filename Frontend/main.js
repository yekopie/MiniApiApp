import { getAllStudents, postStudent, updateStudent, deleteStudent } from './StudentRequest.js';
import { handleError, deleteStudentRowInTable, updateStudentRowInTable, addStudentRowInTable, addAlert } from './tool.js';

const table = document.getElementById("tableBody");
const studentFirstNameInModal = document.getElementById("InputFirstName");
const studentLastNameInModal = document.getElementById("InputLastName");
const studentschoolNumberInModal = document.getElementById("InputSchoolNumber");
const studentlessonInModal = document.getElementById("InputLesson");
const modalSaveChanges = document.getElementById("saveChanges");
const studentModal = new bootstrap.Modal(document.getElementById("studentModal"));

window.addEventListener("DOMContentLoaded", async () => {
    try {
        const students = await getAllStudents();

        students.forEach(student => {
            addStudentRowInTable(table, student);
        });
    } catch (error) {
        handleError(error);
    }
    //addAlert("merhaba", "success");
});

document.getElementById("create").addEventListener("click", async (event) => {
    const target = event.target;
    if (target.closest('.btn-create')) {

        document.getElementById("modalTitle").textContent = "Add Student";
        studentModal.show();

        modalSaveChanges.onclick = async () => {
            const createToStudent = {
                firstName: studentFirstNameInModal.value,
                lastName: studentLastNameInModal.value,
                schoolNumber: parseInt(studentschoolNumberInModal.value),
                lesson: studentlessonInModal.value
            };

            try {
                await postStudent(createToStudent);
                addStudentRowInTable(createToStudent);
                addAlertalert("Ekleme başarılı.", "success");
            } catch (error) {
                handleError(error);
            }
        };
    }
})

table.addEventListener("click", async (event) => {
    const target = event.target;


    if (target.closest('.btn-edit')) {
        document.getElementById("modalTitle").textContent = "Update Student";
        studentModal.show();
        const row = target.closest("tr");
        const cells = row.querySelectorAll("td");
        let id = parseInt(cells[0].textContent);
        studentFirstNameInModal.value = cells[1].textContent;
        studentLastNameInModal.value = cells[2].textContent;
        studentschoolNumberInModal.value = cells[3].textContent;
        studentlessonInModal.value = cells[4].textContent;


        modalSaveChanges.onclick = async () => {
            const updateToStudent = {
                firstName: studentFirstNameInModal.value,
                lastName: studentLastNameInModal.value,
                schoolNumber: parseInt(studentschoolNumberInModal.value),
                lesson: studentlessonInModal.value
            };
            try {
                await updateStudent(id, updateToStudent);
                updateStudentRowInTable(row, updateToStudent);
                addAlert("Güncelleme başarılı.", "success");
            } catch (error) {
                handleError(error);
            }
        };
    }

    if (target.closest('.btn-delete')) {
        const row = target.closest("tr");
        const cells = row.querySelectorAll("td");
        let id = parseInt(cells[0].textContent);
        try {
            await deleteStudent(id)
            deleteStudentRowInTable(row);
            addAlert("Silme işlemi başarılı.", "success");
        } catch (error) {
            handleError(error);
        }

    }
});

/*
// ALL METHOD CONTROLSlet newStudent = {FirstName :"Yunus Emre", LastName: "Kalaycı", SchoolNumber: 37, Lesson : "12/C"}
// GET
getAllStudents();
getStudentByID(5);
// POST

let newStudent1 = {FirstName :"Zehra", LastName: "Altınkayak", SchoolNumber: 2134, Lesson : "12/C"}
postStudent(newStudent);
postStudent(newStudent);

// uPDATE
updateStudent(1, newStudent1);

//DELETE
deleteStudent(2);

getAllStudents();*/