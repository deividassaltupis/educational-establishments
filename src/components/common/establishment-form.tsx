import { Box, Button, Chip, Paper } from "@mui/material"
import { FC, useEffect } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  EducationalEstablishmentFormValues,
  educationalEstablishmentSchema
} from "src/constants/schemas/establishment-form-schema"
import { EducationalEstablishment } from "src/types/entities/educational-establishment"
import ControlledTextField from "./ui/controlled-text-field"
import { useLocalStorage } from "src/hooks/useLocalStorage"

type EstablishmentFormProps = {
  initialData?: EducationalEstablishment | null
}

const EstablishmentForm: FC<EstablishmentFormProps> = ({ initialData }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<EducationalEstablishmentFormValues>({
    resolver: yupResolver(educationalEstablishmentSchema)
  })

  const { storedValue: storedEstablishments, setValue } = useLocalStorage<
    EducationalEstablishment[]
  >("establishments", [])

  const onSubmit = (data: EducationalEstablishmentFormValues) => {
    const id = initialData?._id

    const ins_ireg_smir_data = data.ins_ireg_smir_data
      ? new Date(data.ins_ireg_smir_data)
      : null
    const ins_isreg_smir_data = data.ins_isreg_smir_data
      ? new Date(data.ins_isreg_smir_data)
      : null

    const regYear = ins_ireg_smir_data?.getFullYear()
    const regMonth = ins_ireg_smir_data
      ? (ins_ireg_smir_data.getMonth() + 1).toString().padStart(2, "0")
      : undefined
    const regDay = ins_ireg_smir_data?.getDate()

    const deregYear = ins_isreg_smir_data?.getFullYear()
    const deregMonth = ins_isreg_smir_data
      ? (ins_isreg_smir_data.getMonth() + 1).toString().padStart(2, "0")
      : undefined
    const deregDay = ins_isreg_smir_data?.getDate()

    const payload = {
      _type: initialData?._type,
      _id: initialData?._id,
      _revision: initialData?._revision,
      ins_id: initialData?.ins_id,
      ...data,
      ins_ireg_smir_data: `${regYear}-${regMonth}-${regDay}`,
      ins_isreg_smir_data: `${deregYear}-${deregMonth}-${deregDay}`
    }

    if (
      !storedEstablishments.some((establishment) => establishment._id === id)
    ) {
      setValue([...storedEstablishments, payload])
    } else {
      setValue([
        ...storedEstablishments.filter(
          (establishment) => establishment._id !== id
        ),
        payload
      ])
    }
  }

  useEffect(() => {
    if (initialData) {
      reset({
        ins_kodas: initialData.ins_kodas,
        ins_pavad_lt: initialData.ins_pavad_lt,
        ins_motin_id: initialData.ins_motin_id || "",
        ins_ireg_smir_data: initialData.ins_ireg_smir_data
          ? new Date(initialData.ins_ireg_smir_data)
              .toISOString()
              .substring(0, 10)
          : undefined,
        ins_isreg_smir_data: initialData.ins_isreg_smir_data
          ? new Date(initialData.ins_isreg_smir_data)
              .toISOString()
              .substring(0, 10)
          : undefined,
        ins_pask_grupe: initialData.ins_pask_grupe || "",
        ins_pagr_tipas: initialData.ins_pagr_tipas || "",
        savivaldybe: initialData.savivaldybe,
        sav_pav: initialData.sav_pav,
        sen_kodas: initialData.sen_kodas,
        sen_pav: initialData.sen_pav,
        gyv_kodas: initialData.gyv_kodas,
        gyv_pav: initialData.gyv_pav,
        gyvenamoji_vietove: initialData.gyvenamoji_vietove,
        koord: initialData.koord || ""
      })
    }
  }, [initialData])

  return (
    <Paper
      sx={{
        p: 2
      }}
    >
      {!!initialData?._id && (
        <Chip label={`Internal ID: ${initialData?._id}`} variant="outlined" />
      )}

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 3
        }}
      >
        <ControlledTextField
          name="ins_kodas"
          control={control}
          label="Internal Code"
          type="number"
          errorMessage={errors.ins_kodas?.message}
        />
        <ControlledTextField
          name="ins_pavad_lt"
          control={control}
          label="Title"
          errorMessage={errors.ins_pavad_lt?.message}
        />
        <ControlledTextField
          name="ins_motin_id"
          control={control}
          label="Parent ID"
          errorMessage={errors.ins_motin_id?.message}
        />
        <ControlledTextField
          name="ins_ireg_smir_data"
          control={control}
          label="Education and Science institution registration date"
          type="date"
          errorMessage={errors.ins_ireg_smir_data?.message}
        />
        <ControlledTextField
          name="ins_isreg_smir_data"
          control={control}
          label="Education and Science institution deregistration date"
          type="date"
          errorMessage={errors.ins_isreg_smir_data?.message}
        />
        <ControlledTextField
          name="ins_pask_grupe"
          control={control}
          label="Group"
          errorMessage={errors.ins_pask_grupe?.message}
        />
        <ControlledTextField
          name="ins_pagr_tipas"
          control={control}
          label="Main group"
          errorMessage={errors.ins_pagr_tipas?.message}
        />
        <ControlledTextField
          name="savivaldybe"
          control={control}
          label="Municipality"
          type="number"
          errorMessage={errors.savivaldybe?.message}
        />
        <ControlledTextField
          name="sav_pav"
          control={control}
          label="Municipality name"
          errorMessage={errors.sav_pav?.message}
        />
        <ControlledTextField
          name="sen_kodas"
          control={control}
          label="The code of the municipality"
          type="number"
          errorMessage={errors.sen_kodas?.message}
        />
        <ControlledTextField
          name="sen_pav"
          control={control}
          label="The name of the municipality"
          errorMessage={errors.sen_pav?.message}
        />
        <ControlledTextField
          name="gyv_kodas"
          control={control}
          label="Settlement code"
          type="number"
          errorMessage={errors.gyv_kodas?.message}
        />
        <ControlledTextField
          name="gyv_pav"
          control={control}
          label="Settlement name"
          errorMessage={errors.gyv_pav?.message}
        />
        <ControlledTextField
          name="gyvenamoji_vietove"
          control={control}
          label="Settlement"
          errorMessage={errors.gyvenamoji_vietove?.message}
        />
        <ControlledTextField
          name="koord"
          control={control}
          label="Coordinates"
          errorMessage={errors.koord?.message}
        />
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </Paper>
  )
}

export default EstablishmentForm
