export class Constraints {
    constructor() {
      this.blockedPairs = new Set(); 
      
    }

    blockPair(participantIdA, participantIdB) {
      const key = `${participantIdA}-->${participantIdB}`;
      this.blockedPairs.add(key);
    }

    isBlocked(participantIdA, participantIdB) {
      const key = `${participantIdA}-->${participantIdB}`;
      return this.blockedPairs.has(key);
    }
  }
  