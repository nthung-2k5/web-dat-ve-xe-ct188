import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11.22.2/+esm';

/**
 * 
 * @param {HTMLFormElement} form 
 * @param {string} field 
 * @param {string} errorTitle
 * @param {string} errorMessage 
 * @returns 
 */
const tryGetValue = async (form, field, errorTitle, errorMessage) => {
    if (!form[field].checkValidity()) {
        await Swal.fire({
            icon: 'error',
            title: errorTitle,
            text: errorMessage
        });
        return null;
    }

    return form[field].value;
}

document.forms[0].addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = await tryGetValue(form, 'name', 'Tên không hợp lệ', 'Tên chỉ được chứa chữ cái và khoảng trắng.'); if (!name) return;
    const phone = await tryGetValue(form, 'phone', 'Số điện thoại không hợp lệ', 'Vui lòng nhập đúng định dạng số điện thoại Việt Nam (ví dụ: 0123456789 hoặc +84123456789).'); if (!phone) return;
    const email = await tryGetValue(form, 'email', 'Email không hợp lệ', 'Vui lòng nhập đúng định dạng email.'); if (!email) return;
    const topic = await tryGetValue(form, 'topic', 'Thông tin không đầy đủ', 'Vui lòng chọn chủ đề cần liên hệ.'); if (!topic) return;

    // Dữ liệu hợp lệ, gửi yêu cầu
    await Swal.fire({
        icon: 'success',
        title: 'Gửi thành công',
        text: 'Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi sẽ phản hồi sớm nhất có thể.'
    });

    form.reset();
});