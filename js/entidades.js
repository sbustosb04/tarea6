"use strict";

// Objeto Dish
class Dish {
    #name;
    #description;
    #ingredients;
    #image;

    constructor(name, description, ingredients = [], image = ""){ // Parametros predeterminados para ingredients e image 
      // Validación de parámetros obligatorios
      if (!name) throw new EmptyValueException('name');
  
        this.#name = name;
        this.#description = description;
        this.#ingredients = ingredients;
        this.#image = image;
    }

    get name() {
        return this.#name;
    }
    
    set name(newName) {
        this.#name = newName;
    }
    
    get description() {
        return this.#description;
    }
    
    set description(newDescription) {
        this.#description = newDescription;
    }
    
    get ingredients() {
        return this.#ingredients;
    }
    
    set ingredients(newIngredients) {
        this.#ingredients = newIngredients;
    }
    
    get image() {
        return this.#image;
    }
    
    set image(newImage) {
        this.#image = newImage;
    }
    
    toString() {
        return `Dish: ${this.#name} - ${this.#description} - ${this.#ingredients} - ${this.#image}`;
    }    
}

// Objeto Category
class Category {
    #name;
    #description;

    constructor(name, description = "") { 
      // Validación de parámetros obligatorios
      if (!name) throw new EmptyValueException('name');
      this.#name = name;
      this.#description = description;
    }
  
    get name() {
      return this.#name;
    }
  
    set name(newName) {
      this.#name = newName;
    }
  
    get description() {
      return this.#description;
    }
  
    set description(newDescription) {
      this.#description = newDescription;
    }
  
    toString() {
      return `Category: ${this.#name} - ${this.#description}`;
    }
}
  
// Objeto Allergen
class Allergen {
    #name;
    #description;

    constructor(name, description = "") {
      // Validación de parámetros obligatorios
      if (!name) throw new EmptyValueException('name');
      this.#name = name;
      this.#description = description;
    }
  
    get name() {
      return this.#name;
    }
  
    set name(newName) {
      this.#name = newName;
    }
  
    get description() {
      return this.#description;
    }
  
    set description(newDescription) {
      this.#description = newDescription;
    }
  
    toString() {
      return ` ${this.#name} - ${this.#description}`;
    }
}
  
// Objeto Menu
class Menu {
    #name;
    #description;

    constructor(name, description = "") {
      // Validación de parámetros obligatorios
      if (!name) throw new EmptyValueException('name');
      this.#name = name;
      this.#description = description;
    }
  
    get name() {
      return this.#name;
    }
  
    set name(newName) {
      this.#name = newName;
    }
  
    get description() {
      return this.#description;
    }
  
    set description(newDescription) {
      this.#description = newDescription;
    }
  
    toString() {
      return `Menu: ${this.#name} - ${this.#description}`;
    }
  }
  
// Objeto Restaurant
class Restaurant {
    #name;
    #description;
    #location;

    constructor(name, description = "", location = new Coordinate(0, 0)) {
      // Validación de parámetros obligatorios
      if (!name) throw new EmptyValueException('name');
      this.#name = name;
      this.#description = description;
      this.#location = location;
    }
  
    get name() {
      return this.#name;
    }
  
    set name(newName) {
      this.#name = newName;
    }
  
    get description() {
      return this.#description;
    }
  
    set description(newDescription) {
      this.#description = newDescription;
    }
  
    get location() {
      return this.#location;
    }
  
    set location(newLocation) {
      this.#location = newLocation;
    }
  
    toString() {
      return `Restaurant: ${this.#name} - ${this.#description} - ${this.#location}`;
    }
}
  
// Objeto Coordinate
class Coordinate {
    #latitude;
    #longitude;

    constructor(latitude, longitude) {
     // Validación de parámetros obligatorios
      if (!latitude) throw new EmptyValueException('latitud');
      if (!longitude) throw new EmptyValueException('longitude');
      
      this.#latitude = latitude;
      this.#longitude = longitude;
    }
  
    get latitude() {
      return this.#latitude;
    }
  
    set latitude(newLatitude) {
      this.#latitude = newLatitude;
    }
  
    get longitude() {
      return this.#longitude;
    }
  
    set longitude(newLongitude) {
      this.#longitude = newLongitude;
    }
  
    toString() {
      return `Coordinate: (${this.#latitude}, ${this.#longitude})`;
    }
}

export { 
  Dish, Category, Allergen, Menu, Restaurant, Coordinate,
}; 

  