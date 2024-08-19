import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "@store";
import {GameStatus} from "../../types/gameStatus";

interface PointState {
  value: number;
  currentFinding: number;
  gameStatus: GameStatus;
}

const initialState: PointState = {
  value: 0,
  currentFinding: 0,
  gameStatus: GameStatus.NOT_YET_START
}

export const pointSlice = createSlice({
  name: 'point',
  initialState,
  reducers: {
    setPoint: (state, {payload}) => {
      state.value = payload.point;
      state.currentFinding = 0;
      state.gameStatus = GameStatus.STARTED;
    },
    onPointClicked: (state, {payload}) => {
      console.log(state, payload);
      if (state.currentFinding !== payload.currentFinding - 1) {
        state.gameStatus = GameStatus.ENDED;
        return;
      }

      if (state.value === payload.currentFinding) {
        state.gameStatus = GameStatus.FINISHED;
        return;
      }

      state.currentFinding = payload.currentFinding;
    }
  }
});

export default pointSlice.reducer;

export const selectPoint = (state: RootState) => state.point.value;
export const selectGameStatus = (state: RootState) => state.point.gameStatus;

export const {setPoint, onPointClicked} = pointSlice.actions;