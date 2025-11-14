import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const HealthCheckRatingBar = ({ rating }: { rating: number }) => {
  switch (rating) {
    case 0:
      return (
        <>
          <FavoriteIcon /> <FavoriteIcon /> <FavoriteIcon />
        </>
      );
    case 1:
      return (
        <>
          <FavoriteIcon /> <FavoriteIcon /> <FavoriteBorderIcon />
        </>
      );
    case 2:
      return (
        <>
          <FavoriteIcon /> <FavoriteBorderIcon /> <FavoriteBorderIcon />
        </>
      );
    case 3:
      return (
        <>
          <FavoriteBorderIcon /> <FavoriteBorderIcon /> <FavoriteBorderIcon />
        </>
      );
  }
};

export default HealthCheckRatingBar;
