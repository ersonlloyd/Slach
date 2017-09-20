import React, { Component } from "react"
import PropTypes from "prop-types"

export default class Item extends Component {
  render() {
    const { onClickChannelName } = this.props

    return (
      <li onClick={onClickChannelName}>
        { this.props.name }
      </li>
    )
  }
}
