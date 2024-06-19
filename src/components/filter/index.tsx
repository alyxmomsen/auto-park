import { catalogueContext } from "@/containers/CatalogueContainer";
import store, { RootState } from "@/store";
import React, { useContext } from "react";
import { useSelector } from "react-redux";

const brandSelector = (state: RootState) => state.brand;

const Filter = () => {
    const brand = useSelector(brandSelector);
    
    const value = brand.value;

    

    return (<div>
        {value && <div>{ value }</div>}
  </div>);
};

export default Filter;
