//import liraries
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import IconM from 'react-native-vector-icons/MaterialIcons';
// import Slider from 'react-native-slider'
// create a component
const Fitness = (props) => {
    const videoPlayer = useRef(null);
    const [WeightValue, setweightvalue] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [currentTime , setCurrentTime] = useState()
    const onSeek = (seek) => {
     
        setweightvalue(seek)
        videoPlayer?.current.seek(seek);
    };
    const onProgress = (data) => {
        // Video Player will continue progress even if the video already ended
        // if (!isLoading) {
            // setCurrentTime(data.currentTime);
        // }
    };

    const onLoad = (data) => {
        // setDuration(data.duration);
        setIsLoading(false);
    };

    const onLoadStart = () => setIsLoading(true);

    const onEnd = () => {
        // Uncomment this line if you choose repeat=false in the video player
        // setPlayerState(PLAYER_STATES.ENDED);
    };
    return (
        <View style={styles.container}>
            <View
                style={{
                    zIndex: 1,
                    position: 'relative',
                    paddingTop: Platform.OS === 'android' ? 0 : 25,
                    backgroundColor: '#fff',
                    width: '100%',
                    height: Platform.OS === 'android' ? '8%' : '10%',
                    flexDirection: 'row',
                    alignSelf: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    shadowOpacity: Platform.OS === 'android' ? 0.5 : 0.05,
                    borderBottomWidth: 0,
                    elevation: 3,
                }}>
                <TouchableOpacity
                    style={{ position: 'absolute', left: '7%', paddingTop: 25 }}
                    onPress={() => props.navigation.goBack()}>
                    <IconM name="arrow-back" size={25} color="black" />
                </TouchableOpacity>

                <Text style={{ color: '#000', fontSize: 18, alignSelf: 'center' }}>
                    Weight lose
          </Text>
            </View>
            <View style={{ width: '100%', height: '90%' }}>
                <Video
                    onEnd={onEnd}
                    onLoad={onLoad}
                    onLoadStart={onLoadStart}
                    onProgress={onProgress}
                    paused={true}
                    ref={(ref) => (videoPlayer.current = ref)}
                    resizeMode="cover"
                    source={{
                        uri:
                            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                    }}
                    repeat
                    style={styles.mediaPlayer}
                    volume={0.0}
                />
            </View>
            {/* <MediaControls
                // isFullScreen={isFullScreen}
                duration={duration}
                isLoading={isLoading}
                fadeOutDelay={500}
                // mainColor="orange"  
                // onFullScreen={not}
                onPaused={onPaused}
                onReplay={onReplay}
                onSeek={onSeek}
                onSeeking={onSeeking}
                playerState={playerState}
                showOnStart={true}
                progress={currentTime}
            /> */}
          <View style={{width: '95%',position: "absolute",justifyContent:'center',marginHorizontal:'5%',
        left: 0,
        bottom: 40,
        right: 0, }}>
            <View style={{justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:30, color:'white'}}>
                    {Math.ceil(WeightValue)} %
                </Text>
            </View>
          {/* <Slider
          minimumValue={1}
          maximumValue={100}
          minimumTrackTintColor={'green'}
          thumbTintColor={'black'}
          thumbTouchSize={{width: 50, height: 50}}
          animationType={'spring'}
          onValueChange={(value) => onSeek(value)} /> */}
          </View>
        </View>
    );
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    mediaPlayer: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: "black",
    },
});

export default Fitness;
