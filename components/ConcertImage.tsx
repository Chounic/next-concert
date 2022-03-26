import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useSpotifyContext } from '../context/SpotifyProvider';

export default function ConcertImage ({data, token}: any) {
console.log("🚀 ~ file: ConcertImage.tsx ~ line 5 ~ ConcertImage ~ token", token)
console.log("🚀 ~ file: concertImage.tsx ~ line 5 ~ ConcertImage ~ data.entities[0]", data.title ?? '' )

  const [artistImageUrl, setArtistImageUrl] = useState('');


    useEffect (() => {
      console.log('image oui oui');
      ( async () => {
          if (data.entities[0]) {
          const res = await fetch(`https://api.spotify.com/v1/search?type=artist&q=${data.title ?? ''}`, {
              headers: {
                Authorization: `Bearer ${token}`, 
              }
            });
          console.log("🚀 ~ file: ConcertImage.tsx ~ line 17 ~ res", res);
          const response = await res.json();
          if (response.artists.items[0] && response.artists.items[0].images[0]) {

            console.log("🚀 ~ file: ConcertImage.tsx ~ line 20 ~ response", response.artists.items[0].images[0].url)
            setArtistImageUrl(response.artists.items[0].images[0].url);
          }
          // console.log("🚀 ~ file: concertImage.tsx ~ line 16 ~ res", res.body)
          }
        })();
    }, [data.entities, token])
    

    return (
        <div className='w-50 h-40 bg-rose-600' >
            {artistImageUrl && <Image src={artistImageUrl} alt="artist photo" width={200} height={200} />}
        </div>
    );
};



