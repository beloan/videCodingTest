import React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, Button, Card } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { buildAiMeditationPrompt } from '../prompts/aiMeditationPrompt';

type Props = NativeStackScreenProps<RootStackParamList, 'AiTuning'>;

type Mood = 'calm' | 'neutral' | 'stressed';

const AiTuningScreen = ({ navigation }: Props) => {
  const insets = useSafeAreaInsets();
  const [mood, setMood] = React.useState<Mood>('neutral');
  const [result, setResult] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const generateAffirmation = () => {
    setLoading(true);

    // This simulates a real LLM call with a production-like prompt template.
    const prompt = buildAiMeditationPrompt(mood);
    setTimeout(() => {
      let text: string;
      switch (mood) {
        case 'calm':
          text =
            'Сохраняй это состояние мягкого присутствия: дыши глубоко, отмечай каждый вдох и выдох, оставайся в тишине внутри себя.';
          break;
        case 'stressed':
          text =
            'Сделай мягкий вдох на четыре счёта, задержи дыхание на два, выдыхай на шесть. Ты не обязан решать всё прямо сейчас — главное, что ты возвращаешься к себе.';
          break;
        case 'neutral':
        default:
          text =
            'Сегодня выбери мягкий фокус: замечай приятные мелочи вокруг и каждый раз тихо повторяй себе «я в безопасности, я в потоке».';
          break;
      }
      setResult(text);
      console.debug('AI prompt used:', prompt);
      setLoading(false);
    }, 900);
  };

  return (
    <View
      style={[
        styles.root,
        {
          paddingTop: Math.max(insets.top, 8),
          paddingBottom: Math.max(insets.bottom, 8),
        },
      ]}
    >
      <View style={styles.contentWrap}>
        <Text style={styles.title}>AI «Настрой дня»</Text>
        <Text style={styles.subtitle}>
          Выбери своё текущее состояние — ИИ подберёт короткую аффирмацию или мини-практику под твой
          день.
        </Text>

        <View style={styles.moodRow}>
          <Pressable
            onPress={() => setMood('calm')}
            style={[styles.moodButton, mood === 'calm' && styles.moodButtonActive]}
          >
            <Text style={styles.moodText}>😌 Спокойный</Text>
          </Pressable>
          <Pressable
            onPress={() => setMood('neutral')}
            style={[styles.moodButton, mood === 'neutral' && styles.moodButtonActive]}
          >
            <Text style={styles.moodText}>🙂 Норм</Text>
          </Pressable>
          <Pressable
            onPress={() => setMood('stressed')}
            style={[styles.moodButton, mood === 'stressed' && styles.moodButtonActive]}
          >
            <Text style={styles.moodText}>😵 Напряжён</Text>
          </Pressable>
        </View>

        <Button
          mode="contained"
          onPress={generateAffirmation}
          loading={loading}
          style={styles.generateButton}
          contentStyle={{ paddingVertical: 6 }}
        >
          Сгенерировать настрой
        </Button>

        <View style={styles.resultWrap}>
          {result && (
            <Card style={styles.resultCard}>
              <Card.Content>
                <Text style={styles.resultLabel}>Твой настрой на сегодня</Text>
                <Text style={styles.resultText}>{result}</Text>
              </Card.Content>
            </Card>
          )}
        </View>

        <Button
          mode="text"
          onPress={() => navigation.goBack()}
          textColor="#9ca3af"
          style={{ marginTop: 12 }}
        >
          Назад к медитациям
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#020617',
    paddingHorizontal: 16,
  },
  contentWrap: {
    flex: 1,
    width: '100%',
    maxWidth: Platform.select({ web: 420, default: undefined }),
    alignSelf: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    color: '#9ca3af',
    marginTop: 8,
  },
  moodRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 18,
    marginBottom: 16,
  },
  moodButton: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    backgroundColor: '#0b1220',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  moodButtonActive: {
    borderColor: '#22c55e',
    backgroundColor: '#14532d',
  },
  moodText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  generateButton: {
    borderRadius: 999,
    backgroundColor: '#22c55e',
  },
  resultWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  resultCard: {
    marginTop: 18,
    borderRadius: 16,
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  resultLabel: {
    color: '#a855f7',
    fontSize: 13,
    marginBottom: 6,
  },
  resultText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AiTuningScreen;

