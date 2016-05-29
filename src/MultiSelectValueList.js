import React from 'react';
import classNames from 'classnames';

const MultiSelectValueList = React.createClass({

  displayName: 'MultiSelectValueList',

  propTypes: {
    children: React.PropTypes.node,
    disabled: React.PropTypes.bool,               // disabled prop passed to ReactSelect
    id: React.PropTypes.string,                   // Unique id for the value - used for aria
    onClick: React.PropTypes.func,                // method to handle click on value label
    onRemove: React.PropTypes.func,               // method to handle removal of the value
    value: React.PropTypes.object.isRequired,     // the option object for this value
  },

  handleMouseDown (event) {
    if (event.type === 'mousedown' && event.button !== 0) {
      return;
    }
    if (this.props.onClick) {
      event.stopPropagation();
      this.props.onClick(this.props.value, event);
      return;
    }
    if (this.props.value.href) {
      event.stopPropagation();
    }
  },

  onRemove (event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onRemove(this.props.value);
  },

  handleTouchEndRemove (event){
    // Check if the view is being dragged, In this case
    // we don't want to fire the click event (because the user only wants to scroll)
    if(this.dragging) return;

    // Fire the mouse events
    this.onRemove(event);
  },

  handleTouchMove (event) {
    // Set a flag that the view is being dragged
    this.dragging = true;
  },

  handleTouchStart (event) {
    // Set a flag that the view is not being dragged
    this.dragging = false;
  },

  renderRemoveIcon () {
    if (this.props.disabled || !this.props.onRemove) return;
    return (
      <span style={{float: "right"}}
            className="Select-value-icon"
            aria-hidden="true"
            onMouseDown={this.onRemove}
            onTouchEnd={this.handleTouchEndRemove}
            onTouchStart={this.handleTouchStart}
            onTouchMove={this.handleTouchMove}>
				&times;
			</span>
    );
  },

  renderLabel () {
    return (
      <span style={{width: "95%"}}>{ this.props.children }</span>
    )
  },

  render () {
    return (
      <div className="row">
        <div className="col-md-12"
             style={{padding: '0.4em', border: 'thin solid #ccc'}}
             title={this.props.value.title}
            >
              {this.renderLabel()}
              {this.renderRemoveIcon()}
          </div>
        </div>
    );
  }

});

module.exports = MultiSelectValueList;
