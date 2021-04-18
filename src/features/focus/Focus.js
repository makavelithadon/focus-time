import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import { spacing, fontSizes } from '../../utils/sizes';
import { colors } from '../../utils/colors';

function formatValue(value) {
  return value.split('').every((char) => char.charCodeAt(0) === 32)
    ? value.trim()
    : value.trimStart();
}

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState('');
  ('hello');
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ flex: 1, marginRight: spacing.md }}
            onSubmitEditing={({ nativeEvent: { text } }) =>
              setSubject(formatValue(text))
            }
          />
          <RoundedButton
            title="+"
            size={50}
            onPress={() => addSubject(formatValue(subject))}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSizes.lg,
  },
  inputContainer: {
    paddingTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
