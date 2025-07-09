document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll(".slider-wrapper img");
    const dots = document.querySelectorAll(".dot");
    let index = 0;
    const imgNumber = images.length;

    function showSlide(idx) {
        images.forEach((img, i) => {
            img.style.display = (i === idx) ? "block" : "none";
        });
        dots.forEach(dot => dot.classList.remove('active'));
        dots[idx].classList.add('active');
    }

    dots.forEach((dot, idx) => {
        dot.addEventListener("click", function() {
            index = idx;
            showSlide(index);
        });
    });

    function nextSlide() {
        index = (index + 1) % imgNumber;
        showSlide(index);
    }

    setInterval(nextSlide, 1690); // 1,69s giây đổi ảnh

    // Hiển thị ảnh đầu tiên khi load trang
    showSlide(index);
});