'use client';

import { useState } from "react";
import styles from "./Chat.module.css"
import toast from "react-hot-toast";

const Chat = () => {
    const [text, setText] = useState('')
    const [messages, setMessages] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault();
        let newMessages = [...messages, {role: 'user', content: e.target[0].value}]
        setMessages(newMessages);
        setText('');
        toast.promise(fetch('/api/complete-chat',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ messages: newMessages }),
        }).then((res) => {
            res.json().then((response) => {
                setMessages((prevMessages) => [...prevMessages, response]);
            }).catch((err) => {
                console.error("error trying to convert complete chat response to json", err)
                setMessages((prevMessages) => [...prevMessages, {role: 'assistant', content: 'something went wrong, please try again or contact us if the issue persists'}]);
                throw err
            })
        }).catch((err) => {
            console.error("error trying to complete chat", err)
            setMessages((prevMessages) => [...prevMessages, {role: 'assistant', content: 'something went wrong, please try again or contact us if the issue persists'}]);
            throw err
        }), {
            loading: 'Generating response...',
            success: 'Done!',
            error: 'Error generating response',
        })
    }

    return <div className={styles.chatScreen}>
        <div className={styles.chatMessages}>
            {messages.map(({role, content}, index) => 
                <div key={index}>
                    <span>{role == 'user' ? '👤' : '🤖'}</span>
                    <pre className={styles.chatMessage}>{content}</pre>
                    <br/>
                </div>
            )}
        </div>
        <div className={styles.chatForm}>
            <form onSubmit={handleSubmit}>
                <div className={styles.chatFormInner}>
                <input className={styles.formText} type="text" placeholder="Ask me for help!" value={text} required onChange={(e) => setText(e.target.value)}/>
                <button className={styles.formButton} type = 'submit'>Send</button>
                </div>
            </form>
        </div>
    </div>
}
export default Chat