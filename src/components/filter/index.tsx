import { CatalogCtx, FilterName, FilterNameCode } from "@/containers/CatalogueContainer";
import React, { useContext } from "react";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { colors } from "@mui/material";
import { tBrand, tVehicles } from "@/types";
import MultipleSelectChip from "./select-element";

const Brand = [
  "BMW",
  "Chery",
  "EXEED",
  "Geely",
  "Hyundai",
  "Kia",
  "Renault",
  "Toyota",
];

export const tarifVariants = [
  { code: "13", name: "Комфорт+" },
  { code: "14", name: "Комфорт" },
  { code: "22", name: "Комфорт2" },
  { code: "26", name: "Комфорт3" },
];

const EXEED_models = ["LX", "TXL", "VX"];
const Geely_models = ["Coolray"];
const Hyundai_models = ["Sonata"];
const Kia_models = ["K5", "Optima", "Rio"];
const Renault_models = ["Logan"];
const Toyota_models = ["Camry"];

const modelVariants = [
  {
    brand: "BMW",
    models: ["X2", "X5"],
  },
  {
    brand: "Chery",
    models: [
      ,
      "Arrizo 8",
      "Tiggo 4",
      "Tiggo 7 Pro",
      "Tiggo 7 Pro Max",
      "Tiggo 8 Pro Max",
    ],
  },
  {
    brand: "EXEED",
    models: EXEED_models,
  },
  {
    brand: "Geely",
    models: Geely_models,
  },
  {
    brand: "Hyundai",
    models: Hyundai_models,
  },
  {
    brand: "Kia",
    models: Kia_models,
  },
  {
    brand: "Renault",
    models: Renault_models,
  },
  {
    brand: "Toyota",
    models: Toyota_models,
  },
];

const Filter = () => {
  const catalogueCtx = useContext(CatalogCtx);

  const models: string[] = [];
  modelVariants
    .filter((elem) => {
      if (!catalogueCtx.model.filter_brand.value.length) return true;
      const brand = elem.brand as tBrand;

      return catalogueCtx.model.filter_brand.value.includes(brand);
    })
    .forEach((elem) =>
      elem.models.filter((elem) => {
        if (elem) {
          models.push(elem);
        }
      }),
    );

  return (
    <div className="product_filter">
      <div className="product_filter__item product_filter__item--wrapper">
        <MultipleSelectChip
          brandDispatch={catalogueCtx.controller.brandDispatch}
          label={catalogueCtx.model.filter_brand.name as FilterName}
          filterNameCode={ catalogueCtx.model.filter_brand.code as FilterNameCode }
          list={Brand.map((elem, i) => ({ id: i.toString(), item: elem }))}
        />
      </div>
      <div className="product_filter__item product_filter__item--wrapper">
        <MultipleSelectChip
          modelDispatch={catalogueCtx.controller.modelNameDispatch}
          label={catalogueCtx.model.filter_modelName.name as FilterName}
          filterNameCode={ catalogueCtx.model.filter_modelName.type as FilterNameCode }
          list={models.map((elem, i) => {
            return { id: i.toString(), item: elem };
          })}
        />
      </div>
      <div className="product_filter__item product_filter__item--wrapper">
        <MultipleSelectChip
          tarifDispatch={catalogueCtx.controller.tariffDispatch}
          label={catalogueCtx.model.filter__tariff.name as FilterName}
          filterNameCode={ catalogueCtx.model.filter__tariff.type as FilterNameCode }
          list={tarifVariants.map((elem, i) => ({
            id: i.toString(),
            item: elem.name,
          }))}
        />
      </div>
    </div>
  );
};

export default Filter;

function BasicSelect({ list, label }: { list: string[]; label: string }) {
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
        <InputLabel color="error" id="demo-simple-select-label">
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
