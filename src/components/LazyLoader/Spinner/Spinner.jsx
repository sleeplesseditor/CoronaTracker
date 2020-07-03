import React from 'react';
import styles from './Spinner.module.css';

const Spinner = () => (
  <div className={styles.overlay}>
    <div className={styles.container} />
  </div>
);

export default Spinner;