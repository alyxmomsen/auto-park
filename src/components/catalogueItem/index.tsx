import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import { iCatalogueItem, tTarif } from "@/types";

export type CatalogItemProps = Omit<iCatalogueItem, "tarif"> & {
  tarif?: tTarif;
};

const CatalogueItem = ({ data }: { data: iCatalogueItem }) => {
  return (
    <Link href={"/catalogue-item/" + data.id}>
      <div className={styles.wrapper}>
        <div>{data.id}</div>
        <div>{data.brand}</div>
        <div>{data.model}</div>
        <div>{data.number}</div>
        <div>{data.price}</div>
        <div>{}</div>
        <img src={data.image} alt="alt text" />
      </div>
    </Link>
  );
};

export default CatalogueItem;
