import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { jwtAdapter } from "@/src/modules/auth/adapters/jwtAdapter";
import { School } from "@/src/modules/schools/entities/School";
import {
  getToken,
  isTokenExpiredUtil,
  isValidToken,
  removeToken,
  setToken,
} from "../utils/tokenUtils";

type UserContextProviderProps = {
  children: React.ReactNode; // not allowed: React.ReactNode
};

export type AuthUser = {
  name: string;
  user_id: number;
  role: string;
  email: string;
  permissions: number[];
  membership: string;
};

type UserContextEntity = {
  user: AuthUser | null;
  signinUser: Function;
  loginUser: Function;
  logout: Function;
  selectedSchool: School | undefined;
  handleSelectSchool: Function;
  handleDeselectSchool: Function;
};

type TokenResponse = {
  accessToken: string;
  refreshToken: string;

}


const UserContext = createContext<UserContextEntity | null>(null);

export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<School | undefined>(
    undefined,
  );
  const router = useRouter();

  const handleSelectSchool = (school: School) => {
    setSelectedSchool(school);
    localStorage.setItem("selectedSchool", JSON.stringify(school));
  };

  const handleDeselectSchool = () => {
    setSelectedSchool(undefined);
    localStorage.removeItem("selectedSchool");
  };

  const signinUser = (response: TokenResponse) => {
    const decodedUser = jwt_decode<AuthUser>(response.accessToken)
    setUser(decodedUser);
    setToken({ accessToken: response.accessToken, refreshToken: response.refreshToken})
    router.push('/schools')
  }

  const loginUser = async (formData: any) => {
    try {
      await jwtAdapter.get({ payload: formData }).then((res) => {
        const decodedUser = jwt_decode<AuthUser>(res.access);
        setUser(decodedUser);
        setToken({ accessToken: res.access, refreshToken: res.refresh });
        router.push('/schools')
      });
    } catch (error) {
      return error
    }
  };

  const logout = () => {
    setUser(null);
    setSelectedSchool(undefined);
    removeToken();
    localStorage.removeItem("selectedSchool");
    router.push("/");
  };

  useEffect(() => {
    let logoutOnFailedUpdate = () => {
      setUser(null);
      setSelectedSchool(undefined);
      removeToken();
      localStorage.removeItem("selectedSchool");
      router.push("/");
    };

    let refreshAccessToken = async () => {
      try {
        const refreshToken = getToken("refreshToken");
        const res = await jwtAdapter.refresh({ refresh: refreshToken });
        const decodedUser = jwt_decode<AuthUser>(res.access);
        setUser(decodedUser);
        setToken({ accessToken: res.access, refreshToken: res.refresh });
      } catch (error) {
        toast.error("Your session expired. Please log in again.");
        logoutOnFailedUpdate();
      }
    };

    // const tenSeconds = 1000 * 10;
    // const tenMinutes = 1000 * 60 * 10;
    const oneHour = 1000 * 60 * 60;
    if (!user) {
      const accessToken = getToken("accessToken");

      if (accessToken && !isTokenExpiredUtil(accessToken)) {
        const decodedUser = jwt_decode<AuthUser>(accessToken);
        setUser(decodedUser);
      }

      // logout if access token key exists, but value empty string
      if (accessToken === "") {
        logoutOnFailedUpdate();
      }

      // will not refresh if access token invalid
      // but we need this for when we open the browser
      // and did not log out last time
      // so have access token and refresh token
      // but access token is expired, and refresh is not
      if (accessToken && isTokenExpiredUtil(accessToken)) {
        if (isValidToken(accessToken)) {
          refreshAccessToken();
        } else {
          logoutOnFailedUpdate();
        }
      }
    } else {
      const interval = setInterval(() => {
        const accessToken = getToken("accessToken");
        if (accessToken) {
          if (isValidToken(accessToken)) {
            refreshAccessToken();
          } else {
            logoutOnFailedUpdate();
          }
        } else {
          logoutOnFailedUpdate();
        }
      }, oneHour);
      return () => clearInterval(interval);
    }
  }, [user, router]);

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
        signinUser: signinUser,
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
