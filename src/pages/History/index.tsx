import { formatDistanceToNow } from "date-fns";

import { ptBR } from "date-fns/locale";
import { useCyleContext } from "../../context/CyclesContext";
import * as Styled from "./styles";

export function History() {
  const { cycles } = useCyleContext();
  return (
    <Styled.HistoryContainer>
      <h1>History</h1>
      <Styled.HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutosAmount} minutos</td>
                <td>
                  {formatDistanceToNow(cycle.startDate, {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </td>
                <td>
                  {cycle.finishedDate && (
                    <Styled.Status statusColor="green">Concluido</Styled.Status>
                  )}
                  {cycle.stopDate && (
                    <Styled.Status statusColor="red">
                      Interrompido
                    </Styled.Status>
                  )}
                  {!cycle.finishedDate && !cycle.stopDate && (
                    <Styled.Status statusColor="yellow">
                      Andamento
                    </Styled.Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Styled.HistoryList>
    </Styled.HistoryContainer>
  );
}
