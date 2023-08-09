import { Box, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';

// const primary = purple[500]; // #f44336, #7FB800
const primary = 'white';

export default function Error() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: primary,
      }}
    >
      <Typography variant="h1" style={{ color: "#7FB800" }}>
        404
      </Typography>
    </Box>
  );
}