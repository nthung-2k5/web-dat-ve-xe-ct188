import * as utils from './utils.js';

/**
 * Render một ô cho một tuyến đường
 * @param {import('./state.js').Route} route 
 * @returns 
 */
export default function renderCard(route) {
    // Thủ thuật để tạo một phần tử từ string
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = `
<div class="card">
    <div class="desktop-layout">
        <!-- Left: Bus Image (hidden on lg and below) -->
        <img src="${route.image}" class="bus-image" alt="Bus Image">
        <div class="company-info">
            <div class="header">
                <h5>${route.company}</h5>
                <span class="rating">
                    <ion-icon name="star"></ion-icon>
                    ${route.rating} (${route.reviews})
                </span>
            </div>
            <p class="total-seats">Xe ${route.totalSeats} chỗ</p>
        </div>
        <div class="price-info">
            <p class="price">${utils.formatPrice(route.price)}</p>
            <p class="availability">Còn ${route.availableSeats} chỗ trống</p>
        </div>

        <!-- Departure Info -->
        <div class="departure-info">
            <div class="timeline">
                <div class="timeline-item">
                    <ion-icon name="ellipse-outline"></ion-icon>
                    <span>${utils.formatTime(route.departure.time)} • ${route.departure.location}</span>
                </div>
                <div class="duration-line">
                    <div class="line"></div>
                    <span class="duration-text">${utils.formatTimeSpan(route.departure.time, route.arrival.time)}</span>
                </div>
                <div class="timeline-item">
                    <ion-icon name="location-outline"></ion-icon>
                    <span>${utils.formatTime(route.arrival.time)} • ${route.arrival.location}</span>
                </div>
            </div>
        </div>

        <button class="book-button" id="book-button" onclick="window.location.href='datve.html?routeId=${route.id}'">
            Đặt vé
        </button>
    </div>

    <div class="mobile-layout" id="mobile-card" onclick="window.location.href='datve.html?routeId=${route.id}'">
        <!-- Mobile Header -->
        <div class="mobile-header">
            <h5>${route.company}</h5>
            <span class="rating">
                <ion-icon name="star"></ion-icon>
                ${route.rating} (${route.reviews})
            </span>
        </div>
        <div class="mobile-time-section">
            <span class="time departure">${utils.formatTime(route.departure.time)}</span>
            <ion-icon name="ellipse-outline" class="start-icon" style="--ionicon-stroke-width: 8rem;"></ion-icon>
            <div class="dashed-line"></div>
            <span class="duration">${utils.formatTimeSpan(route.departure.time, route.arrival.time)}</span>
            <div class="dashed-line"></div>
            <ion-icon name="location" class="end-icon"></ion-icon>
            <span class="time arrival">${utils.formatTime(route.arrival.time)}</span>
        </div>

        <!-- Mobile Route Info -->
        <div class="mobile-route-info">
            <span>${route.departure.location}</span>
            <span>${route.arrival.location}</span>
        </div>

        <hr class="divider" />

        <!-- Mobile Details -->
        <div class="mobile-details">
            <div class="details-left">
                <span>• Xe ${route.totalSeats} chỗ</span>
                <span>• ${route.availableSeats} chỗ trống</span>
            </div>
            <div class="price">${utils.formatPrice(route.price)}</div>
        </div>
    </div>
</div>`;

    return tempDiv.firstElementChild;
}