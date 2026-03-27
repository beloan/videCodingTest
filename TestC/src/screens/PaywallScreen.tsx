import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Card, Chip } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Paywall'>;

const PaywallScreen = ({ navigation }: Props) => {
  const [selectedPlan, setSelectedPlan] = React.useState<'monthly' | 'yearly'>('yearly');

  const handleContinue = () => {
    navigation.replace('Meditations');
  };

  return (
    <View style={styles.background}>
      <View style={styles.overlay} />
      <View style={styles.glowOne} />
      <View style={styles.glowTwo} />
      <View style={styles.container}>
        <Text variant="headlineLarge" style={styles.title}>
          ZenPulse Premium
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Раскрой спокойствие с ИИ-настройкой медитаций под твой день.
        </Text>

        <View style={styles.benefits}>
          <Chip icon="star" style={styles.chip} textStyle={styles.chipText}>
            Неограниченные медитации
          </Chip>
          <Chip icon="brain" style={styles.chip} textStyle={styles.chipText}>
            AI «Настрой дня»
          </Chip>
          <Chip icon="moon-waning-crescent" style={styles.chip} textStyle={styles.chipText}>
            Режим глубокого сна
          </Chip>
        </View>

        <View style={styles.plansRow}>
          <Card
            style={[
              styles.planCard,
              selectedPlan === 'monthly' && styles.planCardSelected,
            ]}
            onPress={() => setSelectedPlan('monthly')}
          >
            <Card.Content>
              <Text style={styles.planLabel}>Месяц</Text>
              <Text style={styles.planPrice}>499 ₽</Text>
              <Text style={styles.planNote}>Отменить можно в любой момент</Text>
            </Card.Content>
          </Card>

          <Card
            style={[
              styles.planCard,
              styles.planCardHighlight,
              selectedPlan === 'yearly' && styles.planCardSelected,
            ]}
            onPress={() => setSelectedPlan('yearly')}
          >
            <Card.Content>
              <Text style={styles.savingsTag}>-40%</Text>
              <Text style={styles.planLabel}>Год</Text>
              <Text style={styles.planPrice}>2990 ₽</Text>
              <Text style={styles.planNote}>Самый выгодный выбор</Text>
            </Card.Content>
          </Card>
        </View>

        <Button
          mode="contained"
          onPress={handleContinue}
          style={styles.ctaButton}
          contentStyle={{ paddingVertical: 8 }}
        >
          Попробовать бесплатно 7 дней
        </Button>

        <Button
          mode="text"
          textColor="white"
          onPress={handleContinue}
          style={{ marginTop: 8 }}
        >
          Уже подписан(а)? Продолжить
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#020617',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#020817cc',
  },
  glowOne: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    top: -40,
    right: -70,
    backgroundColor: '#a855f733',
  },
  glowTwo: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    bottom: 120,
    left: -80,
    backgroundColor: '#22c55e22',
  },
  container: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  title: {
    color: 'white',
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: '#e5e7eb',
    marginBottom: 24,
  },
  benefits: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  chip: {
    backgroundColor: '#0f172a99',
  },
  chipText: {
    color: 'white',
  },
  plansRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  planCard: {
    flex: 1,
    backgroundColor: '#020617cc',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  planCardHighlight: {
    borderColor: '#a855f7',
  },
  planCardSelected: {
    borderColor: '#22c55e',
    elevation: 4,
  },
  savingsTag: {
    color: '#facc15',
    fontSize: 12,
    marginBottom: 4,
  },
  planLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  planPrice: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    marginTop: 4,
  },
  planNote: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 4,
  },
  ctaButton: {
    borderRadius: 999,
    backgroundColor: '#22c55e',
  },
});

export default PaywallScreen;

