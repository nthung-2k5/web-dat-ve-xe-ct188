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
        return; // Nếu có trường nào rỗng, dừng xử lý
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

        (rememberMe ? localStorage : sessionStorage).setItem('currentUser', JSON.stringify(account));
        window.location.href = '/';
    } else {
        await Swal.fire({
            icon: 'error',
            title: 'Đăng nhập thất bại',
            text: 'Email hoặc mật khẩu không đúng. Vui lòng thử lại.'
        });

        e.target.reset();
    }
});