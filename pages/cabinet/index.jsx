import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import styles from './Cabinet.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import LeftBar from '../../src/components/LeftBar/LeftBar';
import MyTrees from '../../src/processes/CabinetPageWay/MyTrees/MyTrees';
import CreateTree from '../../src/processes/CabinetPageWay/CreateTree/CreateTree'
import Profile from '../../src/processes/CabinetPageWay/Profile/Profile'

const Cabinet = () => {
    const [selectedComponent, setSelectedComponent] = useState(4);
    const [leftMenuClick, setLeftMenuClick] = useState(false)
    // const navigate = useNavigate();

    const renderComponent = () => {
        switch (selectedComponent) {
        case 1:
            // navigate('/');
            break
        case 2:
            return <MyTrees/>;
        case 3:
            return <CreateTree />;
        case 4:
            return <Profile />;
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
            />
            {renderComponent()}
          </div>
        </div>
    );
};
    
export default Cabinet;