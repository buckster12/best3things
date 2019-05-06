import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {ExpoLinksView} from '@expo/samples';

import {TextInput} from 'react-native';


export default class LinksScreen extends React.Component {
    static navigationOptions = {
        title: 'Yesterday things',
    };

    render() {
        return (
            <ScrollView style={styles.container}>

                {/*<TextInput*/}
                    {/*style={{height: 40, borderColor: 'gray', borderWidth: 1}}*/}
                    {/*value={''}*/}
                {/*/>*/}

                {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
                <ExpoLinksView/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});
