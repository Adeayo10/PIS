export function validateCustomer(customer) {
    const errors = [];

    if (!customer.name  || customer.name.trim() === '') {
        errors.push('Name is required and must be a non-empty string.');
    }

    if (!customer.email  || !/^\S+@\S+\.\S+$/.test(customer.email)) {
        errors.push('A valid email is required.');
    }


    if (!customer.address || typeof customer.address !== 'string' || customer.address.trim() === '') {
        errors.push('Address is required and must be a non-empty string.');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export function validateUser(user) {
    const errors = [];

    if (!user.name  || user.name.trim() === '') {
        errors.push('Name is required and must be a non-empty string.');
    }

    if (!user.email  || !/^\S+@\S+\.\S+$/.test(user.email)) {
        errors.push('A valid email is required.');
    }

    if (!user.role  || user.role.trim() === '') {
        errors.push('Role is required and must be a non-empty string.');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const bool =  emailRegex.test(email);
    return bool;
}

export function validateLoginUser({ username, password }) {
    const errors = [];
    if (!username || !isValidEmail(username)) {
        errors.push('A valid email is required.');
    }
    if (password.length < 8 ) {
        errors.push('Password is required and must be a non-empty string.');
    }

    console.log(errors);
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}
