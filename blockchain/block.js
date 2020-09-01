const SHA256 = require('crypto-js/sha256');

const { DIFFICULTY, MINE_RATE } = require('../config');

class Block {
  constructor(timestamp, lastHash, data, hash, nonce, difficulty) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.data = data;
    this.hash = hash;
    this.nonce = nonce;
    this.difficulty = difficulty || DIFFICULTY;
  }

  static genesis() {
    return new this('First Timestamp', '-----', [], '7djn-4mk8', 0, DIFFICULTY);
  }

  toString() {
    return `Block -
      Timestamp:  ${this.timestamp}
      Last Hash:  ${this.lastHash.substring(0, 10)}
      Nonce:      ${this.nonce}
      Difficulty: ${this.difficulty}
      Hash:       ${this.hash.substring(0, 10)}
      Data:       ${this.data}
    `;
  }

  static mineBlock(lastBlock, data) {
    const lastHash = lastBlock.hash;
    let difficulty = lastBlock.difficulty;

    let timestamp;
    let hash;
    let nonce = 0;

    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty(lastBlock, timestamp);
      hash = Block.calculateHash(timestamp, lastHash, data, nonce, difficulty);
    } while(hash.substring(0, difficulty) !== '0'.repeat(difficulty));
    
    return new this(timestamp, lastHash, data, hash, nonce, difficulty);
  }

  static calculateHash(timestamp, lastHash, data, nonce, difficulty) {
    return SHA256(`${timestamp}${lastHash}${JSON.stringify(data)}${nonce}${difficulty}`).toString();
  }

  static blockHash(block) {
    const { timestamp, lastHash, data, nonce, difficulty} = block;
    return Block.calculateHash(timestamp, lastHash, data, nonce, difficulty);
  }

  static adjustDifficulty(lastBlock, currentTimestamp) {
    let { difficulty } = lastBlock;
    difficulty = currentTimestamp - lastBlock.timestamp < MINE_RATE ? difficulty + 1 : difficulty - 1;
    
    return difficulty;
  }
}

module.exports = Block;