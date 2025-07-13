window.revealPassword = (icon) => {
    const input = icon.previousElementSibling;
    if (input.type === 'password') {
        input.type = 'text';
        icon.name = 'eye-off';
    } else {
        input.type = 'password';
        icon.name = 'eye';
    }
}