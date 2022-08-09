import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useState,
} from "react";

interface CycleProviderProps {
  children: ReactNode;
}

interface Cycle {
  id: string;
  task: string;
  minutosAmount: number;
  startDate: Date;
  stopDate?: Date;
  finishedDate?: Date;
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

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export function CyclesProvider({ children }: CycleProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesState, action: any) => {
      switch (action.type) {
        case "ADD_NEW_CYCLE":
          return {
            ...state,
            cycles: [...state.cycles, action.payload.data],
            activeCycleId: action.payload.data.id,
          };
        case "INTERRUPT_CURRENT_CYCLE":
          return {
            ...state,
            cycles: state.cycles.map((item) => {
              if (item.id === state.activeCycleId) {
                return { ...item, stopDate: new Date() };
              } else {
                return item;
              }
            }),
            activeCycleId: null,
          };
        case "MARK_CURRENT_CYCLE":
          return {
            ...state,
            cycles: state.cycles.map((item) => {
              if (item.id === state.activeCycleId) {
                return { ...item, finishedDate: new Date() };
              } else {
                return item;
              }
            }),
            activeCycleId: null,
          };

        default:
          return state;
      }
    },
    {
      cycles: [],
      activeCycleId: null,
    }
  );

  const [amountSecondsPassed, setAmounSecondPassed] = useState(0);
  const { cycles, activeCycleId } = cyclesState;

  const activeCycle = cycles.find((cycles) => cycles.id === activeCycleId);
  function setSecondsPassed(seconds: number) {
    setAmounSecondPassed(seconds);
  }

  function markCurrentCycleAsFinished() {
    dispatch({
      type: "MARK_CURRENT_CYCLE",
      payload: {
        data: activeCycleId,
      },
    });
  }

  function interruptCurrentCycle() {
    dispatch({
      type: "INTERRUPT_CURRENT_CYCLE",
      payload: {
        data: activeCycleId,
      },
    });
  }

  function createNewCycle(data: CreateNewCyleData) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutosAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch({
      type: "ADD_NEW_CYCLE",
      payload: {
        data: newCycle,
      },
    });
    setAmounSecondPassed(0);
  }

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
