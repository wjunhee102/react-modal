type PrimitiveFieldTypes = "string" | "number" | "boolean";

interface Field {
  targetKey?: string | number | symbol;
}

interface PrimitiveSchemaField extends Field {
  type: PrimitiveFieldTypes;
}

interface ObjectSchemaField extends Field {
  type: "object";
  schema: {
    [P in string | number | symbol]:
      | PrimitiveSchemaField
      | ObjectSchemaField
      | ArraySchemaField;
  };
}

interface ArraySchemaField extends Field {
  type: "array";
  schemaField: PrimitiveSchemaField | ObjectSchemaField | ArraySchemaField;
}

type SchemaField = PrimitiveSchemaField | ObjectSchemaField | ArraySchemaField;

type Schema = {
  [P in string | number | symbol]: SchemaField;
};

export interface ObjectCallbackTable {
  value: any;
  key: string | number | symbol;
  schema: Schema;
}

export interface ArrayCallbackTable {
  value: any;
  key: string | number | symbol;
  schemaField: ArraySchemaField["schemaField"];
}

export type ValidationSchema<T extends object> = {
  [P in keyof T]: PrimitiveSchemaField | ObjectSchemaField | ArraySchemaField;
};
