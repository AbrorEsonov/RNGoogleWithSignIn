import React from 'react';
import { View, StyleSheet, Text,Image } from 'react-native';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-community/google-signin';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

export default function App(){
    const [photo, setPhoto] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [name, setName] = React.useState("")


    signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          setName(userInfo.user.name)
          setEmail(userInfo.user.email)
          setPhoto(userInfo.user.photo)
          //this.setState({ userInfo });
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }
      };

    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
            webClientId: '76469761590-4fnuig838ka6h0k41rdseanufj7ltdfp.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            //hostedDomain: '', // specifies a hosted domain restriction
            //loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
            forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
           //accountName: '', // [Android] specifies an account name on the device that should be used
            //iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
          });
        
    }, [])

  return (
    <View style={styles.container}>
       <Text>Google SignIn</Text>
       <GoogleSigninButton 
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
        />

        <Text>{name}</Text>
        <Text>{email}</Text>
        <Image source={{uri: photo}} style={{height: 40,width: 40}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
     flex: 1,
    backgroundColor: '#fff', 
    alignItems: 'center', 
    justifyContent: 'center', 
},
});
