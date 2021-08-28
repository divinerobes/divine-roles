import Head from 'next/head';
import React, { ReactNode } from 'react';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="main-layout">
      <Head>
        <link href="/static/icon.png" rel="shortcut icon" />
      </Head>
      {children}
      <style jsx>{`
        .main-layout {
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
      `}</style>
    </div>
  );
};

export default MainLayout;
