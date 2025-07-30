import React from 'react';

const IndexSimple = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f8f9fa',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ 
        color: '#e91e63', 
        marginBottom: '20px',
        fontSize: '2.5rem',
        textAlign: 'center'
      }}>
        🌹 AmoraVerse
      </h1>
      <p style={{ 
        color: '#6c757d', 
        fontSize: '1.2rem',
        textAlign: 'center',
        maxWidth: '600px',
        marginBottom: '30px'
      }}>
        AI-Powered Poetry Generator
      </p>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#e91e63', marginBottom: '15px' }}>
          🎉 Successfully Deployed!
        </h2>
        <p style={{ color: '#6c757d', marginBottom: '20px' }}>
          Your AmoraVerse application is now live on Vercel.
        </p>
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '15px',
          borderRadius: '5px',
          marginTop: '20px'
        }}>
          <p style={{ margin: '0', fontSize: '0.9rem', color: '#6c757d' }}>
            <strong>Status:</strong> ✅ Frontend loaded successfully
          </p>
          <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: '#6c757d' }}>
            <strong>Next:</strong> Full features coming soon
          </p>
        </div>
      </div>
    </div>
  );
};

export default IndexSimple; 