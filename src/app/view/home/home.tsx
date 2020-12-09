import { Actions } from 'react-native-router-flux';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Home() {
    const onPressLearnMore = () => {
        Actions.news()
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Open up App.tsx to start working on your app!</Text>
            <Button
                onPress={onPressLearnMore}
                title="Learn More"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white'
    }
});
