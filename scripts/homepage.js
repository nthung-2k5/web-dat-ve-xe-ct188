document.addEventListener('DOMContentLoaded', (event) => {
    const heading = document.querySelector('.promo-voucher h2');
    const paragraph = document.querySelector('.promo-voucher p');
    const originalHeadingText = heading.textContent;
    heading.textContent = ''; // Xóa văn bản cho hiệu ứng máy đánh chữ

    let i = 0;
    const speed = 100; // Tốc độ gõ tính bằng mili giây

    function typeWriter() {
        if (i < originalHeadingText.length) {
            heading.textContent += originalHeadingText.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Khi việc gõ hoàn tất, thêm lớp mờ dần vào đoạn văn
            paragraph.classList.add('fade-in-text');
        }
    }

    // Bắt đầu hiệu ứng máy đánh chữ
    typeWriter();
});