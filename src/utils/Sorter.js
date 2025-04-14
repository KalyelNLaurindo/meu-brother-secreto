export function sattoloShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  export function realizarSorteio(participants) {
    const shuffled = sattoloShuffle([...participants]);
    return participants.map((nome, i) => [nome, shuffled[i]]);
  }
  