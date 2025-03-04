import { MissingParamError } from "../../errors";
import { RequiredFieldValidation } from "./required-field-validation";

const makeSut = () => {
  return new RequiredFieldValidation("field");
};

describe("Required Fields Validation", () => {
  test("Should return a MissingParamError if validation fails", () => {
    const sut = makeSut();

    const error = sut.validate({ name: "any_name" });
    expect(error).toEqual(new MissingParamError("field"));
  });

  test("Should not return if validation success", () => {
    const sut = makeSut();

    const error = sut.validate({ field: "any_name" });
    expect(error).toBeFalsy();
  });
});
