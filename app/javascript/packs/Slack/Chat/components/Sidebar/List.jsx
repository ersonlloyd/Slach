import React, { Component } from "react"
import PropTypes from "prop-types"

import Item from "./Item";

export default class List extends Component {
  renderUsers() {
    const { items } = this.props

    return items.map( (item) => {
      return (
        <Item
          onClickChannelName = {this.props.onClickChannelName}
          key={ item.id }
          name={ item.username || item.name } />
      )
    })
  }

  toggleMessages() {

  }

  render() {
    const { type, items, onClickCreateChannel } = this.props
    return (
      <div>
        { type }
        { onClickCreateChannel === undefined ? "" :
          <button onClick={ () => { onClickCreateChannel() } } >
            Create
          </button>
        }
        <ul>
          { this.renderUsers() }
        </ul>
      </div>
    )
  }
}
