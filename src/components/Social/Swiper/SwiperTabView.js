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
import { Colors } from '../../../../config/colors/colors';
import { mainStyle } from '../../../../styles/styles';

const width = Dimensions.get('window').width;

const SwiperTabView = ({
  routes,
  content,
  onChangeTab,
  startingIndex,
  customButtons,
}) => {
  const [pageIndex, setPageIndex] = useState(startingIndex);

  const swiper = useRef();

  useEffect(() => {
    if (startingIndex !== undefined) {
        onTabClicked(startingIndex);
    }
  }, [startingIndex]);

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
    <View style={{flex: 1}}>
        {customButtons(routes, pageIndex, i => onTabClicked(i))}
      <ScrollView
        ref={swiper}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={handlePageChange}
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
            elevation: 1,
            justifyContent: 'center',
          }
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {routes.map((r, i) => {
            return (
              <TouchableOpacity
                key={i}
                activeOpacity={1}
                style={{
                    width:'50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height:responsiveHeight(5),
                    backgroundColor: Colors.white,
                    borderColor: Colors.blue,
                    borderBottomWidth: index === i ? 2 : 0,
                  }}
                onPress={() => tabClicked(i)}>
                <Text
                  allowFontScaling={false}
                  style={[
                    {
                      textAlign: 'center',
                      color:Colors.blue,
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
