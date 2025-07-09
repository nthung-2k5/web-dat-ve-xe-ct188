// Toggle hamburger menu
function toggleMenu() {
  const navLinks = document.querySelector('.header__nav-links');
  navLinks.classList.toggle('header__nav-links--show');
}

// Toggle password visibility
function togglePasswordVisibility(el) {
  const passwordInput = el.parentElement.querySelector('input');

  const isHidden = passwordInput.type === 'password';
  passwordInput.type = isHidden ? 'text' : 'password';
  el.classList.toggle('fa-eye');
  el.classList.toggle('fa-eye-slash');
  el.style.color = isHidden ? '#007BFF' : '#ccc';
}

// Validate form on submit
const form = document.querySelector('form');
form.addEventListener('submit', async function (e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const email = formData.get('email').toString().trim();
  const password = formData.get('password').toString().trim();
  const repassword = formData.get('repassword').toString().trim();

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  if (!emailPattern.test(email)) {
    await Swal.fire({
      icon: 'error',
      title: 'Email không hợp lệ',
      text: 'Vui lòng nhập đúng định dạng.'
    });
    return;
  }

  if (!passwordPattern.test(password)) {
    await Swal.fire({
      icon: 'error',
      title: 'Mật khẩu không hợp lệ',
      text: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số.'
    });
    return;
  }

  if(password != repassword){
    await Swal.fire({
      icon: 'error',
      title: 'Mật khẩu không hợp lệ',
      text: 'Mật khẩu phải nhập trùng khớp'
    });
    return;
  }
  
  await Swal.fire({
    icon: 'success',
    title: 'Đăng ký thành công'
  });
});
