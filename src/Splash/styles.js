import { StyleSheet } from 'react-native';

import { theme } from '../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '95%',
    height: 360,
    borderRadius:15,
  },
  content: {    
    marginTop:20,    
    paddingHorizontal: 50
  },
  title: {
    color: theme.colors.heading,
    textAlign: 'center',
    fontSize: 35,
    marginBottom: 16,   
    fontFamily: theme.fonts.title700,
    lineHeight: 40 
  },
  subtitle: {
    color: theme.colors.heading,
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 64,
    fontFamily: theme.fonts.title500,
    lineHeight: 25
  },
  getStartedButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderRadius: 14,
    justifyContent:'center',
  },
  getStartedButtonText: {
    color: theme.colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign:'center',

  },
});