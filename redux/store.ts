import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActionPaths: ['payload.children', 'payload.header', 'payload.btn'],
      ignoredPaths: ['systemApp.alert.btn'],
    },
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
