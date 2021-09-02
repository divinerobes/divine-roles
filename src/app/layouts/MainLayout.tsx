import Head from 'next/head';
import React, { ReactNode } from 'react';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="page">
      <Head>
        <title>Divine Roles</title>
        <link href="/static/icon.png" rel="shortcut icon" />
      </Head>
      {children}
      <style jsx>{`
        .page {
          padding: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          gap: 40px;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
      `}</style>
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        html,
        body {
          font-family: serif;
          margin: 0;
          padding: 0;
          background-color: black;
          color: white;
        }
        a {
          color: inherit;
        }
        h1 {
          font-size: 64px;
          margin: 0;
          padding: 0;
          font-weight: normal;
        }
        .message {
          font-size: 24px;
        }
        button,
        a {
          padding: 0;
          outline: none;
          border: none;
          color: white;
          font-size: 24px;
          font-family: serif;
          text-decoration: underline;
          cursor: pointer;
          background-color: transparent;
        }
        @media (max-width: 768px) {
          h1 {
            font-size: 36px;
          }
          .message {
            line-height: 1.3em;
          }
          .message,
          button,
          a {
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default MainLayout;
