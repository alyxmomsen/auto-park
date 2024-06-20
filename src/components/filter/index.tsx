
import { CatalogCtx } from "@/containers/CatalogueContainer";
import React, { useContext } from "react";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { colors } from "@mui/material";
import { tVehicles } from "@/types";

const Filter = () => {

  const catalogueCtx =useContext(CatalogCtx);

  console.log({catalogueCtx});

  return <div>
    <ul>
      <li>{ catalogueCtx.model.filter__tariff.name }</li>
      <li>{ catalogueCtx.model.filter_brand.name }</li>
      <li>{ catalogueCtx.model.filter_modelName.name }</li>
    </ul>
    {/* <BasicSelect data={catalogueCtx.model.filter_modelName.value} /> */}

  </div>;
};

export default Filter;

function BasicSelect({ data }: {data:tVehicles[]}) {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const style__color = {
    color:'white'
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel style={style__color} color="error" id="demo-simple-select-label">Age</InputLabel>
        <Select
          style={style__color}
          color={"warning"}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          {data.map(elem => <MenuItem value={elem.brand}>{ elem.brand }</MenuItem>)}
          {/* <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem> */}
        </Select>
      </FormControl>
    </Box>
  );
}
