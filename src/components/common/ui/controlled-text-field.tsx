import { Controller, Control, FieldValues, Path } from "react-hook-form"
import { TextField, TextFieldProps } from "@mui/material"

type ControlledTextFieldProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  label: string
  type?: string
  errorMessage?: string
  shrink?: boolean
} & TextFieldProps

const ControlledTextField = <T extends FieldValues>({
  name,
  control,
  label,
  type = "text",
  errorMessage,
  shrink = true,
  ...textFieldProps
}: ControlledTextFieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        label={label}
        variant="outlined"
        type={type}
        error={!!errorMessage}
        helperText={errorMessage}
        InputLabelProps={{ shrink }}
        value={field.value}
        {...textFieldProps}
      />
    )}
  />
)

export default ControlledTextField
