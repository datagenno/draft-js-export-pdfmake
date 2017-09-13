'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _draftJsUtils = require('draft-js-utils');

var _draftJs = require('draft-js');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BOLD = _draftJsUtils.INLINE_STYLE.BOLD,
    CODE = _draftJsUtils.INLINE_STYLE.CODE,
    ITALIC = _draftJsUtils.INLINE_STYLE.ITALIC,
    STRIKETHROUGH = _draftJsUtils.INLINE_STYLE.STRIKETHROUGH,
    UNDERLINE = _draftJsUtils.INLINE_STYLE.UNDERLINE;

var StateToPdfMake = function () {
  function StateToPdfMake(contentState) {
    _classCallCheck(this, StateToPdfMake);

    this.contentState = (0, _draftJs.convertFromRaw)(contentState);
    this.currentBlock = 0;
    this.output = { content: [] };
    this.blocks = null;
    this.listOlAcc = [];
    this.listUlAcc = [];
  }

  _createClass(StateToPdfMake, [{
    key: 'generate',
    value: function generate() {
      this.blocks = this.contentState.getBlockMap().toArray();

      while (this.currentBlock < this.blocks.length) {
        this._processBlock();
      }

      return this.output;
    }
  }, {
    key: '_processBlock',
    value: function _processBlock() {
      var block = this.blocks[this.currentBlock];

      var defaultHeaderStyle = { bold: true, margin: [0, 5, 0, 0] };

      if (block.getType() !== _draftJsUtils.BLOCK_TYPE.UNORDERED_LIST_ITEM && !!this.listUlAcc.length) {
        this._updateAndResetUlList();
      }

      if (block.getType() !== _draftJsUtils.BLOCK_TYPE.ORDERED_LIST_ITEM && !!this.listOlAcc.length) {
        this._updateAndResetOlList();
      }

      switch (block.getType()) {
        case _draftJsUtils.BLOCK_TYPE.HEADER_ONE:
          this.output.content.push(_extends({
            text: block.getText(), fontSize: 24 }, defaultHeaderStyle));
          break;

        case _draftJsUtils.BLOCK_TYPE.HEADER_TWO:
          this.output.content.push(_extends({
            text: block.getText(), fontSize: 22 }, defaultHeaderStyle));
          break;

        case _draftJsUtils.BLOCK_TYPE.HEADER_THREE:
          this.output.content.push(_extends({
            text: block.getText(), fontSize: 20 }, defaultHeaderStyle));
          break;

        case _draftJsUtils.BLOCK_TYPE.HEADER_FOUR:
          this.output.content.push(_extends({
            text: block.getText(), fontSize: 18 }, defaultHeaderStyle));
          break;

        case _draftJsUtils.BLOCK_TYPE.HEADER_FIVE:
          this.output.content.push(_extends({
            text: block.getText(), fontSize: 16 }, defaultHeaderStyle));
          break;

        case _draftJsUtils.BLOCK_TYPE.HEADER_SIX:
          this.output.content.push(_extends({
            text: block.getText(), fontSize: 14 }, defaultHeaderStyle));
          break;

        case _draftJsUtils.BLOCK_TYPE.ORDERED_LIST_ITEM:
          this.listOlAcc.push({ text: [].concat(_toConsumableArray(this._renderBlockContent(block))) });
          break;

        case _draftJsUtils.BLOCK_TYPE.UNORDERED_LIST_ITEM:
          this.listUlAcc.push({ text: [].concat(_toConsumableArray(this._renderBlockContent(block))) });
          break;

        default:
          var data = this._renderBlockContent(block);

          this.output.content.push(!!data.length ? { text: [].concat(_toConsumableArray(data)) } : { text: '\n' });
      }

      // Clear lists when is last block
      if (block.getKey() === this.contentState.getLastBlock().getKey()) {
        if (!!this.listUlAcc.length) {
          this._updateAndResetUlList();
        }

        if (!!this.listOlAcc.length) {
          this._updateAndResetOlList();
        }
      }

      this.currentBlock += 1;
    }
  }, {
    key: '_renderBlockContent',
    value: function _renderBlockContent(block) {
      var _this = this;

      if (block.getText() === '') {
        return [];
      }

      var ranges = (0, _draftJsUtils.getEntityRanges)(block.getText(), block.getCharacterList());

      return ranges.reduce(function (acc, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            entityKey = _ref2[0],
            stylePieces = _ref2[1];

        acc.push.apply(acc, _toConsumableArray(stylePieces.map(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              text = _ref4[0],
              style = _ref4[1];

          return {
            text: _this._encodeContent(text),
            bold: style.has(BOLD),
            italics: style.has(ITALIC),
            decoration: _this._getTextDecorations(style)
          };
        }).filter(function (properties) {
          return properties.text !== ' ';
        })));

        return acc;
      }, []);
    }
  }, {
    key: '_getTextDecorations',
    value: function _getTextDecorations(style) {
      var _object;

      var object = (_object = {}, _defineProperty(_object, UNDERLINE, 'underline'), _defineProperty(_object, STRIKETHROUGH, 'lineThrough'), _object);

      return Object.keys(object).reduce(function (acc, key) {
        if (style.has(key)) {
          acc.push(object[key]);
        }

        return acc;
      }, []);
    }
  }, {
    key: '_encodeContent',
    value: function _encodeContent(text) {
      return text.replace(/[*_`]/g, '\\$&');
    }
  }, {
    key: '_updateAndResetUlList',
    value: function _updateAndResetUlList() {
      this.output.content.push({ ul: this.listUlAcc });
      this.listUlAcc = [];
    }
  }, {
    key: '_updateAndResetOlList',
    value: function _updateAndResetOlList() {
      this.output.content.push({ ol: this.listOlAcc });
      this.listOlAcc = [];
    }
  }]);

  return StateToPdfMake;
}();

exports.default = StateToPdfMake;
module.exports = exports['default'];