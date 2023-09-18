import { createContext, useContext, useEffect, useState } from "react";
import { School } from "./modules/school-mgmt/domain/entities/School";
import toast from "react-hot-toast";
import jwt_decode from "jwt-decode";

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
  const [selectedSchool, setSelectedSchool] = useState<School | undefined>(undefined);

  const handleSelectSchool = (school: School) => {
    setSelectedSchool(school);
    localStorage.setItem("selectedSchool", JSON.stringify(school));
  };

  const handleDeselectSchool = () => {
    setSelectedSchool(undefined);
    localStorage.removeItem("selectedSchool");
  };

  let loginUser = async (formData: any) => {
    let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    let data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      toast.error("Unable to authorize. Please refresh the page.");
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
      let response;
      try {
        response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/token/refresh/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: authTokens.refresh }),
          },
        );
      } catch (error) {
        console.error(error);
      }

      let data = await response?.json();

      if (response?.status === 200) {
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
      } else {
        toast.error("Unable to authorize. Please refresh the page.");
        logout();
      }
    };
    const fourMinutes = 1000 * 60 * 4;
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
      }, fourMinutes);
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

  console.log("in new auth context  user", user);
  console.log("in new auth context school", selectedSchool);

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
