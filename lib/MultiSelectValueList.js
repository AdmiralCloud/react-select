'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var MultiSelectValueList = _react2['default'].createClass({

  displayName: 'MultiSelectValueList',

  propTypes: {
    children: _react2['default'].PropTypes.node,
    disabled: _react2['default'].PropTypes.bool, // disabled prop passed to ReactSelect
    id: _react2['default'].PropTypes.string, // Unique id for the value - used for aria
    onClick: _react2['default'].PropTypes.func, // method to handle click on value label
    onRemove: _react2['default'].PropTypes.func, // method to handle removal of the value
    value: _react2['default'].PropTypes.object.isRequired, // the option object for this value
    className: _react2['default'].PropTypes.string
  },

  handleMouseDown: function handleMouseDown(event) {
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

  onRemove: function onRemove(event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onRemove(this.props.value);
  },

  handleTouchEndRemove: function handleTouchEndRemove(event) {
    // Check if the view is being dragged, In this case
    // we don't want to fire the click event (because the user only wants to scroll)
    if (this.dragging) {
      return;
    }

    // Fire the mouse events
    this.onRemove(event);
  },

  handleTouchMove: function handleTouchMove(event) {
    // Set a flag that the view is being dragged
    this.dragging = true;
  },

  handleTouchStart: function handleTouchStart(event) {
    // Set a flag that the view is not being dragged
    this.dragging = false;
  },

  renderRemoveIcon: function renderRemoveIcon() {
    if (this.props.disabled || !this.props.onRemove) {
      return;
    }
    return _react2['default'].createElement('span', {
      style: { float: "right" },
      className: 'icon-cross3',
      'aria-hidden': 'true',
      onMouseDown: this.onRemove,
      onTouchEnd: this.handleTouchEndRemove,
      onTouchStart: this.handleTouchStart,
      onTouchMove: this.handleTouchMove });
  },

  renderLabel: function renderLabel() {
    return _react2['default'].createElement(
      'span',
      { style: { width: "95%" } },
      this.props.children
    );
  },

  render: function render() {
    return _react2['default'].createElement(
      'div',
      {
        className: "Select--multiItem " + this.props.className,
        title: this.props.value.title },
      this.renderLabel(),
      this.renderRemoveIcon()
    );
  }

});

module.exports = MultiSelectValueList;