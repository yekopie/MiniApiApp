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