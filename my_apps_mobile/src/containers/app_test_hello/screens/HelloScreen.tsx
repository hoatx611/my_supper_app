import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { theme } from '../../../config/theme';

const HelloScreen: React.FC = () => {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);

  const handleSayHello = () => {
    setCount(prev => prev + 1);
    Alert.alert(
      t('hello.title'),
      `${t('hello.message')} (${count + 1})`,
      [{ text: t('common.ok') }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('hello.title')}</Text>
      <Text style={styles.message}>{t('hello.message')}</Text>
      
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>
          {t('common.ok')}: {count}
        </Text>
      </View>
      
      <TouchableOpacity
        style={styles.button}
        onPress={handleSayHello}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>
          {t('hello.buttonText')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: theme.typography.fontSize.xxxl,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  message: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
    lineHeight: theme.typography.lineHeight.lg,
  },
  counterContainer: {
    marginBottom: theme.spacing.xl,
  },
  counterText: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600',
  },
});

export default HelloScreen;
