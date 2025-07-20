import { findRouteById } from "./api/routes.js";

await (async () => {
    const info = new URLSearchParams(window.location.search);

    const route = findRouteById(parseInt(info.get('routeId')));
    if (!route) {
        alert("Không tìm thấy tuyến xe. Vui lòng đặt vé lại.");
        window.location.href = "search.html";
        return;
    }

    route.departure.time = new Date(route.departure.time);
    route.arrival.time = new Date(route.arrival.time);

    const $ = id => document.getElementById(id);

    const padZero = num => num.toString().padStart(2, '0');
    const formatDate = (date) => {
        return `${padZero(date.getHours())}:${padZero(date.getMinutes())} ` +
               `${padZero(date.getDate())}/${padZero(date.getMonth() + 1)}/${date.getFullYear()}`;
    };

    // Gán thông tin cơ bản
    $('ticketName').textContent = info.get('name') || "";
    $('ticketPhone').textContent = info.get('phone') || "";
    $('ticketCode').textContent = route.id || "";
    $('ticketRoute').textContent = `${route.departure.city} - ${route.arrival.city}` || "";
    $('ticketSeats').textContent = info.get('seats') || "";
    $('ticketPickup').textContent = route.departure.location || "";
    $('ticketDropoff').textContent = route.arrival.location || "";

    // Thời gian xuất phát
    $('ticketTime').textContent = formatDate(route.departure.time);

    // Thời gian đến sớm 15 phút
    const earlyTime = new Date(route.departure.time.getTime() - 15 * 60 * 1000);
    $('ticketTime_early').textContent = formatDate(earlyTime);

    // Tính tổng tiền
    const seatCount = info.get('seats')?.split(',').length || 0;
    const totalPrice = route.price * seatCount;
    $('ticketPrice').textContent = totalPrice.toLocaleString('vi-VN') + "đ";
})();
