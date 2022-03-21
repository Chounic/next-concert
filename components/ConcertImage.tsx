import React, { useEffect } from 'react';

const ConcertImage = ({data}) => {

    // useEffect (() => {
    //     console.log('limage!!!');
    //     const res = await fetch(`https://api.spotify.com/v1/search?type=artist&q=${data.entities.name}`)
    
    // })
    
    console.log("🚀 ~ file: concertImage.tsx ~ line 8 ~ //useEffect ~ item", data)

    return (
        <div>
            <p>testttt</p>
        </div>
    );
};

export default ConcertImage;