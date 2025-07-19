import * as utils from './utils.js';

/**
 * Lấy các checkbox đã chọn từ các checkbox con trong một phần tử
 * @param {HTMLElement} div 
 * @returns 
 */
const getSelectedOptions = (div) => {
    return [...div.querySelectorAll('input[type=checkbox]')].filter(input => input.checked).map(input => input.name);
}

/**
 * @typedef {Object} FilterParams
 * @property {string[]} priceRange - Khoảng giá được chọn
 * @property {string[]} totalSeats - Số lượng ghế trên xe được chọn
 * @property {string[]} timeRange - Khung giờ khởi hành được chọn
 * @property {string[]} rating - Đánh giá được chọn
 */

/**
 * Lấy các tham số lọc từ các checkbox trong trang web
 * @returns {FilterParams} Tham số lọc
 */
const getFilterParams = () => {
    return {
        priceRange: getSelectedOptions(document.getElementById('price-filter-content')),
        totalSeats: getSelectedOptions(document.getElementById('total-seats-filter-content')),
        timeRange: getSelectedOptions(document.getElementById('time-filter-content')),
        rating: getSelectedOptions(document.getElementById('rating-filter-content'))
    };
}

/**
 * Áp dụng bộ lọc cho mảng dữ liệu dựa trên các tham số lọc được chọn
 * @template T, U
 * @param {T[]} data Mảng dữ liệu cần lọc
 * @param {U[]} params Mảng tham số lọc
 * @param {(item: T, param: U) => boolean} predicate Hàm kiểm tra điều kiện lọc
 * @returns 
 */
const applyFilter = (data, params, predicate) => {
    if (!params || params.length === 0) {
        return data;
    }

    return data.filter(item => params.reduce((valid, param) => predicate(item, param) || valid, false));
}

/**
 * Áp dụng bộ lọc cho danh sách tuyến đường
 * @param {import('./state.js').Route[]} routes Danh sách tuyến đường cần lọc
 * @returns 
 */
export const applyFilters = (routes) => {
    const filters = getFilterParams();

    routes = applyFilter(routes, filters.priceRange, (route, range) => {
        const price = route.price;
        switch (range) {
            case 'low':
                return price >= 0 && price < 500000;
            case 'mid':
                return price >= 500000 && price < 1000000;
            case 'high':
                return price >= 1000000;
        }
    });

    routes = applyFilter(routes, filters.totalSeats, (route, totalSeats) => route.totalSeats === parseInt(totalSeats));

    routes = applyFilter(routes, filters.timeRange, (route, timeSlot) => {
        const departureHour = route.departure.time.getHours();
        switch (timeSlot) {
            case 'day':
                return departureHour >= 6 && departureHour < 12;
            case 'afternoon':
                return departureHour >= 12 && departureHour < 18;
            case 'evening':
                return departureHour >= 18 && departureHour < 24;
            case 'night':
                return departureHour >= 0 && departureHour < 6;
        }
    });

    routes = applyFilter(routes, filters.rating, (route, rating) => {
        switch (rating) {
            case '5':
                return route.rating >= 4.8;
            case '4+':
                return route.rating >= 4.0;
            case '3+':
                return route.rating >= 3.0;
        }
    });

    return routes;
}

/**
 * Áp dụng sắp xếp cho danh sách tuyến đường
 * @param {import('./state.js').Route[]} routes 
 * @returns 
 */
export const applySorting = (routes) => {
    /**
     * @type {string}
     */
    const sortOrder = document.getElementById('sort-select').value;
    const tempRoutes = [...routes]; // Tạo bản sao để không làm thay đổi mảng gốc

    switch (sortOrder) {
        case 'price-low':
            return tempRoutes.sort((a, b) => a.price - b.price);
        case 'price-high':
            return tempRoutes.sort((a, b) => b.price - a.price);
        case 'departure-early':
            return tempRoutes.sort((a, b) => a.departure.time.getTime() - b.departure.time.getTime());
        case 'departure-late':
            return tempRoutes.sort((a, b) => b.departure.time.getTime() - a.departure.time.getTime());
        case 'rating':
            return tempRoutes.sort((a, b) => b.rating - a.rating);
        case 'duration':
            return tempRoutes.sort((a, b) => {
                const durationA = utils.calculateDuration(a.departure.time, a.arrival.time);
                const durationB = utils.calculateDuration(b.departure.time, b.arrival.time);
                return durationA - durationB;
            });
        default:
            return tempRoutes;
    }
}