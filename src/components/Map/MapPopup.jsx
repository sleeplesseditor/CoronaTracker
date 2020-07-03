import * as React from 'react';
import { PureComponent } from 'react';
import styles from './Map.module.css';

export default class MapPopup extends PureComponent {
  render() {
    const {selectedMarker} = this.props;
    const displayName = `${selectedMarker.location}`;

    return (
      <div>
        <div>
          <h2 className={styles.popupheading}>
            {displayName}
          </h2>
          <p className={styles.popupcategory}>
            <strong>Confirmed: </strong>{Number(`${selectedMarker.confirmed}`).toLocaleString('en')}
          </p>
          <p className={styles.popupcategory}>
            <strong>Deaths: </strong>{Number(`${selectedMarker.deaths}`).toLocaleString('en')}
          </p>
          <p className={styles.popupcategory}>
            <strong>Recovered: </strong>{Number(`${selectedMarker.recovered}`).toLocaleString('en')}
          </p>
        </div>
      </div>
    );
  }
}