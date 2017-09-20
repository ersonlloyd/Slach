import React, { Component } from "react"
import PropTypes from "prop-types"

export default class MessageInput extends Component {
  render () {
    const { users, messages } = this.state

    return (
      <form>
        <label>
          Message:
        </label>
        <textarea>
        </textarea>
        <div>
          <button type="submit">
            Send
          </button>
        </div>
      </form>
    )
  }
}

