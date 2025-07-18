// Script nhằm giả lập SPA (Single Page Application, không reload trang khi nhấn tìm kiếm hoặc lọc) cho trang tìm vé xe
import * as utils from './utils.js';
import SearchState from './state.js';
import { applyFilters, applySorting } from './filter.js';
import renderCard from './template.js';

/**
 * Render danh sách các tuyến đường
 * @param {import('./state.js').Route[]} routes Danh sách tuyến đường
 */
const renderBusRoutes = async (routes) => {
    // Cập nhật số tuyến đường
    document.getElementById('results-count').textContent = `Tìm thấy ${routes.length} chuyến xe`;

    // Xóa các ô tuyến đường hiện tại
    const resultsContainer = document.getElementById('routes-results');
    resultsContainer.replaceChildren();

    // Handle no results case
    // if (routes.length === 0) {
    //     const noResultsDiv = document.createElement('div');
    //     noResultsDiv.className = 'text-center py-8 text-gray-500';
    //     noResultsDiv.innerHTML = '<p class="text-lg">Không tìm thấy chuyến xe nào phù hợp</p>';
    //     resultsContainer.appendChild(noResultsDiv);
    //     return;
    // }

    // Tạo các ô tuyến đường tương ứng cho mỗi tuyến
    routes.forEach(route => resultsContainer.appendChild(renderCard(route)));
}

/**
 * Nạp danh sách các thành phố khởi hành và đến từ dữ liệu JSON trong SearchState
 */
const loadCityOptions = () => {
    const departureSelect = document.getElementById('departure-select');
    SearchState.departureCities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        departureSelect.appendChild(option);
    });

    const arrivalSelect = document.getElementById('arrival-select');
    SearchState.arrivalCities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        arrivalSelect.appendChild(option);
    });
};

/**
 * Khởi tạo các nút accordion bộ lọc
 */
const initializeFilterToggles = () => {
    document.querySelectorAll('[data-toggle-filter]').forEach(button => {
        const filterId = button.getAttribute('data-toggle-filter');
        button.addEventListener('click', () => {
            const content = document.getElementById(filterId + '-content');
            const icon = document.getElementById(filterId + '-icon');

            if (content && icon) {
                if (content.style.display === 'none') {
                    content.style.display = 'block';
                    icon.style.transform = 'rotate(0deg)';
                }
                else {
                    content.style.display = 'none';
                    icon.style.transform = 'rotate(-90deg)';
                }
            }
        });
    });
}

/**
 * Thêm các event listeners cho các phần tử trong trang
 */
const addEventListeners = () => {
    document.getElementById('search-form').addEventListener('submit', (e) => {
        e.preventDefault();
        searchRoutes(e.target);
    });

    document.querySelectorAll('#filters-panel input[type="checkbox"]').forEach(checkbox => checkbox.addEventListener('change', filterRoutes));

    document.getElementById('reset-button').addEventListener('click', () => resetFilters(true));

    const sortOrderSelect = document.getElementById('sort-select');
    sortOrderSelect.addEventListener('change', sortRoutes);

    const swapButton = document.getElementById('swap-button');
    swapButton.addEventListener('click', swapLocations);

    const selectedRoutes = document.getElementById('selected-route');
    selectedRoutes.children[0].addEventListener('click', () => {
        selectedRoutes.setAttribute('data-selected-route', 'departure');
        filterRoutes();
    });
    
    // selectedRoutes.children[1] là phần tử div làm border ngăn cách hai bên

    selectedRoutes.children[2].addEventListener('click', () => {
        selectedRoutes.setAttribute('data-selected-route', 'return');
        filterRoutes();
    });

    const returnDate = document.getElementById('return-date');
    document.getElementById('depart-date').addEventListener('change', (e) => {
        const date = new Date(e.target.value);
        returnDate.min = e.target.value;

        if (!returnDate.value || new Date(returnDate.value) < date) {
            returnDate.value = e.target.value;
        }
    });
}

/**
 * Thiết lập giá trị ngày hôm nay làm giá trị tối thiểu và mặc nhiên phần tử chọn ngày trong form tìm kiếm
 * @description Vì phần tử input không thực hiện onload nên cần thiết lập giá trị này trong script 
 */
const setTodayDateForDatePicker = () => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    /**
     * @type {HTMLInputElement}
     */
    const departDateInput = document.getElementById('depart-date');
    departDateInput.value = formattedDate;
    departDateInput.min = formattedDate;

    /**
     * @type {HTMLInputElement}
     */
    const returnDateInput = document.getElementById('return-date');
    returnDateInput.value = formattedDate;
    returnDateInput.min = formattedDate;
};

