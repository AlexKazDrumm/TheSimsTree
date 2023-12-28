import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import globals from '../../globals';

class UserLifeForms {
  lifeFormsData = [];
  isLifeFormsDataLoaded = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUserLifeForms(token) {
    try {
      const response = await axios.get(`${globals.productionServerDomain}/getUserLifeForms`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data && response.data.success) {
        this.lifeFormsData = response.data.lifeForms;
        this.isLifeFormsDataLoaded = true;
      }
    } catch (error) {
      console.error('Ошибка при получении списка форм жизни пользователя:', error);
      this.isLifeFormsDataLoaded = false;
    }
  }

  setLifeFormsData(newLifeFormsData) {
    this.lifeFormsData = newLifeFormsData;
    this.isLifeFormsDataLoaded = true;
  }
}

export default new UserLifeForms();