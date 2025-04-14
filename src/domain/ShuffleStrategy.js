export class ShuffleStrategy {
    constructor(constraints) {
      this.constraints = constraints;
      this.MAX_TRIES = 5000;
    }
  
    /**
     * @param {Array} participants
     * @returns {Array<{from: object, to: object}>}
     */
    shuffle(participants) {
      const clone = [...participants];
      let tries = 0;
  
      while (tries < this.MAX_TRIES) {
        this.#fisherYatesShuffle(clone);
  
        if (this.#isValid(clone)) {
          return this.#mapPairs(clone);
        }
  
        tries++;
      }
  
      throw new Error("Sorteio inválido após múltiplas tentativas.");
    }
  
    /**
     * 
     * @param {Array} arr
     */
    #fisherYatesShuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  
    /**
     * 
     * @param {Array} shuffled
     * @returns {boolean}
     */
    #isValid(shuffled) {
      const total = shuffled.length;
  
      for (let i = 0; i < total; i++) {
        const giver = shuffled[i];
        const receiver = shuffled[(i + 1) % total];
  
        
        if (giver.id === receiver.id) return false;
  
        
        const receiverIndex = shuffled.indexOf(receiver);
        const receiverNext = shuffled[(receiverIndex + 1) % total];
        if (receiverNext?.id === giver.id) return false;
  
       
        if (this.constraints.isBlocked(giver.id, receiver.id)) return false;
      }
  
      return true;
    }
  
    /**
     * @param {Array} shuffled
     * @returns {Array<{from: object, to: object}>}
     */
    #mapPairs(shuffled) {
      return shuffled.map((giver, i) => {
        const receiver = shuffled[(i + 1) % shuffled.length];
        return { from: giver, to: receiver };
      });
    }
  }