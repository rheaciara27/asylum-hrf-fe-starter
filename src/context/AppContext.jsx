import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
// import testData from '../data/test_data.json'; -- commenting out as the test data isn't used, but leaving as a reference.
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const AppContext = createContext({});
// For the API calls, to handle more programmatically.
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
      // return only the data within the citizenshipSummary.
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
      // fetch the fiscal and citizenship data one after another; wait for both responses before continuing.
      const [fiscalData, citizenshipData] = await Promise.all([getFiscalData(), getCitizenshipResults()]);
      // set the graphData state to an object containing the properties other components look for and access.
      setGraphData({
        yearResults: fiscalData,
        citizenshipResults: citizenshipData,
      })
      // Once promises resolve (data is available/finished), remove the Loading message.
      setIsDataLoading(false)
    } catch (error) {
      console.error(`Error fetching citizenshipSummary and/or fiscalSummary data ${error}`);
      // If there's an error, remove the loading message.
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
