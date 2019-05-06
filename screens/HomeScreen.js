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

import {MonoText} from '../components/StyledText';

export default class HomeScreen extends React.Component {
    // static navigationOptions = {
    //     header: "Today strikes",
    // };

    static navigationOptions = {
        title: 'Today strikes',
    };

    componentDidMount() {
        this.getAllKeys()
        this.getValueFunction()
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

                    console.log("date="+store[i][0])
                });
            });
        });
    }


    getValueFunction = () => {
        //function to get the value from AsyncStorage
        AsyncStorage.getItem(`${this.state.today}:first`).then(value =>
                //AsyncStorage returns a promise so adding a callback to get the value
                this.setState({first: value})
            //Setting the value in Text
        );
    };

    saveData(text) {
        this.setState({
            first: text
        })
    }

    constructor() {
        super();
        let today = new Date().toJSON().slice(0, 10);

        this.state = {
            today: today,
            first: '',
            second: '',
            third: ''
        }
    }

    saveValueFunction = () => {
        //function to save the value in AsyncStorage
        if (
            this.state.first ||
            this.state.second ||
            this.state.third
        ) {
            console.log(`${this.state.today}:first`);
            console.log(this.state.first);

            AsyncStorage.setItem(`${this.state.today}:first`, this.state.first);

            //Setting a data to a AsyncStorage with respect to a key
            this.setState({textInputData: ''});
            //Resetting the TextInput
            alert('Data Saved');
            //alert to confirm
        } else {
            alert('Please fill data');
            //alert for the empty InputText
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    {/*<View style={styles.welcomeContainer}>*/}
                    {/*<Image*/}
                    {/*source={*/}
                    {/*__DEV__*/}
                    {/*? require('../assets/images/robot-dev.png')*/}
                    {/*: require('../assets/images/robot-prod.png')*/}
                    {/*}*/}
                    {/*style={styles.welcomeImage}*/}
                    {/*/>*/}
                    {/*</View>*/}

                    <View style={styles.getStartedContainer}>

                        {/*{this._maybeRenderDevelopmentModeWarning()}*/}

                        <View>
                            <Text>3 strikes that you've done today:</Text>
                        </View>

                        <Text>Today is {this.state.today}</Text>

                        <MonoText>#1:</MonoText>
                        <AutoGrowingTextInput
                            onChangeText={(text) => this.saveData(text)}
                            style={styles.textInput}
                            value={this.state.first}
                            data-date={'2019-05-06'}
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

                        {/*<View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>*/}
                        {/*<MonoText style={styles.codeHighlightText}>screens/HomeScreen.js</MonoText>*/}
                        {/*</View>*/}

                        {/*<Text style={styles.getStartedText}>*/}
                        {/*Change this text and your app will automatically reload.*/}
                        {/*</Text>*/}
                    </View>

                    <Button title={'SAVE'} onPress={this.saveValueFunction}/>

                    {/*<TouchableOpacity*/}
                    {/*onPress={this.saveValueFunction}*/}
                    {/*style={styles.button}>*/}
                    {/*<Text style={styles.buttonText}>SAVE</Text>*/}
                    {/*</TouchableOpacity>*/}

                    <View>
                        <Text>First: {this.state.first}</Text>
                        <Text>Second: {this.state.second}</Text>
                        <Text>Third: {this.state.third}</Text>
                    </View>

                    <View style={styles.helpContainer}>
                        {/*<TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>*/}
                        {/*<Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>*/}
                        {/*</TouchableOpacity>*/}
                    </View>
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
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
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
