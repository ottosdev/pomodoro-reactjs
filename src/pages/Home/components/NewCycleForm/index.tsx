import * as Styled from "./styles";
import { useFormContext } from "react-hook-form";
import { useCyleContext } from "../../../../context/CyclesContext";

export function NewCycleForm() {
  const { activeCycle } = useCyleContext();
  const { register } = useFormContext();
  return (
    <Styled.FormContainer>
      <label htmlFor="task">Vou trabalhar em: </label>
      <Styled.TaskInput
        id="task"
        placeholder="De nome para o seu projeto"
        list="task-suggestions"
        {...register("task")}
        disabled={!!activeCycle}
      />

      <datalist id="task-suggestions">
        <option value=" Projeto 1" />
        <option value=" Projeto 2" />
        <option value=" Projeto 3" />
      </datalist>
      <label htmlFor="minutesAmount">Durante</label>
      <Styled.MinutesInput
        disabled={!!activeCycle}
        type="number"
        id="minutesAmount"
        placeholder="00"
        min={5}
        max={60}
        {...register("minutesAmount", { valueAsNumber: true })}
      />
      <span>minutos .</span>
    </Styled.FormContainer>
  );
}
