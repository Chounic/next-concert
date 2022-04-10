import { useRouter } from 'next/router';
import React, { ReactElement, useCallback } from 'react';
import ConcertImage from '../components/ConcertImage';
import Layout from '../components/Layout';
import { useSpotifyContext } from '../context/SpotifyProvider';
import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link';
import Image from 'next/image';
import SvgAngleCarreGauche from '../images/svg/AngleCarreGauche';
import SvgAngleCarreDroit from '../images/svg/AngleCarreDroit';
import { cities } from '../components/content';



export default function Search(props: any) {

  const [emblaRefEvents, emblaApiEvents] = useEmblaCarousel({ slidesToScroll: 4 })


  const scrollPrevEvents = useCallback(() => {
    if (emblaApiEvents) emblaApiEvents.scrollPrev()
  }, [emblaApiEvents])

  const scrollNextEvents = useCallback(() => {
    if (emblaApiEvents) emblaApiEvents.scrollNext()
  }, [emblaApiEvents])


  return (
    <div>

      <div className='text-3xl  pt-16 pb-8 pl-28'>Les prochaines dates de concerts à {props.pickedCity}</div>

      <div className='overflow-hidden group relative'>
        <div className="" ref={emblaRefEvents}>

          <div className="flex box-border divide-x-2 h-[500px] ">
            {props.events.map((item: any, index: any) => {
              return (
                <Link
                  key={index}
                  href={{
                    // pathname: '/Home',
                    // query: { token: props.secrets.spotify.bearerToken },
                  }}
                  passHref
                >
                  <div className='flex-[0_0_350px] p-5 bg-white border-zinc-200 transition ease-in-out delay-75 duration-100 hover:scale-110 border-y-2 first:border-l-2 last:border-r-2 ...' >
                    <div className=' h-[200px] relative' >
                      {item.images[0].url && <Image src={item.images[0].url} alt="artist photo" layout='fill' objectFit='inherit' />}
                    </div>
                    <div className='p-5'>
                      <p className='mb-5 mt-2'>{item.name}</p>
                      
                      <p className='mb-1'>{item._embedded.venues[0].name} à {item._embedded.venues[0].city.name}</p>
                      <p>{item.dates.start.localDate} à {item.dates.start.localTime}</p>
                      {item.priceRanges ? <p>{item.priceRanges[0].min ?? 'no'}</p> : <p>No Price Info</p>}
                      <p>{item.classifications[0].segment.name}</p>

                    </div>
                  </div>
                </Link>
              )
            })
            }
          </div>
        </div>
        <button className="absolute w-10 h-10 bottom-56 opacity-30 transition ease-in-out delay-100 duration-150 group-hover:opacity-70 left-0" onClick={scrollPrevEvents}>
          <SvgAngleCarreGauche />
        </button>
        <button className="absolute w-10 h-10 bottom-56 opacity-30 transition ease-in-out delay-100 duration-150 group-hover:opacity-70 right-0" onClick={scrollNextEvents}>
          <SvgAngleCarreDroit />
        </button>
      </div>

    </div>
  );
};

export async function getServerSideProps({ query }) {
console.log("🚀 ~ file: Search.tsx ~ line 81 ~ getServerSideProps ~ query", query)




const dmaId = cities.indexOf(query.city) + 212 
console.log("🚀 ~ file: Search.tsx ~ line 87 ~ getServerSideProps ~ dmaId", dmaId)

  const eventsRes = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.ACCESS_TOKEN}&classificationName=[Music]&countryCode=US&dmaId=${dmaId}&size=200`);
  const eventsJsonRes = await eventsRes.json();
  const events = eventsJsonRes._embedded.events.filter((item, index, self) => {
    return index === self.findIndex((t) => (
      t.name === item.name
    ))
  });

  return {
    props: {
      events, 
      pickedCity: query.city
    }
  }

}

Search.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}