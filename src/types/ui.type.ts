import { Control, FieldValues, Path } from "react-hook-form";

export type FormInputProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  type?: React.HTMLInputTypeAttribute;
};
