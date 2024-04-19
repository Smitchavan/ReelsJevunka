import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Pressable,
  Text,
  StatusBar,
  Image,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Feather';
import Telegram from 'react-native-vector-icons/FontAwesome5Pro';
import IconChat from 'react-native-vector-icons/Fontisto';
import Dots from 'react-native-vector-icons/MaterialCommunityIcons';
import {videourls} from '../utils/constants';

const windowHeight = Dimensions.get('window').height;
const tabHeight = windowHeight * 0.1;
const videoHeight = windowHeight - tabHeight;

const ReelsScreen = () => {
  const [playingIndex, setPlayingIndex] = useState(null);
  const [paused, setPaused] = useState(false);
  const [likes, setLikes] = useState(0);
  const [message, setMessage] = useState(0);
  const videoRefs = useRef();

  const playVideo = index => {
    if (playingIndex != -1) {
      setPaused(true);
      setPlayingIndex(-1);
    } else {
      setPaused(false);
      setPlayingIndex(index);
    }
  };

  const onViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      setPlayingIndex(index);
    }
  });
  const getItemLayout = (_, index) => ({
    length: videoHeight,
    offset: videoHeight * index,
    index,
  });

  const renderVideoItem = ({item, index}) => (
    <Pressable style={styles.videoContainer}>
      <Video
        ref={ref => {
          videoRefs.current = ref;
        }}
        rate={1.0}
        source={{uri: item.vUrl}}
        style={styles.video}
        resizeMode="cover"
        repeat={true}
        playInBackground={false}
        playWhenInactive={false}
        disableIntervalMomentum
        // decelerationRate={'fast'}
        volume={1.0}
        onLoadStart={() => videoRefs.current.seek(0)}
        paused={playingIndex !== index}
      />

      <Pressable style={styles.play} onPress={() => playVideo(index)}>
        {paused && <IconChat name="play" size={45} color="#FFFFFF" />}
      </Pressable>

      <View style={styles.container2}>
        <View style={styles.row}>
          <Image
            source={require('../assets/images/userimg2.jpg')}
            style={styles.profileimg}
          />
          <Text style={[styles.whitetext, styles.userBold]}>smitchavan</Text>
          <Text style={styles.outwhite}>Follow</Text>
        </View>
        <View style={{marginHorizontal: 25, marginVertical: 5}}>
          <Text style={[styles.whitetext, {color: '#FFF', fontSize: 18}]}>
            Night Out With My Friends
          </Text>
        </View>
        <View style={styles.row2}>
          <IconChat name="music-note" size={15} color="#FFFFFF" />
          <Text
            style={[styles.whitetext, {color: '#FFF', marginHorizontal: 8}]}>
            Original Audio / okay_saiden_344
          </Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" hidden={true} />
      <FlatList
        data={videourls}
        renderItem={renderVideoItem}
        keyExtractor={item => item.id.toString()}
        pagingEnabled
        removeClippedSubviews
        initialScrollIndex={0}
        // snapToInterval={videoHeight}
        snapToAlignment={'start'}
        initialNumToRender={1}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        getItemLayout={getItemLayout}
      />
      <View style={styles.heads}>
        <Text style={styles.whitetxt}>Reels</Text>
        <Pressable style={{marginHorizontal: '3%'}}>
          <Dots name="camera-outline" size={42} color="#FFFFFF" />
        </Pressable>
      </View>

      <View style={styles.ops}>
        <Pressable style={styles.mgb} onPress={() => setLikes(likes + 1)}>
          <Icon name="heart" size={35} color="#FFFFFF" />
          <Text style={styles.whitetext}>{likes}</Text>
        </Pressable>
        <Pressable style={styles.mgb} onPress={() => setMessage(message + 1)}>
          <IconChat name="hipchat" size={35} color="#FFFFFF" />
          <Text style={styles.whitetext}>{message}</Text>
        </Pressable>
        <Pressable style={styles.mgb}>
          <Telegram name="telegram-plane" size={35} color="#FFFFFF" />
        </Pressable>
        <Pressable style={styles.mgb}>
          <Dots name="dots-horizontal" size={35} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container2: {
    position: 'absolute',
    bottom: videoHeight * 0,
    margin: 7,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 7,
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 25,
    marginVertical: 13,
  },
  userBold: {
    fontSize: 18,
    marginHorizontal: 8,
    fontWeight: 'bold',
    letterSpacing: 1.3,
  },
  profileimg: {
    width: 45,
    height: 45,
    borderRadius: 30,
    marginHorizontal: 8,
  },
  outwhite: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '400',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 4,
    paddingHorizontal: 8,
  },

  ops: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    bottom: 0,
    width: '15%',
    position: 'absolute',
  },
  heads: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '12%',
    width: '100%',
    position: 'absolute',
  },
  whitetext: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
  },
  whitetxt: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '500',
    marginHorizontal: '5%',
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  mgb: {marginBottom: '40%', alignItems: 'center'},
  video: {
    height: videoHeight,
    width: '100%',
  },
  play: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    top: videoHeight / 2 - 130,
    justifyContent: 'center',
    height: 200,
    width: 200,
  },
});

export default ReelsScreen;
