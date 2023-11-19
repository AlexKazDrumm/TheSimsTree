import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import styles from './Cabinet.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import LeftBar from '../../src/components/LeftBar/LeftBar';
import MyTrees from '../../src/processes/CabinetPageWay/MyTrees/MyTrees';
import CreateTree from '../../src/processes/CabinetPageWay/CreateTree/CreateTree'
import Profile from '../../src/processes/CabinetPageWay/Profile/Profile'
import { useRouter } from 'next/router';
import Tools from '../../src/processes/CabinetPageWay/Tools/Tools'
import { fetchUserData } from '../../src/entities/User';

const Cabinet = () => {
    const [selectedComponent, setSelectedComponent] = useState(1);
    const [leftMenuClick, setLeftMenuClick] = useState(false)
    const router = useRouter();
    const [user, setUser] = useState()
    const [isAuth, setIsAuth] = useState(false)

    const fetchData = async () => {
        const userData = await fetchUserData(localStorage.getItem('authToken'));
        setUser(userData);
      
        if (userData) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      };
      
      useEffect(() => {
        fetchData();
      }, []);

    useEffect(() => {
        // Получаем параметр 'option' из URL
        const option = parseInt(router.query.option, 10);

        // Устанавливаем selectedComponent в значение option, если оно существует и является числом
        if (option && !isNaN(option)) {
            setSelectedComponent(option);
        }
    }, [router.query.option]);

    const renderComponent = () => {
        switch (selectedComponent) {
        case 1:
            return <Profile user={user}/>;
        case 2:
            router.push('/')
            break
        case 3:
            return <Tools />;
        case 4:
            return <CreateTree />;
        case 6:
            return <MyTrees />;
        case 7:
            router.push('/')
            break
        default:
            return <MyTrees/>;
        }
    };

    return (
        <div className={styles.container}>
          <div className={styles.content}>
            <LeftBar
              selectedComponent={selectedComponent}
              setSelectedComponent={setSelectedComponent}
              setLeftMenuClick={setLeftMenuClick}
              user={user}
            />
            {renderComponent()}
          </div>
        </div>
    );
};
    
export default Cabinet;