/**
 * 
 * @param {HTMLFormElement} form 
 */
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

/**
 * 
 * @param {HTMLFormElement} form 
 * @param {string} field 
 * @param {string} errorMessage 
 */
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

/**
 * 
 * @param {HTMLFormElement} form 
 * @param {string} field 
 * @param {string} errorMessage 
 * @returns 
 */
export const getOrShowError = async (form, field, errorMessage) => {
    if (!form[field].checkValidity()) {
        await showError(form, field, errorMessage);
        return null;
    }

    return form[field].value;
};