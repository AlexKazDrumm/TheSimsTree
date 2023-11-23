import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import styles from './Cabinet.module.css';
import { useRouter } from 'next/router';
import LeftBar from '../../src/components/LeftBar/LeftBar';
import MyTrees from '../../src/processes/CabinetPageWay/MyTrees/MyTrees';
import CreateTree from '../../src/processes/CabinetPageWay/CreateTree/CreateTree';
import Profile from '../../src/processes/CabinetPageWay/Profile/Profile';
import Tools from '../../src/processes/CabinetPageWay/Tools/Tools';
import PlumTrees from '../../src/processes/CabinetPageWay/PlumTrees/PlumTrees';

const Cabinet = observer(({ User }) => {
    const [selectedComponent, setSelectedComponent] = useState(1);
    const [leftMenuClick, setLeftMenuClick] = useState(false)
    const [isAuth, setIsAuth] = useState(false)
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            await User.fetchUserData(localStorage.getItem('authToken'));
            if (User.isUserDataLoaded) {
              setIsAuth(true);
            } else {
              setIsAuth(false);
            }
        };

        fetchUserData();
    }, [User]);

    useEffect(() => {
        const option = parseInt(router.query.option, 10);
        if (option && !isNaN(option)) {
            setSelectedComponent(option);
        }
    }, [router.query.option]);

    const renderComponent = () => {
        switch (selectedComponent) {
            case 1:
                return <Profile user={User.userData} />;
            case 2:
                router.push('/');
                break;
            case 3:
                return <Tools />;
            case 4:
                return <CreateTree />;
            case 5:
                return <PlumTrees />
            case 6:
                return <MyTrees />;
            case 7:
                router.push('/');
                break;
            default:
                return <MyTrees />;
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <LeftBar
                    selectedComponent={selectedComponent}
                    setSelectedComponent={setSelectedComponent}
                    setLeftMenuClick={setLeftMenuClick}
                    user={User.userData}
                />
                {User.isUserDataLoaded ? renderComponent() : <div>Loading...</div>}
            </div>
        </div>
    );
});

const CabinetLK = inject('User')(Cabinet);

export default CabinetLK;