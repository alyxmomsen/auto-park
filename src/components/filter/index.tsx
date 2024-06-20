import { CatalogCtx } from "@/containers/CatalogueContainer";
import React, { useContext } from "react";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { colors } from "@mui/material";
import { tVehicles } from "@/types";

const Filter = () => {
  const catalogueCtx = useContext(CatalogCtx);

  console.log({ catalogueCtx });

  return (
    <div className="product_filter">
      <div className="product_filter__item product_filter__item--wrapper">
        <BasicSelect label={ catalogueCtx.model.filter__tariff.name }  list={catalogueCtx.model.filter__tariff.value.map(elem => elem.name)} />
      </div>
      <div className="product_filter__item product_filter__item--wrapper">
        <BasicSelect label={ catalogueCtx.model.filter_brand.name}  list={catalogueCtx.model.filter_brand.value.map(elem => elem)} />
      </div>
      <div className="product_filter__item product_filter__item--wrapper">
        <BasicSelect label={ catalogueCtx.model.filter_modelName.name } list={catalogueCtx.model.filter_modelName.value.map(elem => elem.models)} />
      </div>
      
    </div>
  );
};

export default Filter;

function BasicSelect({ list , label }: { list: string[] , label:string }) {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const style__color = {
    color: "white",
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel
          color="error"
          id="demo-simple-select-label"
        >
          {label}
        </InputLabel>
        <Select
          color={"warning"}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          {list.map((elem) => (
            <MenuItem value={elem}>{elem}</MenuItem>
          ))}
          {/* <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem> */}
        </Select>
      </FormControl>
    </Box>
  );
}



