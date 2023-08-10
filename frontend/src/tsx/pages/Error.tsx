import { Box, Typography } from '@mui/material';

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
      <h1>Pagina no encontrada</h1>
    </Box>
  );
}