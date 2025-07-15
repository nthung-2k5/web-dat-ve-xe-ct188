export const resetFormErrors = (form) => {
    const errorElements = form.querySelectorAll('.error');
    errorElements.forEach(el => {
        el.classList.remove('error');
        const errorSpan = document.getElementById(`${el.name}-error`);
        if (errorSpan) {
            errorSpan.textContent = '';
        }
    });
};

export const showError = async (form, field, errorMessage) => {
    const errorElement = document.getElementById(`${field}-error`);
    if (errorElement) {
        errorElement.textContent = errorMessage;
        form[field].classList.add('error');
    } else {
        await Swal.fire({
            icon: 'error',
            title: 'Thông tin không hợp lệ',
            text: errorMessage
        });
    }
    form[field].focus();
}

export const getOrShowError = async (form, formData, field, errorMessage) => {
    const value = formData.get(field)?.toString().trim();

    if (!value) {
        await showError(form, field, errorMessage);
        return null;
    }

    return value;
};