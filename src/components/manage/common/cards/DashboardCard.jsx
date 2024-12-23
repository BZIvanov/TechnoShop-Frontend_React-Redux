import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid2';

const DashboardCard = ({ label, value, valueColor, size }) => {
  return (
    <Grid size={size}>
      <Card
        sx={{
          minWidth: 200,
          boxShadow: 3,
          borderRadius: 2,
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': { transform: 'scale(1.05)', boxShadow: 6 },
        }}
      >
        <CardActionArea>
          <CardContent>
            <Typography
              gutterBottom={true}
              variant='h5'
              component='div'
              sx={{ color: valueColor }}
            >
              {value}
            </Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              {label}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

DashboardCard.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  valueColor: PropTypes.string,
  size: PropTypes.object,
};

export default DashboardCard;
