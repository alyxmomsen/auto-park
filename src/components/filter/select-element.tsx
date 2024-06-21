import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import {
  CatalogCtx,
  FilterName,
  FilterNameCode,
} from "@/containers/CatalogueContainer";
import {
  iTarifModel,
  SetBrandAction,
  SetModelAction,
  SetTarifAction,
  tAllModels,
  TarifName,
  tBrand,
  tTarif,
  tVehicles,
} from "@/types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({
  brandDispatch,
  modelDispatch,
  tarifDispatch,
  list = [],
  label,
  filterNameCode,
}: {
  brandDispatch?: React.Dispatch<SetBrandAction> | null;
  modelDispatch?: React.Dispatch<SetModelAction> | null;
  tarifDispatch?: React.Dispatch<SetTarifAction> | null;
  list?: { id?: string; item: string }[];
  label?: FilterName;
  filterNameCode: FilterNameCode;
}) {
  const ctx = React.useContext(CatalogCtx);

  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  React.useEffect(() => {
    console.log("update");

    switch (filterNameCode) {
      case "brand":
        const brands = personName as tBrand[];
        if (brandDispatch) {
          brandDispatch({ type: "SET_BRAND", payload: brands });
        }
        break;
      case "model":
        console.log({ personName });
        const models = personName as tAllModels[];
        if (modelDispatch) {
          modelDispatch({ type: "SET_MODEL", payload: models });
        }
        break;

      case "tarif":
        const tarifs = personName.map(
          (elem) => tarifVariatorByName(elem as TarifName) as tTarif,
        );
        if (tarifDispatch) {
          tarifDispatch({ type: "SET_TARIF", payload: tarifs });
        }
        break;
    }
  }, [personName]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value, name },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {list.map((name) => (
            <MenuItem
              key={name.id}
              value={name.item}
              style={getStyles(name.item, personName, theme)}
            >
              {name.item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

function tarifVariatorByName(name: TarifName): tTarif {
  switch (name) {
    case "\u041A\u043E\u043C\u0444\u043E\u0440\u0442+":
      return { name: "Комфорт+", code: "13" };
    case "\u041A\u043E\u043C\u0444\u043E\u0440\u0442":
      return { name: "Комфорт", code: "14" };
    case "\u041A\u043E\u043C\u0444\u043E\u0440\u04422":
      return { name: "Комфорт2", code: "22" };
    case "\u041A\u043E\u043C\u0444\u043E\u0440\u04423":
      return { name: "Комфорт3", code: "26" };
  }
}
