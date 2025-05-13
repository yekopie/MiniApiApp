import { getAllStudents } from './studentRequest.js';
import { addStudentRowInTable } from './studentTable.js';


export function renderPagination(totalPages, currentPage) {
    const container = document.getElementById("pagination-container");
    container.innerHTML = ""; // Eski elemanları temizle

    let [start, end] = paginationCalculate(5, totalPages, currentPage);

    // Sol ok
    const prevDisabled = currentPage === 1 ? "disabled" : "";
    container.innerHTML += ` 
        <li class="page-item ${prevDisabled}">
            <a href="#" class="page-link" data-page="${currentPage - 1}">
                <i class="fa fa-angle-double-left"></i>
            </a>
        </li>
    `;

    // Sayfa numaraları
    for (let i = start; i <= end; i++) {
        const active = currentPage === i ? "active" : "";
        container.innerHTML += `
            <li class="page-item ${active}">
                <a href="#" class="page-link" data-page="${i}">${i}</a>
            </li>
        `;
    }

    // Sağ ok
    const nextDisabled = end === totalPages ? "disabled" : "";
    container.innerHTML += `
        <li class="page-item ${nextDisabled}">
            <a href="#" class="page-link" data-page="${currentPage + 1}">
                <i class="fa fa-angle-double-right"></i>
            </a>
        </li>
    `;


    // Click event'lerini ekle
    attachPaginationEvents(totalPages, currentPage);
}
export function createPageLink(){

}
export function renderTable(students) {
    if (!students || students.length === 0) {
        console.warn("No students data available");
        return; // Eğer veri yoksa render yapma
    }

    const table = document.getElementById("tableBody");
    table.innerHTML = ""; // Tabloyu temizle
    students.forEach(student => {
        addStudentRowInTable(table, student); // Satır ekleme
    });
}

function paginationCalculate(pageRange, totalPages, currentPage)
{
    const half = Math.floor(pageRange / 2);
    let start = currentPage - half;
    let end = currentPage + half;

    if (start <= 1) {
        start = 1;
        end = pageRange;
    }
    if (end >= totalPages && totalPages > pageRange) {
        end = totalPages;
        start = totalPages - pageRange + 1;
    }
    return [start, end];
}

function attachPaginationEvents(totalPages, currentPage) {
    document.querySelectorAll(".page-link").forEach(link => {
        link.addEventListener("click", async (e) => {
            e.preventDefault();
            const page = parseInt(link.dataset.page);
            if (isNaN(page) || page < 1 || page > totalPages || page === currentPage) return;

            const data = await getAllStudents(page, 25);
            renderTable(data.students);
            renderPagination(data.totalPages, page);
        });
    });
}