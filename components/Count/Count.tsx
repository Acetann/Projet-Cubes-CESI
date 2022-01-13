import React, { useEffect, useState } from 'react';
import {Text, View } from 'react-native';
import { mainStyle } from '../../styles/styles';
import { Icon } from 'react-native-elements';

interface CountProps {}

export const Count: React.FunctionComponent<CountProps> = () => {

    const [count, setCount] = useState<number>();
    const [, setLoading] = useState(false);
    const onCountMore = () => {
        setCount((count || 0) + 1)
    }

    const onCountLess = () => {
        if(count || 0 >= 1){
        setCount((count || 0) - 1)
        }else{
            count === 0
        }
    }

    useEffect(() => {
        setLoading(true);
        const fakeApiCall = async () => {
            setLoading(false);
        };
        fakeApiCall();
        return () => {
            console.log("test Api UseEffect")
        };
    }, [count]);

    return (
    <View style={mainStyle.container}>
        <Icon onPress={onCountMore} name='add-circle-outline' />
        <Text>{count}</Text>
        <Icon onPress={onCountLess} name='remove-circle-outline' />
    </View>
    )
}