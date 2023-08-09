import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Box from "@mui/material/Box";
import "../../css/components/Ofertas.css";

function RecipeReviewCard() {

  return (
    <Box sx={{ maxWidth: 400 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            H
          </Avatar>
        }
        title="Titulo de oferta"
        subheader="Agosto 14, 2023"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
          minus est voluptatem quo odit nostrum iure error! Iure officia
          quaerat, placeat facere necessitatibus assumenda dolore quae,
          adipisci, ab totam sequi!
        </Typography>
      </CardContent>
    </Box>
  );
}

function BoxSx() {
  return (
    <Box
      sx={{
        width: 600,
        height: 200,
        backgroundColor: "primary.dark",
      }}
    >
    </Box>
  );
}

function Ofertas(): JSX.Element {
  return (
    <>
      <h1>Ofertas Component</h1>
      <div className="box-flex">
        <RecipeReviewCard />
        <RecipeReviewCard />
        <RecipeReviewCard />
      </div>
    </>
  );
}

export default Ofertas;
