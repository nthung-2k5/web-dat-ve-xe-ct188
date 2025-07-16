import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11.22.2/+esm';
import { nameRegex, phoneRegex, emailRegex } from './validation.js';
import { resetFormErrors, showError, getOrShowError } from './form.js';

function processRegistration(name, email, password) {
    // Logic đăng ký thực tế ở đây
    // Ví dụ: return fetch('/api/register', { method: 'POST', body: ... })
    if (name && email && password) {
        return true; // Giả sử đăng ký thành công
    }
    return false;
}
document.forms[0].addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    resetFormErrors(form);

    const formData = new FormData(form);

    const name = await getOrShowError(form, formData, 'name', 'Vui lòng nhập họ tên');
    await getOrShowError(form, formData, 'address', 'Vui lòng nhập địa chỉ');
    const phone = await getOrShowError(form, formData, 'phone', 'Vui lòng nhập số điện thoại');
    const email = await getOrShowError(form, formData, 'email', 'Vui lòng nhập email');
    const password = await getOrShowError(form, formData, 'password', 'Vui lòng nhập mật khẩu');
    const confirmPassword = await getOrShowError(form, formData, 'confirm-password', 'Vui lòng nhập lại mật khẩu');

    if (!name || !phone || !email || !password || !confirmPassword) {
        return; // Nếu có trường nào rỗng, dừng xử lý
    }

    if (!nameRegex.test(name)) {
        showError(e.target, 'name', 'Họ tên chỉ được chứa chữ cái và khoảng trắng.');
    }
    else if (name.length < 2 || name.length > 50) {
        showError(e.target, 'name', 'Họ tên phải có độ dài từ 2 đến 50 ký tự.');
    }

    if (!phoneRegex.test(phone)) {
        showError(e.target, 'phone', 'Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng.');
        return;
    }

    if (!emailRegex.test(email)) {
        showError(e.target, 'email', 'Email không hợp lệ. Vui lòng nhập đúng định dạng.');
        return;
    }

    if (password.length < 8) {
        showError(e.target, 'password', 'Mật khẩu phải có ít nhất 8 ký tự.');
        return;
    }

    if (password !== confirmPassword) {
        showError(e.target, 'confirm-password', 'Mật khẩu không khớp. Vui lòng nhập lại.');
        return;
    }

    if (!formData.get('toc') === 'on') {
        await Swal.fire({
            icon: 'error',
            title: 'Chưa chấp nhận điều khoản',
            text: 'Vui lòng chấp nhận điều khoản dịch vụ trước khi đăng ký.'
        });
        return;
    }

    // Tất cả thông tin hợp lệ, thực hiện đăng ký
    const accounts = JSON.parse(localStorage.getItem('accounts') ?? '[]');
    if (accounts.some(acc => acc.email === email)) {
        await Swal.fire({
            icon: 'error',
            title: 'Email đã được sử dụng',
            text: 'Vui lòng sử dụng email khác.'
        });
        return;
    }

    accounts.push({
        name,
        email,
        password
    });

    await Swal.fire({
        icon: 'success',
        title: 'Đăng ký thành công',
        text: 'Chào mừng bạn đến với Route3Go!'
    });

    localStorage.setItem('accounts', JSON.stringify(accounts));
    localStorage.setItem('currentUser', JSON.stringify(accounts[accounts.length - 1]));
    // --- PHẦN XỬ LÝ SAU KHI ĐĂNG KÝ THÀNH CÔNG ---
    const newAccount = { name, email, password };
    accounts.push(newAccount);
    localStorage.setItem('accounts', JSON.stringify(accounts));
    
    // Tự động đăng nhập cho người dùng mới
    sessionStorage.setItem('currentUser', JSON.stringify(newAccount));

    await Swal.fire({
        icon: 'success',
        title: 'Đăng ký thành công',
        text: 'Bạn đã được tự động đăng nhập.'
    });

    // --- PHẦN CHUYỂN HƯỚNG THÔNG MINH (Tương tự trang đăng nhập) ---
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get('redirectUrl');

    if (redirectUrl) {
        window.location.href = redirectUrl;
    } else {
        window.location.href = '/';
    }
});