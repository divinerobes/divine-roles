import React from 'react';
import { useWallet } from '@gimmixorg/use-wallet';
import WalletConnectProvider from '@walletconnect/web3-provider';
import useSignature from '@app/features/useSignature';
import Router from 'next/router';

const IndexPage = () => {
  const { connect, account } = useWallet();
  const { promptSignature } = useSignature();
  const verifyAndJoin = async () => {
    const signature = await promptSignature();
    Router.push(`/api/verify?account=${account}&signature=${signature}`);
  };
  return (
    <>
      <h1>Divine Roles</h1>
      <div className="message">You must have Divine Robes to enter.</div>
      {!account ? (
        <>
          <button
            onClick={() =>
              connect({
                providerOptions: {
                  walletconnect: {
                    package: WalletConnectProvider,
                    options: {
                      infuraId: 'b95f6330bfdd4f5d8960db9d1d3da676'
                    }
                  }
                },
                theme: {
                  background: 'black',
                  main: '#fff',
                  secondary: '#fff',
                  border: 'black',
                  hover: '#111'
                }
              })
            }
          >
            Connect Wallet
          </button>
          <a href="https://robes.market/">Buy Divine Robes at robes.market →</a>
        </>
      ) : (
        <button onClick={verifyAndJoin}>Verify your Divine Role</button>
      )}
      <style jsx global>{`
        .walletconnect-qrcode__base {
          background-color: black !important;
        }
        .walletconnect-modal__base {
          padding: 20px 0 !important;
          background-color: transparent !important;
          box-shadow: none !important;
        }
        .walletconnect-modal__mobile__toggle_selector {
          border-radius: 0 !important;
        }
        .walletconnect-qrcode__text {
          margin-top: 30px !important;
          font-family: serif !important;
          font-size: 18px !important;
          font-weight: normal !important;
          color: white !important;
          opacity: 1 !important;
        }
        .walletconnect-modal__footer a {
          color: white !important;
        }
        .walletconnect-modal__mobile__toggle {
          width: 100% !important;
          background-color: black !important;
        }
        .walletconnect-modal__mobile__toggle a {
          font-size: 18px !important;
        }
        .walletconnect-modal__mobile__toggle_selector {
          background-color: #222 !important;
        }
        .walletconnect-modal__base__row__h3 {
          color: white;
        }
      `}</style>
    </>
  );
};

export default IndexPage;
