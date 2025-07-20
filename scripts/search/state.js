import { listRoutes } from '../api/routes.js';

/**
 * @typedef {Object} SearchedRoutes
 * @property {import('../api/routes').Route[]} departure - Danh sách các tuyến đường khởi hành
 * @property {import('../api/routes').Route[]|undefined} return - Danh sách các tuyến đường trở về
 */

/**
 * @typedef {Object} SearchState
 * @property {import('../api/routes').Route[]} routesData - Danh sách tất cả các tuyến đường
 * @property {string[]} departureCities - Danh sách các thành phố khởi hành
 * @property {string[]} arrivalCities - Danh sách các thành phố đến
 * @property {SearchedRoutes} searchedRoutes - Các tuyến đường đã tìm kiếm
 * @property {import('../api/routes').Route[]} filteredRoutes - Các tuyến đường đã lọc theo bộ lọc sau khi tìm kiếm (cache kết quả lọc)
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
SearchState.routesData = listRoutes();

SearchState.departureCities = [...new Set(SearchState.routesData.map(route => route.departure.city))].sort();
SearchState.arrivalCities = [...new Set(SearchState.routesData.map(route => route.arrival.city))].sort();

export default SearchState;