import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { useLocalStorage } from '../hooks/useLocalStorage.js';

const AppContext = createContext({});

const baseURL = 'https://hrf-asylum-be-b.herokuapp.com/cases'; 

const useAppContextProvider = () => {
  // set graphData's initial state to an empty object instead of the test_data.
  const [graphData, setGraphData] = useState({});
  const [isDataLoading, setIsDataLoading] = useState(false);

  useLocalStorage({ graphData, setGraphData });

  const getFiscalData = async () => {
    try {
      // fetch the fiscalSummary
      const fiscalDataRes = await axios.get(`${baseURL}/fiscalSummary`); 
      // return only the reaResults portion of this API response, the data above wasn't used.
      return fiscalDataRes.data.yearResults; 
    } catch (error) {
      console.error(`Error fetching fiscalSummary data ${error}`); // print the error if one ocurrs.
    }
  };

  const getCitizenshipResults = async () => {
    try {
      // fetch the citizenshipSummary
      const citizenshipRes = await axios.get(`${baseURL}/citizenshipSummary`); 
      
      return citizenshipRes.data; 
    } catch (error) {
      console.error(`Error fetching fiscalSummary data ${error}`);
    }
  };

  const updateQuery = async () => {
    setIsDataLoading(true);
  };

  const fetchData = async () => {
    try {
    
      const [fiscalData, citizenshipData] = await Promise.all([getFiscalData(), getCitizenshipResults()]);
      
      setGraphData({
        yearResults: fiscalData,
        citizenshipResults: citizenshipData,
      })
      
      setIsDataLoading(false)
    } catch (error) {
      console.error(`Error fetching citizenshipSummary and/or fiscalSummary data ${error}`);
  
      setIsDataLoading(false)
    }
  };

  const clearQuery = () => {
    setGraphData({});
  };

  const getYears = () => graphData?.yearResults?.map(({ fiscal_year }) => Number(fiscal_year)) ?? [];

  useEffect(() => {
    if (isDataLoading) {
      fetchData();
    }
  }, [isDataLoading]);

  return {
    graphData,
    setGraphData,
    isDataLoading,
    updateQuery,
    clearQuery,
    getYears,
  };
};

export function useAppContext() {
  return useContext(AppContext);
}

export function ProvideAppContext({ children }) {
  const contextValue = useAppContextProvider();

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}
