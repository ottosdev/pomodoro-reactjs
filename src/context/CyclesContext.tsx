import { differenceInSeconds } from "date-fns";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  ActionTypes,
  addNewCycleAction,
  interruptCycleAction,
  markCurrentCyleAction,
} from "../reducers/cycles/actions";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";

interface CycleProviderProps {
  children: ReactNode;
}

interface CreateNewCyleData {
  task: string;
  minutesAmount: number;
}

interface CycleContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  interruptCurrentCycle: () => void;
  createNewCycle: (data: CreateNewCyleData) => void;
}

export const CyclesContext = createContext({} as CycleContextType);

export function CyclesProvider({ children }: CycleProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        "@ignite-timer:cycles-state-1.0.0"
      );
      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON);
      }

      return [];
    }
  );

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycles) => cycles.id === activeCycleId);

  const [amountSecondsPassed, setAmounSecondPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }
    return 0;
  });

  function setSecondsPassed(seconds: number) {
    setAmounSecondPassed(seconds);
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCyleAction());
  }

  function interruptCurrentCycle() {
    dispatch(interruptCycleAction());
  }

  function createNewCycle(data: CreateNewCyleData) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutosAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch(addNewCycleAction(newCycle));
    setAmounSecondPassed(0);
  }

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);
    localStorage.setItem("@ignite-timer:cycles-state-1.0.0", stateJSON);
  }, [cyclesState]);

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        interruptCurrentCycle,
        createNewCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}

export function useCyleContext() {
  const context = useContext(CyclesContext);

  return context;
}
