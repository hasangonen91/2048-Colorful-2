import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { theme } from '../global/styles/theme';
import { styles as globalStyles } from './styles'; // global styles dosyanızın adını ve yolunu düzenleyin

import { Background } from '../Components/Background';

const SplashScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleGetStarted = () => {
    setLoading(true);

    // Burada 2048 oyununa başlamak için gerekli işlemleri yapabilirsiniz.

    // Örnek olarak 2 saniye bekleyip ardından ana ekrana yönlendirme yapalım.
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('MainScreen'); // 'MainScreen' yerine kendi ana ekran adınızı kullanın.
    }, 1500);
  };

  return (
    <Background>
      <SafeAreaView style={globalStyles.container}>
        <Image
          source={require('../../assets/karabuk/karabuk.png')}
          style={globalStyles.image}
          resizeMode="stretch"
        />

        {loading && (
          <View style={localStyles.overlay}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </View>
        )}

        <View style={globalStyles.content}>
          <Text style={globalStyles.title}>2048 Colorful 2</Text>

          <Text style={globalStyles.subtitle}>
          This game was developed by {"\n"}artificial intelligence.
          </Text>

          <TouchableOpacity
            style={globalStyles.getStartedButton}
            onPress={handleGetStarted}
            disabled={loading}
            activeOpacity={0.7} // TouchableOpacity'nin basıldığında azalan opaklık
          >
            <Text style={globalStyles.getStartedButtonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Background>
  );
};

const localStyles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplashScreen;
