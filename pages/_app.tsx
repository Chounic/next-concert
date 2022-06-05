import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { NextPage } from 'next'
import { ReactElement, ReactNode, useEffect, useState } from 'react'
import { getSecrets } from '@netlify/functions'
import { SpotifyProvider } from '../context/SpotifyProvider'
import { QueryClient, QueryClientProvider } from 'react-query'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const queryClient = new QueryClient();


export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {


  const getLayout = Component.getLayout ?? ((page) => page)


  return (
    <QueryClientProvider client={queryClient}>
      <SpotifyProvider value={'hello'}>
        {getLayout(<Component {...pageProps} />)}
      </SpotifyProvider>
    </QueryClientProvider>

  )

}

