import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IPizzaBlock } from "../../components/PizzaBlock";
import { RootState } from "../store";

export const fetchPizzas = createAsyncThunk<IPizzaBlock[], {category: string | number; sortBy: string}>(
    "pizza/fetchPizzas",
    async ({ category, sortBy }, thunkAPI) => {
        try {
            const res = await axios.get<IPizzaBlock[]>(
                "https://65e70c2853d564627a8dbc66.mockapi.io/pizzas",
                {
                    params: {
                        category: category,
                        sortBy: sortBy,
                    },
                }
            );
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

interface PizzasSliceState {
    pizzas: IPizzaBlock[];
    loadingStatus: "loading" | "succeeded" | "failed"; 
    errorMessage: string;
}

const initialState: PizzasSliceState = {
    pizzas: [],
    loadingStatus: "loading",
    errorMessage: "",
};

export const pizzasSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.loadingStatus = "loading";
                state.errorMessage = "";
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.pizzas = action.payload;
                state.loadingStatus = "succeeded";
                state.errorMessage = "";
            })
            .addCase(fetchPizzas.rejected, (state, action) => {
                state.loadingStatus = "failed";
                state.errorMessage = action.payload as string;
            });
    },
});

export const selectPizzas = (state: RootState) => state.pizza.pizzas;
export const selectLoadingStatus = (state: RootState) => state.pizza.loadingStatus;
export const selectErrorMessage = (state: RootState) => state.pizza.errorMessage;

export default pizzasSlice.reducer;
