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