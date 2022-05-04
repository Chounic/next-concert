import { getSecrets } from '@netlify/functions'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ReactElement, useCallback, useState } from 'react'
import Layout from '../components/Layout'
import { SpotifyContext } from '../context/SpotifyProvider'
import styles from '../styles/Home.module.css'
import useEmblaCarousel from 'embla-carousel-react'
import SvgAngleCarreGauche from '../images/svg/AngleCarreGauche'
import SvgAngleCarreDroit from '../images/svg/AngleCarreDroit'
import anglePetitGauche from "../images/svg/angle-petit-gauche.png"
import anglePetitDroit from "../images/svg/angle-petit-droit.png"
import calendar from '../images/svg/calendar.png';
import localisation from '../images/svg/localisation.png';
import punaise from '../images/svg/punaise.png';




export default function Index(props: any) {

  const [emblaRefAttractions, emblaApiAttractions] = useEmblaCarousel({ slidesToScroll: 7 })
  const [emblaRefEvents, emblaApiEvents] = useEmblaCarousel({ slidesToScroll: 4 })

  const scrollPrevAttractions = useCallback(() => {
    if (emblaApiAttractions) emblaApiAttractions.scrollPrev()
  }, [emblaApiAttractions])

  const scrollNextAttractions = useCallback(() => {
    if (emblaApiAttractions) emblaApiAttractions.scrollNext()
  }, [emblaApiAttractions])

  const scrollPrevEvents = useCallback(() => {
    if (emblaApiEvents) emblaApiEvents.scrollPrev()
  }, [emblaApiEvents])

  const scrollNextEvents = useCallback(() => {
    if (emblaApiEvents) emblaApiEvents.scrollNext()
  }, [emblaApiEvents])

  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <div className=' text-2xl lg:text-3xl py-8 pl-12 lg:pl-28'>Tous les artistes du moment</div>
        <div className='overflow-hidden group relative px-10'>
          <div className="overflow-hidden" ref={emblaRefAttractions}>

            <div className="flex box-border divide-x-2 h-[200px] ">
              {/* {props.attractions.map((item: any, index: any) => {
                return (

                    <div key={index} className='flex-[0_0_200px] p-2 bg-white border-zinc-200 transition ease-in-out delay-75 duration-100 hover:scale-110 border-y-2 first:border-l-2 last:border-r-2 ...' >
                      <div className=' h-[130px] relative' >
                        {item.images[0].url && <Image src={item.images[0].url} alt="artist photo" layout='fill' objectFit='cover' />}
                      </div>
                      <p className='text-center text-sm mt-2'>{item.name}</p>
                    </div>
                )
              })
              } */}
            </div>
          </div>
          <button className="absolute w-10 h-10 bottom-20 opacity-30 transition ease-in-out delay-100 duration-150 group-hover:opacity-70 left-0" onClick={scrollPrevAttractions}>
            <Image src={anglePetitGauche} alt="next button" className='transition ease-in-out active:scale-75' layout='fill' objectFit='cover' />
          </button>
          <button className="absolute w-10 h-10 bottom-20 opacity-30 transition ease-in-out delay-100 duration-150 group-hover:opacity-70 right-0" onClick={scrollNextAttractions}>
            <Image src={anglePetitDroit} alt="next button" className='transition ease-in-out active:scale-75' layout='fill' objectFit='cover' />
          </button>
        </div>


        <div className=' text-2xl lg:text-3xl pt-16 pb-8 pl-12 lg:pl-28'>Les prochaines dates de concerts à {props.pickedCity}</div>

        <div className='overflow-hidden group relative'>
          <div className="" ref={emblaRefEvents}>

            <div className="flex box-border divide-x-2 h-[500px] ">
              {props.events.map((item: any, index: any) => {
                const itemPriceString = item.priceRanges ? item.priceRanges[0].min.toFixed(2).toString() : null;
                return (
                  // <Link
                  //   key={index}
                  //   href={{
                  //     pathname: '/Home',
                  //     query: { token: props.secrets.spotify.bearerToken },
                  //   }}
                  //   passHref
                  // >
                    <div key={index} className='flex-[0_0_350px] flex flex-col p-5 border-zinc-200 transition ease-in-out delay-75 duration-100 hover:scale-110 border-y-2 first:border-l-2 last:border-r-2 ...' >
                      <div className=' h-[200px] relative' >
                        {item.images[0].url && <Image src={item.images[0].url} alt="artist photo" layout='fill' objectFit='inherit' />}
                      </div>
                      <div className='p-1 grow flex flex-col'>

                        <p className='h-1/4 mt-5 mb-5 overflow-hidden'>{item.name.toUpperCase()}</p>
                        {/* {item.entities[0] ? <p>{item.entities[0].name}</p> : '' */}
                        <div className='h-1/3 mb-5'>
                          <div className='flex h-2/3'>
                            <div className=''>
                              <Image src={localisation} alt="localisation icon"/>
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
                  // </Link>
                )
              })
              }
            </div>
          </div>
          <button className="absolute w-10 h-10 bottom-56 opacity-30 transition ease-in-out delay-100 duration-150 group-hover:opacity-70 left-0" onClick={scrollPrevEvents}>
            <SvgAngleCarreGauche className='transition ease-in-out active:scale-90' />
          </button>
          <button className="absolute w-10 h-10 bottom-56 opacity-30 transition ease-in-out delay-100 duration-150 group-hover:opacity-70 right-0" onClick={scrollNextEvents}>
            <SvgAngleCarreDroit className='transition ease-in-out active:scale-90' />
          </button>
        </div>
    </div>
  )
}

Index.getLayout = function getLayout(page: ReactElement) {

  const toktok = 'toktok';


  return (

    <Layout>
      {page}
    </Layout>

  )
}





export async function getStaticProps() {

  const secrets = await getSecrets();

  const attractionsRes = await fetch(`https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=${process.env.ACCESS_TOKEN}&classificationName=[Music]&size=40`);
  const attractionsJsonRes = await attractionsRes.json();
  // const attractions = attractionsJsonRes._embedded.attractions || null;

  const citiesId = [
    {
      name: 'New York',
      dmaId: '345'
    },
    {
      name: 'Los Angeles',
      dmaId: '324'

    },
    {
      name: 'Houston',
      dmaId: '300'

    },
    {
      name: 'Atlanta',
      dmaId: '220'

    },
    {
      name: 'Phoenix',
      dmaId: '359'

    }
  ];
  const pickedCity = citiesId[Math.floor(Math.random() * 5)];

  const eventsRes = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.ACCESS_TOKEN}&classificationName=[Music]&countryCode=US&dmaId=${pickedCity.dmaId}&size=200`);
  const eventsJsonRes = await eventsRes.json();
  const events = eventsJsonRes._embedded.events.filter((item: any, index: number, self: any) => {
    return index === self.findIndex((t: any) => (
      t.name === item.name
    ))
  });



  return {
    props: {
      secrets,
      // attractions,
      events,
      pickedCity: pickedCity.name
    }
  }
}



