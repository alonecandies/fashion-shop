import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectThemeType } from 'src/features/ui/uiSlice';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import { getTheme } from 'src/theme';
import routes from 'src/configs/routes';
import 'moment/locale/vi';
import { StylesProvider } from '@material-ui/styles';

const App = () => {
  const routing = useRoutes(routes);

  // global state
  const themeType_gs = useSelector(selectThemeType);

  // custom theme
  const customTheme = getTheme(themeType_gs);

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={customTheme}>
        <GlobalStyles />
        {routing}
      </ThemeProvider>
    </StylesProvider>
  );
};

export default App;
