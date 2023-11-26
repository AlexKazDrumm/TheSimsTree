import styles from './LeftSelecter.module.css'

const LeftSelecter = ({ selectedComponent, event, icon, alt, text, order, slimMode }) => {
    const dynamicStyles = {
        justifyContent: slimMode ? 'center' : 'flex-start',
        padding: slimMode ? '13px 15px 15px 15px' : '8px 0px 10px 20px',
        marginRight: slimMode ? '0px' : '0px'
    };

    return (
        <div 
            className={selectedComponent === order ? styles.selectPointSelected : styles.selectPoint} 
            onClick={event}
            style={dynamicStyles}
        >
            <img src={icon} alt={alt} style={{ marginRight: dynamicStyles.marginRight }}/>
            
            {
                !slimMode &&
                <>
                    <div style={{width: '17px'}}></div>
                    <span>{text}</span>
                </>
            }
        </div>
    );
};
  
export default LeftSelecter;