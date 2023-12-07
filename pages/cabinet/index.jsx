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
import InfoModal from '../../src/components/Modals/InfoModal/InfoModal';

const Cabinet = observer(({ User }) => {
    const [selectedComponent, setSelectedComponent] = useState(1);
    const [leftMenuClick, setLeftMenuClick] = useState(false)
    const [isAuth, setIsAuth] = useState(false)
    const router = useRouter();
    const [infoModalVisible, setInfoModalVisible] = useState(false)

    const [infoImg, setInfoImg] = useState('')
    const [infoTitle, setInfoTitle] = useState('')
    const [infoText, setInfoText] = useState('')

    const fetchUserData = async () => {
        await User.fetchUserData(localStorage.getItem('authToken'));
        if (User.isUserDataLoaded) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
    };

    useEffect(() => {
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
                return <Tools user={User.userData} setInfoModalVisible={setInfoModalVisible} setInfoImg={setInfoImg} setInfoText={setInfoText} setInfoTitle={setInfoTitle}/>;
            case 4:
                return <CreateTree user={User.userData} />;
            case 5:
                return <PlumTrees user={User.userData} setInfoModalVisible={setInfoModalVisible} setInfoImg={setInfoImg} setInfoText={setInfoText} setInfoTitle={setInfoTitle} />
            case 6:
                return <MyTrees user={User.userData} setInfoModalVisible={setInfoModalVisible} setInfoImg={setInfoImg} setInfoText={setInfoText} setInfoTitle={setInfoTitle} />;
            case 7:
                router.push('/');
                break;
            default:
                return <MyTrees user={User.userData} />;
        }
    };

    return (
        <div className={styles.container}>
            {infoModalVisible &&
                <InfoModal
                    infoModalVisible={infoModalVisible}
                    setInfoModalVisible={setInfoModalVisible}
                    img={infoImg}
                    title={infoTitle}
                    text={infoText}
                />
            }
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