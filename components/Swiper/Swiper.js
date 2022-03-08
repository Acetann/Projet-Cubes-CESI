import React, {useState} from 'react';
import {View, Animated} from 'react-native';

import { Create } from '../Create/Create';
import { Login } from '../Login/Login';
import SwiperTabView, { SwiperTabBar } from './SwiperTabView';

const Swiper = () => {

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
            noPadding={true}
            routes={[{title: "S'inscrire"}, {title: "Se connecter"}]}
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
              <Create />,
              <Login />,
            ]}
          />
        </View>
  );
};

export default Swiper;
