export default ({ email, password, confirmPassword }) => {
    let hasError = false;
    let errors = {};

    let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email !== undefined) {
        if (!emailRegex.test(email)) {
            errors.email = "Please enter a valid email";
            hasError = true;
        }
    }

    if (password !== undefined) {
        if (!password) {
            errors.password = "Please enter your password";
            hasError = true;
        }
    }

    if (confirmPassword !== undefined) {
        if (password !== confirmPassword) {
            errors.confirmPassword = "Password does not match";
            hasError = true;
        }
    }

    return { hasError, errors };
};
