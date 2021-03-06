import React, { Component } from "react"
import PropTypes from "prop-types"
import List from "../components/Sidebar/List"
import Message from "../components/Message/Message"
import MessageInput from "../components/Message/MessageInput"
import ChannelForm from "../components/Forms/ChannelForm"

import UsersAPI from "../services/UsersAPI"
import ChannelsAPI from "../services/ChannelsAPI"
import MessagesAPI from "../services/MessagesAPI"

export default class ChatContainer extends Component {
  constructor() {
    super()
    this.state = { users: [], channels: [], messages: [], activeChannel: {} }
    this.activeChannel = this.activeChannel.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
  }

  componentWillMount() {
    UsersAPI.fetchAll({
      onSuccess: (response) => {
        this.setState({users: response.data})
      }
    })

    ChannelsAPI.fetchAll({
      onSuccess: (response) => {
        this.setState({ channels: response.data } )
      }
    })

    MessagesAPI.fetchAll({
      onSuccess: (response) => {
        this.setState({ messages: response.data } )
      }
    })
  }

  activeChannel(activeChannel) {
    let isActiveChannel = this.state.channels.find((member) => { return member.name === activeChannel} )
    this.setState({ activeChannel: isActiveChannel })
  }

  sendMessage(params) {
    const { messages } = this.state

    MessagesAPI.create({
      data: params,
      onSuccess: (response) => {
        this.setState({ messages: messages.concat(response.data) })
      }
    })
  }

  createChannel(params, ref1, ref2) {
    const { channels } = this.state

    ChannelsAPI.create({
      data: params,
      onSuccess: (response) => {
        this.setState({ channels: channels.concat(response.data) })
        this.toggleChannelForm(ref1, ref2)
      }
    })
  }

  toggleChannelForm(ref1, ref2) {
    if (ref1.hasAttribute('hidden')) {
      ref1.removeAttribute('hidden')
      ref2.setAttribute('hidden', 'hidden')
    } else {
      ref2.removeAttribute('hidden')
      ref1.setAttribute('hidden', 'hidden')
    }
  }

  render() {
    const { users, channels, activeChannel, messages  } = this.state
    const publicChannels = channels.filter( (member) => { return member.type === "PublicChannel" } )
    const privateChannels = channels.filter( (member) => { return member.type === "PrivateChannel" } )
    const groupChannels = channels.filter( (member) => { return member.type === "GroupChannel" } )

    let filterMessages = messages.filter( (member) => { return member.receiveable_id === activeChannel.id } )
    let formRef, contentRef

    return (
      <div>
        <div
          ref={ (el) => { formRef = el } }
          role="channel-form"
          hidden>
          <ChannelForm
            users={ users }
            onCreateChannel={ (value) => { this.createChannel(value, formRef, contentRef) } }
            onCancelCreateChannel={ () => { this.toggleChannelForm(formRef, contentRef) } }/>
        </div>
        <div
          ref={ (el) => { contentRef = el } }
          role="main-content">
          <aside>
            <List
              onClickCreateChannel={ () => { this.toggleChannelForm(formRef, contentRef) } }
              icon={ "hashtags" }
              type={ "Public Channels" }
              items={ publicChannels }
              current= { this.activeChannel }
            />
            <List
              onClickCreateChannel={ () => { this.toggleChannelForm(formRef, contentRef) } }
              icon={ "lock" }
              type={ "Private Channels" }
              items={ privateChannels }
              current= { this.activeChannel }
            />
            <List
              type={ "Direct Messages" }
              icon={ "circle" }
              items={ users }
              current= { this.activeChannel }
            />
          </aside>
          <article>
            <Message
              messages={ filterMessages }
              current={ this.state.activeChannel } />
              <MessageInput
                message={ this.sendMessage }
                current={ this.state.activeChannel } />
          </article>
        </div>
      </div>
    )
  }
}
