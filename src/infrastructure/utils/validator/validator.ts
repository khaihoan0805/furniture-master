import ajv from 'ajv';
import addFormats from 'ajv-formats';

import { TYPES } from '../../../const';
import { singletonProvide, multiInject } from '../../ioc';
import { ISchema } from '../../base/schema';

const AJV = new ajv();

addFormats(AJV)

export interface IValidator {
  validate(
      schemaId: string | undefined,
      data: any,
  ): { valid: boolean; errors: string };
}

@singletonProvide(TYPES.VALIDATOR)
export class Validator {
  static AJV = AJV;
  private valid: any;

  constructor(@multiInject(TYPES.SCHEMA) schemas: ISchema[]) {
    for (const schema of schemas) {
      Validator.AJV.addSchema(schema, schema.$id);
    }
  }

  validate(schemaId: string, data: any) {
    const validator = Validator.AJV.getSchema(schemaId);

    let valid

    if (validator) {
       valid = <boolean>validator(data);
      return { valid, errors: Validator.AJV.errorsText(validator.errors) };
    }
  }
}
