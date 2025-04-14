import { ShuffleStrategy } from "../domain/ShuffleStrategy.js";

export class SorteioUseCase {
  constructor(participantsRepository, constraints) {
    this.participantsRepo = participantsRepository;
    this.constraints = constraints;
    this.shuffleStrategy = new ShuffleStrategy(this.constraints);
  }

  addParticipant(participant) {
    const { id, firstName, lastName } = participant;

    if (!firstName || !firstName.trim()) {
      throw new Error("O nome é obrigatório.");
    }

    
    const all = this.participantsRepo.getAll();
    const duplicate = all.find(
      (p) =>
        p.firstName.toLowerCase() === firstName.toLowerCase() &&
        p.lastName.toLowerCase() === (lastName || "").toLowerCase()
    );
    if (duplicate) {
      throw new Error("Nome repetido não é permitido.");
    }

    this.participantsRepo.add({ id, firstName, lastName });
  }

  getAllParticipants() {
    return this.participantsRepo.getAll(); 
  }

  blockPair(idA, idB) {
    this.constraints.blockPair(idA, idB);
  }

  doDraw() {
    const participants = this.participantsRepo.getAll();
    const resultado = this.shuffleStrategy.shuffle(participants);

    this.participantsRepo.saveResult(resultado);

    return resultado;
  }

  clearAll() {
    this.participantsRepo.clearAll();
  }
}
