import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import globals from '../../globals';

class UserTrees {
  treesData = [];
  isTreesDataLoaded = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUserTrees(token) {
    try {
      const response = await axios.get(`${globals.productionServerDomain}/getUserTrees`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data && response.data.success) {
        this.treesData = response.data.trees;
        this.isTreesDataLoaded = true;
      }
    } catch (error) {
      console.error('Ошибка при получении списка деревьев пользователя:', error);
      this.isTreesDataLoaded = false;
    }
  }

  setTreesData(newTreesData) {
    this.treesData = newTreesData;
    this.isTreesDataLoaded = true;
  }
}

export default new UserTrees();