import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sortNamesType } from "../../interfaces/interfaces";
import { RootState } from "../store";

interface filterSliceState {
  activeCategoryIndex: number,
  activeSort: sortNamesType,
}

const initialState: filterSliceState = {
  activeCategoryIndex: 0,
  activeSort: {
    name: "популярности",
    sortProperty: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    selectCategory: (state, action: PayloadAction<number>) => {
        state.activeCategoryIndex = action.payload // передаем id
    },
    selectSorting: (state, action: PayloadAction<sortNamesType>) => {
        state.activeSort = action.payload // передаем обьект
    }
  },
});

export const {selectCategory, selectSorting} = filterSlice.actions

export const selectActiveCategoryIndex = (state: RootState) => state.filter.activeCategoryIndex
export const selectActiveSort= (state: RootState) => state.filter.activeSort

export default filterSlice.reducer;
