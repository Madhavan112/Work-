import { createContext } from "react";

export const GlobalText = createContext(null);
export default function GlobalState({ children }) {
  return (
    <GlobalText.Provider value={{ }}>
      {children}
    </GlobalText.Provider>
  );
}