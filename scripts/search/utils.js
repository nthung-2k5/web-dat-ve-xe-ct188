/**
 * Kiểm tra xem thiết bị có hỗ trợ sử dụng bộ lọc hay không
 * 
 * Bộ lọc chỉ xuất hiện khi kích thước màn hình >= 768px
 * @returns 
 */
export const isAdvancedFilter = () => {
    return window.matchMedia('(min-width: 768px)').matches;
}

/**
 * Định dạng tiền theo VNĐ
 * @param {number} price Số tiền cần định dạng
 * @returns 
 */
export const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
};

/**
 * Định dạng thời gian theo định dạng 24 giờ (ví dụ: 16:35)
 * @param {Date} date Thời gian
 * @returns 
 */
export const formatTime = (date) => {
    return new Intl.DateTimeFormat('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).format(date);
}

/**
 * Tính toán khoảng thời gian (theo phút) giữa hai thời điểm
 * @param {Date} startTime Thời điểm bắt đầu
 * @param {Date} endTime Thời điểm kết thúc
 * @returns 
 */
export const calculateDuration = (startTime, endTime) => {
    const span = endTime.getTime() - startTime.getTime();
    return Math.floor(span / (1000 * 60));
};

/**
 * Định dạng khoảng thời gian giữa hai thời điểm theo định dạng "X giờ Y phút"
 * @param {Date} startTime Thời điểm bắt đầu
 * @param {Date} endTime Thời điểm kết thúc
 * @returns 
 */
export const formatTimeSpan = (startTime, endTime) => {
    const duration = calculateDuration(startTime, endTime);
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return hours > 0 ? `${hours} giờ ${minutes} phút` : `${minutes} phút`;
}