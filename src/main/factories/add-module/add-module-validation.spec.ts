import { makeAddModuleValidation } from "./add-module-validation";
import { RequiredFieldValidation } from "../../../presentation/helpers/validators/required-field-validation";
import { Validation } from "../../../presentation/helpers/validators/validation";
import { ValidationComposite } from "../../../presentation/helpers/validators/validation-composite";

jest.mock("../../../presentation/helpers/validators/validation-composite");

describe("Add Module Validation Factory", () => {
  test("Should call ValidationComposite with all validations", () => {
    makeAddModuleValidation();

    const requiredFields: Validation[] = [];
    for (const field of ["title", "description", "orderNumber", "course"]) {
      requiredFields.push(new RequiredFieldValidation(field));
    }

    expect(ValidationComposite).toHaveBeenCalledWith(requiredFields);
  });
});
