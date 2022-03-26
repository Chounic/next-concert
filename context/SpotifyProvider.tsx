import React, { createContext, useContext } from "react";


export const SpotifyContext = createContext<string>('');

export const SpotifyProvider = (props) => {
    const {value, children} = props ;
    return (
        <SpotifyContext.Provider value={value}>{children}</SpotifyContext.Provider>
    )
} 

export function useSpotifyContext() {
	return useContext(SpotifyContext);
}