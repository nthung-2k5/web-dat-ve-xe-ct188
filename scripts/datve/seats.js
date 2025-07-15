import _ from 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/+esm';

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
export const createSeatMap = (totalSeats, availableSeats) => {
    const seatMap = seatMaps[totalSeats];
    if (!seatMap) {
        throw new Error(`Unsupported total seats: ${totalSeats}`);
    }

    // Randomly mark available seats
    let seatsToMark = _.sampleSize(Array.from({ length: totalSeats }, (_, i) => i), availableSeats);
    let index = 0;
    for (let row = 0; row < seatMap.length; row++) {
        for (let col = 0; col < seatMap[row].length; col++) {
            if (seatMap[row][col] === null) continue; // Skip null positions

            if (seatsToMark.includes(index)) {
                seatMap[row][col] = true; // Mark as available
            }

            index++;
        }
    }

    return seatMap;
};

export const renderSeatMap = (seatContainer, totalSeats, availableSeats) => {
    const seatMap = createSeatMap(totalSeats, availableSeats);
    let index = 1;
    seatContainer.innerHTML = seatMap.reduce((rowHtml, row) => rowHtml +
        `<div class="seat-row">
            ${row.reduce((colHtml, seat) => {
                if (seat === null) {
                    colHtml += '<div class="seat empty"></div>';
                }
                else {
                    colHtml +=
                        `<div class="seat ${seat ? 'occupied' : 'available'}">
                            <img src="/images/seat-${seat ? 'occupied' : 'available'}.svg" alt="Ghế" width="40" height="40">
                            <span>${String(index).padStart(2, '0')}</span>
                        </div>`;
                    index++;
                }

                return colHtml;
            }, '')}
        </div>`, '');
};