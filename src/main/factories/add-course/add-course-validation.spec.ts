import { makeAddCourseValidation } from "./add-course-validation";
import { RequiredFieldValidation } from "../../../presentation/helpers/validators/required-field-validation";
import { Validation } from "../../../presentation/helpers/validators/validation";
import { ValidationComposite } from "../../../presentation/helpers/validators/validation-composite";

jest.mock("../../../presentation/helpers/validators/validation-composite");

describe("Add Course Validation Factory", () => {
  test("Should call ValidationComposite with all validations", () => {
    makeAddCourseValidation();

    const requiredFields: Validation[] = [];
    for (const field of ["title", "description", "price"]) {
      requiredFields.push(new RequiredFieldValidation(field));
    }

    expect(ValidationComposite).toHaveBeenCalledWith(requiredFields);
  });
});
