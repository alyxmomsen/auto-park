"use client";

import React, { useContext, useEffect } from "react";
import CatalogueItem from "../catalogueItem";
import { iCatalogue, iCatalogueItem } from "@/types";
import { CatalogCtx } from "@/containers/CatalogueContainer";
import { Alert, Button, Card, CardActions, CardContent, Pagination, PaginationRenderItemParams, Stack } from "@mui/material";
import Link from "next/link";
import PaginationItem from '@mui/material/PaginationItem';
import Typography from '@mui/material/Typography';
import { MyVehicleCard } from "@/app/catalogue-item/[subjectId]/page";


const Catalogue = ({ catalogue }: { catalogue: iCatalogue }) => {
  const ctx = useContext(CatalogCtx);

  useEffect(() => {
    const { modelNameDispatch } = ctx.controller;
    const { brandDispatch } = ctx.controller;
    const { tariffDispatch } = ctx.controller;
  }, []);

  console.log({ catalogue });

  return (
    <div className="catalogue__root">
      <h1 className="catalogue__root__title">Catalogue</h1>
      <div className="catalogue_root__body">
        {catalogue.list.map((elem) => (
          <CatalogueItem key={elem.id} data={elem} />
          
        ))}
      </div>
    </div>
  );
};

export default Catalogue;

export function PaginationRounded({ count , page}: {count:number , page:number}) {
  return (
    <Stack spacing={2}>
      {/* <Pagination
      page={page}
      count={count}
      renderItem={(item) => (
        <PaginationItem />
      )}
    /> */}
      <Pagination renderItem={(item) => <PaginationItem  />} count={count} variant="outlined" shape="rounded"/>
    </Stack>
  );
}

export function BasicCard__2({ data }: { data: iCatalogueItem }) {
  return (
    <Card sx={{ minWidth: 300 , height: 300 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {data.brand}
          
          {data.model}
        </Typography>
        <div className="vehicle-card__gallery">
          {data.image ? <img src={data.image} /> : null}

        </div>
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
        ></Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
        <Typography variant="body2">
          $ {data.price ? data.price : "no price".toUpperCase()}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Link className="" href={"/catalogue"}>
          <Button size="small">Go Back</Button>
        </Link> */}
      </CardActions>
    </Card>
  );
}
