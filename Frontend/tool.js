import { postStudent, updateStudent, deleteStudent } from './StudentRequest.js';

// DOM referansları
export const studentDOM = {
    firstName: document.getElementById("InputFirstName"),
    lastName: document.getElementById("InputLastName"),
    schoolNumber: document.getElementById("InputSchoolNumber"),
    lesson: document.getElementById("InputLesson"),
    modalTitle: document.getElementById("modalTitle"),
    modalSave: document.getElementById("saveChanges"),
    studentModal: new bootstrap.Modal(document.getElementById("studentModal"))
};

// Form temizle
export function clearStudentForm() {
    studentDOM.firstName.value = "";
    studentDOM.lastName.value = "";
    studentDOM.schoolNumber.value = "";
    studentDOM.lesson.value = "";
}

// Form doldur
export function fillStudentForm(student) {
    studentDOM.firstName.value = student.firstName;
    studentDOM.lastName.value = student.lastName;
    studentDOM.schoolNumber.value = student.schoolNumber;
    studentDOM.lesson.value = student.lesson;
}

// Form değerlerini al
export function getStudentFormValues() {
    return {
        firstName: studentDOM.firstName.value,
        lastName: studentDOM.lastName.value,
        schoolNumber: parseInt(studentDOM.schoolNumber.value, 10),
        lesson: studentDOM.lesson.value
    };
}

// Tabloya öğrenci ekle
export function addStudentRowInTable(table, student) {
    const row = document.createElement("tr");
    row.setAttribute("data-id", student.id);

    row.innerHTML = `
        <td>${student.id}</td>
        <td>${student.firstName}</td>
        <td>${student.lastName}</td>
        <td>${student.schoolNumber}</td>
        <td>${student.lesson}</td>
        <td>
            <a href="#" class="btn-edit edit" title="Edit"><i class="material-icons">&#xE254;</i></a>
            <a href="#" class="btn-delete delete" title="Delete"><i class="material-icons">&#xE872;</i></a>
        </td>
    `;

    table.appendChild(row);
}

// Tablo satırını güncelle
export function updateStudentRowInTable(row, student) {
    const cells = row.querySelectorAll("td");
    cells[1].textContent = student.firstName;
    cells[2].textContent = student.lastName;
    cells[3].textContent = student.schoolNumber;
    cells[4].textContent = student.lesson;
}

// Tablo satırını sil
export function deleteStudentRowInTable(row) {
    row.remove();
}

// Genel işlem kontrolü
export async function handleStudentAction(action, id = null) {
    if (action === "delete") {
        if (confirm("Bu öğrenciyi silmek istediğinize emin misiniz?")) {
            try {
                await deleteStudent(id);
                deleteStudentRowInTable(document.querySelector(`tr[data-id="${id}"]`));
                addAlert("Silme işlemi başarılı.", "success");
            } catch (error) {
                handleError(error);
            }
        }
        return;
    }

    const studentData = getStudentFormValues();

    try {
        if (action === "create") {
            const createdStudent = await postStudent(studentData);
            addStudentRowInTable(document.getElementById("tableBody"), createdStudent);
            addAlert("Ekleme başarılı.", "success");
            studentDOM.studentModal.hide();
        } else if (action === "update") {
            await updateStudent(id, studentData);
            const row = document.querySelector(`tr[data-id="${id}"]`);
            updateStudentRowInTable(row, studentData);
            addAlert("Ekleme başarılı.", "success");
            studentDOM.studentModal.hide();
        }
    } catch (error) {
        handleError(error);
    }
}

// Hata yönetimi
export function handleError(error) {
    if (error.response) {
        console.error("Sunucu Hatası:", error.response.data);
        addAlert("Sunucu Hatası: " + (error.response.data.message || JSON.stringify(error.response.data)));
        studentDOM.studentModal.hide();
    } else if (error.request) {
        console.error("Sunucudan cevap alınamadı:", error.request);
        addAlert("Sunucuya ulaşılamadı.");
        studentDOM.studentModal.hide();
    } else {
        console.error("İstek Hatası:", error.message);
        addAlert("İstek hazırlanırken bir hata oluştu: " + error.message);
        studentDOM.studentModal.hide();
    }
}

// Alert mesajı
export function addAlert(message, color = "danger") {
    const alertHtml = `
    <div class="alert alert-${color}" role="alert"
         style="position: fixed; top: 0; left: 0; width: 100%;
                z-index: 2000; text-align: center;">
        ${message}
    </div>
`;

    document.body.insertAdjacentHTML("beforeend", alertHtml);
    setTimeout(() => {
        const alert = document.querySelector(".alert");
        if (alert) alert.remove();
    }, 3000);
}