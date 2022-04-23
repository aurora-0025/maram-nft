import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <Component clasName={"bg-slate-400"} {...pageProps} />
    </>
)}

export default MyApp
