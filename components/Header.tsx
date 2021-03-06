import Image from 'next/image';
import React, { FormEvent, useEffect, useState } from 'react';
import logoImage from '../images/svg/logo.png';
import SvgUtilisateur from '../images/svg/Utilisateur';
import backgroundHeaderImage from '../images/svg/concert-header-image3.jpg';
import SvgSearch from '../images/svg/Search';
import { useRouter } from 'next/router';
import { cities } from './content';
import SvgMenuBurger from '../images/svg/MenuBurger';
import { AnimatePresence, motion } from "framer-motion"
import { useMediaQuery } from '../utils/useMediaQuery';

const Header = () => {

    const [city, setCity] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    let isMobile = useMediaQuery('(max-width: 640px)')


    const searchCity = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const userInput = e.target.value;
        const suggestions = cities.filter(item => item.toLowerCase().indexOf(userInput.toLowerCase()) > -1)
        setCity(e.target.value);
        setFilteredSuggestions(suggestions);
        setActiveSuggestionIndex(0);
        setShowSuggestions(true);
    }

    const onKeyDown = (event: React.KeyboardEvent): void => {
        if (event.key === 'ArrowDown' && activeSuggestionIndex < (filteredSuggestions.length - 1)) {
            setActiveSuggestionIndex((prevASI) => prevASI + 1);
        }
        if (event.key === 'ArrowUp' && activeSuggestionIndex > 0) {
            setActiveSuggestionIndex((prevASI) => prevASI - 1);
        }

        if (event.key === 'Enter') {
            event.preventDefault();
            if (filteredSuggestions[0] && city) {
                setCity(filteredSuggestions[activeSuggestionIndex]);
                setFilteredSuggestions([]);
                setActiveSuggestionIndex(0);
                setShowSuggestions(false);
            } else {
                city.trim()[0] && router.push({
                    pathname: '/Search',
                    query: { city: city }
                })
            }
        }
    }


    const onClick = (e: React.MouseEvent<HTMLLIElement>) => {
        setFilteredSuggestions([]);
        const input = e.target as HTMLElement;
        setCity(input.innerText);
        setActiveSuggestionIndex(0);
        setShowSuggestions(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        city && router.push({
            pathname: '/Search',
            query: { city: city }
        })
    }

    const backToHome = () => {
        router.push('/');
        setCity('');
    }


    const router = useRouter()

    const variants = {
        menuFullScreen: {
            height: '100vh',
            transition: {
                duration: 0.5,
                type: "tween",
                position: 'absolute'
            }
        },
        menuNormal: {
            height: 80,
            transition: {
                duration: 0.5,
                type: "tween"
            }
        },
        visible: (i: number) => ({
            opacity: 1,
            y: 40,
            transition: {
                type: 'spring',
                delay: i * 0.3,
                bounce: 1,
                stiffness: 300
            },
        }),
        hidden: {
            opacity: 0,
        },
        exit: (i: number) => ({
            opacity: 0,
            transition: {
                delay: (3 - i) * 0.02
            }
        }),
    }



    return (
        <>
            <motion.nav animate={showMenu && isMobile ? "menuFullScreen" : "menuNormal"} variants={variants} className='grid grid-cols-12 md:px-24 lg:px-32 bg-orange-50 items-center font-myfont'>
                <button className="group peer absolute top-6 sm:static w-12 mr h-10 mx-10 bg-black rounded-md block content-center sm:hidden active:scale-105 active:bg" onClick={() => setShowMenu(!showMenu)}>
                    <SvgMenuBurger className='fill-orange-50 m-auto' />
                </button>
                <AnimatePresence>
                    {showMenu && (
                        <motion.ul className='absolute sm:hidden z-10 top-20 ml-10'>
                            {["Menu 1", "Menu 2", "Menu 3", "Menu 4"].map((item, i) => (

                                <motion.li key={i} custom={i} animate='visible' initial='hidden' exit='exit' variants={variants} className='group h-10 my-6 flex items-center active:text-zinc-700'>
                                    <motion.a className='text-lg after:absolute after:w-full after:bg-zinc-900 after:h-0.5 after:bottom-0 after:left-0 after:origin-center after:transition-transform after:duration-500 after:ease-out after:scale-x-0 hover:after:scale-x-100 hover:after:origin-center '>{item}</motion.a>
                                </motion.li>
                            ))
                            }
                        </motion.ul>
                        
                    )}
                </AnimatePresence>
                <div className='flex absolute sm:static left-7 top-0 col-span-4 ml-20 sm:ml-5'>
                    <button className='w-20 h-20 flex justify-center items-center cursor-pointer' onClick={backToHome} >
                        <Image src={logoImage} alt="artist photo" layout='fixed' width={60} height={60} className='self-auto' />
                    </button>
                    <p className='text-base mx-2 sm:mx-0 lg:text-lg 2xl:text-2xl block self-center text-zinc-800'>Next Concerts</p>
                </div>

                <ul className='px-6 gap-x-4 col-span-8 justify-self-end mr-2 hidden sm:inline-flex'>
                    <li className='group py-2 xl:px-2 2xl:px-6 rounded-md text-sm 2xl:text-base text-zinc-800 ease-in duration-200 hover:bg-slate-900 hover:text-zinc-100 cursor-pointer'>
                        <a className='inline-block ease-in duration-300 group-hover:-translate-y-1.5'>Menu 1</a>
                    </li>
                    <li className='group py-2 xl:px-2 2xl:px-6 rounded-md text-sm  2xl:text-base text-zinc-800 ease-in duration-200 hover:bg-slate-900 hover:text-zinc-100 cursor-pointer'>
                        <a className='inline-block ease-in duration-300 group-hover:-translate-y-1.5'>Menu 2</a>
                    </li>
                    <li className='group py-2 xl:px-2 2xl:px-6 rounded-md text-sm  2xl:text-base text-zinc-800 ease-in duration-200 hover:bg-slate-900 hover:text-zinc-100 cursor-pointer'>
                        <a className='inline-block ease-in duration-300 group-hover:-translate-y-1.5'>Menu 3</a>
                    </li>
                    <li className='group py-2 xl:px-2 2xl:px-6 rounded-md text-sm  2xl:text-base text-zinc-800 ease-in duration-200 hover:bg-slate-900 hover:text-zinc-100 cursor-pointer'>
                        <a className='inline-block ease-in duration-300 group-hover:-translate-y-1.5'>Menu 4</a>
                    </li>
                    <SvgUtilisateur />
                </ul>
            </motion.nav>
            <div className=' w-10/12 h-1 bg-neutral-900 mx-auto'></div>
            {!showMenu && (
                <div className='relative h-96 pt-20 brightness-75 grayscale-[30%] saturate-50 font-myfont2'>
                    <Image src={backgroundHeaderImage} alt="" layout='fill' objectFit='cover' />
                    <div className='flex shadow-2xl shadow-slate-700 backdrop-brightness-75 backdrop-blur-sm rounded-xl md:w-11/12 md:mx-auto lg:w-2/3 lg:ml-24 xl:ml-52 p-4 2xl:w-3/5 2xl:max-w-[950px] h-36'>
                        <p className='hidden sm:inline-block my-auto text-red-50 text-sm md:text-base  xl:text-lg 2xl:text-xl w-1/3 md:w-1/2 lg:w-2/5 2xl:w-1/2 pr-8'>Tous les concerts ?? venir, partout aux US, quelque soit le style. Ne ratez aucun ??v??nement avec vos artistes pr??f??r??s.</p>
                        <form onSubmit={handleSubmit} className='static md:w-1/3 lg:w-80 xl:w-96 mx-auto sm:mx-0'>

                            <input type="search" value={city} onChange={searchCity} onKeyDown={onKeyDown} className="form-input align-middle text-xl h-12 pl-6 mt-9 w-2/3 sm:w-full rounded-full placeholder:italic placeholder:text-base placeholder:text-neutral-400" placeholder='Choisis une ville'></input>

                            <button className="sm:hidden inline-block ml-3 mb-1 align-bottom w-14 h-10 bg-gray-300 rounded-md content-center hover:bg-gray-400 active:bg-gray-500" type="submit">
                                <SvgSearch className='transition ease-in-out delay-75 group-active:duration-100 group-active:translate-y-1 m-auto' />
                            </button>

                            {showSuggestions && city && (

                                <div className="h-5/6 w-11/12  mx-auto">

                                    <ul className=" max-h-60 overflow-y-scroll bg-slate-200 rounded-md divide-y-2 divide-dashed divide-zinc-600 pl-1">
                                        {filteredSuggestions.map((suggestion, index) => {
                                            let className;
                                            // Flag the active suggestion with a class

                                            return (
                                                <li className={`block hover:bg-gray-900 hover:text-red-100 last:border-b-2 last:border-zinc-600 last:border-dashed ${index === activeSuggestionIndex && 'bg-gray-700 text-red-100'}`} key={index} onClick={onClick}>
                                                    {suggestion}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}

                            <button className="hidden sm:block sm:absolute group sm:right-20 md:right-16 lg:right-5 xl:right-16 2xl:right-4 sm:top-14 w-14 h-10 bg-gray-300 rounded-md  content-center hover:bg-gray-400 active:bg-gray-500" type="submit">
                                <SvgSearch className='transition ease-in-out delay-75 group-active:duration-100 group-active:translate-y-1 m-auto' />
                            </button>

                        </form>
                    </div>
                </div>
            )
            }
        </>
    );
};

export default Header;