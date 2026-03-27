import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, IconButton, Button } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Meditations'>;

type Meditation = {
  id: string;
  title: string;
  duration: string;
  emoji: string;
  color: string;
  locked: boolean;
};

const MEDITATIONS: Meditation[] = [
  {
    id: '1',
    title: 'Утреннее спокойствие',
    duration: '10 мин',
    emoji: '🌅',
    color: '#1d4ed8',
    locked: false,
  },
  {
    id: '2',
    title: 'Фокус и продуктивность',
    duration: '15 мин',
    emoji: '🧠',
    color: '#7c3aed',
    locked: true,
  },
  {
    id: '3',
    title: 'Глубокий сон',
    duration: '20 мин',
    emoji: '🌙',
    color: '#0f766e',
    locked: true,
  },
];

const MeditationsScreen = ({ navigation }: Props) => {
  const [hasAccess] = React.useState(true); // toggle to false to simulate no subscription

  const goToPaywall = () => {
    navigation.replace('Paywall');
  };

  const openAiTuning = () => {
    navigation.navigate('AiTuning');
  };

  return (
    <View style={styles.root}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.greeting}>Добро пожаловать,</Text>
          <Text style={styles.brand}>ZenPulse</Text>
        </View>
        <IconButton icon="cog-outline" iconColor="#9ca3af" />
      </View>

      <Card style={styles.aiCard} onPress={openAiTuning}>
        <Card.Content style={styles.aiCardContent}>
          <View>
            <Text style={styles.aiTitle}>AI «Настрой дня»</Text>
            <Text style={styles.aiSubtitle}>Подбери аффирмацию под своё настроение</Text>
          </View>
          <Button mode="contained-tonal" compact>
            Открыть
          </Button>
        </Card.Content>
      </Card>

      <Text style={styles.sectionTitle}>Сегодняшние медитации</Text>

      <FlatList
        data={MEDITATIONS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => {
          const locked = item.locked && !hasAccess;
          return (
            <TouchableOpacity onPress={locked ? goToPaywall : undefined}>
              <Card style={styles.card}>
                <View
                  style={[
                    styles.cardImage,
                    styles.cardImageRadius,
                    { backgroundColor: item.color },
                    locked && styles.cardImageLocked,
                  ]}
                >
                  <Text style={styles.cardEmoji}>{item.emoji}</Text>
                  {locked && (
                    <View style={styles.lockOverlay}>
                      <IconButton icon="lock-outline" iconColor="white" size={28} />
                      <Text style={styles.lockText}>Только для Premium</Text>
                    </View>
                  )}
                </View>
                <Card.Content style={styles.cardContent}>
                  <View>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardDuration}>{item.duration}</Text>
                  </View>
                  {!locked && (
                    <IconButton icon="play-circle-outline" iconColor="#22c55e" size={28} />
                  )}
                </Card.Content>
              </Card>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#020617',
    paddingHorizontal: 16,
    paddingTop: 56,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    color: '#9ca3af',
    fontSize: 14,
  },
  brand: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
  },
  aiCard: {
    borderRadius: 20,
    backgroundColor: '#0f172a',
    marginBottom: 24,
  },
  aiCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aiTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  aiSubtitle: {
    color: '#9ca3af',
    marginTop: 4,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  card: {
    marginBottom: 14,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  cardImage: {
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImageRadius: {
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  cardImageLocked: {
    opacity: 0.3,
  },
  cardEmoji: {
    fontSize: 46,
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockText: {
    color: 'white',
    marginTop: 4,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 10,
  },
  cardTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cardDuration: {
    color: '#9ca3af',
    marginTop: 2,
  },
});

export default MeditationsScreen;

