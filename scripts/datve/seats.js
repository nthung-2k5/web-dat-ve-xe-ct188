import _ from 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/+esm';
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11.22.2/+esm';

// Sơ đồ ghế ngồi định trước
const seatMaps = {
    15: [
        [null, null, false, false],
        [false, false, false, null],
        [false, false, false, null],
        [false, false, false, null],
        [false, false, false, false]
    ],
    28: [
        [null, null, null, false],
        [false, false, false, false],
        [false, false, false, null],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false]
    ],
    45: [
        [false, false, null, false, false],
        [false, false, null, false, false],
        [false, false, null, false, false],
        [false, false, null, false, false],
        [false, false, null, false, false],
        [false, false, null, false, false],
        [false, false, null, false, false],
        [false, false, null, false, false],
        [false, false, null, false, false],
        [false, false, null, false, false],
        [false, false, false, false, false]
    ]
};

/**
 * 
 * @param {number} totalSeats 
 * @param {number} availableSeats 
 * @returns {(boolean | null)[][]}
 */
const createSeatMap = (totalSeats, availableSeats) => {
    const seatMap = seatMaps[totalSeats];
    if (!seatMap) {
        throw new Error(`Unsupported total seats: ${totalSeats}`);
    }

    // Chọn ngẫu nhiên các ghế có thể đặt
    let seatsToMark = _.sampleSize(Array.from({ length: totalSeats }, (_, i) => i), availableSeats);
    let index = 0;
    for (let row = 0; row < seatMap.length; row++) {
        for (let col = 0; col < seatMap[row].length; col++) {
            if (seatMap[row][col] === null) continue; // Bỏ qua vị trí không có ghế

            if (seatsToMark.includes(index)) {
                seatMap[row][col] = true; // Đánh dấu ghế có thể đặt
            }

            index++;
        }
    }

    return seatMap;
};

/**
 * 
 * @param {HTMLDivElement} seatContainer 
 * @param {number} totalSeats 
 * @param {number} availableSeats 
 */
export const renderSeatMap = (seatContainer, totalSeats, availableSeats) => {
    const seatMap = createSeatMap(totalSeats, availableSeats);
    let index = 1;

    seatContainer.append(...seatMap.map((row) => {
        const rowElement = document.createElement('div');
        rowElement.className = 'seat-row';
        rowElement.append(...row.map(seat => {
            const seatElement = document.createElement('div');
            seatElement.className = 'seat';

            if (seat === null) {
                seatElement.classList.add('empty');
            }
            else {
                const seatClass = seat ? 'available' : 'occupied';
                seatElement.classList.add(seatClass);

                const img = document.createElement('img');
                img.src = `/images/seat-${seatClass}.svg`;
                img.alt = 'Ghế';
                img.width = 40;
                img.height = 40;

                if (seat) {
                    seatElement.addEventListener('click', async () => {
                        const selecting = !seatElement.classList.contains('selecting'); // Ghế này đang được chọn (true) hay bỏ chọn (false)
                        if (selecting && seatContainer.querySelectorAll('.seat.selecting').length === 5) {
                            await Swal.fire({
                                icon: 'warning',
                                title: 'Chỉ được chọn tối đa 5 ghế',
                                text: 'Vui lòng bỏ chọn ghế khác trước khi chọn ghế mới.'
                            });
                            return;
                        }

                        const className = selecting ? 'selecting' : 'available';
                        seatElement.className = `seat ${className}`;
                        updateOrderInfo();
                        img.src = `/images/seat-${className}.svg`;
                    });
                }

                seatElement.appendChild(img);

                const seatNumber = document.createElement('span');
                seatNumber.style.userSelect = 'none';
                seatElement.appendChild(seatNumber).textContent = String(index++).padStart(2, '0');
            }

            return seatElement;
        }));

        return rowElement;
    }));
    
};

/**
 * Cập nhật thông tin đơn hàng (ghế, số lượng, giá)
 */
const updateOrderInfo = () => {
    const selectedSeats = [...seatContainer.querySelectorAll('.seat.selecting')];
    const seatNumbers = selectedSeats.map(seat => seat.querySelector('span').textContent);
    
    const total = selectedSeats.length * parseInt(document.getElementById('orderInfo').getAttribute('data-price')) || 0;

    // Cập nhật vào giao diện
    document.getElementById('seat-count-display').textContent = `${selectedSeats.length} Ghế`;
    document.getElementById('seat-numbers-display').textContent = seatNumbers.length ? seatNumbers.join(', ') : 'Chưa chọn';
    document.getElementById('total-price-display').textContent = total.toLocaleString('vi-VN');
};