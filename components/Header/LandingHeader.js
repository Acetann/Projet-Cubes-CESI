import React from 'react';
import {View, Image} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';

import { image } from '../../assets';
import { lightColors } from '../../config/colors/colors';

const LandingHeader = () => {
  return (
    <View
      style={{
        height: 220,
        backgroundColor: lightColors.white,
      }}>
      <Image
        style={{
          marginTop: responsiveWidth(4),
          width: '100%',
          height: '105%',
          position: 'absolute',
        }}
        source={{uri: image.imageHome}}
      />
    </View>
  );
};

export default LandingHeader;