import { ActionTypes } from "./actions";
import { produce } from "immer";
export interface Cycle {
  id: string;
  task: string;
  minutosAmount: number;
  startDate: Date;
  stopDate?: Date;
  finishedDate?: Date;
}

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      // return {
      //   ...state,
      //   cycles: [...state.cycles, action.payload.data],
      //   activeCycleId: action.payload.data.id,
      // };
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.data);
        draft.activeCycleId = action.payload.data.id;
      });

    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      // return {
      //   ...state,
      //   cycles: state.cycles.map((item) => {
      //     if (item.id === state.activeCycleId) {
      //       return { ...item, stopDate: new Date() };
      //     } else {
      //       return item;
      //     }
      //   }),
      //   activeCycleId: null,

      // };

      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId
      );

      if (currentCycleIndex < 0) {
        return state;
      }
      return produce(state, (draft) => {
        draft.activeCycleId = null;
        draft.cycles[currentCycleIndex].stopDate = new Date();
      });
    }
    case ActionTypes.MARK_CURRENT_CYCLE: {
      // return {
      //   ...state,
      //   cycles: state.cycles.map((item) => {
      //     if (item.id === state.activeCycleId) {
      //       return { ...item, finishedDate: new Date() };
      //     } else {
      //       return item;
      //     }
      //   }),
      //   activeCycleId: null,
      // };
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId
      );

      if (currentCycleIndex < 0) {
        return state;
      }
      return produce(state, (draft) => {
        draft.activeCycleId = null;
        draft.cycles[currentCycleIndex].finishedDate = new Date();
      });
    }

    default:
      return state;
  }
}
