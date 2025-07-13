import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11.22.2/+esm';

const tryGetValue = (formData, key, errorMessage) => {
    const value = formData.get(key).toString().trim();
    if (!value) {
        Swal.fire({
            icon: 'error',
            title: 'Thông tin không đầy đủ',
            text: errorMessage
        });
        return null;
    }

    return value;
}

document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const name = tryGetValue(formData, 'name', 'Vui lòng nhập tên của bạn.');
    if (!name) return;

    const phone = tryGetValue(formData, 'phone', 'Vui lòng nhập số điện thoại của bạn.');
    if (!phone) return;

    const email = tryGetValue(formData, 'email', 'Vui lòng nhập địa chỉ email của bạn.');
    if (!email) return;

    const topic = tryGetValue(formData, 'topic', 'Vui lòng chọn chủ đề cần liên hệ.');
    if (!topic) return;
    
    const message = formData.get('message').toString().trim();

    // Kiểm tra tên
    const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/u;
    if (!nameRegex.test(name)) {
        await Swal.fire({
            icon: 'error',
            title: 'Tên không hợp lệ',
            text: 'Tên chỉ được chứa chữ cái và khoảng trắng.'
        });
        return;
    }

    if (name.length < 2 || name.length > 50) {
        await Swal.fire({
            icon: 'error',
            title: 'Tên không hợp lệ',
            text: 'Tên phải có độ dài từ 2 đến 50 ký tự.'
        });
        return;
    }

    // Kiểm tra email
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
        await Swal.fire({
            icon: 'error',
            title: 'Email không hợp lệ',
            text: 'Vui lòng nhập đúng định dạng email.'
        });
        return;
    }
    // Kiểm tra số điện thoại (Việt Nam)
    const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
    if (!phoneRegex.test(phone)) {
        await Swal.fire({
            icon: 'error',
            title: 'Số điện thoại không hợp lệ',
            text: 'Vui lòng nhập đúng định dạng số điện thoại Việt Nam (ví dụ: 0123456789 hoặc +84123456789).'
        });
        return;
    }

    // Dữ liệu hợp lệ, gửi yêu cầu
    await Swal.fire({
        icon: 'success',
        title: 'Gửi thành công',
        text: 'Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi sẽ phản hồi sớm nhất có thể.'
    });

    e.target.reset();
});