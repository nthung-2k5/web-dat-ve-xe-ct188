import handlebars from 'https://cdn.jsdelivr.net/npm/handlebars@4.7.8/+esm'

const leftColSeats = ["01", "03", "06", "09", "12", "15"];
const middleColSeats = ["04", "07", "10", "13", "16", "17"];
const rightColSeats = ["02", "05", "08", "11", "14", "18"];
const occupiedSeats = ["03", "04", "07", "09"];
const selectedSeats = [];

function renderSeats(containerId, seatList) {
    const container = document.getElementById(containerId);
    seatList.forEach(code => {
        const seat = document.createElement("img");
        seat.src = "/images/seat.svg";
        seat.width = 32;
        seat.height = 32;

        if (occupiedSeats.includes(code)) {
            seat.classList.add("occupied");
        } else {
            seat.addEventListener("click", () => {
                if (seat.classList.contains("selected")) {
                    seat.classList.remove("selected");
                    selectedSeats.splice(selectedSeats.indexOf(code), 1);
                } else {
                    if (selectedSeats.length >= 5) {
                        alert("Bạn đã chọn đủ 5 ghế.");
                        return;
                    }
                    seat.classList.add("selected");
                    selectedSeats.push(code);
                }
                updateCart();
            });
        }
        container.appendChild(seat);
    });
}

renderSeats("leftCol", leftColSeats);
renderSeats("middleCol", middleColSeats);
renderSeats("rightCol", rightColSeats);

function updateCart() {
    document.querySelector("#orderInfo p:nth-child(4)").innerHTML = `<strong>Số lượng ghế:</strong> ${selectedSeats.length} Ghế`;
    document.querySelector("#orderInfo p:nth-child(5)").innerHTML = `<strong>Số ghế:</strong> ${selectedSeats.join(", ") || "Chưa chọn"}`;
    const total = selectedSeats.length * 145000;
    document.querySelector("#orderInfo p:nth-child(7)").innerHTML = `<strong>Tổng tiền:</strong> ${total.toLocaleString("vi-VN")}đ`;
}

document.getElementById("clearBtn").addEventListener("click", () => {
    selectedSeats.length = 0;
    document.querySelectorAll(".seat.selected").forEach(s => s.classList.remove("selected"));
    updateCart();
});

document.getElementById("checkoutBtn").addEventListener("click", () => {

    const name = document.getElementById("customerName").value.trim();
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

    document.getElementById("ticketName").innerText = document.getElementById("customerName").value;
    document.getElementById("ticketPhone").innerText = document.getElementById("customerPhone").value;

    ticketBox.style.display = "block";

    document.getElementById("ticketSeats").innerText = selectedSeats.join(", ");
    document.getElementById("ticketTotal").innerText = selectedSeats.length * 145000;

});