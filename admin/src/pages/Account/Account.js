import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useCheckAuth from 'src/hooks/useCheckAuth';
import { selectUserInfo } from 'src/features/authen/authenSlice';
import { Box, Container, Grid, Skeleton, Stack } from '@material-ui/core';
import AccountProfile from 'src/components/Account/AccountProfile';
import AccountProfileDetails from 'src/components/Account/AccountProfileDetails';
import ChangePassword from 'src/components/Account/ChangePassword';

const Account = () => {
  const navigate = useNavigate();

  useCheckAuth({ navigate, currentPage: `/app/account` });

  const userData_gs = useSelector(selectUserInfo);

  return (
    <>
      <Helmet>
        <title>Tài khoản | HPL Shop</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {!userData_gs ? (
              <Grid item lg={4} md={6} xs={12}>
                <Stack spacing={1}>
                  <Skeleton variant="text" />
                  <Skeleton variant="circular" width={100} height={100} />
                  <Skeleton variant="rectangular" width={800} height={500} />
                </Stack>
              </Grid>
            ) : (
              <>
                <Grid item lg={4} md={6} xs={12}>
                  <AccountProfile userData={userData_gs} />
                </Grid>
                <Grid item lg={8} md={6} xs={12} container spacing={3}>
                  <Grid item xs={12}>
                    <AccountProfileDetails userData={userData_gs} />
                  </Grid>
                  <Grid item xs={12}>
                    <ChangePassword userData={userData_gs} />
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Account;
