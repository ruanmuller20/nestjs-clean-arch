import { FieldsErros, ValidatorFieldsInterface } from "./validator-fields.interface";
import { validateSync } from "class-validator";

export abstract class ClassValidatorFields<PropsValidated>
  implements ValidatorFieldsInterface<PropsValidated> {
  erros: FieldsErros = null;
  validadedData: PropsValidated = null;

  validate(data: any): boolean {
    const errors = validateSync(data);
    if (errors.length > 0) {
     this.erros = {}
     for (const error of errors) {
        const field = error.property;
        this.erros[field] = Object.values(error.constraints)
     }
    } else{
      this.validadedData = data
    }

    return !errors.length;

  }
}
