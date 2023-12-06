import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { jwtAdapter } from "../modules/auth/adapters/jwtAdapter";
import { School } from "../modules/school-mgmt/entities/School";
import { getToken, removeToken, setToken } from "../utils/tokenUtils";

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

type UserContextEntity = {
  user: AuthUser | null;
  loginUser: Function;
  logout: Function;
  selectedSchool: School | undefined;
  handleSelectSchool: Function;
  handleDeselectSchool: Function;
};

// {
// "token_type": "access", // access | refresh
//   "exp": 1701158298,
//   "iat": 1700899098,
//   "jti": "9a0d2ef3ce704edf8261d2850716eef3",
//   "user_id": 1,
//   "name": "First name",
//   "role": "A ROLE",
//   "permissions": [
//     1,
//     3
//   ],
//   "email": "some-email@gmail.com"
// }

type Token = {
  id: number;
  exp: number;
};

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

  let loginUser = async (formData: any) => {
    try {
      await jwtAdapter.get({ payload: formData }).then((res) => {
        setUser(jwt_decode(res.access));
        setToken({ accessToken: res.access, refreshToken: res.refresh });
      });
    } catch (error) {
      toast.error("Unable to login. Please check your email or password.");
    }
  };

  let logout = () => {
    setUser(null);
    setSelectedSchool(undefined);

    removeToken();
    localStorage.removeItem("selectedSchool");
  };

  useEffect(() => {
    function getTokenExpiry({ token }: { token: Token }) {
      return token.exp;
    }

    function getExpiryDate({ tokenExpiry }: { tokenExpiry: number }) {
      return new Date(tokenExpiry * 1000);
    }

    function isTokenExpired({ currentToken }: { currentToken: string }) {
      const token: Token = jwt_decode(currentToken);

      const tokenExpiry: number = getTokenExpiry({ token: token });

      const expiryTime = getExpiryDate({ tokenExpiry: tokenExpiry });

      const now = new Date();

      if (expiryTime > now) {
        return false;
      }

      return true;
    }

    let logoutOnFailedUpdate = () => {
      setUser(null);
      setSelectedSchool(undefined);
      removeToken();
      localStorage.removeItem("selectedSchool");
      router.push("/");
    };

    let updateToken = async () => {
      const refreshToken = getToken("refreshToken");

      try {
        await jwtAdapter.refresh({ refresh: refreshToken }).then((res) => {
          setUser(jwt_decode(res.access));
          setToken({ accessToken: res.access, refreshToken: res.refresh });
        });
      } catch (error) {
        toast.error("Your session expired. Please log in again.");
        logoutOnFailedUpdate();
      }
    };

    // const tenSeconds = 1000 * 10;
    const tenMinutes = 1000 * 60 * 10;
    if (!user) {
      const accessToken = getToken("accessToken");

      if (accessToken && !isTokenExpired({ currentToken: accessToken })) {
        setUser(() => jwt_decode(accessToken));
      }

      if (accessToken && isTokenExpired({ currentToken: accessToken })) {
        const refreshToken = getToken("refreshToken");

        if (refreshToken && isTokenExpired({ currentToken: refreshToken })) {
          logoutOnFailedUpdate();
          return;
        }

        updateToken();
      }
    } else {
      const interval = setInterval(() => {
        if (getToken("accessToken")) {
          updateToken();
        }
      }, tenMinutes);
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
