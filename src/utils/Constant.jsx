export const API_URL = 'http://localhost:5000/api';
export const MEDIA_URL = 'http://localhost:5000/api/media';


export const formatDateTime = (datetime) => {
    const dateObj = new Date(datetime);
  
    // Ekstraksi tanggal
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();
  
    // Konversi waktu ke zona WIB (GMT+7)
    const options = { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', hour12: false };
    const time = dateObj.toLocaleTimeString('id-ID', options);
  
    // Format hasil akhir
    return `${day}-${month}-${year} / ${time.split(':').slice(0, 2).join('.')} WIB`;
};