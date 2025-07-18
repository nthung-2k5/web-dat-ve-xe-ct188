import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11.22.2/+esm';

const form = document.forms[0];

form.addEventListener('reset', () => {
    document.querySelectorAll('.seat.selecting').forEach(s => s.dispatchEvent(new Event('click')));
});

/**
 * @type {HTMLInputElement}
 */
const nameInput = form['name'];

/**
 * @type {HTMLInputElement}
 */
const phoneInput = form['phone'];

/**
 * @type {HTMLInputElement}
 */
const emailInput = form['email'];

document.forms[0].addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!nameInput.checkValidity()) {
        await Swal.fire({
            icon: 'error',
            title: 'Lỗi!',
            text: 'Vui lòng điền đầy đủ và chính xác họ và tên.'
        });
        return;
    }

    if (!phoneInput.checkValidity()) {
        await Swal.fire({
            icon: 'error',
            title: 'Lỗi!',
            text: 'Vui lòng điền đầy đủ và chính xác số điện thoại.'
        });
        return;
    }

    if (!emailInput.checkValidity()) {
        await Swal.fire({
            icon: 'error',
            title: 'Lỗi!',
            text: 'Vui lòng điền đầy đủ và chính xác email.'
        });
        return;
    }

    if (!form['acceptTerms'].checked) {
        await Swal.fire({
            icon: 'error',
            title: 'Lỗi!',
            text: 'Vui lòng chấp nhận điều khoản trước khi thanh toán.'
        });
        return;
    }

    const selectedSeats = document.querySelectorAll('.seat.selecting');
    if (selectedSeats.length === 0) {
        await Swal.fire({
            icon: 'error',
            title: 'Lỗi!',
            text: 'Vui lòng chọn ít nhất 1 ghế trước khi thanh toán.'
        });
        return;
    }

    window.location.href = 'datvethanhcong.html';
});

const customerInfo = document.getElementById('customerInfo');
const orderInfo = document.getElementById('orderInfo');
const rightCol = document.getElementById('rightCol');

const rearrangeElements = () => {
    const destElement = window.matchMedia('(min-width: 64rem)').matches ? rightCol : form;

    destElement.appendChild(customerInfo);
    destElement.appendChild(orderInfo);
};

window.addEventListener('resize', rearrangeElements, false);
rearrangeElements();