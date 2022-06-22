import React from 'react';
import { AllPublicationContent } from './components/AllPublicationContent';

interface AllPublicationProps {}

export const AllPublication: React.FunctionComponent<AllPublicationProps> = () => {
    
    return (
      <AllPublicationContent isPublicationHome={false} />
    )
}