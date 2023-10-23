import styles from './AlertBlock.module.css'

const typeToClassMap = {
    accepted: styles.accepted,
    error: styles.error,
  };

  const AlertBlock = ({alerts}) => {
    return (
        <div className={styles.alerts}>
            {alerts.map((alert, index) => (
                <div key={index} className={`${typeToClassMap[alert.type] || ''} ${styles.alert}`}>
                    {alert.text}
                </div>
            ))}
        </div>
    )
}

export default AlertBlock;