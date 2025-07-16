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
                    seatElement.addEventListener('click', () => {
                        const selecting = !seatElement.classList.contains('selecting');
                        const className = selecting ? 'selecting' : 'available';
                        seatElement.className = `seat ${className}`;

                        img.src = `/images/seat-${className}.svg`;
                    });
                }

                seatElement.appendChild(img);
                seatElement.appendChild(document.createElement('span')).textContent = String(index++).padStart(2, '0');
            }

            return seatElement;
        }));

        return rowElement;
    }));
};