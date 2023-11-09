import axios from "axios";
import globals from "../globals";

export const fetchUserData = async (token) => {
    try {
      const response = await axios.get(`${globals.productionServerDomain}/getUserData`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log({response})
      if (response.data && response.data.userData) {
        // Теперь у вас есть данные пользователя, и вы можете их использовать.
        return response.data.userData
      }
    } catch (error) {
      console.error('Ошибка при получении данных пользователя:', error);
      // обработка ошибок
    }
};