export interface ValidationResult {
    isValid: boolean;
    field?: string;
    message?: string;
}

export const validateName = (name: string): ValidationResult => {
    if (!name || name.length < 3 || name.length > 40) {
        return {
            isValid: false,
            field: 'name',
            message: 'contact.validation.nameRequired',
        };
    }
    return { isValid: true };
};

export const validateEmail = (email: string): ValidationResult => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return {
            isValid: false,
            field: 'email',
            message: 'contact.validation.emailInvalid',
        };
    }
    return { isValid: true };
};

export const validateContent = (content: string): ValidationResult => {
    if (!content || content.length < 20 || content.length > 500) {
        return {
            isValid: false,
            field: 'content',
            message: 'contact.validation.contentLength',
        };
    }
    return { isValid: true };
};

export const validateSubjects = (subjects: string[]): ValidationResult => {
    if (subjects.length === 0) {
        return {
            isValid: false,
            field: 'subjects',
            message: 'contact.validation.subjectRequired',
        };
    }
    return { isValid: true };
};

export const validateForm = (
    name: string,
    email: string,
    content: string,
    subjects: string[]
): ValidationResult => {
    const nameValidation = validateName(name);
    if (!nameValidation.isValid) return nameValidation;

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) return emailValidation;


    const subjectsValidation = validateSubjects(subjects);
    if (!subjectsValidation.isValid) return subjectsValidation;

    const contentValidation = validateContent(content);
    if (!contentValidation.isValid) return contentValidation;


    return { isValid: true };
}; 