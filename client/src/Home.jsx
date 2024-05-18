import React from 'react';

const Home = () => {
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f8ff',
      fontFamily: 'Arial, sans-serif',
    },
    text: {
      fontSize: '2rem',
      color: '#333',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.text}>Welcome to the Homepage</div>
    </div>
  );
}

export default Home;
