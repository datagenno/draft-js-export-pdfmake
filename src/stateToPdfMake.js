import { BLOCK_TYPE, INLINE_STYLE, getEntityRanges } from 'draft-js-utils';
import { convertFromRaw } from 'draft-js';

const { BOLD, CODE, ITALIC, STRIKETHROUGH, UNDERLINE } = INLINE_STYLE;

class StateToPdfMake {
  constructor(contentState) {
    this.contentState = convertFromRaw(contentState);
    this.currentBlock = 0;
    this.output       = { content : [] };
    this.blocks       = null;
    this.listOlAcc    = [];
    this.listUlAcc    = [];
  }

  generate() {
    this.blocks = this.contentState.getBlockMap().toArray();

    while(this.currentBlock < this.blocks.length) {
      this._processBlock();
    }

    return this.output;
  }

  _processBlock() {
    const block = this.blocks[this.currentBlock];

    const defaultHeaderStyle = { bold : true, margin : [ 0, 5, 0, 0 ] };

    if(block.getType() !== BLOCK_TYPE.UNORDERED_LIST_ITEM && !!this.listUlAcc.length) {
      this._updateAndResetUlList();
    }

    if(block.getType() !== BLOCK_TYPE.ORDERED_LIST_ITEM && !!this.listOlAcc.length) {
      this._updateAndResetOlList();
    }

    switch (block.getType()) {
      case BLOCK_TYPE.HEADER_ONE:
        this.output.content.push({
          text : block.getText(), fontSize : 24, ...defaultHeaderStyle
        });
      break;

      case BLOCK_TYPE.HEADER_TWO:
        this.output.content.push({
          text : block.getText(), fontSize : 22, ...defaultHeaderStyle
        });
      break;

      case BLOCK_TYPE.HEADER_THREE:
        this.output.content.push({
          text : block.getText(), fontSize : 20, ...defaultHeaderStyle
        });
      break;

      case BLOCK_TYPE.HEADER_FOUR:
        this.output.content.push({
          text : block.getText(), fontSize : 18, ...defaultHeaderStyle
        });
      break;

      case BLOCK_TYPE.HEADER_FIVE:
        this.output.content.push({
          text : block.getText(), fontSize : 16, ...defaultHeaderStyle
        });
      break;

      case BLOCK_TYPE.HEADER_SIX:
        this.output.content.push({
          text : block.getText(), fontSize : 14, ...defaultHeaderStyle
        });
      break;

      case BLOCK_TYPE.ORDERED_LIST_ITEM:
        this.listOlAcc.push({ text : [ ...this._renderBlockContent(block) ] });
      break;

      case BLOCK_TYPE.UNORDERED_LIST_ITEM:
        this.listUlAcc.push({ text : [ ...this._renderBlockContent(block) ] });
      break;

      default:
        const data = this._renderBlockContent(block);

        this.output.content.push(
          !!data.length ? { text : [ ...data ] } : { text : '\n' }
        );
    }

    // Clear lists when is last block
    if(block.getKey() === this.contentState.getLastBlock().getKey()) {
      if(!!this.listUlAcc.length) {
        this._updateAndResetUlList();
      }

      if(!!this.listOlAcc.length) {
        this._updateAndResetOlList();
      }
    }

    this.currentBlock += 1;
  }

  _renderBlockContent(block) {
    if(block.getText() === '') {
      return [];
    }

    const ranges = getEntityRanges(block.getText(), block.getCharacterList());

    return ranges.reduce((acc, [entityKey, stylePieces]) => {
      acc.push(
        ...stylePieces.map(([ text, style ]) => {
          return {
            text       : this._encodeContent(text),
            bold       : style.has(BOLD),
            italics    : style.has(ITALIC),
            decoration : this._getTextDecorations(style)
          };
        }).filter((properties) => properties.text !== ' ')
      );

      return acc;
    }, []);
  }

  _getTextDecorations(style) {
    const object = { [UNDERLINE]: 'underline', [STRIKETHROUGH]: 'lineThrough' };

    return Object.keys(object).reduce((acc, key) => {
      if(style.has(key)) {
        acc.push(object[key]);
      }

      return acc;
    }, []);
  }

  _encodeContent(text) {
    return text.replace(/[*_`]/g, '\\$&');
  }

  _updateAndResetUlList() {
    this.output.content.push({ ul : this.listUlAcc });
    this.listUlAcc = [];
  }

  _updateAndResetOlList() {
    this.output.content.push({ ol : this.listOlAcc });
    this.listOlAcc = [];
  }
}

export default StateToPdfMake;
