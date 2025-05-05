import { getAllStudents } from './StudentRequest.js';
import {
    handleError,
    handleStudentAction,
    addStudentRowInTable,
    clearStudentForm,
    fillStudentForm,
    studentDOM,
} from './tool.js';

const table = document.getElementById("tableBody");
const form = document.getElementById("studentForm");
const studentModal = studentDOM.studentModal;

// Sayfa yüklendiğinde öğrencileri çek
window.addEventListener("DOMContentLoaded", async () => {
    try {
        const students = await getAllStudents();
        students.forEach(student => addStudentRowInTable(table, student));
    } catch (error) {
        handleError(error);
    }
});

// "Add Student" butonuna tıklanınca modal'ı aç
document.getElementById("create").addEventListener("click", () => {
    studentDOM.modalTitle.textContent = "Add Student";
    clearStudentForm();
    form.removeAttribute("data-editing-id");
    studentModal.show();
});

// Form submit olduğunda create ya da update işlemi yap
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const isUpdate = form.hasAttribute("data-editing-id");
    const id = isUpdate ? parseInt(form.dataset.editingId) : null;

    await handleStudentAction(isUpdate ? "update" : "create", id);
    form.removeAttribute("data-editing-id");
});

// Edit veya delete butonlarına tıklanınca yapılacaklar
table.addEventListener("click", async (event) => {
    const target = event.target;

    // Edit butonu tıklandıysa
    if (target.closest('.btn-edit')) {
        const row = target.closest("tr");
        const id = parseInt(row.dataset.id);
        const cells = row.querySelectorAll("td");

        fillStudentForm({
            firstName: cells[1].textContent,
            lastName: cells[2].textContent,
            schoolNumber: cells[3].textContent,
            lesson: cells[4].textContent
        });

        studentDOM.modalTitle.textContent = "Update Student";
        form.setAttribute("data-editing-id", id);
        studentModal.show();
    }

    // Delete butonu tıklandıysa
    if (target.closest('.btn-delete')) {
        const row = target.closest("tr");
        const id = parseInt(row.dataset.id);
        await handleStudentAction("delete", id);
    }
});
