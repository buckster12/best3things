import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {WebBrowser} from 'expo';

import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import {AsyncStorage} from 'react-native';
import {Button} from 'react-native';
import {Alert} from 'react-native';

import {MonoText} from '../components/StyledText';

export default class HomeScreen extends React.Component {
    // static navigationOptions = {
    //     header: "Today strikes",
    // };

    static navigationOptions = {
        title: 'Today strikes',
    };

    componentDidMount() {
        this.getAllKeys();
        this.reloadValues();
    }

    getAllKeys = () => {
        let array = [];
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
                // console.log(stores);
                stores.map((result, i, store) => {
                    // get at each store's key/value so you can work with it
                    let key = store[i][0];
                    let value = store[i][1];
                });
            });
        });
    };

    reloadValues = () => {
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

    constructor() {
        super();
        let today = new Date().toJSON().slice(0, 10);

        this.state = {
            isLoading: false,
            today: today,
            first: '',
            second: '',
            third: ''
        };

        this.clearAllData = this.clearAllData.bind(this);
    }

    /*
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
    */

    async updateText(values) {
        this.setState(values);

        if (this.state.first) {
            // if (this.state.first && this.state.first.length > 0 && this.state.first.toString()) {
            this.setState({isLoading: true});
            await AsyncStorage.setItem(`${this.state.today}:first`, this.state.first.toString()).then((value) => {
                this.setState({isLoading: false})
            });
        }
        if (this.state.second) {
            // if (values.second && values.second.length > 0) {
            this.setState({isLoading: true});
            await AsyncStorage.setItem(`${this.state.today}:second`, this.state.second.toString()).then((value) => {
                this.setState({isLoading: false})
            });
        }
        if (this.state.third) {
            // if (values.third && values.third.length > 0) {
            this.setState({isLoading: true});
            await AsyncStorage.setItem(`${this.state.today}:third`, this.state.third.toString()).then((value) => {
                this.setState({isLoading: false})
            });
        }
    }

    clearAllData() {

        Alert.alert('Are you sure?', 'This action remove all your data',
            [
                {
                    text: 'No',
                    onPress: () => {
                        // console.log('Cancel Pressed')
                    },
                    style: 'cancel',
                },
                {
                    text: 'Yes', onPress: () => {

                        AsyncStorage.getAllKeys()
                            .then(keys => AsyncStorage.multiRemove(keys))
                            .then(() => {
                                alert('success');
                                this.reloadValues();
                            });

                    }
                },
            ],
            {cancelable: true},
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

                    <View style={styles.getStartedContainer}>

                        <View>
                            <Text>3 strikes that you've done today:</Text>
                        </View>

                        <Text>Today is {this.state.today}</Text>

                        <MonoText>#1:</MonoText>
                        <AutoGrowingTextInput
                            onChangeText={(text) => this.updateText({first: text})}
                            // onChangeText={(text) => this.setState({first: text})}
                            style={styles.textInput}
                            value={this.state.first}
                            placeholder={'First of all, I ...'}
                        />

                        <MonoText>#2:</MonoText>
                        <AutoGrowingTextInput
                            value={this.state.second}
                            onChangeText={(text) => this.updateText({second: text})}
                            style={styles.textInput}
                            placeholder={'Secondly, I ...'}
                        />

                        <MonoText>#3:</MonoText>
                        <AutoGrowingTextInput
                            onChangeText={(text) => this.updateText({third: text})}
                            style={styles.textInput}
                            value={this.state.third}
                            placeholder={'At third, I ...'}
                        />

                        {this.state.isLoading ? <Text>loading...</Text> : <Text></Text>}

                    </View>

                    {/*<Button title={'SAVE'} onPress={this.saveValueFunction}/>*/}

                    <Button
                        color={'red'}
                        title={'Clear all data'}
                        style={styles.clearButton}
                        onPress={this.clearAllData}>
                    </Button>

                    {/*<View>*/}
                    {/*<Text>First: {this.state.first}</Text>*/}
                    {/*<Text>Second: {this.state.second}</Text>*/}
                    {/*<Text>Third: {this.state.third}</Text>*/}
                    {/*</View>*/}

                    {/*<View style={styles.helpContainer}>*/}
                    {/*</View>*/}
                </ScrollView>

                {/*<View style={styles.tabBarInfoContainer}>
                    <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

                    <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
                        <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
                    </View>
                </View>*/}
            </View>
        );
    }

    // _maybeRenderDevelopmentModeWarning() {
    //     if (__DEV__) {
    //         const learnMoreButton = (
    //             <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
    //                 Learn more
    //             </Text>
    //         );
    //
    //         return (
    //             <Text style={styles.developmentModeText}>
    //                 Development mode is enabled, your app will be slower but you can use useful development
    //                 tools. {learnMoreButton}
    //             </Text>
    //         );
    //     } else {
    //         return (
    //             <Text style={styles.developmentModeText}>
    //                 You are not in development mode, your app will run at full speed.
    //             </Text>
    //         );
    //     }
    // }
    //
    // _handleLearnMorePress = () => {
    //     WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
    // };
    //
    // _handleHelpPress = () => {
    //     WebBrowser.openBrowserAsync(
    //         'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    //     );
    // };
}

const styles = StyleSheet.create({
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
    clearButton: {
        bottom: 10,
        alignSelf: 'flex-end',
        position: 'absolute',
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%',
        borderRadius: 5,
        padding: 5,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    // developmentModeText: {
    //     marginBottom: 20,
    //     color: 'rgba(0,0,0,0.4)',
    //     fontSize: 14,
    //     lineHeight: 19,
    //     textAlign: 'center',
    // },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        // flex: 1,
        // flexDirection: 'column',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: {height: -3},
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});
