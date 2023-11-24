import React, { useEffect, useState } from "react";
import styles from './Captcha.module.css'
import { fetchRandomCaptcha, verifyCaptcha } from "../../features/features";
import BigInput from "../UI/BigInput/BigInput";
import RegularButton from "../UI/RegularButton/RegularButton";
import globals from "../../globals";

const Captcha = ({ confirmCaptcha, setConfirmCaptcha }) => {
    const [captchaImg, setCaptchaImg] = useState('');
    const [captchaText, setCaptchaText] = useState('');
    const [error, setError] = useState('');
    const [validated, setValidated] = useState(false);

    const fetchCaptcha = async () => {
        // setError(''); // Сброс предыдущих ошибок
        try {
            const captchaIn = await fetchRandomCaptcha();
            if (captchaIn) {
                setCaptchaImg(captchaIn);
                console.log('Captcha fetched:', captchaIn);
            }
        } catch (error) {
            console.error('Ошибка при получении капчи:', error);
        }
    };

    useEffect(() => {
        fetchCaptcha().catch(error => console.error('Ошибка в useEffect:', error));
    }, []);

    const handleVerifyCaptcha = async () => {
        const isCorrect = await verifyCaptcha(captchaText, captchaImg);
        if (isCorrect) {
            setValidated(true);
            setConfirmCaptcha(true);
        } else {
            setError('Неправильный код капчи, попробуйте еще раз.');
            setConfirmCaptcha(false);
            fetchCaptcha()
        }
    };

    return (
        <div className={styles.component}>
            {validated ? (
                <div className={styles.correct}>
                    <span className={styles.validated}>Капча введена корректно</span> <img className={styles.mark} src='./svg/mark.svg' />
                </div>
                
            ) : (
                <>
                    <span className={styles.title}>Введите код с изображения</span>
                    <div className={styles.captchaBlock}>
                        <div className={styles.captchaImg}>
                            <img src={`${globals.productionServerDomain}/file/${captchaImg}`} alt="Captcha" style={{border: '1px solid black', width: '200px', height: '60px'}}/>
                        </div>
                        <div className={styles.reloadBlock}>
                            <img src='./svg/reload.svg' onClick={fetchCaptcha} className={styles.reloadButton} />
                        </div>
                    </div>
                    <div style={{marginBottom: '10px'}}>
                        <BigInput value={captchaText} event={(e) => setCaptchaText(e.target.value)} disabled={validated}/>
                    </div>
                    <RegularButton text='Проверить' event={handleVerifyCaptcha} disabled={validated} type='grey' width={'166px'} height={'28px'}/>
                    {error && <div className={styles.error}>{error}</div>}
                </>
            )}
        </div>
    );
};

export default Captcha;