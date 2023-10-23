export const choosePalette = (type) => {
    const palettes = {
        blue: {
            textColor: 'FFFFFF',
            mainColor: '059FDC',
            secondColor: '1500B5'
        },
        green: {
            textColor: 'F1FFE2',
            mainColor: 'ADD34B',
            secondColor: '6FB12B'
        },
        orange: {
            textColor: 'fff8d8',
            mainColor: 'F9BA00',
            secondColor: 'F4780C'
        },
        grey: {
            textColor: '285471',
            mainColor: 'FAFAFA',
            secondColor: 'F4F3F0'
        }
    };

    return palettes[type] || null;
}

export const addAlert = (text, type, alerts, setAlerts) => {
    const id = new Date().getTime();
    const newAlert = { id, text, type };
    setAlerts([...alerts, newAlert]);
  
    setTimeout(() => {
      setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
    }, 10000);
};