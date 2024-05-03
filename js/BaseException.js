//Excepción base para ir creando el resto de excepciones.
class BaseException extends Error {
  constructor (message = "", fileName, lineNumber){
    super(message, fileName, lineNumber);
    this.name = "BaseException";
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BaseException)
    }
  }
}

//Excepción acceso inválido a constructor
class InvalidAccessConstructorException extends BaseException {
  constructor (fileName, lineNumber){
    super("El constructor no puede ser llamado como una función", fileName, lineNumber);
    this.name = "InvalidAccessConstructorException";
  }
}

//Excepción personalizada para indicar valores vacios.
class EmptyValueException extends BaseException {
  constructor (param, fileName, lineNumber){
    super("Error: El parámetro " + param + " no puede estar vacío.", fileName, lineNumber);
    this.param = param;
    this.name = "EmptyValueException";
  }
}

//Excepciones de validación de parámetros. Reutilizables en todas las clases
class ParameterValidationException extends BaseException {
  constructor (param, fileName, lineNumber){
    super("Error: el parámetro " + param + " no es válido.", fileName, lineNumber);
    this.param = param;
    this.name = "ParameterValidationException";
  }
}

//Excepción de valor inválido
class InvalidValueException extends BaseException {
  constructor (param, value, fileName, lineNumber){
    super(`Error: el parámetro ${param} tiene un valor inválido. (${param}: ${value})`, fileName, lineNumber);
    this.param = param;
    this.name = "InvalidValueException";
  }
}

//Excepción personalizada para clases abstractas.
class AbstractClassException extends BaseException {
  constructor (className, fileName, lineNumber){
    super(`Error: la clase  ${className} es abstracta.`, fileName, lineNumber);
    this.className = className;
    this.name = "AbstractClassException";
  }
} 
