import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image } from 'react-native';
import { Camera } from 'expo-camera';

let camera;

export default function CameraScreen({ navigation }) {
  const [startCamera, setStartCamera] = React.useState(false);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [capturedImage, setCapturedImage] = React.useState(null);
  const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = React.useState('off');

  const startCameraHandler = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    console.log(status);
    if (status === 'granted') {
      setStartCamera(true);
    } else {
      Alert.alert('Access denied');
    }
  };

  const takePictureHandler = async () => {
    const photo = await camera.takePictureAsync();
    console.log(photo);
    setPreviewVisible(true);
    setCapturedImage(photo);
  };

  const savePhotoHandler = () => {
    if (capturedImage) {
        const photoUri = capturedImage.uri;

        // Send the URI back to the home screen
        navigation.navigate('Home', { photoUri });

        // Optionally, you could reset the capturedImage state here
        // setCapturedImage(null);
    }
  };

  const retakePictureHandler = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    startCameraHandler();
  };

  const handleFlashMode = () => {
    if (flashMode === 'on') {
      setFlashMode('off');
    } else if (flashMode === 'off') {
      setFlashMode('on');
    } else {
      setFlashMode('auto');
    }
  };

  const switchCameraHandler = () => {
    setCameraType(cameraType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
  };

  return (
    <View style={styles.container}>
        <View style={{ flex: 1, width: '100%' }}>
          {previewVisible && capturedImage ? (
            <CameraPreview photo={capturedImage} savePhoto={savePhotoHandler} retakePicture={retakePictureHandler} />
          ) : (
            <Camera
              type={cameraType}
              flashMode={flashMode}
              style={{ flex: 1 }}
              ref={(r) => {
                camera = r;
              }}
            >
              <View style={{ flex: 1, width: '100%', backgroundColor: 'transparent', flexDirection: 'row' }}>
                <View style={{
                    position: 'absolute',
                    left: '5%',
                    top: '10%',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                  <TouchableOpacity
                    onPress={handleFlashMode}
                    style={{
                      backgroundColor: flashMode === 'off' ? '#000' : '#fff',
                      borderRadius: 50,
                      height: 25,
                      width: 25
                    }}
                  >
                    <Text style={{ fontSize: 20 }}>⚡️</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={switchCameraHandler}
                    style={{ marginTop: 20, borderRadius: 50, height: 25, width: 25 }}
                  >
                    <Text style={{ fontSize: 20 }}>
                      {cameraType === Camera.Constants.Type.front ? '🤳' : '📷'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ position: 'absolute', bottom: 0, flexDirection: 'row', flex: 1, width: '100%', padding: 20, justifyContent: 'space-between' }}>
                  <View style={{ alignSelf: 'center', flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity onPress={takePictureHandler} style={{ width: 70, height: 70, bottom: 0, borderRadius: 50, backgroundColor: '#fff' }} />
                  </View>
                </View>
              </View>
            </Camera>
          )}
        </View>

      <StatusBar style="auto" />
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

const CameraPreview = ({ photo, retakePicture, savePhoto }) => {
  console.log(photo);
  return (
    <View style={{ backgroundColor: 'transparent', flex: 1, width: '100%', height: '100%' }}>
      <ImageBackground source={{ uri: photo.uri }} style={{ flex: 1 }}>
        <View style={{ flex: 1, flexDirection: 'column', padding: 15, justifyContent: 'flex-end' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              onPress={retakePicture}
              style={{ width: 130, height: 40, alignItems: 'center', borderRadius: 4 }}
            >
              <Text style={{ color: '#fff', fontSize: 20 }}>Re-take</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={savePhoto}
              style={{ width: 130, height: 40, alignItems: 'center', borderRadius: 4 }}
            >
              <Text style={{ color: '#fff', fontSize: 20 }}>Save photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
