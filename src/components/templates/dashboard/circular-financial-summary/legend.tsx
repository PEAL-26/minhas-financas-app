import { formatCurrency } from '@/helpers/currency';
import { Text, View } from 'react-native';

interface LegendComponentProps {
  data?: { needs?: number; expenses?: number; incomes?: number };
}

export const LegendComponent = (props: LegendComponentProps) => {
  const { data: { needs = 0, expenses = 0, incomes = 0 } = {} } = props;

  return (
    <View
      style={{
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <Legend dotColor="#2563eb" title={`Necessidades: ${formatCurrency(needs)}`} />
      <Legend dotColor="#ef4444" title={`Despesas: ${formatCurrency(expenses)}`} />
      <Legend dotColor="#2cb547" title={`Rendas: ${formatCurrency(incomes)}`} />
    </View>
  );
};

interface Props {
  dotColor: string;
  title: string;
}

export function Legend(props: Props) {
  const { dotColor, title } = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: 120,
        marginRight: 20,
      }}
    >
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: dotColor,
          marginRight: 10,
        }}
      />
      <Text style={{ color: 'black' }} className="text-xs">
        {title}
      </Text>
    </View>
  );
}
