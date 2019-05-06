import React from 'react';
import {AsyncStorage, Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import {ExpoLinksView} from '@expo/samples';

import {TextInput} from 'react-native';
import {MonoText} from "../components/StyledText";
import AutoGrowingTextInput from "react-native-autogrow-textinput/src/AutoGrowingTextInput";


export default class LinksScreen extends React.Component {
    static navigationOptions = {
        title: 'Yesterday things',
    };

    componentDidMount() {
        // this.getAllKeys();
        this.getValueFunction();
    }

    constructor() {
        super();
        let today = new Date();
        today.setDate(today.getDate() - 1);
        let yesterday = today.toJSON().slice(0, 10);
        // console.log(yesterday);

        this.state = {
            today: yesterday,
            first: '',
            second: '',
            third: ''
        }
    }

    saveValueFunction = () => {
        if (
            this.state.first ||
            this.state.second ||
            this.state.third
        ) {
            if (this.state.first) {
                AsyncStorage.setItem(`${this.state.today}:first`, this.state.first);
            }
            if (this.state.second) {
                AsyncStorage.setItem(`${this.state.today}:second`, this.state.second);
            }
            if (this.state.third) {
                AsyncStorage.setItem(`${this.state.today}:third`, this.state.third);
            }
            alert('Data Saved');
        } else {
            alert('Please fill data');
        }
    };

    getValueFunction = () => {
        AsyncStorage.getItem(`${this.state.today}:first`).then(value =>
            this.setState({first: value})
        );
        AsyncStorage.getItem(`${this.state.today}:second`).then(value =>
            this.setState({second: value})
        );
        AsyncStorage.getItem(`${this.state.today}:third`).then(value =>
            this.setState({third: value})
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

                    <View style={styles.getStartedContainer}>

                        <View>
                            <Text>3 strikes that you've done yesterday:</Text>
                        </View>

                        <Text>Today is {this.state.today}</Text>

                        <MonoText>#1:</MonoText>
                        <AutoGrowingTextInput
                            onChangeText={(text) => this.setState({first: text})}
                            style={styles.textInput}
                            value={this.state.first}
                            placeholder={'First of all, I ...'}
                        />

                        <MonoText>#2:</MonoText>
                        <AutoGrowingTextInput
                            value={this.state.second}
                            onChangeText={(text) => this.setState({second: text})}
                            style={styles.textInput}
                            placeholder={'Secondly, I ...'}
                        />

                        <MonoText>#3:</MonoText>
                        <AutoGrowingTextInput
                            onChangeText={(text) => this.setState({third: text})}
                            style={styles.textInput}
                            value={this.state.third}
                            placeholder={'At third, I ...'}
                        />

                        <Button title={'SAVE'} onPress={this.saveValueFunction}/>

                    </View>

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 15,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#00f9df',
        color: '#000',
        borderRadius: 5,
        paddingTop: 3,
        paddingVertical: 20,
        textAlign: 'center',
        width: 100,
        alignItems: 'center',
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%',
        borderRadius: 5,
        padding: 5,
    },
    contentContainer: {
        paddingTop: 30,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
});
