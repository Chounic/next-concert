import Image from 'next/image';
import React, { useState } from 'react';
import SvgLocation from '../images/svg/Location';
import logoImage from '../images/svg/logo.png';
import SvgUtilisateur from '../images/svg/Utilisateur';
import backgroundHeaderImage from '../images/svg/concert-header-image3.jpg';
import SvgSearch from '../images/svg/Search';
import { useRouter } from 'next/router';
import { cities } from './content';

const Navbar = () => {

    const [city, setCity] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);

    
    const searchCity = (e: any) => {
        const userInput = e.target.value;

        const suggestions = cities.filter(item => item.toLowerCase().indexOf(userInput.toLowerCase()) > -1)

        setCity(e.target.value);
        setFilteredSuggestions(suggestions);
        setActiveSuggestionIndex(0);
        setShowSuggestions(true);
    } 

    const onKeyDown = (event:any) => {
        if (event.keyCode === 40 && activeSuggestionIndex < (filteredSuggestions.length-1)) {
            setActiveSuggestionIndex((prev) => prev + 1);
        }
        if (event.keyCode === 38 && activeSuggestionIndex > 0) {
            setActiveSuggestionIndex((prevASI) => prevASI - 1);
        }

        if (event.keyCode === 13) {
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


    const onClick = (e: any) => {
        setFilteredSuggestions([]);
        setCity(e.target.innerText);
        setActiveSuggestionIndex(0);
        setShowSuggestions(false);
    };

    const handleSubmit = (e:any) => {
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



    return (
        <>
            <nav className='grid grid-cols-12 md:px-32 bg-orange-50 items-center font-myfont '>
                <div className='flex col-span-4 ml-5'>
                    <button className='w-20 h-20 flex justify-center items-center cursor-pointer' onClick={backToHome} >
                        <Image src={logoImage} alt="artist photo" layout='fixed' width={60} height={60} className='self-auto'/>
                    </button>
                    <p className='text-2xl block self-center text-zinc-800'>Next Concerts</p>
                </div>

                <ul className='flex px-6 gap-x-4 col-span-8 justify-self-end mr-2'>
                    <li className='group py-2 xl:px-2 2xl:px-6 rounded-md 2xl:text-lg text-zinc-800 ease-in duration-200 hover:bg-slate-900 hover:text-zinc-100 cursor-pointer'>
                        <a className='inline-block ease-in duration-300 group-hover:-translate-y-1.5'>Menu 1</a>
                    </li>
                    <li className='group py-2 xl:px-2 2xl:px-6 rounded-md 2xl:text-lg text-zinc-800 ease-in duration-200 hover:bg-slate-900 hover:text-zinc-100 cursor-pointer'>
                        <a className='inline-block ease-in duration-300 group-hover:-translate-y-1.5'>Menu 2</a>
                    </li>
                    <li className='group py-2 xl:px-2 2xl:px-6 rounded-md 2xl:text-lg text-zinc-800 ease-in duration-200 hover:bg-slate-900 hover:text-zinc-100 cursor-pointer'>
                        <a className='inline-block ease-in duration-300 group-hover:-translate-y-1.5'>Menu 3</a>
                    </li>
                    <li className='group py-2 xl:px-2 2xl:px-6 rounded-md 2xl:text-lg text-zinc-800 ease-in duration-200 hover:bg-slate-900 hover:text-zinc-100 cursor-pointer'>
                        <a className='inline-block ease-in duration-300 group-hover:-translate-y-1.5'>Menu 4</a>
                    </li>
                    <SvgUtilisateur />
                </ul>
            </nav>
            <div className=' w-10/12 h-1 bg-neutral-900 mx-auto'></div>
            <div className='relative h-96 pt-20 brightness-75 grayscale-[30%] saturate-50 font-myfont2'>
                <Image src={backgroundHeaderImage} alt="" layout='fill' objectFit='cover' />
                <div className='flex shadow-2xl shadow-slate-700 backdrop-brightness-75 backdrop-blur-sm rounded-xl md:w-11/12 md:mx-auto lg:w-2/3 lg:ml-24 xl:ml-52 p-4 2xl:w-3/5 2xl:max-w-[950px] h-36'>
                    <p className='inline-block my-auto text-red-50 text-sm md:text-base  xl:text-lg 2xl:text-xl w-1/3 md:w-1/2 lg:w-2/5 2xl:w-1/2 pr-8'>Tous les concerts à venir, partout aux US, quelque soit le style. Ne ratez aucun évènement avec vos artistes préférés.</p>
                    <form onSubmit={handleSubmit} className='static md:w-1/3 lg:w-80 xl:w-96'>

                        <input type="search" value={city} onChange={searchCity} onKeyDown={onKeyDown} className="form-input align-middle text-xl h-12 pl-6 mt-9 md:w-full rounded-full placeholder:italic placeholder:text-xl placeholder:text-neutral-400" placeholder='Choisis une ville'></input>

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

                        <button className="absolute group bottom-10 right-3 sm:right-20 md:right-16 lg:right-5 xl:right-16 2xl:right-4 top-14 w-14 h-10 bg-gray-300 rounded-md block content-center hover:bg-gray-400 active:bg-gray-500" type="submit">
                            <SvgSearch className='transition ease-in-out delay-75 group-active:duration-100 group-active:translate-y-1 m-auto' />
                        </button>

                    </form>
                </div>
            </div>
        </>
    );
};

export default Navbar;