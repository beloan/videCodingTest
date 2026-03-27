import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, SegmentedButtons, Card } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'AiTuning'>;

type Mood = 'calm' | 'neutral' | 'stressed';

const AiTuningScreen = ({ navigation }: Props) => {
  const [mood, setMood] = React.useState<Mood>('neutral');
  const [result, setResult] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const generateAffirmation = () => {
    setLoading(true);

    // This simulates a real LLM call.
    // In a real app, here we would call:
    // await fetch('https://api.openai.com/v1/chat/completions', { ... })
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
      setLoading(false);
    }, 900);
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>AI «Настрой дня»</Text>
      <Text style={styles.subtitle}>
        Выбери своё текущее состояние — ИИ подберёт короткую аффирмацию или мини-практику под твой
        день.
      </Text>

      <SegmentedButtons
        style={{ marginVertical: 20 }}
        value={mood}
        onValueChange={(value) => setMood(value as Mood)}
        buttons={[
          { value: 'calm', label: '😌 Спокойный', style: styles.segment },
          { value: 'neutral', label: '🙂 Норм', style: styles.segment },
          { value: 'stressed', label: '😵 Напряжён', style: styles.segment },
        ]}
      />

      <Button
        mode="contained"
        onPress={generateAffirmation}
        loading={loading}
        style={styles.generateButton}
        contentStyle={{ paddingVertical: 6 }}
      >
        Сгенерировать настрой
      </Button>

      {result && (
        <Card style={styles.resultCard}>
          <Card.Content>
            <Text style={styles.resultLabel}>Твой настрой на сегодня</Text>
            <Text style={styles.resultText}>{result}</Text>
          </Card.Content>
        </Card>
      )}

      <Button
        mode="text"
        onPress={() => navigation.goBack()}
        textColor="#9ca3af"
        style={{ marginTop: 12 }}
      >
        Назад к медитациям
      </Button>
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
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    color: '#9ca3af',
    marginTop: 8,
  },
  segment: {
    backgroundColor: '#020617',
  },
  generateButton: {
    borderRadius: 999,
    backgroundColor: '#22c55e',
  },
  resultCard: {
    marginTop: 24,
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

