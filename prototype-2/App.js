import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Appearance, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import * as Speech from 'expo-speech';

const themes = {
  black: { background: '#333', text: '#fff', key: '#555' },
  blue: { background: '#0044cc', text: '#fff', key: '#0077ff' },
  white: { background: '#fff', text: '#000', key: '#ddd' }, 
};

const Prototype3 = () => {
  const defaultTheme = Appearance.getColorScheme() || 'white';
  const [inputValue, setInputValue] = useState('');
  const [isUppercase, setIsUppercase] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [theme, setTheme] = useState(themes[defaultTheme] ? defaultTheme : 'white'); 

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  const handleKeyPress = (key) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setInputValue((prev) => prev + key);
  };

  const handleBackspace = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setInputValue((prev) => prev.slice(0, -1));
  };

  const handleEnter = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setInputValue((prev) => prev + '\n');
  };

  const toggleUppercase = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setIsUppercase((prev) => !prev);
  };

  const speakText = () => {
    Speech.speak(inputValue, { language: 'en', pitch: 1.0, rate: 1.0 });
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === 'black') return 'blue';
      if (prevTheme === 'blue') return 'white';
      return 'black';
    });
  };

  const getKeys = (keys) => (isUppercase ? keys : keys.map((key) => key.toLowerCase()));

  const currentTheme = themes[theme] || themes.white; // Ensure fallback

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <View style={styles.textInputContainer}>
       <View style={[styles.textBox, { backgroundColor: currentTheme.background, borderColor: currentTheme.key }]}>
  <Text style={[styles.text, { color: currentTheme.text }]}>{inputValue}{showCursor && '|'}</Text>
</View>

      </View>

      <View style={styles.keyboardContainer}>
        <ScrollView style={styles.keyboard}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.speakKey} onPress={speakText}>
              <Text style={styles.keyText}>🔊 Read</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            {getKeys('1234567890'.split('')).map((key) => (
              <TouchableOpacity key={key} style={[styles.key, { backgroundColor: currentTheme.key }]} onPress={() => handleKeyPress(key)}>
                <Text style={[styles.keyText, { color: currentTheme.text }]}>{key}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.row}>
            {getKeys('QWERTYUIOP'.split('')).map((key) => (
              <TouchableOpacity key={key} style={[styles.key, { backgroundColor: currentTheme.key }]} onPress={() => handleKeyPress(key)}>
                <Text style={[styles.keyText, { color: currentTheme.text }]}>{key}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.row}>
            {getKeys('ASDFGHJKL'.split('')).map((key) => (
              <TouchableOpacity key={key} style={[styles.key, { backgroundColor: currentTheme.key }]} onPress={() => handleKeyPress(key)}>
                <Text style={[styles.keyText, { color: currentTheme.text }]}>{key}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={[styles.key, { backgroundColor: currentTheme.key }]} onPress={toggleUppercase}>
              <Text style={[styles.keyText, { color: currentTheme.text }]}>⇧</Text>
            </TouchableOpacity>
            {getKeys('ZXCVBNM'.split('')).map((key) => (
              <TouchableOpacity key={key} style={[styles.key, { backgroundColor: currentTheme.key }]} onPress={() => handleKeyPress(key)}>
                <Text style={[styles.keyText, { color: currentTheme.text }]}>{key}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={[styles.key, { backgroundColor: currentTheme.key }]} onPress={handleBackspace}>
              <Text style={[styles.keyText, { color: currentTheme.text }]}>⌫</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={[styles.spaceKey, { backgroundColor: currentTheme.key }]} onPress={() => handleKeyPress(' ')}>
              <Text style={[styles.keyText, { color: currentTheme.text }]}>Space</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.enterKey, { backgroundColor: currentTheme.key }]} onPress={handleEnter}>
              <Text style={[styles.keyText, { color: currentTheme.text }]}>Enter</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={styles.themeKey} onPress={toggleTheme}>
              <Text style={styles.keyText}>🎨 Theme</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-end' },
  textInputContainer: { flex: 1, padding: 10 },
  textBox: { 
    flex: 1, 
    borderRadius: 5, 
    padding: 10, 
    minHeight: 50,
    borderWidth: 1
  },
  text: { fontSize: 16 },
  keyboardContainer: { paddingBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 5 },
  key: { width: 30, height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 5 },
  spaceKey: { width: '65%', height: 40, justifyContent: 'center', alignItems: 'center' },
  enterKey: { width: '25%', height: 40, justifyContent: 'center', alignItems: 'center' },
  speakKey: { padding: 8, backgroundColor: '#888', borderRadius: 3 },
  themeKey: { padding: 8, backgroundColor: '#777', borderRadius: 3 },
  keyText: { fontSize: 14 }
});

export default Prototype3;



