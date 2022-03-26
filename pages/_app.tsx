import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { NextPage } from 'next'
import { ReactElement, ReactNode, useEffect, useState } from 'react'
import { getSecrets } from '@netlify/functions'
import { SpotifyProvider } from '../context/SpotifyProvider'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps}: AppPropsWithLayout) {


  const getLayout = Component.getLayout ?? ((page) => page)


  return (
  
<SpotifyProvider value={'hello'}>
  {getLayout(<Component {...pageProps} />)}
</SpotifyProvider>

  )

}

