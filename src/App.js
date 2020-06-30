import React, { Component, Fragment } from 'react';
import styles from './App.module.css';
import { Cards, Chart, CountryPicker, Map } from './components';
import { Tab, Tabs } from '@material-ui/core';
import globleImage from './img/globe.png';
import { fetchData, fetchMapData } from './api';

class App extends Component {
  state = {
    data: {},
    mapData: {},
    country: '',
    countryView: 0
  }

  async componentDidMount() {
    const fetchedData = await fetchData();
    const mapTagData = await fetchMapData();

    this.setState({ 
      data: fetchedData,
      mapData: mapTagData
    })
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
  }

  handleTabChange = (event, newValue) => {
    this.setState({
      countryView: newValue
    })
  }

  render() {
    const { country, countryView, data } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <img className={styles.image} src={globleImage} alt="COVID-19" />
          <h1 className={styles.title}>COVID-19 Tracker</h1>
        </div>
        <Cards data={data} />
        <Tabs
          value={countryView}
          onChange={this.handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Chart View" />
          <Tab label="Map View" />
        </Tabs>
        {countryView === 0 ? (
          <CountryPicker handleCountryChange={this.handleCountryChange} />
        ): null}
        {countryView === 0 ? (
          <Chart data={data} country={country} />
        ): <Map /> }
      </div>
    )
  }
}

export default App;
