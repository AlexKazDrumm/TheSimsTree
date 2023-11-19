import axios from "axios";
import globals from "../globals";

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
            return response.data.data;
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
            return response.data;
        }
    } catch (error) {
        console.error('Ошибка при обновлении данных пользователя:', error);
        // обработка ошибок
    }
};

export const changePassword = async (token, oldPassword, newPassword) => {
    try {
        const response = await axios.post(`${globals.productionServerDomain}/changePassword`, {
            oldPassword,
            newPassword
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

export const sendFeedback = async (name, email, message, imageFile) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);
    formData.append('image', imageFile);

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