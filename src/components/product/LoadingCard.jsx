import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Skeleton from '@mui/material/Skeleton';

const LoadingCard = () => {
  return (
    <Card sx={{ marginTo: 20 }}>
      <CardActionArea>
        <Skeleton sx={{ height: 140 }} animation='wave' variant='rectangular' />
        <CardContent sx={{ paddingBlock: '8px' }}>
          <Skeleton animation='wave' height={10} style={{ marginBottom: 6 }} />
          <Skeleton
            animation='wave'
            height={10}
            width='80%'
            style={{ marginBottom: 6 }}
          />
          <Skeleton animation='wave' height={10} />
        </CardContent>
      </CardActionArea>

      <CardActions>
        <Skeleton animation='wave' variant='circular' width={40} height={40} />
        <Skeleton animation='wave' variant='circular' width={40} height={40} />
      </CardActions>
    </Card>
  );
};

export default LoadingCard;
