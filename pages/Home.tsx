import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import ConcertImage from '../components/ConcertImage';
import Layout from '../components/Layout';
import { useSpotifyContext } from '../context/SpotifyProvider';

export default function Home ({data, pageProps}: any) {
  
  const token = useSpotifyContext();

  
    return (
        <div></div>
    );
};

export async function getServerSideProps({query}) {
  const res = await fetch(`https://api.spotify.com/v1/search?type=artist&q=nas`, {
                headers: {
                  Authorization: `Bearer ${query.token}`, 
                }
              });     
  const data = await res.json();
  return { props: {  } }
  
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}