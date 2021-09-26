import './App.css';
import React from 'react';
import Header from './components/Header';
import ChannelList from './components/ChannelList';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      userId: Math.floor(Math.random() * 4) + 1,
      userName: '',
      channelId: null,
      channels: [],
      messages: []
    }
    this.getChannels = this.getChannels.bind(this)
    this.selectChannel = this.selectChannel.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
  }

  componentDidMount() {
    this.loaduser()
    this.getChannels()
  }

  loaduser() {
    fetch('/api/v1/message/userId/' + this.state.userId)
    .then(res => res.json())
    .then((data) => {
      this.setState({
        userId: data.user_id,
        userName: data.user_name
      })
    })
    .catch(err => console.error('error in fetching channels: ', err))
  }

  getChannels() {
    fetch('/api/v1/message/channel')
    .then(res => res.json())
    .then((data) => {
      this.setState({ channels: data })
    })
    .catch(err => console.error('error in fetching channels: ', err))
  }

  selectChannel(channelId) {
    fetch('/api/v1/message/channelId/' + channelId)
    .then(res => res.json())
    .then((data) => {
      this.setState({ 
        messages: data,
        channelId: channelId
      })
    })
    .catch(err => console.error('error in selecting sechannel: ', err))
  }

  sendMessage(message){
    console.log('sendMessage');
    var data  = {
      "channel_id": this.state.channelId,
      "user_id": this.state.userId,
      "message": message
    }
    if(message !== '') {
      fetch('/api/v1/message/create', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
      }).then(res => {
        if(res.status === 201) {
          const currMsgID = this.state.messages
            .reduce((acc, curr) => curr.message_id > acc ? curr.message_id : acc, 0);
          var dataBeforeLoading  = {
            "message_id": (currMsgID + 1),
            "user_name": this.state.userName,
            "message": message
          }
          this.setState({
            messages: [...this.state.messages, dataBeforeLoading]
          })
        }
      })
      .catch((error) => { console.error(error) });
    }
  }

  render() {
    return (
      <div className="app">
        <Header />
        <ChannelList 
          selectChannel = {this.selectChannel} 
          channels = {this.state.channels} 
          channelId= {this.state.channelId}/>
        <MessageList
          channelId = {this.state.channelId}
          messages = {this.state.messages}/>
        <SendMessageForm
          disabled = {!this.state.channelId}
          sendMessage = {this.sendMessage}/>
      </div>
    );
  }
}

export default App;