/**
 * Đặt lại bộ lọc, đồng thời thực hiện lọc lại nếu cần
 * @param {boolean} invokeFilter Cần lọc lại hay không
 */
const resetFilters = (invokeFilter = false) => {
    document.querySelectorAll('#filters-panel input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });

    if (invokeFilter) {
        filterRoutes();
    }
};

/**
 * Tìm kiếm các tuyến đường dựa trên thông tin từ form, sau đó đặt lại bộ lọc và thực hiện lọc
 * @param {HTMLFormElement} form 
 */
const searchRoutes = (form) => {
    /**
     * Tìm kiếm các tuyến đường dựa trên thành phố khởi hành, thành phố đến và ngày khởi hành
     * @param {string} departureCity Thành phố khởi hành
     * @param {string} arrivalCity Thành phố đến
     * @param {Date} departureDate Ngày khởi hành
     * @returns Các tuyến đường thỏa mãn
     */
    const findRoutes = (departureCity, arrivalCity, departureDate) => {
        return SearchState.routesData.filter(route => {
            return route.departure.city === departureCity &&
                route.arrival.city === arrivalCity &&
                route.departure.time.toDateString() === departureDate.toDateString();
        });
    };

    const selectedRoute = document.getElementById('selected-route');
    selectedRoute.setAttribute('data-selected-route', 'departure');

    const formData = new FormData(form);

    const searchParams = {};
    searchParams.depatureCity = formData.get('departure').toString();
    searchParams.arrivalCity = formData.get('arrival').toString();
    searchParams.departureDate = new Date(formData.get('depart-date').toString());
    searchParams.returnDate = undefined;

    if (utils.isAdvancedFilter() && form.querySelector('#return-input').getAttribute('data-return-input') !== null) {
        searchParams.returnDate = new Date(formData.get('return-date').toString());
    }

    document.getElementById('departure-route-display').textContent = `${searchParams.depatureCity} - ${searchParams.arrivalCity}`
    document.getElementById('departure-date-display').textContent = searchParams.departureDate.toLocaleDateString('vi-VN');

    if (searchParams.returnDate) {
        selectedRoute.removeAttribute('data-depart-only');
        document.getElementById('return-route-display').textContent = `${searchParams.arrivalCity} - ${searchParams.depatureCity}`;
        document.getElementById('return-date-display').textContent = searchParams.returnDate.toLocaleDateString('vi-VN');
    }
    else {
        selectedRoute.setAttribute('data-depart-only', '');
    }

    SearchState.searchedRoutes = {
        departure: findRoutes(searchParams.depatureCity, searchParams.arrivalCity, searchParams.departureDate),
        return: searchParams.returnDate ? findRoutes(searchParams.arrivalCity, searchParams.depatureCity, searchParams.returnDate) : undefined
    };

    resetFilters();
    filterRoutes();
};

/**
 * Lọc các tuyến đường dựa trên các bộ lọc đã chọn, sau đó thực hiện sắp xếp
 */
const filterRoutes = () => {
    if (utils.isAdvancedFilter()) {
        const selectedRoute = document.getElementById('selected-route').getAttribute('data-selected-route');
        SearchState.filteredRoutes = applyFilters(selectedRoute === 'return' ? SearchState.searchedRoutes.return : SearchState.searchedRoutes.departure);
    }
    else {
        SearchState.filteredRoutes = SearchState.searchedRoutes.departure;
    }
    sortRoutes();
};

/**
 * Sắp xếp các tuyến đường đã lọc theo thứ tự đã chọn, sau đó render sau khi sắp xếp
 */
const sortRoutes = () => {
    const sorted = applySorting(SearchState.filteredRoutes);
    renderBusRoutes(sorted);
};

/**
 * 
 * @param {HTMLSelectElement} selectElement 
 * @returns {string[]}
 */
const getOptionValues = (selectElement) => {
    return Array.from(selectElement.options).map(option => option.value);
};

const swapLocations = () => {
    const departureSelect = document.getElementById('departure-select');
    const arrivalSelect = document.getElementById('arrival-select');

    if (getOptionValues(arrivalSelect).includes(departureSelect.value) && getOptionValues(departureSelect).includes(arrivalSelect.value)) {
        // Hoán đổi giá trị giữa hai select
        const temp = departureSelect.value;
        departureSelect.value = arrivalSelect.value;
        arrivalSelect.value = temp;
    }
};

// Vì script được import bằng cách <script type="module"> nên phần này "tương đương" document.addEventListener("DOMContentLoaded", ...)
initializeFilterToggles();
setTodayDateForDatePicker();
addEventListeners();
loadCityOptions();
filterRoutes();