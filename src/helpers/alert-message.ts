import { Alert } from 'react-native';

export async function alert(title: string, message?: string) {
  return new Promise<boolean>((resolver, reject) => {
    const onPressConfirm = () => {
      resolver(true);
    };

    const onPressCancel = () => {
      resolver(false);
    };

    Alert.alert(title, message, [
      { text: 'Sim', onPress: onPressConfirm },
      { text: 'Não', onPress: onPressCancel, style: 'destructive' },
    ]);
  });
}

export function messageSuccess(message: string) {
  Alert.prompt('Sucesso!', message, undefined);
}

export function messageError(message: string) {
  Alert.prompt('Oops, Algo deu errado!', message, undefined);
}
