import jwt_decode from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { jwtAdapter } from "./modules/auth/infrastructure/adapters/jwtAdapter";
import { School } from "./modules/school-mgmt/domain/entities/School";

type UserContextProviderProps = {
  children: React.ReactNode; // not allowed: React.ReactNode
};

type AuthUser = {
  name: string;
  user_id: number;
  role: string;
  email: string;
  permissions: number[];
};

type UserContext = {
  user: AuthUser | null;
  loginUser: Function;
  logout: Function;
  selectedSchool: School | undefined;
  handleSelectSchool: Function;
  handleDeselectSchool: Function;
};

const UserContext = createContext<UserContext | null>(null);

export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  const [authTokens, setAuthTokens] = useState<any>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<School | undefined>(
    undefined,
  );

  const handleSelectSchool = (school: School) => {
    setSelectedSchool(school);
    localStorage.setItem("selectedSchool", JSON.stringify(school));
  };

  const handleDeselectSchool = () => {
    setSelectedSchool(undefined);
    localStorage.removeItem("selectedSchool");
  };

  let loginUser = async (formData: any) => {
    try {
      await jwtAdapter.get({ payload: formData }).then((res) => {
        setAuthTokens(res);
        setUser(jwt_decode(res.access));
        localStorage.setItem("authTokens", JSON.stringify(res));
      });
    } catch (error) {
      console.error(error);
    }
  };

  let logout = () => {
    setUser(null);
    setAuthTokens(null);
    setSelectedSchool(undefined);
    localStorage.removeItem("authTokens");
    localStorage.removeItem("selectedSchool");
  };

  useEffect(() => {
    let updateToken = async () => {
      try {
        await jwtAdapter
          .refresh({ refresh: authTokens.refresh })
          .then((res) => {
            setAuthTokens(res);
            setUser(jwt_decode(res.access));
            localStorage.setItem("authTokens", JSON.stringify(res));
          });
      } catch (error) {
        console.error(error);
        logout();
      }
    };

    const tenMinutes = 1000 * 60 * 10;
    if (!user || !authTokens) {
      const tokens = localStorage.getItem("authTokens");

      if (typeof tokens === "string") {
        setAuthTokens(() => JSON.parse(tokens));
        setUser(() => jwt_decode(tokens));
      }
    } else {
      const interval = setInterval(() => {
        if (authTokens) {
          updateToken();
        }
      }, tenMinutes);
      return () => clearInterval(interval);
    }
  }, [authTokens, user]);

  // School useEffect
  useEffect(() => {
    if (!selectedSchool) {
      const storedSchool = localStorage.getItem("selectedSchool");

      if (typeof storedSchool === "string") {
        const school = JSON.parse(storedSchool);
        setSelectedSchool(() => school);
      }
    }
  }, [selectedSchool]);

  return (
    <UserContext.Provider
      value={{
        user: user,
        loginUser: loginUser,
        logout: logout,
        selectedSchool: selectedSchool,
        handleSelectSchool: handleSelectSchool,
        handleDeselectSchool: handleDeselectSchool,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUserContext must be consumed within a UserContextProvider",
    );
  }
  return context;
}
