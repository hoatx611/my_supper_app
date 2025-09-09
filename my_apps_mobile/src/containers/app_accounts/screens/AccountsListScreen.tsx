import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { theme } from '../../../config/theme';

const AccountsListScreen: React.FC = () => {
  const { t } = useTranslation();

  // Mock data for now
  const accounts = [
    { id: '1', name: 'John Doe', email: 'john@example.com', type: 'Personal' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', type: 'Business' },
  ];

  const renderAccount = ({ item }: { item: any }) => (
    <View style={styles.accountCard}>
      <Text style={styles.accountName}>{item.name}</Text>
      <Text style={styles.accountEmail}>{item.email}</Text>
      <Text style={styles.accountType}>{item.type}</Text>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{t('accounts.noAccounts')}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={accounts}
        renderItem={renderAccount}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContainer: {
    padding: theme.spacing.md,
  },
  accountCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  accountName: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  accountEmail: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  accountType: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
  },
  emptyText: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});

export default AccountsListScreen;
