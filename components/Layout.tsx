import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({children}: any) => {
    return (
<>
<Navbar />
<main className='container bg-neutral-100 font-myfont'>{children}</main>
<Footer/>
</>
    );
};

export default Layout;