import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#131016',
    flex: 1,
    justifyContent: 'flex-start',
    paddingLeft: 20,
    paddingRight: 20

  },
  eventName: {
    color: '#FDFCFE', fontSize: 24, fontWeight: 'bold', marginTop: -50
  },
  input: {
    height: 56,
    backgroundColor: '#1F1E25',
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 5,
    color: '#FDFCFE',
    padding: 16,
    fontSize: 16,

  },
  buttonText: {
    color: '#FFF',
    fontSize: 24,
  },
  button: {
    width: 319,
    marginTop: 14,
    marginLeft:15,
    height: 47,
    borderRadius: 5,
    backgroundColor: '#2280FF',
    alignItems: 'center',
    justifyContent: 'center',
  }

})