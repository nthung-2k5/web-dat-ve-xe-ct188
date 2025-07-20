import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11.22.2/+esm';
import { resetFormErrors, showError, getOrShowError } from './form.js';

document.forms[0].addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    resetFormErrors(form);

    const formData = new FormData(form);

    const name = await getOrShowError(form, 'name', 'Họ tên không hợp lệ');
    await getOrShowError(form, 'address', 'Vui lòng nhập địa chỉ');
    const phone = await getOrShowError(form, 'phone', 'Số điện thoại không hợp lệ');
    const email = await getOrShowError(form, 'email', 'Email không hợp lệ');
    const password = await getOrShowError(form, 'password', 'Mật khẩu phải có ít nhất 8 ký tự');
    const confirmPassword = await getOrShowError(form, 'confirm-password', 'Vui lòng nhập lại mật khẩu');

    if (!name || !phone || !email || !password || !confirmPassword) {
        return; // Nếu có trường nào rỗng, dừng xử lý
    }

    if (password !== confirmPassword) {
        showError(e.target, 'confirm-password', 'Mật khẩu không khớp. Vui lòng nhập lại.');
        return;
    }

    if (formData.get('toc') !== 'on') {
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

    // --- PHẦN XỬ LÝ SAU KHI ĐĂNG KÝ THÀNH CÔNG ---
    localStorage.setItem('accounts', JSON.stringify(accounts));
    // Tự động đăng nhập cho người dùng mới
    localStorage.setItem('currentUser', JSON.stringify(accounts[accounts.length - 1]));

    // --- PHẦN CHUYỂN HƯỚNG THÔNG MINH (Tương tự trang đăng nhập) ---
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get('redirectUrl');

    if (redirectUrl) {
        window.location.href = redirectUrl;
    }
    else {
        window.location.href = '/';
    }
});