import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, HomeContainer } from "./styles";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { useCyleContext } from "../../context/CyclesContext";

const newCyclrFormSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "O ciclo precisa ser no minimo de 5 minutos")
    .max(60, "O ciclo precisa ser no maximo de 60 minutos"),
});

const defaultValues = {
  task: "",
  minutesAmount: 0,
};

type NewCycleFormData = zod.infer<typeof newCyclrFormSchema>;

export function Home() {
  const { createNewCycle, activeCycle, interruptCurrentCycle } =
    useCyleContext();

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCyclrFormSchema),
    defaultValues,
  });
  const { handleSubmit, reset, watch } = newCycleForm;

  function handleCreateNewCyle(data: NewCycleFormData) {
    createNewCycle(data);
    reset();
  }

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCyle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <Button onClick={interruptCurrentCycle}>
            <HandPalm size={24} />
            Reiniciar
          </Button>
        ) : (
          <Button type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </Button>
        )}
      </form>
    </HomeContainer>
  );
}
