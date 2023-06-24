  import { createContext, useContext } from "react";

  type IUserContext = {
    user: {
      name: string | null;
      id: number | null;
    } | null;
    setUser: Function;
  };

  export const UserContext = createContext<IUserContext>({
    user: null,
		setUser: () => console.log('Function'),
  });

  export function useUserContext() {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error("The context is undefined");
    }
    return context;
  }
