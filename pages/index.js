import { useEffect, useState } from "react";
import Header from "../src/components/Header/Header";
import Notifier from "../src/components/Notifier/Notifier";
import NavbarTop from "../src/components/NavbarTop/NavbarTop";
import AuthModal from "../src/components/Modals/AuthModal/AuthModal";
import SupportModal from "../src/components/Modals/SupportModal/SupportModal";
import Footer from "../src/components/Footer/Footer";
import Lending from "../src/processes/MainPageWay/Lending/Lending"
import Tools from "../src/processes/MainPageWay/Tools/Tools"
import Galery from "../src/processes/MainPageWay/Galery/Galery"
import Contacts from "../src/processes/MainPageWay/Contacts/Contacts"
import Donates from "../src/processes/MainPageWay/Donates/Donates"
import Help from "../src/processes/MainPageWay/Help/Help"
import { fetchUserData } from "../src/entities/User";

function MainPage() {
    const [isAuth, setIsAuth] = useState(false)
    const [alerts, setAlerts] = useState([])
    const [authModalVisible, setAuthModalVisible] = useState(false);
    const [supportModalVisible, setSupportModalVisible] = useState(false)
    const [selectedBlock, setSelectedBlock] = useState(1)
    const [user, setUser] = useState()

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

    const renderSelectedBlock = () => {
        switch (selectedBlock) {
            case 1: return <Lending setSupportModalVisible={setSupportModalVisible} />;
            case 2: return <Tools />;
            case 3: return <Galery />;
            case 4: return <Contacts />;
            case 5: return <Donates />;
            // case 6: return <Help />;
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
            <Notifier alerts={alerts} />
            <Header setUser={setUser} isAuth={isAuth} setIsAuth={setIsAuth} setAuthModalVisible={setAuthModalVisible} user={user}/>
            <NavbarTop setSupportModalVisible={setSupportModalVisible} selectedBlock={selectedBlock} setSelectedBlock={setSelectedBlock}/>
            { renderSelectedBlock() }
            <Footer />
        </div>
    );
}

export default MainPage;