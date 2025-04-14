import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { SorteioUseCase } from "../application/SorteioUseCase";
import { Constraints } from "../domain/Constraints";
import { LocalStorageRepository } from "../infrastructure/LocalStorageRepository";

const SorteioContext = createContext();

export function SorteioProvider({ children }) {
  const repository = useMemo(() => new LocalStorageRepository(), []);
  const constraints = useMemo(() => new Constraints(), []);
  const sorteioUseCase = useMemo(() => new SorteioUseCase(repository, constraints), [repository, constraints]);

  
  const [participants, setParticipants] = useState([]);
  const [result, setResult] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loaded = sorteioUseCase.participantsRepo.getAll(); 
    setParticipants(loaded);
  }, [sorteioUseCase]);

  const addParticipant = (participant) => {
    try {
      const nomeCompleto = `${participant.firstName} ${participant.lastName ?? ""}`.trim();
      if (
        participants.some(p =>
          `${p.firstName} ${p.lastName ?? ""}`.trim().toLowerCase() === nomeCompleto.toLowerCase()
        )
      ) {
        throw new Error("Nome duplicado");
      }
      sorteioUseCase.addParticipant(participant);
      setParticipants(prevParticipants => [...prevParticipants, participant]);
      setError(""); 
      return true;
    } catch (err) {
      setError(err.message); 
      return false;
    }
  };

  const executeSorteio = () => {
    try {
      const resultado = sorteioUseCase.execute(participants);
      setResult(resultado);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const reset = () => {
    sorteioUseCase.clearAll();
    setParticipants([]);
    setResult([]);
    setError("");
  };

  return (
    <SorteioContext.Provider
      value={{
        participants,
        result,
        error,
        addParticipant,
        executeSorteio,
        reset,
        constraints, 
      }}
    >
      {children}
    </SorteioContext.Provider>
  );
}

export function useSorteio() {
  const context = useContext(SorteioContext);
  if (!context) throw new Error("useSorteio deve estar dentro de <SorteioProvider>");
  return context;
}
