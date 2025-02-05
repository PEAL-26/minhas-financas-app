import { useQuery } from '@tanstack/react-query';
import { Text, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

import { getFinancialSummary } from '@/services/summaries';
import { shadowStyles } from '@/styles/styles';

import { formatCurrency } from '@/helpers/currency';
import { LegendComponent } from './legend';

export function CircularFinancialSummary() {
  const { data, isLoading } = useQuery({
    queryFn: () => getFinancialSummary(),
    queryKey: ['financial_summary'],
    refetchOnReconnect: true,
  });

  const pieData = [
    { value: data?.needs || 0, color: '#2563eb', gradientCenterColor: '#2563eb' }, //needs
    { value: data?.expenses || 0, color: '#ef4444', gradientCenterColor: '#ef4444' }, //expenses
    { value: data?.incomes || 0, color: '#2cb547', gradientCenterColor: '#2cb547' }, //incomes
  ];

  if (isLoading) {
    return (
      <View
        style={[
          {
            margin: 16,
            padding: 16,
            borderRadius: 20,
            height: 328,
          },
          shadowStyles.shadow,
        ]}
        className="animate-pulse bg-gray-200"
      />
    );
  }

  const isEmpty = data?.expenses === 0 && data?.needs === 0 && data?.incomes === 0;

  return (
    <View
      onLayout={(e) => {
        console.log(e.nativeEvent.layout);
      }}
      style={[
        {
          margin: 16,
          padding: 16,
          borderRadius: 20,
          backgroundColor: '#fff',
          height: 328,
        },
        shadowStyles.shadow,
      ]}
    >
      {isEmpty && (
        <View className="flex-1 flex flex-row items-center justify-center">
          <Text className="text-center text-sm">Sem dados para mostrar!</Text>
        </View>
      )}
      {!isEmpty && (
        <>
          <View style={{ padding: 20, alignItems: 'center' }}>
            <PieChart
              data={pieData}
              donut
              showGradient
              sectionAutoFocus
              radius={90}
              innerRadius={60}
              innerCircleColor={'#fff'}
              centerLabelComponent={() => {
                return (
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 12, color: 'black', fontWeight: 'bold' }}>
                      {formatCurrency(data?.balance || 0)}
                    </Text>
                    <Text style={{ fontSize: 8, color: 'black' }}>Saldo</Text>
                  </View>
                );
              }}
            />
          </View>
          <LegendComponent data={data} />
        </>
      )}
    </View>
  );
}
