import { useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

export function TransactionLineChart() {
  const ref = useRef<any>(null);

  const lineData = [
    { value: 0, dataPointText: '0' },
    { value: 10, dataPointText: '10' },
    { value: 8, dataPointText: '8' },
    { value: 58, dataPointText: '58' },
    { value: 56, dataPointText: '56' },
    { value: 78, dataPointText: '78' },
    { value: 74, dataPointText: '74' },
    { value: 98, dataPointText: '98' },
  ];

  const lineData2 = [
    { value: 0, dataPointText: '0' },
    { value: 20, dataPointText: '20' },
    { value: 18, dataPointText: '18' },
    { value: 40, dataPointText: '40' },
    { value: 36, dataPointText: '36' },
    { value: 60, dataPointText: '60' },
    { value: 54, dataPointText: '54' },
    { value: 85, dataPointText: '85' },
  ];

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

  const showOrHidePointer = (ind: number) => {
    ref.current?.scrollTo({
      x: ind * 200 - 25,
    }); // adjust as per your UI
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', marginLeft: 8 }}>
        {months.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                padding: 6,
                margin: 4,
                backgroundColor: '#ebb',
                borderRadius: 8,
              }}
              onPress={() => showOrHidePointer(index)}
            >
              <Text>{months[index]}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View>
        <LineChart
          scrollRef={ref}
          data={lineData}
          data2={lineData2}
          height={250}
          showVerticalLines
          spacing={44}
          initialSpacing={0}
          color1="skyblue"
          color2="orange"
          textColor1="green"
          dataPointsHeight={6}
          dataPointsWidth={6}
          dataPointsColor1="blue"
          dataPointsColor2="red"
          textShiftY={-2}
          textShiftX={-5}
          textFontSize={13}
        />
      </View>
    </View>
  );
}
