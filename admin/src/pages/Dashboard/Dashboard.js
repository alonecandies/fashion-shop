import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import useCheckAuth from 'src/hooks/useCheckAuth';
import Budget from 'src/components/Dashboard/Budget';
import LatestOrders from 'src/components/Dashboard/LatestOrders';
import LatestProducts from 'src/components/Dashboard/LatestProducts';
import Sales from 'src/components/Dashboard/Sales';
import TasksProgress from 'src/components/Dashboard/TasksProgress';
import TotalCustomers from 'src/components/Dashboard/TotalCustomers';
import TotalProfit from 'src/components/Dashboard/TotalProfit';
import TrafficByDevice from 'src/components/Dashboard/TrafficByDevice';

const Dashboard = () => {
  const navigate = useNavigate();

  useCheckAuth({ navigate, currentPage: `/app/dashboard` });

  return (
    <>
      <Helmet>
        <title>Dashboard | HPL Shop</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Budget />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalCustomers />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TasksProgress />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalProfit sx={{ height: '100%' }} />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <Sales />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <TrafficByDevice sx={{ height: '100%' }} />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <LatestProducts sx={{ height: '100%' }} />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <LatestOrders />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
