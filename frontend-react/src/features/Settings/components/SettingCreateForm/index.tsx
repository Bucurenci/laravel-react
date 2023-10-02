import {FormEvent, useRef, useState} from "react";
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import axiosClient from "../../../../axios-client";

interface SettingsFormErrors {
  name?: string[],
  type?: string[],
  value?: string[]
}

export default function SettingCreateForm() {
  const nameRef = useRef<HTMLInputElement>(null!);
  const valueRef = useRef<HTMLInputElement>(null!);
  const [typeValue, setTypeValue] = useState("");
  const [errors, setErrors] = useState<SettingsFormErrors | null>(null);

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();

    console.log(nameRef);
    console.log(typeValue);
    console.log(valueRef);

    let payload = {
      name: nameRef.current.value,
      type: typeValue,
      value: JSON.stringify(valueRef.current.value),
    }

    setErrors(null);

    axiosClient.post(`/settings`, payload)
      .then(({data}) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);

        const response = error.response;

        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      })
  }

  const handleTypeChange = (event: SelectChangeEvent) => {
    setTypeValue(event.target.value);
  }

  return (
    <form onSubmit={onSubmit}>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField inputRef={nameRef} autoFocus label="Name" variant="outlined" fullWidth/>
          {errors && errors?.name && <div>{errors.name[0]}</div>}
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Setting type</InputLabel>
            <Select onChange={handleTypeChange} value={typeValue} label="Setting type"
                    labelId="demo-simple-select-label" fullWidth>
              <MenuItem value="text">Text</MenuItem>
              <MenuItem value="number">Number</MenuItem>
              <MenuItem value="email">Email</MenuItem>
            </Select>
            {errors && errors?.type && <div>{errors.type[0]}</div>}
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField inputRef={valueRef} autoFocus label="Value" variant="outlined" fullWidth/>
          {errors && errors?.value && <div>{errors.value[0]}</div>}
        </Grid>
      </Grid>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{mt: 3, mb: 2}}
      >
        Create
      </Button>
    </form>
  );
}
