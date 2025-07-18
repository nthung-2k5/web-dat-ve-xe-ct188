import { nameRegex, phoneRegex, emailRegex } from './validation.js';

document.getElementById("clearBtn").addEventListener("click", () => {
    selectedSeats.length = 0;
    document.querySelectorAll(".seat.selected").forEach(s => s.classList.remove("selected"));
    updateCart();
});


document.getElementById("checkoutBtn").addEventListener("click", () => {

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const termsAccepted = document.getElementById("acceptTerms").checked;

    if (!name || !phone) {
        alert("Vui lòng nhập đầy đủ Họ và tên và Số điện thoại.");
        return;
    }
    if (!termsAccepted) {
        alert("Vui lòng chấp nhận điều khoản trước khi thanh toán.");
        return;
    }

    if (selectedSeats.length === 0) {
        alert("Vui lòng chọn ghế trước khi thanh toán.");
        return;
    }

    window.location.href = "datvethanhcong.html";

    document.getElementById("orderInfo").style.display = "none";
    document.querySelector("#seatContainer").closest(".col-lg-8").style.display = "none";
    document.querySelector("#orderInfo").closest(".col-lg-4").querySelector(".card").style.display = "none";

    const ticketBox = document.getElementById("ticketInfo");
    ticketBox.classList.add("centered");

    document.getElementById("ticketName").innerText = document.getElementById("name").value;
    document.getElementById("ticketPhone").innerText = document.getElementById("customerPhone").value;

    ticketBox.style.display = "block";

    document.getElementById("ticketSeats").innerText = selectedSeats.join(", ");
    document.getElementById("ticketTotal").innerText = selectedSeats.length * 145000;

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

    window.location.href = "datvethanhcong.html";
});