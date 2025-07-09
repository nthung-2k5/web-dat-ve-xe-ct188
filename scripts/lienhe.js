document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const email = form.email.value.trim();
    const topic = form.topic.value;
    const message = form.message.value.trim();

    if (!name || !phone || !email || !topic || !message) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }
    // Kiểm tra tên
    const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/u;
    if (!nameRegex.test(name)) {
      alert("Tên chỉ được chứa chữ cái và khoảng trắng, không được chứa số hoặc ký tự đặc biệt!");
      return;
    }
    if (name.length < 2 || name.length > 50) {
      alert("Tên phải từ 2 đến 50 ký tự!");
      return;
    }
    // Kiểm tra email
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      alert("Email không hợp lệ!");
      return;
    }
    // Kiểm tra số điện thoại (Việt Nam)
    const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
    if (!phoneRegex.test(phone)) {
      alert("Số điện thoại không hợp lệ!");
      return;
    }
    // Nếu hợp lệ
    alert("Gửi phản hồi thành công! Chúng tôi sẽ liên hệ bạn sớm nhất.");
    form.reset();
  });
});