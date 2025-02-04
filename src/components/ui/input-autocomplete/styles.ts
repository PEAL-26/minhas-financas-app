import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  inputContainer: {
    // flexDirection: "row",
    // alignItems: "center",
    borderColor: 'transparent',
    height: 40, // h-8
    borderRadius: 6, // rounded-md
    // backgroundColor: "#fff",
    // paddingHorizontal: 12,
    // shadowColor: '#000',
    // // shadowOffset: { width: 0, height: 10 },
    // elevation: 2,
    // shadowOpacity: 0.1,
    // shadowRadius: 15,
  },
  input: {
    height: 40, // h-8
    width: '100%',
    borderRadius: 6, // rounded-md
    borderWidth: 1, // border
    borderColor: '#e4e4e7', // border-input (valor de exemplo)
    backgroundColor: '#fff', // bg-background (valor de exemplo)
    paddingHorizontal: 12, // px-3
    fontSize: 12, // text-xs,
  },
  disabled: {
    opacity: 0.5, // opacity-50 quando não editável
  },
  listContainer: {
    borderRadius: 4,
    backgroundColor: 'white',
    elevation: 2,
    // shadowColor: '#000',
    // // shadowOffset: { width: 0, height: 10 },
    // shadowOpacity: 0.1,
    // shadowRadius: 15,
  },
  container: {
    gap: 8,
    width: '100%',
  },
  scrollView: {
    flexDirection: 'column',
    width: '100%',
  },
});
