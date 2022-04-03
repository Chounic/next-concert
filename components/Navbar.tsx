import Image from 'next/image';
import React from 'react';
import SvgLocation from '../images/svg/Location';
import logoImage from '../images/svg/logo.png';
import SvgUtilisateur from '../images/svg/Utilisateur';
import backgroundHeaderImage from '../images/svg/concert-header-image3.jpg';

const Navbar = () => {
    return (
        <>
        <div className='grid grid-cols-12 px-32 bg-slate-800 items-center' /* style={{ backgroundColor: "#f5ffa0"}} */>
            <div className='flex col-span-4 '>
                <div className='w-32 h-20' >
                    <Image src={logoImage} alt="artist photo" width={80} height={80} />
                </div>
                <p className='text-4xl block self-center text-zinc-100 pl-2 '/*  style={{ color: "#f5ffa0"}} */>Next Concerts</p>
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
        <div className='relative  bg-red-500 h-96 brightness-75 grayscale-[30%] saturate-50'>
            <Image src={backgroundHeaderImage} alt="" className=' ' layout='fill' objectFit='cover'/>
            <div className='backdrop-brightness-75 backdrop-blur-sm rounded-xl text-4xl inline-block ml-52 mt-24 p-4 w-1/2'>
            <p>Tous les meilleurs concerts sont là, partout aux US, quelque soit le style. Ne ratez pas le prochain évènement dont tout le monde parlera.</p>
            <input type="search" className="form-input px-4 py-3 w-96 rounded-full placeholder:italic placeholder:text-2xl placeholder:text-neutral-400" placeholder='Choisis une ville aux stasunis'></input>
            </div>
        </div>
        </>
    );
};

export default Navbar;