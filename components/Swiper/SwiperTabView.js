import React, {useState, useRef, useEffect} from 'react';
import {
    Animated,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { lightColors } from '../../config/colors/colors';
import sleep from '../../config/sleep';
import { mainStyle } from '../../styles/styles';

const width = Dimensions.get('window').width;

const SwiperTabView = ({
  routes,
  content,
  onChangeTab,
  startingIndex,
  noPadding,
  customButtons,
}) => {
  const [pageIndex, setPageIndex] = useState(startingIndex);

  const swiper = useRef();

  useEffect(() => {
    if (startingIndex !== undefined) {
      sleep(100).then(r => {
        onTabClicked(startingIndex);
      });
    }
  }, [startingIndex]);

  useEffect(() => {
    if (!startingIndex) {
      setTimeout(() => {
        swiper.current.scrollTo({
          x: width * 0.3,
          y: 0,
          animated: true,
        });
        setTimeout(() => {
          swiper.current.scrollTo({
            x: 0,
            y: 0,
            animated: true,
          });
          setTimeout(() => {
            swiper.current.scrollTo({
              x: width * 0.15,
              y: 0,
              animated: true,
            });
            setTimeout(() => {
              swiper.current.scrollTo({
                x: 0,
                y: 0,
                animated: true,
              });
            }, 150);
          }, 150);
        }, 150);
      }, 5000);
    }
  }, []);

  const onTabClicked = flag => {
    swiper.current.scrollTo({x: width * flag, y: 0, animated: true});
    if (onChangeTab) {
      onChangeTab(flag);
    }
    setPageIndex(flag);
  };

  const handlePageChange = e => {
    const offset = e.nativeEvent.contentOffset;

    if (offset) {
      const page = Math.round(offset.x / width);

      if (pageIndex !== page) {
        if (onChangeTab) {
          onChangeTab(page);
        }
        setPageIndex(page);
      }
    }
  };

  return (
    <View style={{flex: 1, backgroundColor:lightColors.white}}>
        {customButtons(routes, pageIndex, i => onTabClicked(i))}
      <ScrollView
        ref={swiper}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={handlePageChange}
        style={{
          paddingTop: responsiveHeight(noPadding ? 0 : 2),
        }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{width: `${routes.length * 100}%`}}>
        {content.map((item, index) => (
          <View key={index} style={mainStyle.container}>
            {item}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export const SwiperTabBar = ({
    routes,
    index,
    tabClicked,
    translateY = null,
  }) => {
    return (
      <Animated.View
        style={[
          {
            transform: [{translateY: translateY ? translateY : 0}],
            width: '100%',
            marginTop: responsiveWidth(1.5),
            alignItems: 'center',
            elevation: 1,
            justifyContent: 'center',
          }
        ]}>
        <View
          style={{
            backgroundColor: lightColors.lightWhite,
            padding: responsiveWidth(1),
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: lightColors.blue,
          }}>
          {routes.map((r, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={{
                    padding: responsiveWidth(1.5),
                    paddingHorizontal: responsiveWidth(5),
                    borderRadius: 8,
                    backgroundColor: index === i ? lightColors.blue : lightColors.lightWhite,
                  }}
                onPress={() => tabClicked(i)}>
                <Text
                  allowFontScaling={false}
                  style={[
                    {
                      textAlign: 'center',
                      color: index === i ? lightColors.white : lightColors.blue,
                    },
                  ]}>
                  {r.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Animated.View>
    );
  };

export default SwiperTabView;
