import { Participant } from "../domain/Participant.js";

const KEY_PARTICIPANTS = "broder_participants";
const KEY_RESULT = "broder_result";

export class LocalStorageRepository {
  getAll() {
    const stored = localStorage.getItem(KEY_PARTICIPANTS);
    if (!stored) return [];
    const arr = JSON.parse(stored);
    return arr.map(obj => new Participant(obj.id, obj.firstName, obj.lastName));
  }

  add(participant) {
    const all = this.getAll();
    let newP;

    if (participant instanceof Participant) {
      newP = participant;
    } else {
      newP = new Participant(
        participant.id ?? crypto.randomUUID(),
        participant.firstName,
        participant.lastName
      );
    }

    all.push(newP);
    localStorage.setItem(KEY_PARTICIPANTS, JSON.stringify(all));
  }

  clearAll() {
    localStorage.removeItem(KEY_PARTICIPANTS);
    localStorage.removeItem(KEY_RESULT);
  }

  saveResult(resultado) {
    const serialized = resultado.map(pair => ({
      fromId: pair.from.id,
      toId: pair.to.id,
    }));
    localStorage.setItem(KEY_RESULT, JSON.stringify(serialized));
  }

  getResult() {
    const data = localStorage.getItem(KEY_RESULT);
    return data ? JSON.parse(data) : [];
  }
}
