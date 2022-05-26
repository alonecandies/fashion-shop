import { Switch, Grid, Card, CardHeader, Divider, CardContent } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { switchThemeType, selectThemeType } from 'src/features/ui/uiSlice';
import { UI_CONFIGS } from 'src/configs/constants';

export default function SettingsTheme() {
  const dispatch = useDispatch();

  const themeType_gs = useSelector(selectThemeType);

  return (
    <Card>
      <CardHeader subheader="Chọn chủ đề tối" title="Giao diện" />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item>
            <Switch
              checked={themeType_gs === UI_CONFIGS.THEME_TYPE.dark}
              onChange={() => dispatch(switchThemeType())}
            />
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
    </Card>
  );
}
