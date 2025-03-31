import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import * as Haptics from 'expo-haptics';

const MobileKeyboardPrototype = () => {
  const [inputValue, setInputValue] = useState('');
  const [isUppercase, setIsUppercase] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

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

  const getKeys = (keys) => {
    return isUppercase ? keys : keys.map((key) => key.toLowerCase());
  };

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <View style={styles.textBox}>
          <Text style={styles.text}>
            {inputValue}
            {showCursor && '|'}
          </Text>
        </View>
      </View>

      <View style={styles.keyboardContainer}>
        <ScrollView style={styles.keyboard}>
          <View style={styles.row}>
            {getKeys('QWERTYUIOP'.split('')).map((key) => (
              <TouchableOpacity key={key} style={styles.key} onPress={() => handleKeyPress(key)}>
                <Text style={styles.keyText}>{key}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.row}>
            {getKeys('ASDFGHJKL'.split('')).map((key) => (
              <TouchableOpacity key={key} style={styles.key} onPress={() => handleKeyPress(key)}>
                <Text style={styles.keyText}>{key}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={styles.key} onPress={toggleUppercase}>
              <Text style={styles.keyText}>⇧</Text>
            </TouchableOpacity>
            {getKeys('ZXCVBNM'.split('')).map((key) => (
              <TouchableOpacity key={key} style={styles.key} onPress={() => handleKeyPress(key)}>
                <Text style={styles.keyText}>{key}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.key} onPress={handleBackspace}>
              <Text style={styles.keyText}>⌫</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            {'1234567890'.split('').map((key) => (
              <TouchableOpacity key={key} style={styles.key} onPress={() => handleKeyPress(key)}>
                <Text style={styles.keyText}>{key}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={styles.spaceKey} onPress={() => handleKeyPress(' ')}>
              <Text style={styles.keyText}>Space</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.enterKey} onPress={handleEnter}>
              <Text style={styles.keyText}>Enter</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#f8f8f8',
  },
  textInputContainer: {
    flex: 1,
    padding: 10,
  },
  textBox: {
    flex: 1,
    fontSize: 18,
    backgroundColor: '#ffffff',
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
  keyboardContainer: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    paddingBottom: 10,
  },
  keyboard: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 5,
  },
  key: {
    width: 32,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  spaceKey: {
    width: '65%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  enterKey: {
    width: '25%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  keyText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MobileKeyboardPrototype;




