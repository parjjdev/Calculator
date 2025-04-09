import { React, useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import axios, { AxiosError } from 'axios';
import PurchasingPowerParity from './PurchasingPowerParity.tsx';
import BuyingPowerIntroduction from './BuyingPowerIntroduction.tsx';
import Footer from './Footer.tsx';

type Country = {
  code: string;
  name: string;
  currency?: string;
  symbol?: string;
  flag: string;
  ppp?: number;
};

const Calculator = () => {
  const [calculatorType, setCalculatorType] = useState<'ppp' | 'buyingPower'>('ppp');
  const [countries, setCountries] = useState<Country[]>([]);
  const [country1, setCountry1] = useState<Country | null>(null);
  const [country2, setCountry2] = useState<Country | null>(null);
  const [amount, setAmount] = useState(localStorage.getItem('amount') || '');
  const [result, setResult] = useState(() => {
    const storedResult = localStorage.getItem('result');
    return storedResult ? JSON.parse(storedResult) : { amount: 0, fromAmount: 0 };
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [searchQuery1, setSearchQuery1] = useState('');
  const [searchQuery2, setSearchQuery2] = useState('');
  const [inflationDataLoading, setInflationDataLoading] = useState(false);

  const dropdown1Ref = useRef<HTMLDivElement>(null);
  const dropdown2Ref = useRef<HTMLDivElement>(null);
  const [referenceYear, setReferenceYear] = useState(localStorage.getItem('referenceYear') || '2020');
  const [targetYear, setTargetYear] = useState(localStorage.getItem('targetYear') || '2023');
  const [showReferenceYearDropdown, setShowReferenceYearDropdown] = useState(false);
  const [showTargetYearDropdown, setShowTargetYearDropdown] = useState(false);
  const referenceYearDropdownRef = useRef<HTMLDivElement>(null);
  const targetYearDropdownRef = useRef<HTMLDivElement>(null);
  const [inflationData, setInflationData] = useState<Record<string, number>>({});
  const [usingDefaultInflationData, setUsingDefaultInflationData] = useState(false);

  useEffect(() => {
    fetchCountries().then((fetchedCountries) => {
      setCountries(fetchedCountries);
      const storedCountry1Code = localStorage.getItem('country1Code');
      const storedCountry2Code = localStorage.getItem('country2Code');

      if (storedCountry1Code && storedCountry2Code) {
        const storedCountry1 = fetchedCountries.find((c) => c.code === storedCountry1Code);
        const storedCountry2 = fetchedCountries.find((c) => c.code === storedCountry2Code);
        if (storedCountry1 && storedCountry2) {
          setCountry1(storedCountry1);
          setCountry2(storedCountry2);
        } else {
          setDefaultCountries(fetchedCountries);
        }
      } else {
        setDefaultCountries(fetchedCountries);
      }
    });
  }, []);

  // Fetch inflation data when country1 changes
  useEffect(() => {
    if (country1 && calculatorType === 'buyingPower') {
      fetchCountryInflationData(country1.code);
    }
  }, [country1, calculatorType]);

  const fetchCountryInflationData = async (countryCode: string) => {
    setInflationDataLoading(true);
    setUsingDefaultInflationData(false);
    try {
      const response = await axios.get(
        `https://api.worldbank.org/v2/country/${countryCode}/indicator/FP.CPI.TOTL.ZG?format=json&per_page=100`
      );

      if (response.data && response.data[1]) {
        const rates: Record<string, number> = {};
        response.data[1].forEach((item: any) => {
          if (item.date && item.value) {
            rates[item.date] = item.value;
          }
        });
        
        if (Object.keys(rates).length > 0) {
          setInflationData(rates);
        } else {
          setInflationData(getDefaultInflationData());
          setUsingDefaultInflationData(true);
        }
      } else {
        setInflationData(getDefaultInflationData());
        setUsingDefaultInflationData(true);
      }
    } catch (error) {
      console.error('Error fetching inflation data:', error);
      setInflationData(getDefaultInflationData());
      setUsingDefaultInflationData(true);
    } finally {
      setInflationDataLoading(false);
    }
  };

  const getDefaultInflationData = (): Record<string, number> => ({
    '1900': 1.2,
    '1901': 1.1,
    '1902': 2.1,
    '1903': 1.9,
    '1904': -0.9,
    '1905': 2.3,
    '1906': 1.8,
    '1907': 2.0,
    '1908': -1.0,
    '1909': 0.5,
    '1910': 0.9,
    '1911': 2.1,
    '1912': 1.9,
    '1913': 2.0,
    '1914': 1.0,
    '1915': 0.9,
    '1916': 7.6,
    '1917': 17.8,
    '1918': 18.0,
    '1919': 14.6,
    '1920': 15.6,
    '1921': -10.5,
    '1922': -6.1,
    '1923': 1.8,
    '1924': 0.4,
    '1925': 2.4,
    '1926': 1.0,
    '1927': -1.7,
    '1928': -1.2,
    '1929': 0.0,
    '1930': -2.3,
    '1931': -8.9,
    '1932': -10.3,
    '1933': -5.1,
    '1934': 3.1,
    '1935': 2.2,
    '1936': 1.0,
    '1937': 3.6,
    '1938': -2.1,
    '1939': -1.4,
    '1940': 0.7,
    '1941': 5.1,
    '1942': 10.9,
    '1943': 6.0,
    '1944': 1.6,
    '1945': 2.3,
    '1946': 8.5,
    '1947': 14.4,
    '1948': 7.7,
    '1949': -1.0,
    '1950': 1.1,
    '1951': 7.9,
    '1952': 2.3,
    '1953': 0.8,
    '1954': 0.3,
    '1955': -0.4,
    '1956': 1.5,
    '1957': 3.3,
    '1958': 2.8,
    '1959': 1.7,
    '1960': 1.5,
    '1961': 1.1,
    '1962': 1.0,
    '1963': 1.3,
    '1964': 1.3,
    '1965': 1.6,
    '1966': 3.0,
    '1967': 3.1,
    '1968': 4.2,
    '1969': 5.5,
    '1970': 5.8,
    '1971': 4.3,
    '1972': 3.3,
    '1973': 6.2,
    '1974': 11.0,
    '1975': 9.1,
    '1976': 5.7,
    '1977': 6.5,
    '1978': 7.6,
    '1979': 11.3,
    '1980': 13.5,
    '1981': 10.3,
    '1982': 6.1,
    '1983': 3.2,
    '1984': 4.3,
    '1985': 3.6,
    '1986': 1.9,
    '1987': 3.6,
    '1988': 4.1,
    '1989': 4.8,
    '1990': 5.4,
    '1991': 4.2,
    '1992': 3.0,
    '1993': 2.9,
    '1994': 2.6,
    '1995': 2.8,
    '1996': 3.0,
    '1997': 2.3,
    '1998': 1.6,
    '1999': 2.2,
    '2000': 3.4,
    '2001': 2.8,
    '2002': 1.6,
    '2003': 2.3,
    '2004': 2.7,
    '2005': 3.4,
    '2006': 3.2,
    '2007': 2.8,
    '2008': 3.8,
    '2009': -0.4,
    '2010': 1.64,
    '2011': 3.16,
    '2012': 2.07,
    '2013': 1.47,
    '2014': 1.62,
    '2015': 0.12,
    '2016': 1.26,
    '2017': 2.13,
    '2018': 2.44,
    '2019': 1.81,
    '2020': 1.23,
    '2021': 4.70,
    '2022': 8.00,
    '2023': 4.10
  });

  const setDefaultCountries = (fetchedCountries: Country[]) => {
    const us = fetchedCountries.find((c) => c.name === 'United States');
    const india = fetchedCountries.find((c) => c.name === 'India');
    if (us && india) {
      setCountry1(us);
      setCountry2(india);
    } else if (fetchedCountries.length >= 2) {
      setCountry1(fetchedCountries[0]);
      setCountry2(fetchedCountries[1]);
    }
  };

  useEffect(() => {
    localStorage.setItem('amount', amount);
    localStorage.setItem('result', JSON.stringify(result));
    localStorage.setItem('referenceYear', referenceYear);
    localStorage.setItem('targetYear', targetYear);
    if (country1) {
      localStorage.setItem('country1Code', country1.code);
    }
    if (country2) {
      localStorage.setItem('country2Code', country2.code);
    }
  }, [amount, result, referenceYear, targetYear, country1, country2]);

  const fetchCountries = async () => {
    try {
      const res = await axios.get('https://restcountries.com/v3.1/all');
      const countriesData: Country[] = res.data.map((country) => ({
        code: country.cca3,
        name: country.name.common,
        currency: country.currencies ? Object.keys(country.currencies)[0] : '',
        symbol: country.currencies ? country.currencies[Object.keys(country.currencies)[0]].symbol : '$',
        flag: country.flags.png,
      }));

      return countriesData;
    } catch (error) {
      console.error('Error fetching countries:', error);
      setError('Failed to load countries.');
      return [];
    }
  };

  const fetchPPPData = async (countryCode: string | undefined) => {
    if (!countryCode) return null;
    try {
      const response = await axios.get(
        `https://api.worldbank.org/v2/country/${countryCode}/indicator/PA.NUS.PPP?format=json`
      );

      if (response.data && response.data[1] && response.data[1][0] && response.data[1][0].value) {
        return response.data[1][0].value;
      } else {
        throw new Error('No PPP data found.');
      }
    } catch (error) {
      console.error(`Error fetching PPP data for ${countryCode}:`, error);
      return null;
    }
  };

  const calculateInflationAdjustedValue = (amount: number, startYear: string, endYear: string) => {
    const startYearNum = parseInt(startYear);
    const endYearNum = parseInt(endYear);
    
    if (startYearNum === endYearNum) return amount;
    
    let adjustedValue = amount;
    
    if (startYearNum < endYearNum) {
      // Forward in time (inflation)
      for (let year = startYearNum + 1; year <= endYearNum; year++) {
        const inflationRate = inflationData[year.toString()] || 
                            (year < new Date().getFullYear() ? 2.5 : 0); // Default to 2.5% for past years with no data
        adjustedValue *= (1 + inflationRate / 100);
      }
    } else {
      // Backward in time (deflation)
      for (let year = startYearNum; year > endYearNum; year--) {
        const inflationRate = inflationData[year.toString()] || 
                            (year < new Date().getFullYear() ? 2.5 : 0); // Default to 2.5% for past years with no data
        adjustedValue /= (1 + inflationRate / 100);
      }
    }
    
    return adjustedValue;
  };

  const calculateResult = async () => {
    if (!country1) {
      setError('Please select a country.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const numAmount = parseFloat(amount) || 0;
      
      if (calculatorType === 'ppp') {
        if (!country2) {
          throw new Error('Please select both countries.');
        }
        
        const ppp1 = await fetchPPPData(country1.code);
        const ppp2 = await fetchPPPData(country2.code);

        if (!ppp1 || !ppp2) {
          throw new Error('PPP data is unavailable for one or both countries.');
        }

        const convertedAmount = (numAmount * ppp2) / ppp1;
        setResult({ amount: convertedAmount, fromAmount: numAmount });
      } else {
        // Buying Power calculation
        if (!referenceYear || !targetYear) {
          throw new Error('Please select both years.');
        }
        
        const adjustedAmount = calculateInflationAdjustedValue(
          numAmount,
          referenceYear,
          targetYear
        );
        
        setResult({ amount: adjustedAmount, fromAmount: numAmount });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while calculating.');
      setResult({ amount: 0, fromAmount: 0 });
    } finally {
      setLoading(false);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(value);
  };

  const swapCountries = () => {
    setCountry1(country2);
    setCountry2(country1);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdown1Ref.current && !dropdown1Ref.current.contains(event.target as Node)) {
        setShowDropdown1(false);
      }
      if (dropdown2Ref.current && !dropdown2Ref.current.contains(event.target as Node)) {
        setShowDropdown2(false);
      }
      if (referenceYearDropdownRef.current && !referenceYearDropdownRef.current.contains(event.target as Node)) {
        setShowReferenceYearDropdown(false);
      }
      if (targetYearDropdownRef.current && !targetYearDropdownRef.current.contains(event.target as Node)) {
        setShowTargetYearDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const years = Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => String(1900 + i)).reverse();

  const filteredCountries1 = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery1.toLowerCase())
  );
  const filteredCountries2 = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery2.toLowerCase())
  );

  return (
  



<div>
<div className="min-h-screen bg-gradient-to-r from-[#EDEDED] to-[#D9D9D9] rounded-b-3xl">
  <div className="max-w-5xl mx-auto px-4 py-8 md:py-16 relative">
  <img 
  src="/Group 2 (1).png" 
  alt="" 
  className="absolute hidden lg:block 
             top-1/2 
             lg:right-[-80px] xl:right-[-145px] 
             lg:h-[250px] xl:h-[422px] 
             -translate-y-1/2 
             origin-center" 
/>

<img 
  src="/Group 3.png" 
  alt="" 
  className="absolute hidden lg:block 
             top-1/2 
             lg:left-[-80px] xl:left-[-154px] 
             lg:h-[250px] xl:h-[422px] 
             -translate-y-1/2 
             origin-center" 
/>

    <div className="relative p-[13px] overflow-hidden">
      <div className="absolute inset-0 border-[13px] border-transparent rounded-2xl backdrop-blur-sm"></div>
      <div className="relative bg-white rounded-xl shadow-lg p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 mb-6 md:mb-8">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    checked={calculatorType === 'ppp'}
                    onChange={() => setCalculatorType('ppp')}
                    className="form-radio h-5 w-5 accent-black"
                  />
                  <span className="ml-2 text-lg">PPP Calculator</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    checked={calculatorType === 'buyingPower'}
                    onChange={() => setCalculatorType('buyingPower')}
                    className="form-radio h-5 w-5 accent-black"
                  />
                  <span className="ml-2 text-lg">Buying Power Calculator</span>
                </label>
              </div>

              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="block text-base font-medium text-[#252525] mb-2 text-left">Country</label>
                  <div className="relative">
                    <div
                      onClick={() => setShowDropdown1(!showDropdown1)}
                      className="pl-12 w-full border border-gray-300 rounded-xl px-4 py-3 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer text-left"
                    >
                      {country1?.name || 'Select country'}
                    </div>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {country1?.flag && (
                        <img
                          src={country1.flag}
                          alt={country1.code}
                          className="w-[21px] h-[16px]"
                          style={{ objectFit: 'cover' }}
                        />
                      )}
                    </div>
                    {showDropdown1 && (
                      <div ref={dropdown1Ref} className="absolute mt-1 w-full bg-white rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                        <input
                          type="text"
                          value={searchQuery1}
                          onChange={(e) => setSearchQuery1(e.target.value)}
                          placeholder="Search country..."
                          className="w-full border-b border-gray-200 px-4 py-2 focus:outline-none"
                        />
                        {filteredCountries1.map((country) => (
                          <div
                            key={country.code}
                            onClick={() => {
                              setCountry1(country);
                              setShowDropdown1(false);
                              setSearchQuery1("");
                            }}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                          >
                            <img
                              src={country.flag}
                              alt={country.code}
                              className="w-[21px] h-[16px] mr-2"
                              style={{ objectFit: 'cover' }}
                            />
                            {country.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-base font-medium text-[#252525] mb-2 text-left">Enter amount</label>
                  <div className="flex items-center">
                    <div className="relative flex-grow">
                      <div className="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none border-r border-gray-300 ">
                        <span className="text-gray-500 text-base">{country1?.symbol || '$'}</span>
                      </div>
                      <input
                        type="text"
                        value={amount}
                        onChange={handleAmountChange}
                        className="pl-8 w-full border border-gray-300 rounded-xl pr-6 pl-[48px] py-3 text-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter amount"
                      />
                    </div>
                    {calculatorType === 'ppp' && (
                      <button
                        onClick={swapCountries}
                        className="ml-2 px-2 flex items-center justify-center rounded-xl border border-green-500 w-14 h-14 hover:bg-green-100 transition-colors"
                        title="Swap countries"
                      >
                        <svg className="h-6 w-6" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M4.66667 3.16667V13.8333M4.66667 13.8333L2 11.1667M4.66667 13.8333L7.33333 11.1667M11.3333 13.8333V3.16667M11.3333 3.16667L8.66667 5.83333M11.3333 3.16667L14 5.83333"
                            stroke="url(#paint0_linear_53_20601)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <defs>
                            <linearGradient id="paint0_linear_53_20601" x1="8" y1="3.16667" x2="8" y2="13.8333" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#5AC57B" />
                              <stop offset="1" stopColor="#15B146" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                {calculatorType === 'ppp' && (
                  <div>
                    <label className="block text-base font-medium text-[#252525] mb-2 text-left">Country 2</label>
                    <div className="relative">
                      <div
                        onClick={() => setShowDropdown2(!showDropdown2)}
                        className="pl-12 w-full border border-gray-300 rounded-xl px-4 py-3 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer text-left"
                      >
                        {country2?.name || 'Select country'}
                      </div>
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {country2?.flag && (
                          <img
                            src={country2.flag}
                            alt={country2.code}
                            className="w-[21px] h-[16px]"
                            style={{ objectFit: 'cover' }}
                          />
                        )}
                      </div>
                      {showDropdown2 && (
                        <div ref={dropdown2Ref} className="absolute mt-1 w-full bg-white rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                          <input
                            type="text"
                            value={searchQuery2}
                            onChange={(e) => setSearchQuery2(e.target.value)}
                            placeholder="Search country..."
                            className="w-full border-b border-gray-200 px-4 py-2 focus:outline-none"
                          />
                          {filteredCountries2.map((country) => (
                            <div
                              key={country.code}
                              onClick={() => {
                                setCountry2(country);
                                setShowDropdown2(false);
                                setSearchQuery2("");
                              }}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                            >
                              <img
                                src={country.flag}
                                alt={country.code}
                                className="w-[21px] h-[16px] mr-2"
                                style={{ objectFit: 'cover' }}
                              />
                              {country.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {calculatorType === 'buyingPower' && (
                  <div>
                    <div>
                      <label className="block text-base font-medium text-[#252525] mb-2 text-left">Reference Year</label>
                      <div className="relative">
                        <div
                          onClick={() => setShowReferenceYearDropdown(!showReferenceYearDropdown)}
                          className="pl-8 w-full border border-gray-300 rounded-xl pr-6 pl-[15px] py-3 text-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer text-left"
                        >
                          {referenceYear}
                        </div>
                        {showReferenceYearDropdown && (
                          <div ref={referenceYearDropdownRef} className="absolute mt-1 w-full bg-white rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                            {years.map((year) => (
                              <div
                                key={year}
                                onClick={() => {
                                  setReferenceYear(year);
                                  setShowReferenceYearDropdown(false);
                                }}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              >
                                {year}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='pt-[18px]'>
                      <label className="block text-base font-medium text-[#252525] mb-2 text-left">Target Year</label>
                      <div className="relative">
                        <div
                          onClick={() => setShowTargetYearDropdown(!showTargetYearDropdown)}
                          className="pl-8 w-full border border-gray-300 rounded-xl pr-6 pl-[15px] py-3 text-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer text-left"
                        >
                          {targetYear}
                        </div>
                        {showTargetYearDropdown && (
                          <div ref={targetYearDropdownRef} className="absolute mt-1 w-full bg-white rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                            {years.map((year) => (
                              <div
                                key={year}
                                onClick={() => {
                                  setTargetYear(year);
                                  setShowTargetYearDropdown(false);
                                }}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              >
                                {year}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-auto">
              <button
                onClick={calculateResult}
                disabled={loading || inflationDataLoading}
                className="w-full mt-6 md:mt-8 bg-gradient-to-r from-[#5AC57B] to-[#15B146] text-white rounded-lg px-4 py-3 flex items-center justify-center text-lg hover:bg-green-600 transition-colors disabled:opacity-50"
              >
                {loading ? 'Calculating...' : 'Calculate'}{' '}
                {!loading && (
                  <svg className="ml-2 h-4 w-4" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.66663 11.8334L11.3333 5.16675" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4.66663 5.16675H11.3333V11.8334" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="border-2 border-dashed border-green-200 rounded-[20px] flex flex-col items-center justify-center p-6 md:p-8 min-h-[300px] md:min-h-[550px]">
            {error && (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-2 rounded-lg mb-4 text-sm text-center">
                {error}
              </div>
            )}
            {usingDefaultInflationData && calculatorType === 'buyingPower' && (
              <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-2 rounded-lg mb-4 text-sm text-center">
                Using default inflation rates for {country1?.name || 'selected country'}
              </div>
            )}
            {inflationDataLoading && (
              <div className="mb-4 text-sm text-center">
                Loading inflation data...
              </div>
            )}
            <div className="flex flex-col items-center justify-center flex-grow">
              <h3 className="text-2xl font-medium text-[#15B146] text-center">
                {calculatorType === 'ppp' ? country2?.symbol || '$' : country1?.symbol || '$'}
                {result.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h3>
              <p className="text-[#252525] text-base mb-4 text-center">
                ({country1?.symbol || '$'}{result.fromAmount.toLocaleString()})
              </p>
              <div className="text-center text-base text-[#252525] leading-relaxed flex flex-col justify-center">

                <p className="mb-4 md:mb-6 px-[55px]">
                  {calculatorType === 'ppp' ? (
                    <>
                      <span className="font-bold font-inter">{country1?.symbol || '$'}{result.fromAmount.toLocaleString()}</span> in the "{country1?.name || 'Country 1'}"
                      <span> has the same Purchasing Power as </span>
                      <span className="font-bold font-inter">{country2?.symbol || '$'}{result.amount.toLocaleString()}</span> in "{country2?.name || 'Country 2'}".
                    </>
                  ) : (
                    <>
                      <span className="font-bold font-inter">{country1?.symbol || '$'}{result.fromAmount.toLocaleString()}</span> in {referenceYear}
                      <span> has the same buying power as </span>
                      <span className="font-bold font-inter">{country1?.symbol || '$'}{result.amount.toLocaleString()}</span> in {targetYear}.
                    </>
                  )}
                </p>

                {calculatorType === 'buyingPower' && (
                  <p className="mb-4 md:mb-6">
                    adjusted for inflation from {referenceYear} to {targetYear}.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{calculatorType === 'ppp' && <PurchasingPowerParity />}
{calculatorType === 'buyingPower' && <BuyingPowerIntroduction />}
<Footer />
</div> 
  
  );
};

export default Calculator;