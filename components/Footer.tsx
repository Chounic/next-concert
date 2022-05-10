import React from 'react';
import SvgFacebook from '../images/svg/Facebook';
import SvgInstagram from '../images/svg/Instagram';
import SvgTwitter from '../images/svg/Twitter';
import SvgYoutube from '../images/svg/Youtube';

const Footer = () => {
    return (
        <div className=' bg-orange-50 flex flex-wrap mt-10 px-4 xl:px-20 xl:gap-10 2xl:gap-40 pt-10 pb-28 text-4xl justify-center items-center'>
            <div className='w-1/2 sm:w-1/3 md:w-52 my-10 '>
                <h2 className='text-xl 2xl:text-2xl uppercase font-semibold'>À Propos</h2>
                <p className=' text-sm 2xl:text-base'>Conditions générales de ventes</p>
                <p className=' text-sm 2xl:text-base'>Données personnelles</p>
                <p className=' text-sm 2xl:text-base'>Mentions légales</p>
                <p className=' text-sm 2xl:text-base'>Cookies - Paramétrer</p>
            </div>
            <div className='w-1/2 sm:w-1/3 md:w-80 md:mx-10 2xl:w-96 my-10 '>
                <p className='text-xs 2xl:text-sm text-center'>Lorem ipsum dolor sit amet. In galisum ipsam et corrupti nobis et reiciendis odit aut quidem maxime et rerum repellat aut cumque excepturi et voluptates placeat? Ad inventore quidem aut animi maxime eum nihil labore et exercitationem velit ut beatae explicabo ut blanditiis reprehenderit.</p>
            </div>
            <div className='2xl:w-96 '>
                <h2 className='text-center pb-5 uppercase'>Suivez-nous</h2>
                <div className='flex justify-center gap-8'>
                    <SvgFacebook />
                    <SvgTwitter />
                    <SvgInstagram />
                    <SvgYoutube />
                </div>
            </div>
        </div>
    );
};

export default Footer;