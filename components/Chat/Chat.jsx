'use client';

import { useState } from "react";
import styles from "./Chat.module.css"
import toast from "react-hot-toast";

const Chat = () => {
    const [text, setText] = useState('')
    const [messages, setMessages] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault();
        const userMessage = e.target[0].value
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setText('');
        toast.promise(fetch('/api/complete-chat',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage }),
        }).then((res) => {
            res.json().then((response) => {
                setMessages((prevMessages) => [...prevMessages, response.chatResponse]);
            })
        }), {
            loading: 'Fetching financial data for you...',
            success: 'Done!',
            error: 'Error generating response',
        })
    }
    return <div className={styles.chatScreen}>
        <div className={styles.chatMessages}>
            {messages.map((message) => 
                <p className={styles.chatMessage}>{message}</p>
            )}
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