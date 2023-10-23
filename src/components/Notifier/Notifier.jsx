import AlertBlock from '../UI/AlertBlock/AlertBlock'
import styles from './Notifier.module.css'

const Notifier = ({alerts}) => {
    return (
        <div className={styles.container}>
            <AlertBlock alerts={alerts} />
        </div>
    )
}

export default Notifier