import axios from "axios";
import Link from "next/link";
import React from "react";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import Alert from "@mui/material/Alert";

import Box from "@mui/material/Box";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";

import Pagination from "@mui/material/Pagination";

export interface MyVehicleCard {
  result: number;
  item: {
    brand: string;
    model: string;
    id: number;
    price: number;
    images: {
      id: number;
      image: string;
    }[];
    tarif: string[];
  };
}

const CatalogueItemById = async ({
  params,
}: {
  params: { subjectId: string };
}) => {

  const { subjectId: id } = params;

  const card = await getVehicle(id);

  console.log({ card });

  return card ? <MyVehicleCard data={card} /> : <Alarm />;
};

export default CatalogueItemById;

async function getVehicle(id: string) {
  try {
    const response = await axios.get<MyVehicleCard>(
      `https://test.taxivoshod.ru/api/test/?w=catalog-car&id=${id}`,
    );
    return response.data;
  } catch (err) {
    return null;
  }
}

function MyVehicleCard({ data }: { data: MyVehicleCard }) {
  return <BasicCard data={data} />;
}

function Alarm() {
  return (
    <div>
      <h1>ALARM!!!</h1>
    </div>
  );
}

// function BasicButtons() {
//   return (
//     <Stack spacing={2} direction="row">
//       <Button variant="text">Text</Button>
//       <Button variant="contained">Contained</Button>
//       <Button variant="outlined">Outlined</Button>
//     </Stack>
//   );
// }

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

function BasicCard({ data }: { data: MyVehicleCard }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {data.item.brand}
          {bull}
          {data.item.model}
        </Typography>
        <div className="vehicle-card__gallery">
          {data.item.images ? (
            data.item.images.map((elem) => {
              return (
                <img
                  width={"300px"}
                  className="vehicle-card__gallery__img"
                  key={elem.id}
                  src={elem.image}
                />
              );
            })
          ) : (
            <Alert severity="info">No Images</Alert>
          )}
        </div>
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
        ></Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
        <Typography variant="body2">
          price: {data.item.price ? data.item.price : "no price".toUpperCase()}
        </Typography>
      </CardContent>
      <CardActions>
        <Link className="" href={"/catalogue"}>
          <Button size="small">Go Back</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
