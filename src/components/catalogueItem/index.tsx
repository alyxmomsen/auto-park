import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import { iCatalogueItem, tTarif } from "@/types";

export type CatalogItemProps = Omit<iCatalogueItem, "tarif"> & {
  tarif?: tTarif;
};

const CatalogueItem = ({ data }: { data: iCatalogueItem }) => {
  return (
    <Link
      className="catalogue__root__body__item"
      href={"/catalogue-item/" + data.id}
    >
      <div className={styles.wrapper}>
        <img src={data.image} alt="alt text" />
        <div>id: {data.id}</div>
        <div>brand: {data.brand}</div>
        <div>model: {data.model}</div>
        <div>number: {data.number}</div>
        <div>price: {data.price}</div>
        <div>tariff: {}</div>
      </div>
    </Link>
  );
};

export default CatalogueItem;
