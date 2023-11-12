import styles from './LeftSelecter.module.css'

const LeftSelecter = ({ selectedComponent, event, icon, alt, text, order }) => {
    
    return (
    <div 
        className={selectedComponent == order?styles.selectPointSelected:styles.selectPoint} 
        onClick={event}
    >
        <img src={icon} alt={alt} />
        <span>{text}</span>
    </div>
    );
};
  
export default LeftSelecter;

        