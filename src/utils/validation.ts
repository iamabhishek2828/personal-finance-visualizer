export const validateTransaction = (transaction) => {
    const errors = {};

    if (!transaction.amount || isNaN(transaction.amount) || transaction.amount <= 0) {
        errors.amount = "Amount must be a positive number.";
    }

    if (!transaction.date) {
        errors.date = "Date is required.";
    }

    if (!transaction.description || transaction.description.trim() === "") {
        errors.description = "Description is required.";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

export const validateCategory = (category) => {
    const errors = {};

    if (!category || category.trim() === "") {
        errors.category = "Category is required.";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};