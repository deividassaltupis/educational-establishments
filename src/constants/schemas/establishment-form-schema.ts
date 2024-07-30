import * as yup from "yup"

export type EducationalEstablishmentFormValues = {
  ins_kodas: number
  ins_pavad_lt: string
  ins_motin_id?: string
  ins_ireg_smir_data?: string
  ins_isreg_smir_data?: string
  ins_pask_grupe: string
  ins_pagr_tipas: string
  savivaldybe: number
  sav_pav: string
  sen_kodas: number
  sen_pav: string
  gyv_kodas: number
  gyv_pav: string
  gyvenamoji_vietove: string
  koord?: string
}

export const educationalEstablishmentSchema = yup.object().shape({
  ins_kodas: yup.number().required(),
  ins_pavad_lt: yup.string().required().max(255),
  ins_motin_id: yup.string().optional().max(255),
  ins_ireg_smir_data: yup.string().optional(),
  ins_isreg_smir_data: yup.string().optional(),
  ins_pask_grupe: yup.string().required().max(255),
  ins_pagr_tipas: yup.string().required().max(255),
  savivaldybe: yup.number().required(),
  sav_pav: yup.string().required().max(255),
  sen_kodas: yup.number().required(),
  sen_pav: yup.string().required().max(255),
  gyv_kodas: yup.number().required(),
  gyv_pav: yup.string().required().max(255),
  gyvenamoji_vietove: yup.string().required().max(255),
  koord: yup.string().optional().max(255)
})
