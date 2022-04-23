import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

declare global {
  interface Window {
    ethereum: any;
  }
}


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Maram</title>
      </Head>
      <Component clasName={"bg-slate-400"} {...pageProps} />
    </>
)}

export default MyApp
