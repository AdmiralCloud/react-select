'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MultiSelectValueList = function (_React$Component) {
  _inherits(MultiSelectValueList, _React$Component);

  function MultiSelectValueList(props) {
    _classCallCheck(this, MultiSelectValueList);

    var _this = _possibleConstructorReturn(this, (MultiSelectValueList.__proto__ || Object.getPrototypeOf(MultiSelectValueList)).call(this, props));

    _this.handleMouseDown = _this.handleMouseDown.bind(_this);
    _this.onRemove = _this.onRemove.bind(_this);
    _this.handleTouchEndRemove = _this.handleTouchEndRemove.bind(_this);
    _this.handleTouchMove = _this.handleTouchMove.bind(_this);
    _this.handleTouchStart = _this.handleTouchStart.bind(_this);
    _this.handleTouchMove = _this.handleTouchMove.bind(_this);
    return _this;
  }

  _createClass(MultiSelectValueList, [{
    key: 'handleMouseDown',
    value: function handleMouseDown(event) {
      event.preventDefault();
      event.stopPropagation();

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
    }
  }, {
    key: 'onRemove',
    value: function onRemove(event) {
      event.preventDefault();
      event.stopPropagation();
      this.props.onRemove(this.props.value);
    }
  }, {
    key: 'handleTouchEndRemove',
    value: function handleTouchEndRemove(event) {
      // Check if the view is being dragged, In this case
      // we don't want to fire the click event (because the user only wants to scroll)
      if (this.dragging) {
        return;
      }

      // Fire the mouse events
      this.onRemove(event);
    }
  }, {
    key: 'handleTouchMove',
    value: function handleTouchMove(event) {
      // Set a flag that the view is being dragged
      this.dragging = true;
    }
  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(event) {
      // Set a flag that the view is not being dragged
      this.dragging = false;
    }
  }, {
    key: 'renderRemoveIcon',
    value: function renderRemoveIcon() {
      if (this.props.disabled || !this.props.onRemove) {
        return;
      }
      return _react2.default.createElement('span', {
        style: { float: 'right' },
        className: 'icon-cross3',
        'aria-hidden': 'true',
        onMouseDown: this.onRemove,
        onTouchEnd: this.handleTouchEndRemove,
        onTouchStart: this.handleTouchStart,
        onTouchMove: this.handleTouchMove });
    }
  }, {
    key: 'renderLabel',
    value: function renderLabel() {
      return _react2.default.createElement(
        'span',
        { style: { width: '95%' } },
        this.props.children
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        {
          className: 'Select--multiItem ' + this.props.className,
          title: this.props.value.title },
        this.renderLabel(),
        this.renderRemoveIcon()
      );
    }
  }]);

  return MultiSelectValueList;
}(_react2.default.Component);

MultiSelectValueList.propTypes = {
  children: _react2.default.PropTypes.node,
  className: _react2.default.PropTypes.string,
  disabled: _react2.default.PropTypes.bool, // disabled prop passed to ReactSelect
  id: _react2.default.PropTypes.string, // Unique id for the value - used for aria
  onClick: _react2.default.PropTypes.func, // method to handle click on value label
  onRemove: _react2.default.PropTypes.func, // method to handle removal of the value
  value: _react2.default.PropTypes.object.isRequired // the option object for this value
};

exports.default = MultiSelectValueList;