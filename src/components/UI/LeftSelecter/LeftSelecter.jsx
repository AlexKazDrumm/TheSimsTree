import styles from './LeftSelecter.module.css'

const LeftSelecter = ({ selectedComponent, event, icon, alt, text, order, slimMode }) => {
    const dynamicStyles = {
        justifyContent: slimMode ? 'center' : 'flex-start',
        padding: slimMode ? '16px' : '16px 24px 16px 16px',
        marginRight: slimMode ? '0px' : '12px'
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
                <span>{text}</span>
            }
        </div>
    );
};
  
export default LeftSelecter;