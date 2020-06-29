import React, { Component } from 'react';
import styles from './App.module.css';
import { Cards, Chart, CountryPicker } from './components';
import globleImage from './img/globe.png';
import { fetchData } from './api';

class App extends Component {
  state = {
    data: {},
    country: ''
  }

  async componentDidMount() {
    const fetchedData = await fetchData();

    this.setState({ data: fetchedData })
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
  }

  render() {
    const { country, data } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <img className={styles.image} src={globleImage} alt="COVID-19" />
          <h1 className={styles.title}>COVID-19 Tracker</h1>
        </div>
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    )
  }
}

export default App;
