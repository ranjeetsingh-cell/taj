"use client";
import { createContext, useContext } from "react";

const AppContext = createContext(null);

export function AppProvider({ settings, children }) {
  return (
    <AppContext.Provider value={settings}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppSettings() {
  return useContext(AppContext);
}
