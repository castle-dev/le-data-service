/**
 * The object used to configure a type of data
 *
 * @class LeTypeConfig
 *
 * @param type string - the type to be configured
 */
class LeTypeConfig {

  constructor(type: string) {

  }

  /**
   * @function addField - adds a field to the current type
   *
   * @param fieldname string - the name for the new field, the key on the object
   * @param type string - the type for the field.
   * Accepts values of 'string', 'boolean', 'number', 'Date', 'object' or any a LeData type configured in the storage provider.
   * 'object' is a json object with additional field inside it.
   * If the field is an array of the spcified type, append on '[]'. Ex, 'CustomDataType[]'
   *
   * @returns LeTypeFieldConfig -  the config object to configure the new field
   */
  addField(fieldName: string, type: string): LeTypeFieldConfig {
    return new LeTypeFieldConfig('exampleFieldName', 'ExampleCustomType');
  }
}
