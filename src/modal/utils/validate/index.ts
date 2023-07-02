import {
  ArrayCallbackTable,
  ObjectCallbackTable,
  ValidationSchema,
} from "./types";

export function checkIfTypeIsObject<T extends Object>(obj: T): boolean {
  if (!obj) {
    return false;
  }

  return typeof obj === "object" && !Array.isArray(obj);
}

export function validate<T extends Object, P extends Object = T>(
  object: any,
  schema: ValidationSchema<P>
): P | null {
  if (!checkIfTypeIsObject(object)) {
    // eslint-disable-next-line
    console.error(`The primitive type does not match: ${object}`);
    return null;
  }

  const correctedObject = {} as P;
  const schemaEntries = Object.entries(schema);
  const objectFieldList = [] as ObjectCallbackTable[];
  const arrayFieldList = [] as ArrayCallbackTable[];

  for (const [schemaKey, schemaValue] of schemaEntries) {
    const { type } = schemaValue;

    const key = schemaValue.targetKey ? schemaValue.targetKey : schemaKey;

    if (!Object.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line
      console.error("That key does not exist", key);
      return null;
    }

    const value = object[key];

    if (typeof type !== "string") {
      // eslint-disable-next-line
      console.error("not type typeof string");
      return null;
    }

    if (type === "object") {
      objectFieldList.push({
        key: schemaKey,
        value,
        schema: schemaValue.schema,
      });
    } else if (type === "array") {
      arrayFieldList.push({
        key: schemaKey,
        value,
        schemaField: schemaValue.schemaField,
      });
      // eslint-disable-next-line
    } else if (typeof value !== type) {
      // eslint-disable-next-line
      console.error("The primitive type does not match", value);
      return null;
    }

    correctedObject[schemaKey as keyof P] = value;
  }

  for (const objectField of objectFieldList) {
    const { key, value, schema: ObjectSchema } = objectField;

    const checkedValue = validate(value, ObjectSchema);

    if (!checkedValue) {
      // eslint-disable-next-line
      console.error("An object that does not conform to the format", value);
      return null;
    }

    correctedObject[key as keyof P] = checkedValue as unknown as P[keyof P];
  }

  for (const arrayField of arrayFieldList) {
    const { key, value, schemaField } = arrayField;

    const checkedValueList = [];

    if (!Array.isArray(value)) {
      // eslint-disable-next-line
      console.error("It's not an array.", value);
      return null;
    }

    const valueLength = value.length;

    if (schemaField.type === "object") {
      for (let i = 0; i < valueLength; i += 1) {
        const checkedValue = validate(value[i], schemaField.schema);

        if (!checkedValue) {
          // eslint-disable-next-line
          console.error(
            "There is an object in the array that doesn't fit the format.",
            value[i]
          );
          return null;
        }

        checkedValueList.push(checkedValue);
      }
    } else {
      for (let i = 0; i < valueLength; i += 1) {
        // eslint-disable-next-line
        if (typeof value[i] !== schemaField.type) {
          // eslint-disable-next-line
          console.error(
            "An invalid primitive type exists in the array.",
            value[i]
          );
          return null;
        }

        checkedValueList.push(value[i]);
      }
    }

    correctedObject[key as keyof P] = checkedValueList as unknown as P[keyof P];
  }

  return correctedObject;
}
