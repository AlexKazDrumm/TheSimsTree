import axios from "axios";
import globals from "../globals";
import User from "../entities/User";

export const updateAvatar = async (token, file) => {
    const formData = new FormData();
    formData.append('avatar', file);

    try {
        const response = await axios.put(`${globals.productionServerDomain}/updateAvatar`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.data && response.data.success) {
            console.log('Аватар успешно обновлен:', response.data);
            User.setUserData(response.data.userData); // Обновляем данные пользователя в хранилище
            return response.data.userData;
        }
    } catch (error) {
        console.error('Ошибка при обновлении аватара:', error);
        // обработка ошибок
    }
};

export const deleteAvatar = async (token) => {
    try {
        const response = await axios.delete(`${globals.productionServerDomain}/deleteAvatar`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.data && response.data.success) {
            console.log('Аватар успешно удален:', response.data);
            User.setUserData(response.data.userData); // Обновляем данные пользователя в хранилище
            return true;
        }
    } catch (error) {
        console.error('Ошибка при удалении аватара:', error);
        return false;
    }
};

export const updateUserData = async (token, userData) => {
    try {
        const response = await axios.put(`${globals.productionServerDomain}/updateUserData`, userData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.data && response.data.success) {
            console.log('Данные пользователя успешно обновлены:', response.data);
            User.setUserData(response.data.userData); // Обновляем данные пользователя в хранилище
            return true; // Возвращаем true при успешном обновлении
        } else {
            return false; // Возвращаем false, если обновление не удалось
        }
    } catch (error) {
        console.error('Ошибка при обновлении данных пользователя:', error);
        return false; // Возвращаем false в случае ошибки
    }
};

export const changePassword = async (token, oldPassword, newPassword, code) => {
    try {
        const response = await axios.post(`${globals.productionServerDomain}/changePassword`, {
            oldPassword,
            newPassword,
            code
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.data && response.data.success) {
            console.log('Password changed successfully:', response.data);
            return true;
        }
    } catch (error) {
        console.error('Error changing password:', error);
        return false;
    }
};

export const deleteUserAccount = async (token) => {
    try {
        const response = await axios.delete(`${globals.productionServerDomain}/deleteUserAccount`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.data && response.data.success) {
            console.log('User account deleted successfully:', response.data);
            return true;
        }
    } catch (error) {
        console.error('Error deleting user account:', error);
        return false;
    }
};

export const sendFeedback = async (name, email, message, files) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);
    files.forEach(file => {
        formData.append('images', file.file); // 'images' - это ключ для массива файлов
    });

    try {
        const response = await axios.post(`${globals.productionServerDomain}/feedback`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.data && response.data.success) {
            console.log('Feedback sent successfully:', response.data);
            return true;
        }
    } catch (error) {
        console.error('Error sending feedback:', error);
        return false;
    }
};

export const fetchRandomCaptcha = async () => {
    try {
        const response = await axios.get(`${globals.productionServerDomain}/getRandomCaptcha`);

        if (response.data) {
            console.log('Random CAPTCHA fetched successfully:', response.data);
            return response.data.captchaImage; // Возвращает URL изображения капчи
        }
    } catch (error) {
        console.error('Ошибка при получении случайной капчи:', error);
        // Здесь можно добавить обработку ошибок, например, показать сообщение пользователю
        return null;
    }
};

export const verifyCaptcha = async (captchaText, captchaImage) => {
    try {
        const response = await axios.post(`${globals.productionServerDomain}/verifyCaptcha`, {
            captchaText,
            captchaImage
        });

        if (response.data && response.data.success) {
            console.log('Captcha verified successfully:', response.data);
            return true;
        } else {
            console.log('Captcha verification failed:', response.data);
            return false;
        }
    } catch (error) {
        console.error('Ошибка при верификации капчи:', error);
        return false;
    }
};

export const sendVerificationCode = async (token, messageTitle) => {
    try {
        const response = await axios.post(`${globals.productionServerDomain}/sendVerificationCode`, { messageTitle }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.data && response.status === 200) {
            console.log('Верификационный код отправлен:', response.data);
            return true; 
        } else {
            return false;
        }
    } catch (error) {
        console.error('Ошибка при отправке верификационного кода:', error);
        return false; 
    }
};

export const changeEmail = async (token, newEmail, code) => {
    try {
        const response = await axios.post(`${globals.productionServerDomain}/changeUserEmail`, { newEmail, code }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            console.log('Email успешно обновлен');
            User.setUserData(response.data.userData);
            return true;
        } else {
            console.error('Ошибка при смене email');
            return false;
        }
    } catch (error) {
        console.error('Ошибка при смене email:', error);
        return false;
    }
};