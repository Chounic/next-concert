import { useRouter } from 'next/router';
import React, { ReactElement, useCallback } from 'react';
import Layout from '../components/Layout';
import { useSpotifyContext } from '../context/SpotifyProvider';
import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link';
import Image from 'next/image';
import SvgAngleCarreGauche from '../images/svg/AngleCarreGauche';
import SvgAngleCarreDroit from '../images/svg/AngleCarreDroit';
import { cities } from '../components/content';
import calendar from '../images/svg/calendar.png';
import localisation from '../images/svg/localisation.png';
import punaise from '../images/svg/punaise.png';



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
      
      { !props.errorCode && (
      <div className='overflow-hidden group relative'>
        <div className="" ref={emblaRefEvents}>

          <div className="flex box-border divide-x-2 h-[500px] ">
          {props.events.map((item: any, index: any) => {
              const itemPriceString = item.priceRanges ? item.priceRanges[0].min.toFixed(2).toString() : null;
              return (

                <div key={index} className='flex-[0_0_350px] flex flex-col p-5 border-zinc-200 transition ease-in-out delay-75 duration-100 hover:scale-110 border-y-2 first:border-l-2 last:border-r-2 ...' >
                  <div className=' h-[200px] relative' >
                    {item.images[0].url && <Image priority={true} src={item.images[0].url} alt="artist photo" layout='fill' objectFit='inherit' />}
                  </div>
                  <div className='p-1 grow flex flex-col'>

                    <p className='h-1/4 mt-5 mb-5 overflow-hidden'>{item.name.toUpperCase()}</p>
                    <div className='h-1/3 mb-5'>
                      <div className='flex h-2/3'>
                        <div className=''>
                          <Image src={localisation} alt="localisation icon" />
                        </div>
                        <div className='w-11/12 '>

                          <p className='mb-1 ml-2 text-sm overflow-hidden pl-0'>Hello  {item._embedded.venues[0].name} <span className='flex-nowrap inline-block'>à {item._embedded.venues[0].city.name}</span></p>
                        </div>

                      </div>
                      <div className='flex h-1/3'>
                        <div>
                          <Image src={calendar} alt="calendar icon" />
                        </div>
                        <p className='mb-1 ml-2 text-sm'>{`le ${item.dates.start.localDate}`}{item.dates.start.localTime ? ` à ${item.dates.start.localTime}` : null}</p>

                      </div>
                    </div>
                    <div className='flex justify-between'>

                      {item.priceRanges ? <p>À partir de <span className='text-3xl text-red-600 font-semibold'>{Math.floor(item.priceRanges[0].min)}<span className='text-xl align-top font-medium'>{itemPriceString.substring(itemPriceString.indexOf('.')).replace('.', '€')}</span></span></p> : <p className='italic inline-block align-bottom'>Tarif non communiqué</p>}
                      <button className=' bg-yellow-500 rounded w-28 h-12 mr-1 text-white hover:bg-yellow-300 active:bg-yellow-500' onClick={(e) => e.preventDefault()}>
                        <Image src={punaise} alt="calendar icon" />                            Réserver
                      </button>
                    </div>

                  </div>
                </div>
              )
            })
            }
            {/* { props.errorCode && ( 
              <div><p>No results</p></div>
            )} */}
          </div>
        </div>
        <button className="absolute w-10 h-10 bottom-56 opacity-30 transition ease-in-out delay-100 duration-150 group-hover:opacity-70 left-0" onClick={scrollPrevEvents}>
          <SvgAngleCarreGauche />
        </button>
        <button className="absolute w-10 h-10 bottom-56 opacity-30 transition ease-in-out delay-100 duration-150 group-hover:opacity-70 right-0" onClick={scrollNextEvents}>
          <SvgAngleCarreDroit />
        </button>
      </div>
      )}
      { props.errorCode && (
        <div><p>No results</p></div>
      )}
    </div>
  );
};

export async function getServerSideProps({ query }: any) {




const dmaId = cities.indexOf(query.city) > -1 ? cities.indexOf(query.city) + 212 : null

  const eventsRes = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.ACCESS_TOKEN}&classificationName=[Music]&countryCode=US&dmaId=${dmaId}&size=200`);
  const errorCode = eventsRes.ok ? false : eventsRes.status;
  const eventsJsonRes = await eventsRes.json();
  const events = !errorCode ? eventsJsonRes._embedded.events.filter((item: any, index: number, self: any) => {
    return index === self.findIndex((t: any) => (
      t.name === item.name
    ))
  }) : null;

  return {
    props: {
      events, 
      pickedCity: query.city, 
      errorCode
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