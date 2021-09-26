import React from 'react'
import { FaPaperPlane } from 'react-icons/fa';

class SendMessageForm extends React.Component {

    constructor(){
        super()
        this.state = {
            message: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            message: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.sendMessage(this.state.message.trim())
        this.setState({
            message: ''
        })
    }

    render() {
        return (
            <form
                className="send-message-form"
                onSubmit={this.handleSubmit}>
                <input
                    placeholder="Type a new message"
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    value={this.state.message}
                    type="text" />
                <FaPaperPlane
                    className="send-message-button" 
                    onClick={this.handleSubmit}/>
            </form>
        );
    }
}

export default SendMessageForm