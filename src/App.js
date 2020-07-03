import React, { Component } from 'react';
import styles from './App.module.css';
import { Cards, Chart, CountryPicker, Map } from './components';
import { Tab, Tabs } from '@material-ui/core';
import globleImage from './img/globe.png';
import { fetchData } from './api';

class App extends Component {
  state = {
    data: {},
    mapData: [],
    country: '',
    countryView: 0
  }

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({  data: fetchedData })
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
        <div className={styles.disclaimer}>
          <p className={styles.disclaimerText}>
            Data sourced from <a className={styles.disclaimerLink} href="https://github.com/mathdroid/covid-19-api">mathdroid's COVID-19 API</a> and inspired by <a className={styles.disclaimerLink} href="https://www.youtube.com/watch?time_continue=13&v=khJlrj3Y6Ls&feature=emb_logo">Adrian Hajdin's YouTube Tutorial</a>
          </p>
        </div>
        <div className={styles.disclaimer}>
          <p className={styles.disclaimerText}>
            <a className={styles.disclaimerLink} href="https://github.com/sleeplesseditor/CoronaTracker">Github Repo</a>
          </p>
        </div>
      </div>
    )
  }
}

export default App;
