const BASE_URL = "https://localhost:7115/api/Students"; 
// basit cache mekanizması
// Amaç: sunucuya istek yapılıp çekilen verileri, tekrar istek yapmadan client bellekte tutmak
// Client bellek dolmaması içinde client cache'de tutulacak max sayfa sayısı belirledik
const CACHE_PAGE_LIMIT = 10;
let pageCache = {};
export async function getAllStudents(page = 1, pageSize = 25) {
    if (Object.keys(pageCache).length > CACHE_PAGE_LIMIT)
        delete pageCache[Object.keys(pageCache)[0]]; // En eski sayfayı sil

    if (pageCache[page]) return pageCache[page];
    const response = await axios.get(BASE_URL, {
        params: {
            page, 
            pageSize
        }
    });     
    console.log(response)
    pageCache[page] = response.data  

    return pageCache[page];
}

export async function postStudent(student) {
    const response = await axios.post(BASE_URL, student);
    return response.data;
}

export async function updateStudent(id, student) {
    const response = await axios.put(`${BASE_URL}/${id}`, student);
    return response.data;
}

export async function deleteStudent(id) {
    await axios.delete(`${BASE_URL}/${id}`);
}