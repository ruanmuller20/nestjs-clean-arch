import { ClassValidatorFields } from "../../class-validator-fields";
import * as libClassValidator from "class-validator";

class StubClassValidatorFields extends ClassValidatorFields<{field: string}>{};

describe('ClassValidatorFields unit tests', () => {
  it('Should initialize erros and validadedData variables with null', () => {
    const sut = new StubClassValidatorFields();
    expect(sut.erros).toBeNull();
    expect(sut.validadedData).toBeNull();
  })

  it('Should validate with erros ', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync');
    spyValidateSync.mockReturnValue([
      {
        property: 'field',
        constraints: {
          isRequired: 'test error',
        }
      }
    ])
    const sut = new StubClassValidatorFields();

    expect(sut.validate(null)).toBeFalsy();
    expect(spyValidateSync).toHaveBeenCalled();
    expect(sut.validadedData).toBeNull();
    expect(sut.erros).toStrictEqual({field: ['test error']});
  })

});
