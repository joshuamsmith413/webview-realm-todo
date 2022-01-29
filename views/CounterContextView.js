import React from 'react';
import { View, Text, Button } from 'react-native';
import { useCounter } from '../providers/CounterProvider';


export default function CounterContextView() {
    const { count, increment, decrement } = useCounter();

    return (
        <View>
            <Text>number of clicks: {count}</Text>
            <Button
                title="+"
                onPress={increment}
            />
            <Button
                title="-"
                onPress={decrement}
            />
        </View>
    )
}