


export type FieldsErros = {
  [field: string]: string[]

}

export interface ValidatorFieldsInterface <PropsValidated> {
  erros: FieldsErros
  validadedData: PropsValidated
  validate(data: any): boolean

}
