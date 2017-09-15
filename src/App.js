import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { sendChatMessage, recieveChatMessage } from './api.js';

const Message = ({ name, text, isMe }) => (
  <div>{isMe ? text : `${name}: ${text}`}</div>
);
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Anonymous',
      messages: [],
      textValue: '',
    }
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
  }

  componentDidMount() {
    const { messages } = this.state;
    recieveChatMessage((err, message) => {
      messages.push(message);
      this.setState({ messages });
    });
  }

  handleSubmitClick(e) {
    const { name, textValue, messages } = this.state;
    sendChatMessage({ name, text: textValue });
    messages.push({ name, text: textValue, isMe: true });
    this.setState({ textValue: '', messages });
  }

  handleTextChange(e) {
    this.setState({ textValue: e.target.value });
  }

  onNameChange(e) {
    this.setState({ name: e.target.value });
  }

  render() {
    return (
      <div className="App container">
        Name: <input type="text" onChange={this.onNameChange} value={this.state.name} />
        <div style={{ width: '100vw' }}>
          {this.state.messages && this.state.messages.map((msg, index) => 
            <Message key={index} {...msg} />
          )}
        </div>
        <input
          style={{
            left: '5%',
            position: 'fixed', 
            bottom:'5%',
            width:'90vw', 
          }} type="text" onChange={this.handleTextChange} value={this.state.textValue} 
        />
        <div style={{
          right: '5%',
          position: 'fixed', 
          bottom:'5%',
        }} className="btn btn-primary" onClick={this.handleSubmitClick}>Submit</div>
      </div>
    );
  }
}

export default App;
