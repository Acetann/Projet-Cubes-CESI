import React from 'react';
import { Text } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { AllPublicationContent } from '../../components/Publications/AllPublicationContent';

interface PublicationProps {}

export const Publication: React.FunctionComponent<PublicationProps> = () => {

    return (
        <>
            <Text style={{fontSize:18, marginHorizontal:responsiveWidth(5), marginTop: responsiveWidth(5)}}>{'Mes publications'}</Text>
            <AllPublicationContent isHome={false} />
        </>
    )
}
