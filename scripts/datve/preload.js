import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11.22.2/+esm';
import { renderSeatMap } from './seats.js';

await (async () => {
    // 1. Lấy routeId từ tham số trên URL
    const params = new URLSearchParams(window.location.search);
    const routeId = parseInt(params.get('routeId'));
    
    if (!routeId) {
        await Swal.fire({
            icon: 'error',
            title: 'Không tìm thấy thông tin tuyến xe',
            text: 'Vui lòng chọn lại tuyến xe.'
        });

        // Chuyển hướng người dùng về trang tìm kiếm nếu không có ID
        window.location.href = '/search.html';
        return;
    }

    try {
        // 2. Tải dữ liệu từ file bus-routes.json
        const response = await fetch('/data/bus-routes.json');
        if (!response.ok) {
            throw new Error('Lỗi khi tải dữ liệu các tuyến xe.');
        }

        /**
         * @type {import('../search/state').Route[]}
         */
        const allRoutes = await response.json();

        // 3. Tìm tuyến xe tương ứng với routeId
        const selectedRoute = allRoutes.find(route => route.id === routeId);

        if (!selectedRoute) {
            await Swal.fire({
                icon: 'error',
                title: 'Tuyến xe không hợp lệ hoặc không tồn tại',
                text: 'Vui lòng chọn lại tuyến xe.'
            });

            window.location.href = '/search.html';
            return;
        }

        // 4. Lấy các phần tử trên DOM bằng ID
        const routeDisplay = document.getElementById('route-display');
        const departureTimeDisplay = document.getElementById('departure-time-display');
        const pickupLocationDisplay = document.getElementById('pickup-location-display');
        const arrivalLocationDisplay = document.getElementById('arrival-location-display');
        const orderInfoDiv = document.getElementById('orderInfo');
        const seatContainer = document.getElementById('seatContainer');

        // Định dạng lại ngày giờ cho dễ đọc
        const departureDateTime = new Date(selectedRoute.departure.time);
        const formattedTime = departureDateTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
        const formattedDate = departureDateTime.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });

        // 5. Cập nhật thông tin lên giao diện
        routeDisplay.textContent = `${selectedRoute.departure.city} - ${selectedRoute.arrival.city}`;
        departureTimeDisplay.textContent = `${formattedTime} - ${formattedDate}`;
        pickupLocationDisplay.textContent = selectedRoute.departure.location;
        arrivalLocationDisplay.textContent = selectedRoute.arrival.location;

        // 6. Lưu giá vé vào một data attribute để file datve.js có thể sử dụng
        orderInfoDiv.setAttribute('data-price', selectedRoute.price);

        // Xe 16 chỗ chỉ có 15 ghế, xe 29 chỗ chỉ có 28 ghế, xe 45 chỗ có đủ 45 ghế
        let totalSeats = selectedRoute.totalSeats !== 45 ? selectedRoute.totalSeats - 1 : selectedRoute.totalSeats;

        // 7. Hiển thị sơ đồ ghế ngồi
        renderSeatMap(seatContainer, totalSeats, selectedRoute.availableSeats, selectedRoute.availableSeats);
    }
    catch (error) {
        console.error('Lỗi khi khởi tạo thông tin vé:', error);
        await Swal.fire({
            icon: 'error',
            title: 'Lỗi khi khởi tạo thông tin vé',
            text: 'Vui lòng thử lại sau.'
        });
        window.location.href = '/search.html';
    }
})();