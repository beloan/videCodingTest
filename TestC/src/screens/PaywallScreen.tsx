import React from 'react';
import { Platform, StyleSheet, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, Button, Card, Chip } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { useSubscription } from '../context/SubscriptionContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Paywall'>;

const PaywallScreen = ({ navigation }: Props) => {
  const [selectedPlan, setSelectedPlan] = React.useState<'monthly' | 'yearly'>('yearly');
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { setSubscribed } = useSubscription();
  const compact = height < 740;
  const narrow = width < 390;

  const handleContinue = () => {
    setSubscribed(true);
    navigation.replace('Meditations');
  };

  return (
    <View style={styles.background}>
      <View style={styles.overlay} />
      <View style={styles.glowOne} />
      <View style={styles.glowTwo} />
      <View style={styles.contentWrap}>
        <View
          style={[
            styles.container,
            compact && styles.containerCompact,
            { paddingTop: Math.max(insets.top, compact ? 12 : 16), paddingBottom: Math.max(insets.bottom, 16) },
          ]}
        >
            <Text variant={compact ? 'headlineMedium' : 'headlineLarge'} style={styles.title}>
              ZenPulse Premium
            </Text>
            <Text variant="bodyMedium" style={[styles.subtitle, compact && styles.subtitleCompact]}>
              Раскрой спокойствие с ИИ-настройкой медитаций под твой день.
            </Text>

            <View style={[styles.benefits, compact && styles.benefitsCompact]}>
              <Chip compact={compact} icon="star" style={styles.chip} textStyle={styles.chipText}>
                Неограниченные медитации
              </Chip>
              <Chip compact={compact} icon="brain" style={styles.chip} textStyle={styles.chipText}>
                AI «Настрой дня»
              </Chip>
              <Chip compact={compact} icon="moon-waning-crescent" style={styles.chip} textStyle={styles.chipText}>
                Режим глубокого сна
              </Chip>
            </View>

            <View style={[styles.plansRow, narrow && styles.plansRowNarrow]}>
              <Card
                style={[
                  styles.planCard,
                  narrow && styles.planCardNarrow,
                  selectedPlan === 'monthly' && styles.planCardSelected,
                ]}
                onPress={() => setSelectedPlan('monthly')}
              >
                <Card.Content style={compact && styles.planContentCompact}>
                  <Text style={styles.planLabel}>Месяц</Text>
                  <Text style={styles.planPrice}>499 ₽</Text>
                  <Text style={styles.planNote}>Отменить можно в любой момент</Text>
                </Card.Content>
              </Card>

              <Card
                style={[
                  styles.planCard,
                  narrow && styles.planCardNarrow,
                  styles.planCardHighlight,
                  selectedPlan === 'yearly' && styles.planCardSelected,
                ]}
                onPress={() => setSelectedPlan('yearly')}
              >
                <Card.Content style={compact && styles.planContentCompact}>
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
              contentStyle={[styles.ctaContent, compact && styles.ctaContentCompact]}
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
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#020617',
  },
  contentWrap: {
    flex: 1,
    width: '100%',
    maxWidth: Platform.select({ web: 420, default: undefined }),
    alignSelf: 'center',
    justifyContent: 'flex-end',
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
  },
  containerCompact: {
    paddingHorizontal: 16,
  },
  title: {
    color: 'white',
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: '#e5e7eb',
    marginBottom: 14,
  },
  subtitleCompact: {
    marginBottom: 10,
  },
  benefits: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  benefitsCompact: {
    gap: 6,
    marginBottom: 10,
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
    marginBottom: 16,
  },
  plansRowNarrow: {
    gap: 8,
  },
  planCard: {
    flex: 1,
    backgroundColor: '#020617cc',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  planCardNarrow: {
    borderRadius: 12,
  },
  planContentCompact: {
    paddingVertical: 8,
    paddingHorizontal: 10,
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
    fontSize: 15,
    fontWeight: '600',
  },
  planPrice: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 2,
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
  ctaContent: {
    paddingVertical: 8,
  },
  ctaContentCompact: {
    paddingVertical: 4,
  },
});

export default PaywallScreen;

