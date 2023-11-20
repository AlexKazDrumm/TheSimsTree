import React, { useEffect, useState } from "react";
import { inject, observer } from 'mobx-react';
import Header from "../src/components/Header/Header";
import Notifier from "../src/components/Notifier/Notifier";
import NavbarTop from "../src/components/NavbarTop/NavbarTop";
import AuthModal from "../src/components/Modals/AuthModal/AuthModal";
import SupportModal from "../src/components/Modals/SupportModal/SupportModal";
import InfoModal from "../src/components/Modals/InfoModal/InfoModal";
import Footer from "../src/components/Footer/Footer";
import Lending from "../src/processes/MainPageWay/Lending/Lending"
import Tools from "../src/processes/MainPageWay/Tools/Tools"
import Galery from "../src/processes/MainPageWay/Galery/Galery"
import Contacts from "../src/processes/MainPageWay/Contacts/Contacts"
import Donates from "../src/processes/MainPageWay/Donates/Donates"
import Privacy from "../src/processes/MainPageWay/Privacy/Privacy"

function MainPage({ User }) {
    const [isAuth, setIsAuth] = useState(false)
    const [alerts, setAlerts] = useState([])
    const [authModalVisible, setAuthModalVisible] = useState(false);
    const [supportModalVisible, setSupportModalVisible] = useState(false)
    const [infoModalVisible, setInfoModalVisible] = useState(false)
    const [selectedBlock, setSelectedBlock] = useState(1)
    const [user, setUser] = useState()

    const [infoImg, setInfoImg] = useState('')
    const [infoTitle, setInfoTitle] = useState('')
    const [infoText, setInfoText] = useState('')

    const fetchData = async () => {
        await User.fetchUserData(localStorage.getItem('authToken'));
        if (User.userData) {
            setIsAuth(true);
            setUser(User.userData);
        } else {
            setIsAuth(false);
            setUser(null);
        }
    };

    useEffect(() => {
        fetchData();
        console.log({User})
    }, [User]);

    const renderSelectedBlock = () => {
        switch (selectedBlock) {
            case 1: return <Lending setSupportModalVisible={setSupportModalVisible} />;
            case 2: return <Tools />;
            case 3: return <Galery />;
            case 4: return <Contacts />;
            case 5: return <Donates />;
            case 6: return <Privacy />;
            default: return <Lending setSupportModalVisible={setSupportModalVisible} />;
        }
    };
  
    return (
        <div>
            {authModalVisible && 
                <AuthModal 
                    authModalVisible={authModalVisible} 
                    setAuthModalVisible={setAuthModalVisible} 
                    alerts={alerts} 
                    setAlerts={setAlerts} 
                    setIsAuth={setIsAuth}
                    setUser={setUser}
                    setInfoModalVisible={setInfoModalVisible}
                    setInfoImg={setInfoImg}
                    setInfoTitle={setInfoTitle}
                    setInfoText={setInfoText}
                />
            }
            {supportModalVisible && 
                <SupportModal 
                    supportModalVisible={supportModalVisible} 
                    setSupportModalVisible={setSupportModalVisible} 
                    alerts={alerts} 
                    setAlerts={setAlerts} 
                />
            }
            {infoModalVisible &&
                <InfoModal
                    infoModalVisible={infoModalVisible}
                    setInfoModalVisible={setInfoModalVisible}
                    img={infoImg}
                    title={infoTitle}
                    text={infoText}
                />
            }
            <Notifier alerts={alerts} />
            <Header setUser={setUser} isAuth={isAuth} setIsAuth={setIsAuth} setAuthModalVisible={setAuthModalVisible} user={user}/>
            <NavbarTop setSupportModalVisible={setSupportModalVisible} selectedBlock={selectedBlock} setSelectedBlock={setSelectedBlock}/>
            { renderSelectedBlock() }
            <Footer selectedBlock={selectedBlock} setSelectedBlock={setSelectedBlock}/>
        </div>
    );
}

export default inject('User')(observer(MainPage));