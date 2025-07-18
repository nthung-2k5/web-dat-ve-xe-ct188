import { nameRegex, phoneRegex, emailRegex } from './validation.js';

document.getElementById("clearBtn").addEventListener("click", () => {
    selectedSeats.length = 0;
    document.querySelectorAll(".seat.selected").forEach(s => s.classList.remove("selected"));
    updateCart();
});



const customerNameInput = document.getElementById("name");
const customerPhoneInput = document.getElementById("customerPhone");
const customerEmailInput = document.getElementById("customerEmail");

/**
 * 
 * @param {HTMLInputElement} inputElement 
 * @param {RegExp} regexTest 
 */
function validateInput(inputElement, regexTest) {
    if (regexTest.test(inputElement.value)) {
        inputElement.classList.remove("is-invalid");
        inputElement.classList.add("is-valid");
    }
    else {
        inputElement.classList.remove("is-valid");
        inputElement.classList.add("is-invalid");
    }
}

customerNameInput.addEventListener("input", () => validateInput(customerNameInput, nameRegex));
customerPhoneInput.addEventListener("input", () => validateInput(customerPhoneInput, phoneRegex));
customerEmailInput.addEventListener("input", () => validateInput(customerEmailInput, emailRegex));

document.getElementById("checkoutBtn").addEventListener("click", async (e) => {
    e.preventDefault();

    validateInput(customerNameInput);
    validateInput(customerPhoneInput);
    validateInput(customerEmailInput);

    const termsAccepted = document.getElementById("acceptTerms").checked;

    if (!nameRegex.test(customerNameInput)) {
        await Swal.fire({
            icon: "error",
            title: "Lỗi!",
            text: "Vui lòng điền đầy đủ và chính xác họ và tên."
        });
        return;
    }

    if (!phoneRegex.test(customerPhoneInput)) {
        await Swal.fire({
            icon: "error",
            title: "Lỗi!",
            text: "Vui lòng điền đầy đủ và chính xác số điện thoại."
        });
        return;
    }

    if (!emailRegex.test(customerEmailInput)) {
        await Swal.fire({
            icon: "error",
            title: "Lỗi!",
            text: "Vui lòng điền đầy đủ và chính xác email."
        });
        return;
    }

    if (!termsAccepted) {
        await Swal.fire({
            icon: "error",
            title: "Lỗi!",
            text: "Vui lòng chấp nhận điều khoản trước khi thanh toán."
        });
        return;
    }

    if (selectedSeats.length === 0) {
        await Swal.fire({
            icon: "error",
            title: "Lỗi!",
            text: "Vui lòng chọn ít nhất 1 ghế trước khi thanh toán."
        });
        return;
    }
  
        const tuyen = document.getElementById('route-display')?.textContent.trim();
        const time = document.getElementById('departure-time-display')?.textContent.trim();
        const don = document.getElementById('pickup-location-display')?.textContent.trim();
        const tra = document.getElementById('arrival-location-display')?.textContent.trim();
        const totalPriceText = document.getElementById('total-price-display')?.textContent || '0đ';

        if (!tuyen || !time || !don || !tra) {
            alert("Thiếu thông tin tuyến, thời gian hoặc điểm đón/trả.");
            return;
        }

        const gia = parseInt(totalPriceText.replace(/[^\d]/g, ''));
        const maVe = Math.random().toString(36).substring(2, 8).toUpperCase();

        const ticket = {
            name,
            phone,
            email,
            route: tuyen,
            time,
            pickup: don,
            arrival: tra,
            total: gia,
            seats: Array.from(selectedSeats),
            maVe
        };

        sessionStorage.setItem("ticketData", JSON.stringify(ticket));
       
    window.location.href = "datvethanhcong.html";
});
