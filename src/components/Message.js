function Message(props) {  
    return (
        <div className="message">
            <div className="message-username">{props.username}</div>
            <div className="message-text">{props.message}</div>
        </div>
    )
}

export default Message