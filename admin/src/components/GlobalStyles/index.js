import { createStyles, makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    '@global': {
      '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0
      },
      html: {
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
        height: '100%',
        width: '100%'
      },
      body: {
        backgroundColor: '#f4f6f8',
        height: '100%',
        width: '100%'
      },
      a: {
        textDecoration: 'none'
      },
      '#root': {
        height: '100%',
        width: '100%'
      },

      // Custom scrollbar
      '::-webkit-scrollbar': {
        width: 5,
        height: 5
      },
      '::-webkit-scrollbar-track': {
        background: '#f1f1f1'
      },
      '::-webkit-scrollbar-thumb': {
        background: '#bdc3c7'
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: '#95a5a6'
      }
    }
  })
);

const GlobalStyles = () => {
  useStyles();

  return null;
};

export default GlobalStyles;
