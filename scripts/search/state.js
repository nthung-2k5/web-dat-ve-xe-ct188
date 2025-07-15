/** 
 * @typedef {Object} RoutePoint
 * @property {string} city - Tên thành phố
 * @property {string} location - Tên địa điểm (ví dụ: bến xe, ga tàu)
 * @property {Date} time - Thời gian khởi hành hoặc đến nơi
 */

/**
 * @typedef {Object} Route
 * @property {number} id - Mã định danh của tuyến đường
 * @property {string} company - Tên công ty vận tải
 * @property {string} image - Đường dẫn đến hình ảnh của xe
 * @property {number} rating - Đánh giá của tuyến đường (từ 1 đến 5)
 * @property {number} reviews - Số lượng đánh giá
 * @property {string} seatType - Loại ghế (ví dụ: ghế ngồi, giường nằm)
 * @property {number} price - Giá vé của tuyến đường (tính bằng VNĐ)
 * @property {number} availableSeats - Số ghế còn trống
 * @property {RoutePoint} departure - Thông tin về điểm khởi hành
 * @property {RoutePoint} arrival - Thông tin về điểm đến
 */

/**
 * @typedef {Object} SearchedRoutes
 * @property {Route[]} departure - Danh sách các tuyến đường khởi hành
 * @property {Route[]|undefined} return - Danh sách các tuyến đường trở về
 */

/**
 * @typedef {Object} SearchState
 * @property {Route[]} routesData - Danh sách tất cả các tuyến đường
 * @property {string[]} departureCities - Danh sách các thành phố khởi hành
 * @property {string[]} arrivalCities - Danh sách các thành phố đến
 * @property {SearchedRoutes} searchedRoutes - Các tuyến đường đã tìm kiếm
 * @property {Route[]} filteredRoutes - Các tuyến đường đã lọc theo bộ lọc sau khi tìm kiếm (cache kết quả lọc)
 */

/**
 * @type {SearchState}
 * @description Trạng thái tìm kiếm của ứng dụng, bao gồm dữ liệu tuyến đường.
 */
const SearchState = {
    routesData: [],
    departureCities: [],
    arrivalCities: [],
    searchedRoutes: {
        departure: [],
        return: undefined
    },
    filteredRoutes: [],
};

// Giả lập việc lấy dữ liệu từ backend
const response = await fetch('/data/bus-routes.json');
SearchState.routesData = (await response.json()).map(route => {
    route.departure.time = new Date(route.departure.time);
    route.arrival.time = new Date(route.arrival.time);

    return route;
});

SearchState.departureCities = Array.from(new Set(SearchState.routesData.map(route => route.departure.city))).sort();
SearchState.arrivalCities = Array.from(new Set(SearchState.routesData.map(route => route.arrival.city))).sort();

export default SearchState;