export function handleError(error) { 
    if (error.response) {
        // Sunucudan yanıt alındı ancak hata var
        console.error("Sunucu Hatası:", error.response.data);
        addAlert("Sunucu Hatası: " + (error.response.data.message || JSON.stringify(error.response.data)));
    } else if (error.request) {
        // Sunucuya istek gönderildi ancak yanıt alınamadı
        console.error("Sunucudan cevap alınamadı:", error.request);
        addAlert("Sunucuya ulaşılamadı.");
    } else {
        // Diğer hatalar
        console.error("İstek Hatası:", error.message);
        addAlert("İstek hazırlanırken bir hata oluştu: " + error.message);
    }
}

export function addStudentRowInTable(table, student){
    table.innerHTML += `
                <tr>
                    <td>${student.id}</td>   
                    <td>${student.firstName}</td>
                    <td>${student.lastName}</td>
                    <td>${student.schoolNumber}</td>
                    <td>${student.lesson}</td>                     
                    <td>
                        <a href="#" class="btn-edit edit" title="Edit"><i class="material-icons">&#xE254;</i></a>
                        <a href="#" class="btn-delete delete" title="Delete"><i class="material-icons">&#xE872;</i></a>
                    </td>
                </tr>`;
}

export function updateStudentRowInTable(row, updatedStudent) {
    const cells = row.querySelectorAll("td");
    cells[1].textContent = updatedStudent.firstName;
    cells[2].textContent = updatedStudent.lastName;
    cells[3].textContent = updatedStudent.schoolNumber;
    cells[4].textContent = updatedStudent.lesson;
}

export function deleteStudentRowInTable(row)
{
    row.remove();
}

export function addAlert(message, color = "danger") {
    const alertDiv = document.createElement("div");
    alertDiv.classList.add("alert", `alert-${color}`);
    alertDiv.style.position = "fixed";
    alertDiv.style.top = "0";
    alertDiv.style.left = "0";
    alertDiv.style.width = "100%";
    alertDiv.style.zIndex = "2000";
    alertDiv.style.textAlign = "center";
    alertDiv.role = "alert";
    alertDiv.innerHTML = message;

    document.body.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}