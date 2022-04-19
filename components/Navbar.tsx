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

    
    const searchCity = (e) => {
        const userInput = e.target.value;

        const suggestions = cities.filter(item => item.toLowerCase().indexOf(userInput.toLowerCase()) > -1)

        setCity(e.target.value);
        setFilteredSuggestions(suggestions);
        setActiveSuggestionIndex(0);
        setShowSuggestions(true);
    } 

    const onKeyDown = (event:any) => {
    console.log("🚀 ~ file: Navbar.tsx ~ line 31 ~ onKeyDown ~ event", event.keyCode)
    console.log("🚀 ~ file: Navbar.tsx ~ line 34 ~ onKeyDown ~ key.keyCode", event.keyCode)
        if (event.keyCode === 40 && activeSuggestionIndex < (filteredSuggestions.length-1)) {
            console.log('keydown')
            setActiveSuggestionIndex((prev) => prev + 1);
        }
        if (event.keyCode === 38 && activeSuggestionIndex > 0) {
            console.log('keyup')
            setActiveSuggestionIndex((prevASI) => prevASI - 1);
        }

        if (event.keyCode === 13) {
            event.preventDefault();
            if (filteredSuggestions[0] && city) {
                console.log("🚀 ~ file: Navbar.tsx ~ line 45 ~ onKeyDown ~ filteredSuggestions", filteredSuggestions)
                console.log('enter')
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


    const onClick = (e) => {
        setFilteredSuggestions([]);
        setCity(e.target.innerText);
        setActiveSuggestionIndex(0);
        setShowSuggestions(false);
    };

    const handleSubmit = (e:any) => {
        e.preventDefault();
        console.log("🚀 ~ file: Navbar.tsx ~ line 58 ~ handleSubmit ~ e", e.keyCode)
        
        
        city && router.push({
            pathname: '/Search',
            query: { city: city }
        })
    }

    const router = useRouter()



    return (
        <>
            <div className='grid grid-cols-12 px-32 bg-slate-800 items-center'>
                <div className='flex col-span-4 '>
                    <div className='w-32 h-20' >
                        <Image src={logoImage} alt="artist photo" width={80} height={80} />
                    </div>
                    <p className='text-4xl block self-center text-zinc-100 pl-2 '>Next Concerts</p>
                </div>
                <div className='flex px-6 gap-x-4 col-span-7 '>
                    <p className='py-2 px-6 rounded-md text-lg text-zinc-300 hover:bg-slate-900 hover:text-zinc-100 cursor-pointer'>Menu 1</p>
                    <p className='py-2 px-6 rounded-md text-lg text-zinc-300 hover:bg-slate-900 hover:text-zinc-100 '>Menu 2</p>
                    <p className='py-2 px-6 rounded-md text-lg text-zinc-300 hover:bg-slate-900 hover:text-zinc-100 '>Menu 3</p>
                    <p className='py-2 px-6 rounded-md text-lg text-zinc-300 hover:bg-slate-900 hover:text-zinc-100 '>Menu 4</p>
                </div>
                <div className='bg-red-400 border-x-emerald-300 border-4 justify-self-end'>
                    <SvgUtilisateur />
                </div>
            </div>
            <div className='relative h-96 pt-20 brightness-75 grayscale-[30%] saturate-50'>
                <Image src={backgroundHeaderImage} alt="" layout='fill' objectFit='cover' />
                <div className='flex shadow-2xl shadow-slate-700 backdrop-brightness-75 backdrop-blur-sm rounded-xl ml-52 p-4 w-3/5 max-h-72'>
                    <p className=' text-red-50 text-2xl w-1/2 pr-8'>Tous les concerts, partout aux US, quelque soit le style. Ne ratez pas le prochain évènement dont tout le monde parlera.</p>
                    <form onSubmit={handleSubmit} className='static'>

                        <input type="search" value={city} onChange={searchCity} onKeyDown={onKeyDown} className="form-input text-xl h-12  px-6 py-3 w-96 rounded-full placeholder:italic placeholder:text-xl placeholder:text-neutral-400" placeholder='Choisis une ville aux stasunis'></input>

                        {showSuggestions && city && (

                        <div className="overflow-auto h-5/6 w-11/12  mx-auto">

                        <ul className="  bg-slate-200 overscroll-contain rounded-md divide-y-2 divide-dashed divide-zinc-600 pl-1">
                            {filteredSuggestions.map((suggestion, index) => {
                                let className;
                                // Flag the active suggestion with a class
                                if (index === activeSuggestionIndex) {
                                    console.log("🚀 ~ file: Navbar.tsx ~ line 98 ~ {filteredSuggestions.map ~ activeSuggestionIndex", activeSuggestionIndex)
                                    // console.log('keydown press', suggestion)
                                }
                                return (
                                    <li className={`block hover:bg-gray-900 hover:text-red-100 last:border-b-2 last:border-zinc-600 last:border-dashed ${index === activeSuggestionIndex && 'bg-gray-700 text-red-100'}`} key={index} onClick={onClick}>
                                        {suggestion}
                                    </li>
                                );
                            })}
                        </ul>
                        </div>
                        )}

                        <button className="absolute group bottom-10 right-0 top-18 w-14 h-10 bg-gray-300 rounded-md block  content-center hover:bg-gray-400 active:bg-gray-500" type="submit">
                            <SvgSearch className='transition ease-in-out delay-75 group-active:duration-100 group-active:translate-y-1 m-auto' />
                        </button>

                    </form>
                </div>
            </div>
        </>
    );
};

export default Navbar;