import React from 'react'
import Message from './Message'

class MessageList extends React.Component {
    
    render() {
        if (!this.props.channelId) {
            return (
                <div className="message-list">
                    <div className="join-channel">
                        Select a channel!
                    </div>
                </div>
            )
        }
        return (
            <div className="message-list">
                {[...this.props.messages].map((message, index) => {
                    return (
                        <Message 
                            key={message.message_id} 
                            username={message.user_name} 
                            message={message.message}/>
                    )
                })}
            </div>
        );
    }

}

export default MessageList