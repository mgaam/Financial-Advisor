import Chat from "../components/Chat/Chat"
import styles from "./chatPage.module.css"

const chatPage = () => {
    return <div className={styles.pageDiv}>
        <Chat />
    </div>
}
export default chatPage