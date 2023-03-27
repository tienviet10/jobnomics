import {
  combineReducers,
  configureStore,
  ConfigureStoreOptions,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { jobApi } from "./services/job-api";
import jobReducer from "../features/jobSlice";
import filterReducer from "../features/filterSlice";
import authReducer from "../features/authSlice";

const rootReducer = combineReducers({
  job: jobReducer,
  filter: filterReducer,
  auth: authReducer,
  [jobApi.reducerPath]: jobApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch: () => AppDispatch = useDispatch;
// export type RootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof rootReducer>;
// export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

setupListeners(store.dispatch);

// export const createStore = (
//   options?: ConfigureStoreOptions["preloadedState"] | undefined
// ) =>
//   configureStore({
//     reducer: rootReducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware().concat(api.middleware),
//     ...options,
//   });

// export const store = createStore();
