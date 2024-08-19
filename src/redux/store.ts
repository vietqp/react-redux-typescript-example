import { configureStore } from '@reduxjs/toolkit';
import counterReducer from "@slices/counterSlice";
import pointReducer from "@slices/pointSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        point: pointReducer
    },
});

// Lấy kiểu của RootState và AppDispatch từ store để sử dụng trong các component
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
