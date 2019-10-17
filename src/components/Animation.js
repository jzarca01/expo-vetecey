import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from "lottie-react-native";

export default class Animation extends Component {

  static defaultProps = {
    isLoop: true
  }

  componentDidMount() {
    this.animation.play();
  }

  render() {
    const { isLoop } = this.props;
    return (
      <View style={styles.animationContainer}>
        <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          style={{
            width: 400,
            height: 400
          }}
          source={require('../assets/animation.json')}
          loop={isLoop}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  }
});
