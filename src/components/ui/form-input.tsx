"use client";

import { Input } from "@/components/ui/input";
import { FormInputProps } from "@/types/ui.type";
import { Controller, FieldValues } from "react-hook-form";

export function FormInput<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  type = "text",
}: FormInputProps<TFieldValues>) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>

      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <>
            <Input
              name={field.name}
              ref={field.ref}
              onBlur={field.onBlur}
              onChange={field.onChange}
              value={(field.value ?? "") as string}
              type={type}
            />
            {fieldState.error && (
              <p className="text-red-500 text-sm">{fieldState.error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
}
