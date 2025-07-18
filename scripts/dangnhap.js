import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11.22.2/+esm';
import { getOrShowError, resetFormErrors } from './form.js';

const getAccounts = () => {
    return [{
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
    }, ...JSON.parse(localStorage.getItem('accounts') ?? '[]')];
};

document.forms[0].addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    resetFormErrors(form);

    const formData = new FormData(form);

    const email = await getOrShowError(form, formData, 'email', 'Vui lòng nhập email');
    const password = await getOrShowError(form, formData, 'password', 'Vui lòng nhập mật khẩu');

    if (!email || !password) {
        return;
    }

    const rememberMe = formData.get('remember-me') === 'on';

    const accounts = getAccounts();
    const account = accounts.find(acc => acc.email === email && acc.password === password);

    if (account) {
        await Swal.fire({
            icon: 'success',
            title: 'Đăng nhập thành công',
            text: `Chào mừng ${account.name}!`
        });


        // Lưu thông tin người dùng
        (rememberMe ? localStorage : sessionStorage).setItem('currentUser', JSON.stringify(account));

        // --- PHẦN CHUYỂN HƯỚNG THÔNG MINH ---
        const urlParams = new URLSearchParams(window.location.search);
        const redirectUrl = urlParams.get('redirectUrl');

        if (redirectUrl) {
            // Nếu có redirectUrl (từ trang đặt vé gửi qua), thì quay về trang đó
            window.location.href = redirectUrl;
        } else {
            // Nếu không, về trang chủ như mặc định
            window.location.href = '/';
        }

    } else {
        await Swal.fire({
            icon: 'error',
            title: 'Đăng nhập thất bại',
            text: 'Sai email hoặc mật khẩu.'
        });
    }
});