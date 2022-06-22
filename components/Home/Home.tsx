import React from 'react';
import { AllPublicationContent } from '../Publications/components/AllPublicationContent';

interface HomeProps {}

export const Home: React.FunctionComponent<HomeProps> = () => {

    return (
      <AllPublicationContent isPublicationHome={false} />
    )
}