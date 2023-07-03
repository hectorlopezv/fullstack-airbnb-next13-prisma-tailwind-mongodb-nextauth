import countries from "world-countries";

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));
const useCountries = () => {
  const getAll = () => formattedCountries;
  const getCountry = (cca2: string) =>
    formattedCountries.find((country) => country.value === cca2);
  return { getAll, getCountry };
};

export default useCountries;
