const Block = require('../blockchain/block');
const MINE_RATE = require('../config');
const { adjustDifficulty } = require('../blockchain/block');

describe('Block', () => {
  let data, lastBlock, block;

  beforeEach(() => {
    data = 'test-data';
    lastBlock = Block.genesis();
    block = Block.mineBlock(lastBlock, data);
  });

  it('sets the `data` to match the input', () => {
    expect(block.data).toEqual(data);
  });

  it('sets the `lastHash` to match the hash of the last block', () => {
    expect(block.lastHash).toEqual(lastBlock.hash);
  });

  it('generates the hash that matches the difficulty', () => {
    expect(block.hash.substring(0, block.difficulty))
      .toEqual('0'.repeat(block.difficulty));
  });

  it('lowers the difficulty when mining is slow', () => {
    expect(Block.adjustDifficulty(block, block.timestamp + 86400000))
      .toEqual(block.difficulty - 1)
  });

  it('increases the difficulty when mining is fast', () => {
    expect(Block.adjustDifficulty(block, block.timestamp + 1))
      .toEqual(block.difficulty + 1)
  });
});