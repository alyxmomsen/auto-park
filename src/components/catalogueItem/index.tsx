import React, { useContext } from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import { iCatalogueItem, tTarif } from "@/types";
import { BasicCard__2 } from "../catalogue";
import { CatalogCtx } from "@/containers/CatalogueContainer";

export type CatalogItemProps = Omit<iCatalogueItem, "tarif"> & {
  tarif?: tTarif;
};

const CatalogueItem = ({ data }: { data: iCatalogueItem }) => {

  const ctx = useContext(CatalogCtx);

  ctx.model.filter__tariff
  
  return (
    <Link
      onClick={() => {
        localStorage.setItem('ctx' , JSON.stringify(ctx));
      }}
      className="catalogue__root__body__item"
      href={"/catalogue-item/" + data.id}
    >
      <BasicCard__2 data={data} />
      {/* <div className={styles.wrapper}>
        <img src={data.image} alt="alt text" />
        <div>id: {data.id}</div>
        <div>brand: {data.brand}</div>
        <div>model: {data.model}</div>
        <div>number: {data.number}</div>
        <div>price: {data.price}</div>
        <div>tariff: {}</div>
      </div> */}
    </Link>
  );
};

export default CatalogueItem;
