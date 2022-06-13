import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
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
        {getLayout(<Component {...pageProps} />)}
    </QueryClientProvider>

  )

}

