const Blockchain = require('../blockchain');
const Block = require('../blockchain/block');

describe('Blockchain', () => {
  let testBC, newBC;

  beforeEach(() => {
    testBC = new Blockchain();
    newBC = new Blockchain();
  });

  it('starts with genesis block', () => {
    expect(testBC.chain[0]).toEqual(Block.genesis());
  });

  it('adds a new block', () => {
    const data  = 'test-data-for-new-block';
    testBC.addBlock(data);

    expect(testBC.chain[testBC.chain.length - 1].data).toEqual(data);
  });

  it('validates a valid chain', () => {
    newBC.addBlock('new-data');
    
    expect(testBC.isValidChain(newBC.chain)).toBe(true);
  });

  it('invalidates a chain with corrupt genesis block', () => {
    newBC.chain[0] = 'corrupt data';

    expect(testBC.isValidChain(newBC.chain)).toBe(false);
  });

  it('invalidates a chain with a corrupt block', () => {
    newBC.addBlock('foo bar');
    newBC.chain[newBC.chain.length - 1].data = 'corrupted foo bar';

    expect(testBC.isValidChain(newBC.chain)).toBe(false);
  });

  it('replaces the chain with new valid chain', () => {
    newBC.addBlock('zoo');
    testBC.replaceChain(newBC.chain);

    expect(testBC.chain).toEqual(newBC.chain);
  });

  it('does not replace the chain with new shorter chain', () => {
    testBC.addBlock('xoo');
    testBC.replaceChain(newBC.chain);

    expect(testBC.chain).not.toEqual(newBC.chain);
  });
});