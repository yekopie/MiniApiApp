import {studentDOM} from './studentForm.js';
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
