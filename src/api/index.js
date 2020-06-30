import axios from 'axios';
import moment from 'moment';

const url = 'https://covid19.mathdro.id/api';
const date = new Date();

const yesterday = date.setDate(date.getDate() -2);
const formattedDate = moment(yesterday).format('M-DD-yyyy');

export const fetchData = async (country) => {
  let changeableUrl = url;

  if(country) {
    changeableUrl = `${url}/countries/${country}`
  }

  try {
    const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);
    return { confirmed, recovered, deaths, lastUpdate };

  } catch(error) {
    console.error('FetchData Error', error)
  }
}

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);

    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));

    return modifiedData;

  } catch(error) {
    console.error('FetchDailyData Error', error);
  }
}

export const fetchCountries = async () => {
  try {
    const { data: { countries }} = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);

  } catch (error) {
    console.error('Country Data Error', error);
  }
}

export const fetchMapData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily/${formattedDate}`);

    const modifiedData = data.map((mapData) => ({
      lat: parseFloat(mapData.lat),
      long: parseFloat(mapData.long),
      // coordinates: [mapData.lat, mapData.long],
      confirmed: mapData.confirmed,
      deaths: mapData.deaths,
      recovered: mapData.recovered,
      location: mapData.combinedKey
    }))

    return modifiedData;

  } catch (error) {
    console.error('Map Data Error', error);
  }
}