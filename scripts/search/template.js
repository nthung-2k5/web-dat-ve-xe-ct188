import * as utils from './utils.js';
import handlebars from 'https://cdn.jsdelivr.net/npm/handlebars@4.7.8/+esm';

/**
 * Template HTML cho một ô tuyến đường
 * Sử dụng Handlebars để render dữ liệu vào template
 */
const htmlTemplate = `<div class="bg-white rounded-lg p-4 border border-gray-200 transition-all hover:shadow-xl hover:-translate-y-1">
    <!-- Desktop Layout (md and above) -->
    <div class="hidden md:grid grid-cols-1 xl:grid-cols-[200px_1fr_auto] gap-4">
        <!-- Left: Bus Image (hidden on lg and below) -->
        <img src="{{ image }}" class="size-[200px] max-xl:hidden row-span-2 object-cover rounded-sm" alt="Bus Image">
        <div>
            <div class="flex items-center mb-2 gap-2">
                <h5 class="text-lg font-semibold">{{ company }}</h5>
                <span class="bg-blue-500 text-white rounded-md px-2 py-0.5 text-sm flex items-center">
                    <ion-icon name="star" class="size-4 mr-1"></ion-icon>
                    {{ rating }} ({{ reviews }})
                </span>
            </div>
            <p class="text-gray-600">{{ seatType }}</p>
        </div>
        <div class="text-right">
            <p class="text-xl font-bold text-[red]">{{ formatPrice price }}</p>
            <p class="text-green-600 font-semibold text-sm">Còn {{ availableSeats }} chỗ trống</p>
        </div>

        <!-- Departure Info -->
        <div class="flex mb-0 max-xl:col-span-2 font-semibold">
            <div class="flex flex-col">
                <div class="flex items-center">
                    {{#with departure}}
                    <ion-icon name="ellipse-outline" class="size-5 m-0.5 mr-1 text-blue-500"></ion-icon>
                    <span>{{ formatTime time }} • {{ location }}</span>
                    {{/with}}
                </div>
                <div class="flex items-center relative">
                    <div class="h-16 border-l-2 border-dotted border-gray-300 ml-[calc(0.75rem-1px)]">
                    </div>
                    <span class="text-gray-500 absolute ml-7 text-sm font-normal">{{ calculateDuration departure.time arrival.time }}</span>
                </div>
                <div class="flex items-center">
                    {{#with arrival}}
                    <ion-icon name="location-outline" class="size-5 m-0.5 mr-1 text-[red]"></ion-icon>
                    <span>{{ formatTime time }} • {{ location }}</span>
                    {{/with}}
                </div>
            </div>
        </div>

        <button
            class="bg-sky-500 hover:bg-sky-600 transition-all text-white font-semibold py-2 px-4 rounded w-full xl:w-32 max-xl:col-span-2 mt-auto"
            id="book-button"
            onclick="window.location.href='booking.html?routeId={{ id }}'">
            Đặt vé
        </button>
    </div>

    <!-- Mobile Layout (below md) -->
    <div class="md:hidden cursor-pointer" id="mobile-card" onclick="window.location.href='booking.html?routeId={{ id }}'">
        <!-- Mobile Header -->
        <div class="flex items-center mb-2 gap-2">
            <h5 class="text-lg font-semibold">{{ company }}</h5>
            <span class="bg-blue-500 text-white rounded-md px-2 py-0.5 text-sm flex items-center">
                <ion-icon name="star" class="size-4 mr-1"></ion-icon>
                {{ rating }} ({{ reviews }})
            </span>
        </div>
        <div class="flex justify-between items-center mb-2">
            <span class="text-2xl font-semibold text-gray-800 mr-2">{{ formatTime departure.time }}</span>
            <ion-icon name="ellipse-outline" style="--ionicon-stroke-width: 8rem;"
                class="size-5 text-blue-500"></ion-icon>
            <div class="border-t border-gray-300 border-dashed flex-1 mx-1"></div>
            <span class="text-sm text-gray-600">{{ duration }}</span>
            <div class="border-t border-gray-300 border-dashed flex-1 mx-1"></div>
            <ion-icon name="location" class="size-5 text-[red]"></ion-icon>
            <span class="text-2xl font-semibold text-gray-800 ml-2">{{ formatTime arrival.time }}</span>
        </div>

        <!-- Mobile Route Info -->
        <div class="flex justify-between items-center mb-2 text-sm text-gray-600">
            <span>{{ departure.location }}</span>
            <span>{{ arrival.location }}</span>
        </div>

        <hr class="text-gray-300" />

        <!-- Mobile Details -->
        <div class="flex justify-between items-center">
            <div class="flex gap-2 text-sm text-gray-600">
                <span>• {{ seatType }}</span>
                <span>• {{ availableSeats }} chỗ trống</span>
            </div>
            <div class="text-xl font-bold text-[red]">{{ formatPrice price }}</div>
        </div>
    </div>
</div>
`;

handlebars.registerHelper('formatPrice', function (price) {
    return utils.formatPrice(price);
});

handlebars.registerHelper('formatTime', function (time) {
    return utils.formatTime(time);
});

handlebars.registerHelper('calculateDuration', function (departureTime, arrivalTime) {
    return utils.formatTimeSpan(departureTime, arrivalTime);
});

const template = handlebars.compile(htmlTemplate);

/**
 * Render một ô cho một tuyến đường
 * @param {import('./state.js').Route} route 
 * @returns 
 */
export default function renderCard(route) {
    // Thủ thuật để tạo một phần tử từ string
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = template(route);

    return tempDiv.firstElementChild;
}