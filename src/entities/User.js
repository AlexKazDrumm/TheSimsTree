import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import globals from '../globals';

class User {
  userData = null;
  isUserDataLoaded = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUserData(token) {
    try {
      const response = await axios.get(`${globals.productionServerDomain}/getUserData`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // console.log({ response });

      if (response.data && response.data.userData) {
        this.userData = response.data.userData;
        this.isUserDataLoaded = true;
      }
    } catch (error) {
      console.error('Ошибка при получении данных пользователя:', error);
    }
  }

  setUserData(newUserData) {
    this.userData = newUserData;
    this.isUserDataLoaded = true;
  }
  
}

export default new User();