import React from 'react';
import { AllPublicationContent } from '../../components/Publications/AllPublicationContent';

interface HomeProps {}

export const Home: React.FunctionComponent<HomeProps> = () => {

    return (
        <AllPublicationContent isHome/> 
    )
}