import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
  // Target the SVG icons
  '& .MuiRating-icon': {
    transform: 'scale(1.5)', // Adjust the scale value as needed
    marginRight: '1rem', // Adjust spacing between icons
  },
});

interface Props {
  isReadOnly?: boolean;
  mysize: 'small' | 'medium' | 'large';
  rating?: number;
  setRating?: React.Dispatch<React.SetStateAction<number>>;
}

export default function CustomizedRating(Props: Props) {
  const { isReadOnly, mysize, rating, setRating } = Props;

  const handleChange = (newValue: number | null) => {
    if (setRating) setRating(Number(newValue));
  };

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <StyledRating
        name="customized-color"
        readOnly={isReadOnly}
        value={rating}
        getLabelText={(value: number) =>
          `${value} Heart${value !== 1 ? 's' : ''}`
        }
        precision={1}
        icon={<FavoriteIcon fontSize="inherit" />}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        onChange={(e, newValue) => handleChange(newValue)}
        size={mysize}
      />
    </Box>
  );
}
