import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import SettingsNotifications from 'src/components/Setting/SettingsNotifications';
import SettingsTheme from 'src/components/Setting/SettingsTheme';

const SettingsView = () => (
  <>
    <Helmet>
      <title>Tùy chỉnh | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <SettingsNotifications />
        <Box sx={{ pt: 3 }}></Box>
        <SettingsTheme />
      </Container>
    </Box>
  </>
);

export default SettingsView;
