"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { User, UserContextType } from "@/utils/interfaces/authInterface";
import { fetchUserLogout, fetchUserProfile } from "@/services/auth.Services";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await fetchUserProfile();
        setUser(res.data);
        setError(null);
      } catch (error) {
        setUser(null);
        setError("Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };
    if (sessionStorage.getItem("redirectToLogin") === "true") {
      sessionStorage.removeItem("redirectToLogin");
      setUser(null);
      router.push("/login");
    } else {
      fetchUser();
    }
  }, []);

  const logout = async () => {
    try {
      const res = await fetchUserLogout();
      if (res.success) {
        setUser(null);
        setError(null);
        toast.success(res.message);
        router.push("/login");
      }
    } catch (error: any) {
      setUser(null);
      setError("Failed to logout");
      setUser(null);
      toast.error(error.message);
      router.push("/login");
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, error, logout, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within UserProvider");
  }
  return context;
};
