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