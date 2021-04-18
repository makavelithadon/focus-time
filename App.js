import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { Timer } from './src/features/timer/Timer';
import { colors } from './src/utils/colors';
import { spacing } from './src/utils/sizes';
import { FocusHistory } from './src/features/focus/FocusHistory';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2,
};

const FOCUS_HISTORY_ITEM_KEY_NAME = 'focusHistory';

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);''

  const addFocusHistorySubjectWithState = useCallback(
    (subject, status) => {
      setFocusHistory([...focusHistory, { subject, status, key: uuid.v4() }]);
    },
    [focusHistory]
  );

  const onClear = () => {
    setFocusHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem(
        FOCUS_HISTORY_ITEM_KEY_NAME,
        JSON.stringify(focusHistory)
      );
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem(FOCUS_HISTORY_ITEM_KEY_NAME);
      if (history && JSON.parse(history).length) {
        setFocusSubject(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(loadFocusHistory, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  const onTimerEnd = useCallback(() => {
    addFocusHistorySubjectWithState(focusSubject, STATUSES.COMPLETE);
    setFocusSubject(null);
  }, [addFocusHistorySubjectWithState, focusSubject]);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={onTimerEnd}
          clearSubject={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUSES.CANCELLED);
            setFocusSubject(null);
          }}
        />
      ) : (
        <View style={{flex: 1}}>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.lg,
    backgroundColor: colors.darkBlue,
  },
});
