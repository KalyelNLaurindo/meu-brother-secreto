import { SorteioUseCase } from "./application/SorteioUseCase.js";
import { LocalStorageRepository } from "./infrastructure/LocalStorageRepository.js";
import { Constraints } from "./domain/Constraints.js";

const repo = new LocalStorageRepository();
const constraints = new Constraints();
const sorteioUseCase = new SorteioUseCase(repo, constraints);

try {
  sorteioUseCase.addParticipant(undefined, "João", "Silva");
  sorteioUseCase.addParticipant(undefined, "Anna");
  sorteioUseCase.addParticipant(undefined, "Pedro", "Santos");

  const allParticipants = repo.getAll();

  const anna = allParticipants.find((p) => p.firstName === "Anna");
  const pedro = allParticipants.find((p) => p.firstName === "Pedro");
  if (anna && pedro) {
    sorteioUseCase.blockPair(anna.id, pedro.id);
    console.log(`Par bloqueado: ${anna.firstName} e ${pedro.firstName}`);
  }
} catch (e) {
  console.error("Erro ao adicionar participante ou bloquear pares:", e.message);
}

try {
  const resultado = sorteioUseCase.doDraw();
  console.log("RESULTADO DO SORTEIO:");
  resultado.forEach((par) => {
    console.log(`${par.from.fullName} → ${par.to.fullName}`);
  });
} catch (e) {
  console.error("Erro no sorteio:", e.message);
}
