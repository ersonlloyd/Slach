import React, { Component } from "react"
import PropTypes from "prop-types"

export default class MessageInput extends Component {

  handleSubmit(e, { msgRef } = params) {
    const { message, current } = this.props
    e.preventDefault()

    let newParams = { message: {
      content: msgRef.value,
      receiveable_type: current.type,
      receiveable_id: current.id
    } }
    message(newParams)
  }

  render () {
    let msgRef

    return (
      <form onSubmit= { (el) => { this.handleSubmit (el, {msgRef}) } }>
        <label>
          Message:
        </label>
        <input
          ref={ (msg) => { msgRef = msg} }
          type="text"/>
        <button type="submit"> Send
        </button>
      </form>
    )
  }
}

