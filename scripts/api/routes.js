/** 
 * @typedef {Object} RoutePoint
 * @property {string} city - Tên thành phố
 * @property {string} location - Tên địa điểm (ví dụ: Bến xe Miền Tây)
 * @property {Date} time - Thời gian khởi hành hoặc đến nơi
 */

/**
 * @typedef {Object} Route
 * @property {number} id - Mã định danh của tuyến đường
 * @property {string} company - Tên công ty vận tải
 * @property {string} image - Đường dẫn đến hình ảnh của xe
 * @property {number} rating - Đánh giá của tuyến đường (từ 1 đến 5)
 * @property {number} reviews - Số lượng đánh giá
 * @property {number} price - Giá vé của tuyến đường (tính bằng VNĐ)
 * @property {number} availableSeats - Số ghế còn trống
 * @property {number} totalSeats - Tổng số ghế trên xe
 * @property {RoutePoint} departure - Thông tin về điểm khởi hành
 * @property {RoutePoint} arrival - Thông tin về điểm đến
 */

// Giả lập việc lấy dữ liệu từ backend
const response = await fetch('/data/bus-routes.json');

/**
 * @type {Route[]}
 */
const routesData = (await response.json()).map(route => {
    route.departure.time = new Date(route.departure.time);
    route.arrival.time = new Date(route.arrival.time);

    return route;
});

export const listRoutes = () => {
    return routesData;
}

/**
 * 
 * @param {number} id 
 * @returns 
 */
export const findRouteById = (id) => {
    return routesData.find(route => route.id === id);
}