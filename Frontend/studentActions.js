import { postStudent, updateStudent, deleteStudent } from './studentRequest.js';
import { addStudentRowInTable, deleteStudentRowInTable, updateStudentRowInTable } from './studentTable.js';
import { addAlert, handleError } from './tool.js';
import { studentDOM, getStudentFormValues } from './studentForm.js';

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
    /* TO DO : EĞER ÖĞRENCİ EKLENDİĞİNDE SAYFA LİMİTİNİ AŞARSA 
    1. SONRAKİ SAYFAYI OLUŞTUR, 
    2. SAYFANIN İÇİNE ÖĞRENCİYİ EKLE, 
    3. BELLEĞİ GÜNCELLE
    4. OLUŞTURULAN SAYFAYA GİT  

    NOT : BU İŞLEMLER, SAYFA YENİLENMEDEN DİNAMİK BİR ŞEKİLDE YAPILMALI(SAYFA YENİLENDİĞİNDE ZATEN OLUYOR)
    */
    try {
        if (action === "create") {
            const createdStudent = await postStudent(studentData);
            addStudentRowInTable(document.getElementById("tableBody"), createdStudent.data);
            addAlert("Ekleme başarılı.", "success");
            studentDOM.studentModal.hide();
        } else if (action === "update") {
            await updateStudent(id, studentData);
            const row = document.querySelector(`tr[data-id="${id}"]`);
            updateStudentRowInTable(row, studentData);
            addAlert("Güncelleme başarılı.", "success");
            studentDOM.studentModal.hide();
        }
    } catch (error) {
        handleError(error);
    }
}