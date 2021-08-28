import React from 'react';
import Head from 'next/head';

const IndexPage = () => {
  return (
    <div className="index">
      <Head>
        <title>Divine Robes</title>
      </Head>
      <h1>Divine Robes</h1>
      <div className="message">
        You have been added to the Divine Robes Discord.
      </div>
      <style jsx>{`
        .index {
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        h1 {
          font-size: 32px;
          margin: 0;
          padding: 0;
          font-weight: normal;
        }
        .message {
          margin-top: 20px;
        }
        button {
          margin-top: 20px;
          background-color: transparent;
          border: none;
          outline: none;
          color: white;
          font-family: serif;
          padding: 0;
          font-size: 18px;
          cursor: pointer;
          background-color: hsl(203, 18%, 19%);
          padding: 10px 20px;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default IndexPage;
