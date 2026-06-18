import { createContext, useContext, useEffect, useState } from "react";
import type { urlTypes } from "../types/types";
import { api } from "../api/axios";
import toast from "react-hot-toast";

type AppContextType = {
  data: urlTypes[];
  fetchUrlData: () => Promise<void>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const appContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<urlTypes[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUrlData = async () => {
    try {
      const { data } = await api.get("shorturl");
      setData(data.shortUrls);
    } catch (error) {
      toast.error("Internal Server Error!");
    }
  };

  useEffect(() => {
    fetchUrlData();
    console.log("UrlProvider mounted");
  }, []);

  const appValues = {
    data,
    fetchUrlData,
    loading,
    setLoading,
  };
  return (
    <appContext.Provider value={appValues}>{children}</appContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(appContext);
  if (!context) {
    throw new Error("useAppContext must be used inside AppContextProvider");
  }
  return context;
};
