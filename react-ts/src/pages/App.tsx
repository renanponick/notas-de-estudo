import React from 'react';
import Form from '../components/form';
import List from '../components/list';
import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.AppStyle}>
      <Form />
      <List />
    </div>
  );
}

export default App;
