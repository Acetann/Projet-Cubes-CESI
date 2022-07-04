import React, {useState} from 'react';
import {View, Animated} from 'react-native';
import { Abonne } from '../../../screens/Social/Abonne';
import { Abonnement } from '../../../screens/Social/Abonnement';
import SwiperTabView, { SwiperTabBar } from './SwiperTabView';

const SwiperSocial = () => {

  const scrollY = new Animated.Value(0);
  const diffClampBar = Animated.diffClamp(scrollY, 0, 85);
  const translateYSwipBar = diffClampBar.interpolate({
    inputRange: [0, 85],
    outputRange: [0, -85],
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  return (
        <View
          style={{
            flex: 1,
          }}>
          <SwiperTabView
            routes={[{title: "Abonné"}, {title: "Abonnements"}]}
            startingIndex={currentIndex}
            buttonsStyle={{
              position: 'absolute',
              zIndex: 10,
              elevation: 2,
            }}
            customButtons={(routes, index, tabClicked) => (
              <SwiperTabBar
                translateY={translateYSwipBar}
                index={index}
                tabClicked={i => {
                  tabClicked(i);
                  setCurrentIndex(i)
                }}
                routes={routes}
              />
            )}
            content={[
              <Abonne />,
              <Abonnement />,
            ]}
          />
        </View>
  );
};

export default SwiperSocial;
