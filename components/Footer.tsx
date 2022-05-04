import React from 'react';
import SvgFacebook from '../images/svg/Facebook';
import SvgInstagram from '../images/svg/Instagram';
import SvgTwitter from '../images/svg/Twitter';
import SvgYoutube from '../images/svg/Youtube';

const Footer = () => {
    return (
        <div className=' bg-orange-50 flex mt-10 h-80 px-80 pt-10 text-4xl justify-end'>
            <div className=' bg-zinc-700'>
                <h2 className=' bg-gray-800 text-center pb-5 uppercase'>Suivez-nous</h2>
                <div className='flex gap-8'>
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