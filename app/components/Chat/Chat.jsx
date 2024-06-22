'use client';

import { useState } from "react";
import styles from "./Chat.module.css"

const Chat = () => {
    const [text, setText] = useState('')
    const [messages, setMessages] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(text)
    }
    return <div className={styles.chatScreen}>
        {/* maybe a loading based on a state (turnary operator) */}
        <div className={styles.chatMessages}>
            <p>test</p>
        </div>
        <div>
            <form onSubmit={handleSubmit}>
                <div className={styles.chatForm}>
                <input className={styles.formText} type="text" placeholder="Ask me for help!" value={text} required onChange={(e) => setText(e.target.value)}/>
                <button className={styles.formButton} type = 'submit'>Send</button>
                </div>
            </form>
        </div>
    </div>
}
export default Chat