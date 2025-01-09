import { RequiredFieldValidation } from "../../../presentation/helpers/validators/required-field-validation";
import { Validation } from "../../../presentation/helpers/validators/validation";
import { ValidationComposite } from "../../../presentation/helpers/validators/validation-composite";

export const makeAddCourseValidation = (): ValidationComposite => {
  const requiredFields: Validation[] = [];
  for (const field of ["title", "description", "price"]) {
    requiredFields.push(new RequiredFieldValidation(field));
  }

  return new ValidationComposite(requiredFields);
};
