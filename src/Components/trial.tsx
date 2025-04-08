import { useState, useEffect, useRef } from 'react';
import React from 'react';
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

type ExchangeRates = {
  [currency: string]: number;
};

const Calculator = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [calculatorType, setCalculatorType] = useState<'ppp' | 'buyingPower'>('ppp');
  const [amount, setAmount] = useState('1000');
  const [country1, setCountry1] = useState<Country | null>(null);
  const [country2, setCountry2] = useState<Country | null>(null);
  const [result, setResult] = useState({ amount: 0, fromAmount: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery1, setSearchQuery1] = useState('');
  const [searchQuery2, setSearchQuery2] = useState('');
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const dropdown1Ref = useRef<HTMLDivElement>(null);
  const dropdown2Ref = useRef<HTMLDivElement>(null);
  const [referenceYear, setReferenceYear] = useState('2020');
  const [targetYear, setTargetYear] = useState('2023');
  const [showReferenceYearDropdown, setShowReferenceYearDropdown] = useState(false);
  const [showTargetYearDropdown, setShowTargetYearDropdown] = useState(false);
  const referenceYearDropdownRef = useRef<HTMLDivElement>(null);
  const targetYearDropdownRef = useRef<HTMLDivElement>(null);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const FIXER_API_KEY = 'your api key '; // Replace with your actual Fixer API key

  // Fetch exchange rates from Fixer.io
  const fetchExchangeRates = async () => {
    try {
      const response = await axios.get(
        http://data.fixer.io/api/latest?access_key=${FIXER_API_KEY}
      );
      
      if (response.data && response.data.success) {
        setExchangeRates(response.data.rates);
        return response.data.rates;
      } else {
        throw new Error(response.data?.error?.info || 'Failed to fetch exchange rates');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error fetching exchange rates:', error.message);
        setError('Failed to fetch exchange rates: ' + error.message);
      } else {
        console.error('An unexpected error occurred:', error);
        setError('An unexpected error occurred while fetching exchange rates.');
      }
      return null;
    }
  };

  // Fetch country data
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get('https://restcountries.com/v3.1/all');

        const countriesData: Country[] = res.data.map((country) => ({
          code: country.cca2,
          name: country.name.common,
          currency: country.currencies ? Object.keys(country.currencies)[0] : undefined,
          symbol: country.currencies ? country.currencies[Object.keys(country.currencies)[0]].symbol : undefined,
          flag: country.flags.png,
        }));

        setCountries(countriesData);

        // Set default countries (US and IN)
        const defaultCountry1 = countriesData.find((c) => c.code === 'US') || countriesData[0];
        const defaultCountry2 = countriesData.find((c) => c.code === 'IN') || countriesData[1];
        setCountry1(defaultCountry1);
        setCountry2(defaultCountry2);

        // Fetch exchange rates after countries are loaded
        await fetchExchangeRates();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Error fetching country data:', error.message);
          setError('Failed to fetch country data: ' + error.message);
        } else {
          console.error('An unexpected error occurred:', error);
          setError('An unexpected error occurred while fetching country data.');
        }
      }
    };

    fetchCountries();
  }, []);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(value);
  };

  const swapCountries = () => {
    setCountry1(country2);
    setCountry2(country1);
  };

  const calculateResult = async () => {
    const numAmount = parseFloat(amount) || 0;
    setLoading(true);
    setError('');

    try {
      if (calculatorType === 'ppp') {
        if (!country1 || !country2 || !country1.currency || !country2.currency) {
          throw new Error('Please select both countries with currencies');
        }

        // Get exchange rates for both currencies
        const baseCurrency = 'USD'; // Fixer.io uses EUR as base by default, but we'll handle conversion
        const eurRateForCurrency1 = exchangeRates[country1.currency];
        const eurRateForCurrency2 = exchangeRates[country2.currency];

        if (!eurRateForCurrency1 || !eurRateForCurrency2) {
          throw new Error('Exchange rate data not available for selected currencies');
        }

        // Convert both currencies to EUR first (Fixer.io base)
        const amountInEur = numAmount / eurRateForCurrency1;
        // Convert from EUR to target currency
        const targetAmount = amountInEur * eurRateForCurrency2;

        setResult({
          amount: targetAmount,
          fromAmount: numAmount,
        });
      } else {
        // Buying power calculation (same as before)
        if (!country1) return;
        const inflationRate = 0.03;
        const yearsDifference = parseInt(targetYear) - parseInt(referenceYear);
        const inflationFactor = Math.pow(1 + inflationRate, yearsDifference);
        const adjustedAmount = numAmount * inflationFactor;
        setResult({
          amount: adjustedAmount,
          fromAmount: numAmount,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setResult({
        amount: numAmount,
        fromAmount: numAmount,
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle click outside dropdowns
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
          <img src="/Group 2 (1).png" alt="" className="absolute right-[-145px] h-[422px] top-[87px] hidden lg:block" />
          <img src="/Group 3.png" alt="" className="absolute left-[-154px] h-[422px] top-[87px] hidden lg:block" />

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
                            className="pl-12 w-full border border-gray-300 rounded-xl px-4 py-3 appearance-none bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer text-left"
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
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none border-r border-gray-300 pr-4 pl-4">
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
                                  d="M4.66667 3.16675V13.8334M4.66667 13.8334L2 11.1667M4.66667 13.8334L7.33333 11.1667M11.3333 13.8334V3.16675M11.3333 3.16675L8.66667 5.83341M11.3333 3.16675L14 5.83341"
                                  stroke="url(#paint0_linear_53_20601)"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <defs>
                                  <linearGradient id="paint0_linear_53_20601" x1="8" y1="3.16675" x2="8" y2="13.8334" gradientUnits="userSpaceOnUse">
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
                              className="pl-12 w-full border border-gray-300 rounded-xl px-4 py-3 appearance-none bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer text-left"
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
                      disabled={loading}
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
                    <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-2 rounded-lg mb-4 text-sm">
                      {error}
                    </div>
                  )}
                  <h3 className="text-2xl font-medium text-[#15B146] mb-4">
                    {country2?.symbol || '$'}
                    {result.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </h3>
                  <p className="text-gray-500 text-2xl mb-6 md:mb-12">
                    ({country1?.symbol || '$'}{result.fromAmount.toLocaleString()})
                  </p>
                  <div className="text-center text-base text-[#252525] leading-relaxed flex-grow">
                    <p className="mb-4 md:mb-6">
                      <span className="font-medium">{country1?.symbol || '$'}{result.fromAmount.toLocaleString()}</span> in {country1?.name || 'Country 1'}
                    </p>
                    <p className="mb-4 md:mb-6">
                      has the same {calculatorType === 'ppp' ? 'Purchasing Power' : 'Value'} as{' '}
                      <span className="font-medium">{country2?.symbol || '$'}{result.amount.toLocaleString()}</span> in {country2?.name || 'Country 2'}.
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
      {calculatorType === 'ppp' && <PurchasingPowerParity />}
      {calculatorType === 'buyingPower' && <BuyingPowerIntroduction />}
      <Footer />
    </div>
  );
};


// import { useState, useEffect, useRef } from 'react';

// import React from 'react';

// import { ArrowRight } from 'lucide-react';

// import axios, { AxiosError } from 'axios';

// import PurchasingPowerParity from './PurchasingPowerParity.tsx';

// import BuyingPowerIntroduction from './BuyingPowerIntroduction.tsx';

// import Footer from './Footer.tsx';



// type Country = {

// code: string;

// name: string;

// currency?: string;

// symbol?: string;

// flag: string;

// ppp?: number;

// };



// const Calculator = () => {

// const [calculatorType, setCalculatorType] = useState<'ppp' | 'buyingPower'>('ppp');

// const [countries, setCountries] = useState<Country[]>([]);

// const [country1, setCountry1] = useState<Country | null>(null);

// const [country2, setCountry2] = useState<Country | null>(null);

// const [amount, setAmount] = useState(localStorage.getItem('amount') || '');

// const [result, setResult] = useState(() => {

// const storedResult = localStorage.getItem('result');

// return storedResult ? JSON.parse(storedResult) : { amount: 0, fromAmount: 0 };

// });

// const [error, setError] = useState('');

// const [loading, setLoading] = useState(false);

// const [showDropdown1, setShowDropdown1] = useState(false);

// const [showDropdown2, setShowDropdown2] = useState(false);

// const [searchQuery1, setSearchQuery1] = useState('');

// const [searchQuery2, setSearchQuery2] = useState('');



// const dropdown1Ref = useRef<HTMLDivElement>(null);

// const dropdown2Ref = useRef<HTMLDivElement>(null);

// const [referenceYear, setReferenceYear] = useState(localStorage.getItem('referenceYear') || '2020');

// const [targetYear, setTargetYear] = useState(localStorage.getItem('targetYear') || '2023');

// const [showReferenceYearDropdown, setShowReferenceYearDropdown] = useState(false);

// const [showTargetYearDropdown, setShowTargetYearDropdown] = useState(false);

// const referenceYearDropdownRef = useRef<HTMLDivElement>(null);

// const targetYearDropdownRef = useRef<HTMLDivElement>(null);



// useEffect(() => {

// fetchCountries().then((fetchedCountries) => {

// setCountries(fetchedCountries);

// const storedCountry1Code = localStorage.getItem('country1Code');

// const storedCountry2Code = localStorage.getItem('country2Code');



// if (storedCountry1Code && storedCountry2Code) {

// const storedCountry1 = fetchedCountries.find((c) => c.code === storedCountry1Code);

// const storedCountry2 = fetchedCountries.find((c) => c.code === storedCountry2Code);

// if (storedCountry1 && storedCountry2) {

// setCountry1(storedCountry1);

// setCountry2(storedCountry2);

// } else {

// setDefaultCountries(fetchedCountries);

// }

// } else {

// setDefaultCountries(fetchedCountries);

// }

// });

// }, []);



// const setDefaultCountries = (fetchedCountries: Country[]) => {

// const us = fetchedCountries.find((c) => c.name === 'United States');

// const india = fetchedCountries.find((c) => c.name === 'India');

// if (us && india) {

// setCountry1(us);

// setCountry2(india);

// } else if (fetchedCountries.length >= 2) {

// setCountry1(fetchedCountries[0]);

// setCountry2(fetchedCountries[1]);

// }

// };



// useEffect(() => {

// localStorage.setItem('amount', amount);

// localStorage.setItem('result', JSON.stringify(result));

// localStorage.setItem('referenceYear', referenceYear);

// localStorage.setItem('targetYear', targetYear);

// if (country1) {

// localStorage.setItem('country1Code', country1.code);

// }

// if (country2) {

// localStorage.setItem('country2Code', country2.code);

// }

// }, [amount, result, referenceYear, targetYear, country1, country2]);



// const fetchCountries = async () => {

// try {

// const res = await axios.get('https://restcountries.com/v3.1/all');

// const countriesData: Country[] = res.data.map((country) => ({

// code: country.cca3,

// name: country.name.common,

// currency: country.currencies ? Object.keys(country.currencies)[0] : '',

// symbol: country.currencies ? country.currencies[Object.keys(country.currencies)[0]].symbol : '$',

// flag: country.flags.png,

// }));



// return countriesData;

// } catch (error) {

// console.error('Error fetching countries:', error);

// setError('Failed to load countries.');

// return [];

// }

// };



// const fetchPPPData = async (countryCode: string | undefined) => {

// if (!countryCode) return null;

// try {

// const response = await axios.get(

// `https://api.worldbank.org/v2/country/${countryCode}/indicator/PA.NUS.PPP?format=json`

// );



// if (response.data && response.data[1] && response.data[1][0] && response.data[1][0].value) {

// return response.data[1][0].value;

// } else {

// throw new Error('No PPP data found.');

// }

// } catch (error) {

// console.error(`Error fetching PPP data for ${countryCode}:`, error);

// return null;

// }

// };



// const calculateResult = async () => {

// if (!country1 || !country2) {

// setError('Please select both countries.');

// return;

// }



// setLoading(true);

// setError('');



// try {

// const ppp1 = await fetchPPPData(country1.code);

// const ppp2 = await fetchPPPData(country2.code);



// if (!ppp1 || !ppp2) {

// throw new Error('PPP data is unavailable for one or both countries.');

// }



// const numAmount = parseFloat(amount) || 0;

// const convertedAmount = (numAmount * ppp2) / ppp1;



// setResult({ amount: convertedAmount, fromAmount: numAmount });

// } catch (err) {

// setError(err instanceof Error ? err.message : 'An error occurred while calculating.');

// setResult({ amount: 0, fromAmount: 0 });

// } finally {

// setLoading(false);

// }

// };



// const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {

// const value = e.target.value.replace(/[^0-9.]/g, '');

// setAmount(value);

// };



// const swapCountries = () => {

// setCountry1(country2);

// setCountry2(country1);

// };



// useEffect(() => {

// const handleClickOutside = (event: MouseEvent) => {

// if (dropdown1Ref.current && !dropdown1Ref.current.contains(event.target as Node)) {

// setShowDropdown1(false);

// }

// if (dropdown2Ref.current && !dropdown2Ref.current.contains(event.target as Node)) {

// setShowDropdown2(false);

// }

// if (referenceYearDropdownRef.current && !referenceYearDropdownRef.current.contains(event.target as Node)) {

// setShowReferenceYearDropdown(false);

// }

// if (targetYearDropdownRef.current && !targetYearDropdownRef.current.contains(event.target as Node)) {

// setShowTargetYearDropdown(false);

// }

// };

// document.addEventListener('mousedown', handleClickOutside);

// return () => {

// document.removeEventListener('mousedown', handleClickOutside);

// };

// }, []);



// const years = Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => String(1900 + i)).reverse();



// const filteredCountries1 = countries.filter((country) =>

// country.name.toLowerCase().includes(searchQuery1.toLowerCase())

// );

// const filteredCountries2 = countries.filter((country) =>

// country.name.toLowerCase().includes(searchQuery2.toLowerCase())

// );



// return (

// <div>

// <div className="min-h-screen bg-gradient-to-r from-[#EDEDED] to-[#D9D9D9] rounded-b-3xl">

// <div className="max-w-5xl mx-auto px-4 py-8 md:py-16 relative">

// <img src="/Group 2 (1).png" alt="" className="absolute right-[-145px] h-[422px] top-[87px] hidden lg:block" />

// <img src="/Group 3.png" alt="" className="absolute left-[-154px] h-[422px] top-[87px] hidden lg:block" />



// <div className="relative p-[13px] overflow-hidden">

// <div className="absolute inset-0 border-[13px] border-transparent rounded-2xl backdrop-blur-sm"></div>

// <div className="relative bg-white rounded-xl shadow-lg p-6 md:p-8">

// <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">

// <div className="flex flex-col justify-between">

// <div>

// <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 mb-6 md:mb-8">

// <label className="flex items-center cursor-pointer">

// <input

// type="radio"

// checked={calculatorType === 'ppp'}

// onChange={() => setCalculatorType('ppp')}

// className="form-radio h-5 w-5 accent-black"

// />

// <span className="ml-2 text-lg">PPP Calculator</span>

// </label>

// <label className="flex items-center cursor-pointer">

// <input

// type="radio"

// checked={calculatorType === 'buyingPower'}

// onChange={() => setCalculatorType('buyingPower')}

// className="form-radio h-5 w-5 accent-black"

// />

// <span className="ml-2 text-lg">Buying Power Calculator</span>

// </label>

// </div>



// <div className="space-y-4 md:space-y-6">

// <div>

// <label className="block text-base font-medium text-[#252525] mb-2 text-left">Country</label>

// <div className="relative">

// <div

// onClick={() => setShowDropdown1(!showDropdown1)}

// className="pl-12 w-full border border-gray-300 rounded-xl px-4 py-3 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer text-left"

// >

// {country1?.name || 'Select country'}

// </div>

// <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">

// {country1?.flag && (

// <img

// src={country1.flag}

// alt={country1.code}

// className="w-[21px] h-[16px]"

// style={{ objectFit: 'cover' }}

// />

// )}

// </div>

// {showDropdown1 && (

// <div ref={dropdown1Ref} className="absolute mt-1 w-full bg-white rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">

// <input

// type="text"

// value={searchQuery1}

// onChange={(e) => setSearchQuery1(e.target.value)}

// placeholder="Search country..."

// className="w-full border-b border-gray-200 px-4 py-2 focus:outline-none"

// />

// {filteredCountries1.map((country) => (

// <div

// key={country.code}

// onClick={() => {

// setCountry1(country);

// setShowDropdown1(false);

// setSearchQuery1("");

// }}

// className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"

// >

// <img

// src={country.flag}

// alt={country.code}

// className="w-[21px] h-[16px] mr-2"

// style={{ objectFit: 'cover' }}

// />

// {country.name}

// </div>

// ))}

// </div>

// )}

// </div>

// </div>



// <div>

// <label className="block text-base font-medium text-[#252525] mb-2 text-left">Enter amount</label>

// <div className="flex items-center">

// <div className="relative flex-grow">

// <div className="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none border-r border-gray-300 ">

// <span className="text-gray-500 text-base">{country1?.symbol || '$'}</span>

// </div>

// <input

// type="text"

// value={amount}

// onChange={handleAmountChange}

// className="pl-8 w-full border border-gray-300 rounded-xl pr-6 pl-[48px] py-3 text-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"

// placeholder="Enter amount"

// />

// </div>

// {calculatorType === 'ppp' && (

// <button

// onClick={swapCountries}

// className="ml-2 px-2 flex items-center justify-center rounded-xl border border-green-500 w-14 h-14 hover:bg-green-100 transition-colors"

// title="Swap countries"

// >

// <svg className="h-6 w-6" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">

// <path

// d="M4.66667 3.16667V13.8333M4.66667 13.8333L2 11.1667M4.66667 13.8333L7.33333 11.1667M11.3333 13.8333V3.16667M11.3333 3.16667L8.66667 5.83333M11.3333 3.16667L14 5.83333"

// stroke="url(#paint0_linear_53_20601)"

// strokeWidth="1.5"

// strokeLinecap="round"

// strokeLinejoin="round"

// />

// <defs>

// <linearGradient id="paint0_linear_53_20601" x1="8" y1="3.16667" x2="8" y2="13.8333" gradientUnits="userSpaceOnUse">

// <stop stopColor="#5AC57B" />

// <stop offset="1" stopColor="#15B146" />

// </linearGradient>

// </defs>

// </svg>

// </button>

// )}

// </div>

// </div>

// {calculatorType === 'ppp' && (

// <div>

// <label className="block text-base font-medium text-[#252525] mb-2 text-left">Country 2</label>

// <div className="relative">

// <div

// onClick={() => setShowDropdown2(!showDropdown2)}

// className="pl-12 w-full border border-gray-300 rounded-xl px-4 py-3 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer text-left"

// >

// {country2?.name || 'Select country'}

// </div>

// <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">

// {country2?.flag && (

// <img

// src={country2.flag}

// alt={country2.code}

// className="w-[21px] h-[16px]"

// style={{ objectFit: 'cover' }}

// />

// )}

// </div>

// {showDropdown2 && (

// <div ref={dropdown2Ref} className="absolute mt-1 w-full bg-white rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">

// <input

// type="text"

// value={searchQuery2}

// onChange={(e) => setSearchQuery2(e.target.value)}

// placeholder="Search country..."

// className="w-full border-b border-gray-200 px-4 py-2 focus:outline-none"

// />

// {filteredCountries2.map((country) => (

// <div

// key={country.code}

// onClick={() => {

// setCountry2(country);

// setShowDropdown2(false);

// setSearchQuery2("");

// }}

// className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"

// >

// <img

// src={country.flag}

// alt={country.code}

// className="w-[21px] h-[16px] mr-2"

// style={{ objectFit: 'cover' }}

// />

// {country.name}

// </div>

// ))}

// </div>

// )}

// </div>

// </div>

// )}

// {calculatorType === 'buyingPower' && (

// <div>

// <div>

// <label className="block text-base font-medium text-[#252525] mb-2 text-left">Reference Year</label>

// <div className="relative">

// <div

// onClick={() => setShowReferenceYearDropdown(!showReferenceYearDropdown)}

// className="pl-8 w-full border border-gray-300 rounded-xl pr-6 pl-[15px] py-3 text-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer text-left"

// >

// {referenceYear}

// </div>

// {showReferenceYearDropdown && (

// <div ref={referenceYearDropdownRef} className="absolute mt-1 w-full bg-white rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">

// {years.map((year) => (

// <div

// key={year}

// onClick={() => {

// setReferenceYear(year);

// setShowReferenceYearDropdown(false);

// }}

// className="px-4 py-2 hover:bg-gray-100 cursor-pointer"

// >

// {year}

// </div>

// ))}

// </div>

// )}

// </div>

// </div>

// <div className='pt-[18px]'>

// <label className="block text-base font-medium text-[#252525] mb-2 text-left">Target Year</label>

// <div className="relative">

// <div

// onClick={() => setShowTargetYearDropdown(!showTargetYearDropdown)}

// className="pl-8 w-full border border-gray-300 rounded-xl pr-6 pl-[15px] py-3 text-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer text-left"

// >

// {targetYear}

// </div>

// {showTargetYearDropdown && (

// <div ref={targetYearDropdownRef} className="absolute mt-1 w-full bg-white rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">

// {years.map((year) => (

// <div

// key={year}

// onClick={() => {

// setTargetYear(year);

// setShowTargetYearDropdown(false);

// }}

// className="px-4 py-2 hover:bg-gray-100 cursor-pointer"

// >

// {year}

// </div>

// ))}

// </div>

// )}

// </div>

// </div>

// </div>

// )}

// </div>

// </div>



// <div className="mt-auto">

// <button

// onClick={calculateResult}

// disabled={loading}

// className="w-full mt-6 md:mt-8 bg-gradient-to-r from-[#5AC57B] to-[#15B146] text-white rounded-lg px-4 py-3 flex items-center justify-center text-lg hover:bg-green-600 transition-colors disabled:opacity-50"

// >

// {loading ? 'Calculating...' : 'Calculate'}{' '}

// {!loading && (

// <svg className="ml-2 h-4 w-4" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">

// <path d="M4.66663 11.8334L11.3333 5.16675" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />

// <path d="M4.66663 5.16675H11.3333V11.8334" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />

// </svg>

// )}

// </button>

// </div>

// </div>



// <div className="border-2 border-dashed border-green-200 rounded-[20px] flex flex-col items-center justify-center p-6 md:p-8 min-h-[300px] md:min-h-[550px]">

// {error && (

// <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-2 rounded-lg mb-4 text-sm text-center">

// {error}

// </div>

// )}

// <div className="flex flex-col items-center justify-center flex-grow">

// <h3 className="text-2xl font-medium text-[#15B146] text-center">

// {country2?.symbol || '$'}

// {result.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}

// </h3>

// <p className="text-[#252525] text-base mb-4 text-center">

// ({country1?.symbol || '$'}{result.fromAmount.toLocaleString()})

// </p>

// <div className="text-center text-base text-[#252525] leading-relaxed flex flex-col justify-center">



// <p className="mb-4 md:mb-6 px-[55px]">

// <span className="font-bold font-inter">{country1?.symbol || '$'}{result.fromAmount.toLocaleString()}</span> in the "{country1?.name || 'Country 1'}"



// <span> has the same</span> {calculatorType === 'ppp' ? 'Purchasing Power' : 'Value'} as{' '}

// <span className="font-bold font-inter">{country2?.symbol || '$'}{result.amount.toLocaleString()}</span> in "{country2?.name || 'Country 2'}".

// </p>

// {calculatorType === 'buyingPower' && (

// <p className="mb-4 md:mb-6">

// adjusted for inflation from {referenceYear} to {targetYear}.

// </p>

// )}

// </div>

// </div>

// </div>

// </div>

// </div>

// </div>

// </div>



// </div>

// {calculatorType === 'ppp' && <PurchasingPowerParity />}

// {calculatorType === 'buyingPower' && <BuyingPowerIntroduction />}

// <Footer />

// </div>

// );

// };



// export default Calculator; 