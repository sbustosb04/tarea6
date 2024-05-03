"use strict";

import {
    Dish, Category, Allergen, Menu, Restaurant, Coordinate,
  } from '../entidades.js';



class ManagerException extends BaseException {
    constructor(message = 'Error: Manager Exception.', fileName, lineNumber) {
      super(message, fileName, lineNumber);
      this.name = 'ManagerException';
    }
}

class ObjecManagerException extends ManagerException {
    constructor(param, className, fileName, lineNumber) {
      super(`Error: The ${param} is not a ${className}`, fileName, lineNumber);
      this.param = param;
      this.className = className;
      this.name = 'ObjecManagerException';
    }
}

class CategoryExistsException extends ManagerException {
    constructor(category, fileName, lineNumber) {
      super(`Error: The ${category.title} already exists in the manager.`, fileName, lineNumber);
      this.category = category;
      this.name = 'CategoryExistsException';
    }
}

class CategoryNotExistException extends ManagerException {
    constructor(category, fileName, lineNumber) {
      super(`Error: The ${category.title} doesn't exist in the manager.`, fileName, lineNumber);
      this.category = category;
      this.name = 'CategoryNotExistException';
    }
}

class NullOrInvalidCategoryException extends ManagerException {
    constructor(fileName, lineNumber) {
        super('Error: The category is null or not a valid Category object.', fileName, lineNumber);
        this.name = 'NullOrInvalidCategoryException';
    }
}

class NullOrInvalidMenuException extends ManagerException {
    constructor(fileName, lineNumber) {
        super('Error: The menu is null or not a valid Menu object.', fileName, lineNumber);
        this.name = 'NullOrInvalidMenuException';
    }
}

class MenuExistsException extends ManagerException {
    constructor(menu, fileName, lineNumber) {
        super(`Error: The menu ${menu.name} already exists in the manager.`, fileName, lineNumber);
        this.menu = menu;
        this.name = 'MenuExistsException';
    }
}

class MenuNotRegisteredException extends ManagerException {
    constructor(menu, fileName, lineNumber) {
        super(`Error: The menu ${menu.name} is not registered in the manager.`, fileName, lineNumber);
        this.menu = menu;
        this.name = 'MenuNotRegisteredException';
    }
}

class NullOrInvalidAllergenException extends ManagerException {
    constructor(fileName, lineNumber) {
        super('Error: The allergen is null or not a valid Allergen object.', fileName, lineNumber);
        this.name = 'NullOrInvalidAllergenException';
    }
}

class AllergenExistsException extends ManagerException {
    constructor(allergen, fileName, lineNumber) {
        super(`Error: The allergen ${allergen.name} already exists in the manager.`, fileName, lineNumber);
        this.allergen = allergen;
        this.name = 'AllergenExistsException';
    }
}

class AllergenNotRegisteredException extends ManagerException {
    constructor(allergen, fileName, lineNumber) {
        super(`Error: The allergen ${allergen.name} is not registered in the manager.`, fileName, lineNumber);
        this.allergen = allergen;
        this.name = 'AllergenNotRegisteredException';
    }
}

class NullOrInvalidDishException extends ManagerException {
    constructor(fileName, lineNumber) {
        super('Error: The dish is null or not a valid dish object.', fileName, lineNumber);
        this.name = 'NullOrInvalidDishException';
    }
}

class DishExistsException extends ManagerException {
    constructor(dish, fileName, lineNumber) {
        super(`Error: The dish ${dish.name} already exists in the manager.`, fileName, lineNumber);
        this.dish = dish;
        this.name = 'DishExistsException';
    }
}

class DishNotRegisteredException extends ManagerException {
    constructor(dish, fileName, lineNumber) {
        super(`Error: The dish ${dish.name} is not registered in the manager.`, fileName, lineNumber);
        this.dish = dish;
        this.name = 'DishNotRegisteredException';
    }
}

class NullOrInvalidRestaurantException extends ManagerException {
    constructor(fileName, lineNumber) {
        super('Error: The restaurant is null or not a valid restaurant object.', fileName, lineNumber);
        this.name = 'NullOrInvalidRestaurantException';
    }
}

class RestaurantExistsException extends ManagerException {
    constructor(restaurant, fileName, lineNumber) {
        super(`Error: The restaurant ${restaurant.name} already exists in the manager.`, fileName, lineNumber);
        this.restaurant = restaurant;
        this.name = 'RestaurantExistsException';
    }
}

class RestaurantNotRegisteredException extends ManagerException {
    constructor(restaurant, fileName, lineNumber) {
        super(`Error: The restaurant ${restaurant.name} is not registered in the manager.`, fileName, lineNumber);
        this.restaurant = restaurant;
        this.name = 'RestaurantNotRegisteredException';
    }
}

// Objeto Singleton´
const RestaurantsManager = (function () {
    // Instancia unica
    let instantiated;
    // Iniciacion del Singleton
    function init() {
        class RestaurantsManager {
            #name= "RestaurantManager";
            #categories = [];
            #allergens = [];
            #dishes = [];
            #menus = [];
            #restaurants = [];

            #sortCategoriesFunc = (catA, catB) => (
                (catA.category.name.toLocaleLowerCase() < catB.category.name.toLocaleLowerCase())
                ? -1 : 1
            );

            constructor(){
            }    
             
            get name() {
                return this.#name;
            }
            set name(name) {
                name = name.trim();
				if (name === null || name === ""){
                    throw new EmptyValueException("name");
                }   
				this.#name = name;
            }


            get categories() {
                let array = this.#categories;
                return {
                    * [Symbol.iterator]() { 
                        for (let i = 0; i < array.length; i++){
                            yield array[i];
                        }
                    },
                };
            }

            get allergens() {
                //let nextIndex = 0;
                let array = this.#allergens;
                return {
                    * [Symbol.iterator]() {
                        for (let i = 0; i < array.length; i++){
                            yield array[i];
                        }
                    },
                };
            }

            get menus() {
                //let nextIndex = 0;
                let array = this.#menus;
                return {
                    * [Symbol.iterator]() {
                        for (let i = 0; i < array.length; i++){
                            yield array[i];
                        }
                    },
                };
            }

            get restaurants() {
                //let nextIndex = 0;
                let array = this.#restaurants;
                return {
                    * [Symbol.iterator]() {
                        for (let i = 0; i < array.length; i++){
                            yield array[i];
                        }
                    },
                };
            }

            get dishes() {
                //let nextIndex = 0;
                let array = this.#dishes;
                return {
                    * [Symbol.iterator]() {
                        for (let i = 0; i < array.length; i++){
                            yield array[i];
                        }
                    },
                };
            }            
            
            // Métodos para agregar y quitar categorías
            addCategory(...categories) {
                for (const category of categories) {
                if (category === null || !(category instanceof Category)) {
                    throw new NullOrInvalidCategoryException();
                    }
                const position = this.#getCategoryPosition(category);
                if (position === -1) {
                    this.#categories.push({
                    category,
                    dishes: [],
                    });
                    this.#categories.sort(this.#sortCategoriesFunc);
                } else {
                    throw new CategoryExistsException(category);
                }
                }
                return this;
            }

            #getCategoryPosition(category) {
                return this.#categories.findIndex((x) => x.category.name === category.name);
            }

            
            removeCategory(...categories) {
            for (const category of categories) {
                const position = this.#getCategoryPosition(category);
                if (position !== -1) {
                    this.#categories.splice(position, 1);
                } else {
                    throw new CategoryNotExistException(category);
                }
            }
            return this;
            }
            

            // Métodos para agregar y quitar menús
            addMenu(...menus) {
                for (const menu of menus) {
                if (menu === null || !(menu instanceof Menu)) {
                    throw new NullOrInvalidMenuException();
                    }
                const position = this.#getMenuPosition(menu);
                if (position === -1) {
                    this.#menus.push({
                    menu,
                    dishes: [],
                    });
                }else{
                    throw new MenuExistsException(menu);
                }
                }
                return this;
            }
            
            #getMenuPosition(menu) {
                return this.#menus.findIndex((x) => x.menu.name === menu.name);
            }

            removeMenu(...menus) {
            for (const menu of menus) {
                const position = this.#getMenuPosition(menu);
                if (position !== -1) {
                    this.#menus.splice(position, 1);
                } else {
                    throw new MenuNotRegisteredException(menu);
                }
            }
            return this;
            }

            // Métodos para agregar y quitar alérgenos
            addAllergen(...allergens) {
                for (const allergen of allergens) {
                if (allergen === null || !(allergen instanceof Allergen)) {
                    throw new NullOrInvalidAllergenException();
                    }
                const position = this.#getAllergenPosition(allergen);
                if (position === -1) {
                    this.#allergens.push({
                    allergen,
                    dishes: [],
                    });
                }else{
                    throw new AllergenExistsException(allergen);
                }
                }
                return this;
            }
            
            #getAllergenPosition(allergen) {
                return this.#allergens.findIndex((x) => x.allergen.name === allergen.name);
            }

            removeAllergen(...allergens) {
            for (const allergen of allergens) {
                const position = this.#getAllergenPosition(allergen);
                if (position !== -1) {
                    this.#allergens.splice(position, 1);
                } else {
                    throw new AllergenNotRegisteredException(allergen);
                }
            }
            return this;
            }        

            // Métodos para agregar y quitar platos
            addDish(...dishes) {
                for (const dish of dishes) {
                if (dish === null || !(dish instanceof Dish)) {
                    throw new NullOrInvalidDishException();
                    }
                const position = this.#getDishPosition(dish);
                if (position === -1) {
                    this.#dishes.push(dish);
                }else{
                    throw new DishExistsException(dish);
                }
                }
                return this;
            }
            
            #getDishPosition(dish) {
                return this.#dishes.findIndex((x) => x.name === dish.name);
            }

        
            removeDish(...dishes) {
                for (const dish of dishes) {
                    const position = this.#getDishPosition(dish);
                    if (position !== -1) {
                        // Borrado de la referencia del plato en la categoría
                        for (const category of this.#categories){
                            const pDish = this.#getDishPositionInCategory(dish, category);
                            if (pDish !== -1) category.dishes.splice(pDish, 1);
                        }
                        // Similar al anterior
                        //for (let i = 0; i < this.#categories.length; i++){
                            //const pDish = this.#getDishPositionInCategory(dish, this.#categories[i]);
                            //if (pDish !== -1) this.#categories[i].dishes.splice(pDish, 1);
                        //}
                    }else {
                        throw new DishNotRegisteredException(dish);
                    }
                    if(position !== -1) {
                        for(const allergen of this.#allergens){
                            const pDish = this.#getDishPositionInAllergen(dish, allergen);
                            if(position !== -1) {
                                allergen.dishes.splice(pDish, 1);
                            }
                        }
                    }else {
                        throw new DishNotRegisteredException(dish);
                    }
                    if(position !== -1) {
                        for(const menu of this.#menus){
                            const pMenu = this.#getDishPositionInMenu(dish, menu);
                            if(position !== -1) {
                                menu.dishes.splice(pMenu, 1);
                            }
                        }
                    }else {
                        throw new DishNotRegisteredException(dish);
                    }
                    this.#dishes.splice(position, 1);
                }
                return this;
            }

            // Métodos para agregar y quitar restaurantes
            addRestaurant(...restaurants) {
                for (const restaurant of restaurants) {
                if (restaurant === null || !(restaurant instanceof Restaurant)) {
                    throw new NullOrInvalidRestaurantException();
                    }
                const position = this.#getRestaurantPosition(restaurant);
                if (position === -1) {
                    this.#restaurants.push({
                    restaurant,
                    });
                }else{
                    throw new RestaurantExistsException(restaurant);
                }
                }
                return this;
            }
            
            #getRestaurantPosition(restaurant) {
                return this.#restaurants.findIndex((x) => x.restaurant.name === restaurant.name);
            }

            removeRestaurant(...restaurants) {
            for (const restaurant of restaurants) {
                const position = this.#getRestaurantPosition(restaurant);
                if (position !== -1) {
                    this.#restaurants.splice(position, 1);
                } else {
                    throw new RestaurantNotRegisteredException(restaurant);
                }
            }
            return this;
            }

            assignCategoryToDish(category, ...dishes) {
                if (!(category instanceof Category)) {
                    throw new ObjecManagerException('category', 'Category');
                }
                let categoryPosition = this.#getCategoryPosition(category);
                if (categoryPosition === -1) {
                    this.addCategory(category);
                    categoryPosition = this.#getCategoryPosition(category);
                }
            
                for (const dish of dishes) {
                    if (!(dish instanceof Dish)) {
                        throw new ObjecManagerException('dish', 'Dish');
                    }
                    let dishPosition = this.#getDishPosition(dish);
                    if (dishPosition === -1) {
                        this.addDish(dish);
                        dishPosition = this.#getDishPosition(dish);
                    }
                    const position = this.#getDishPositionInCategory(dish, this.#categories[categoryPosition]);
                    if (position === -1) {
                        this.#categories[categoryPosition].dishes.push(this.#dishes[dishPosition]);
                        //this.#categories[categoryPosition].dishes.sort(this.#sortDishesInCategoryFunc);
                    } else {
                        throw new DishExistsException(dish, category);
                    }
                }
                return this;
            }
            
            #getDishPositionInCategory(dish, category) {
                return category.dishes.findIndex((x) => x.name === dish.name);
            }

            deassignCategoryToDish(category, ...dishes) {
                if (category === null) {
                    throw new NullOrInvalidCategoryException(category);
                }           
                // Obtiene la posición de la categoria
                let categoryPosition = this.#getCategoryPosition(category);
                if (categoryPosition === -1){
                    throw new CategoryNotExistException(category);
                }            
                for (const dish of dishes) {
                    if (dish === null) {
                        throw new NullOrInvalidDishException(dish);
                    }            
                    // Obtiene la posición del plato
                    let dishPosition = this.#getDishPosition(dish, this.#categories[categoryPosition].dishes);
                    if (dishPosition !== -1) {
                        // Borra la categoria asociada al plato
                        this.#categories[categoryPosition].dishes.splice(dishPosition, dishes.length);
                    } else {
                        throw new DishNotRegisteredException(dish);
                    }
                }            
                return this;
            }              

            // Métodos para asignar y desasignar alérgenos a platos
            assignAllergenToDish(allergen, ...dishes) {
                if (!(allergen instanceof Allergen)) {
                    throw new ObjecManagerException('allergen', 'Allergen');
                }
                let allergenPosition = this.#getAllergenPosition(allergen);
                if (allergenPosition === -1) {
                    this.addAllergen(allergen);
                    allergenPosition = this.#getAllergenPosition(allergen);
                }
            
                for (const dish of dishes) {
                    if (!(dish instanceof Dish)) {
                        throw new ObjecManagerException('dish', 'Dish');
                    }
                    let dishPosition = this.#getDishPosition(dish);
                    if (dishPosition === -1) {
                        this.addDish(dish);
                        dishPosition = this.#getDishPosition(dish);
                    }
                    const position = this.#getDishPositionInAllergen(dish, this.#allergens[allergenPosition]);
                    if (position === -1) {
                        this.#allergens[allergenPosition].dishes.push(this.#dishes[dishPosition]);
                        //this.#categories[categoryPosition].dishes.sort(this.#sortDishesInCategoryFunc);
                    } else {
                        throw new DishExistsException(dish, allergen);
                    }
                }
                return this;
            }            

            #getDishPositionInAllergen(dish, allergen) {
                return allergen.dishes.findIndex((x) => x.name === dish.name);
            }
            
            deassignAllergenToDish(allergen, ...dishes) {
                if (allergen === null) {
                    throw new NullOrInvalidAllergenException(allergen);
                }           
                // Obtiene la posición del alérgeno
                let allergenPosition = this.#getAllergenPosition(allergen);
                if (allergenPosition === -1){
                    throw new AllergenNotRegisteredException(allergen);
                } 
                for (const dish of dishes) {
                    if (dish === null) {
                        throw new NullOrInvalidDishException(dish);
                    }            
                    // Obtiene la posición del plato
                    let dishPosition = this.#getDishPosition(dish, this.#allergens[allergenPosition].dishes);

                    //console.log(`Platos para eliminar de Allergen: ${allergen.name}, Dish: ${dish.name}, Dish Position: ${dishPosition}`);

                    if (dishPosition !== -1) {
                        // Borra el alérgeno asociado al plato
                        this.#allergens[allergenPosition].dishes.splice(dishPosition, dishes.length);

                    } else {
                        throw new DishNotRegisteredException(dish);
                    }
                }            
                return this;
            }

            // Métodos para asignar y desasignar platos a menus
            assignDishToMenu(menu, ...dishes) {
                if (!(menu instanceof Menu )) {
                    throw new ObjecManagerException('menu', 'Menu');
                }
                let menuPosition = this.#getMenuPosition(menu);
                if (menuPosition === -1) {
                    this.addMenu(menu);
                    menuPosition = this.#getMenuPosition(menu);
                }
            
                for (const dish of dishes) {
                    if (!(dish instanceof Dish)) {
                        throw new ObjecManagerException('dish', 'Dish');
                    }
                    let dishPosition = this.#getDishPosition(dish);
                    if (dishPosition === -1) {
                        this.addDish(dish);
                        dishPosition = this.#getDishPosition(dish);
                    }
                    const position = this.#getDishPositionInMenu(dish, this.#menus[menuPosition]);
                    if (position === -1) {
                        this.#menus[menuPosition].dishes.push(this.#dishes[dishPosition]);
                        //this.#categories[categoryPosition].dishes.sort(this.#sortDishesInCategoryFunc);
                    } else {
                        throw new DishExistsException(dish, menu);
                    }
                }
                return this;
            }

            #getDishPositionInMenu(dish, menu) {
                    return menu.dishes.findIndex((x) => x.name === dish.name);

            }

            #getDishPositionInMenu2(dish, menu) {
               
                    return menu.findIndex((x) => x.name === dish.name);

            }

            deassignDishToMenu(menu, ...dishes) {
                if (menu === null) {
                    throw new NullOrInvalidMenuException(menu);
                }           
                let menuPosition = this.#getMenuPosition(menu);
                if (menuPosition === - 1){
                    throw new MenuNotRegisteredException(menu);
                }
                for (const dish of dishes) {
                    if (dish === null) {
                        throw new NullOrInvalidDishException(dish);
                    }         
                    let dishPosition = this.#getDishPosition(dish, this.#menus[menuPosition].dishes);

                    console.log(`Platos para eliminar de Menu: ${menu.name}, Dish: ${dish.name}, Dish Position: ${dishPosition}`);

                    if (dishPosition !== -1) {
                        this.#menus[menuPosition].dishes.splice(dishPosition, dishes.length);
                    } else {
                        throw new DishNotRegisteredException(dish);
                    }
                }            
                return this;
            } 

            // Método para cambiar posiciones de platos en menús
            changeDishesPositionsInMenu(menu, dish1, dish2) {
                if (menu === null) {
                    throw new NullOrInvalidMenuException(menu);
                } 
                // Obtiene la posicion del menu
                let menuPosition = this.#getMenuPosition(menu);
                if (menuPosition === - 1){
                    throw new MenuNotRegisteredException(menu);
                }
                // Obtiene la posicion de los platos
                let dish1Position = this.#getDishPositionInMenu(dish1, this.#menus[menuPosition]);
                let dish2Position = this.#getDishPositionInMenu(dish2, this.#menus[menuPosition]);
                if (dish1Position === - 1 || dish2Position === -1){ 
                    throw new DishNotRegisteredException(dish1, dish2);
                } 
                // Imprime los nombres de los platos antes del intercambio
                console.log("Nombres de los platos antes del intercambio:");
                console.log("Plato 1:", this.#menus[menuPosition].dishes[dish1Position].name, `[${dish1Position}]`);
                console.log("Plato 2:", this.#menus[menuPosition].dishes[dish2Position].name, `[${dish2Position}]`);
                            
                // Cambia las posiciones de los platos
                [this.#menus[menuPosition].dishes[dish1Position], this.#menus[menuPosition].dishes[dish2Position]] =
                    [this.#menus[menuPosition].dishes[dish2Position], this.#menus[menuPosition].dishes[dish1Position]];

                // Imprime las posiciones de los platos después del intercambio
                console.log(`Después del cambio - Plato1 en posición: ${dish2Position}, Plato2 en posición: ${dish1Position}`);

                return [dish1Position, dish2Position];
            } 
            
            
            // Generador con método iterador
            getDishesInCategory(category){
                let categoryPosition = this.#getCategoryPosition(category);
                if (categoryPosition === - 1){
					throw new CategoryNotExistException();
				}
				let array = this.#categories[categoryPosition].dishes;
				return {
				  * [Symbol.iterator](){
					for (let i = 0; i < array.length; i++){ // Recorre la lista de platos asociadas a la categoria						
						yield array[i];
					}  
				  }
				}
			}

            * getDishesWithCondition(condition) {
                for (let dish of this.#dishes) {
                    if (condition(dish)) {
                        console.log(`Dish matched condition: ${dish.name}`);
                        yield dish;
                    }
                }
            }
            
            
            // Iterador y condicion
            * categoryCondition(category, condition){ 
                let categoryPosition = this.#getCategoryPosition(category);
                if (categoryPosition === - 1){
					throw new CategoryNotExistException();
				}

                for (const dish of this.#categories[categoryPosition].dishes){
                    if (condition(dish)) {
                        //console.log(`Dish matched condition: ${dish.name}`);
                        
                        yield dish;
                    }else{
                        console.log ("La categoría no tiene platos asignados");
                    }				
			    }
            }    

            getDishesWithAllergen(allergen){
                let allergenPosition = this.#getAllergenPosition(allergen);
                if(allergenPosition === -1){
                    throw new AllergenNotRegisteredException();
                }
                let array = this.#allergens[allergenPosition].dishes;
                return {
                    *[Symbol.iterator](){
                        for (let i = 0; i < array.length; i++){
                            yield array[i];
                        }
                    }
                }
            } 
    
            getDishesInMenu(menu){
                let menuPosition = this.#getMenuPosition(menu);
                if (menuPosition === - 1){
					throw new MenuNotRegisteredException();
				}
				let array = this.#menus[menuPosition].dishes;
				return {
				  * [Symbol.iterator](){
					for (let i = 0; i < array.length; i++){ // Recorre la lista de platos asociadas a la categoria						
						yield array[i];
					}  
				  }
				}
			}            

            findDish(dish) {
                const dishPosition = this.#getDishPosition(dish);
                if (dishPosition === -1) {
                    throw new DishNotRegisteredException();
                }
            
                const foundDish = this.#dishes[dishPosition].dish;
            
                return {
                    [Symbol.iterator]: function* () {
                        yield foundDish;
                    },
                };
            }

            createDish(name, description, ingredients = [], image = "") {
                if (!name) {
                    throw new EmptyValueException('name');
                }           
                // Busca el plato con el mismo nombre
                const existingDish = this.#dishes.findIndex(dish => dish.name === name);            
                if (existingDish !==-1) {
                    // Si ya existe, devuelve el plato existente
                    return this.#dishes[existingDish];
                } else {
                    // Si no existe, crea un nuevo plato, lo añade y devuelve
                    const newDish = new Dish(name, description, ingredients, image);
                    //this.addDish(newDish);
                    return newDish;
                }
            }
            
            
            createCategory(name, description = "") {
                if (!name) {
                    throw new EmptyValueException('name');
                }            
                // Busca el índice de la categoría con el mismo nombre
                const existingCategoryIndex = this.#categories.findIndex(category => category.name === name);           
                if (existingCategoryIndex !== -1) {
                    return this.#categories[existingCategoryIndex];
                } else {
                    const newCategory = new Category(name, description);
                    //this.addCategory(newCategory);
                    return newCategory;
                }
            }

            createAllergen(name, description = "") {
                if (!name) {
                    throw new EmptyValueException('name');
                }            
                const existingAllergenIndex = this.#allergens.findIndex(allergen => allergen.name === name);           
                if (existingAllergenIndex !== -1) {
                    return this.#allergens[existingAllergenIndex];
                } else {
                    const newAllergen = new Allergen(name, description);
                    this.addAllergen(newAllergen);
                    return newAllergen;
                }
            }

            createMenu(name, description = "") {
                if (!name) {
                    throw new EmptyValueException('name');
                }            
                const existingMenuIndex = this.#menus.findIndex(menu => menu.name === name);           
                if (existingMenuIndex !== -1) {
                    return this.#menus[existingMenuIndex];
                } else {
                    const newMenu = new Menu(name, description);
                    this.addMenu(newMenu);
                    return newMenu;
                }
            }            

            createRestaurant(name, description = "", location = new Coordinate(0, 0)) {
                if (!name) {
                    throw new EmptyValueException('name');
                }            
                const existingRestaurantIndex = this.#restaurants.findIndex(restaurant => restaurant.name === name);           
                if (existingRestaurantIndex !== -1) {
                    return this.#restaurants[existingRestaurantIndex];
                } else {
                    const newRestaurant = new Restaurant(name, description, location);
                    //this.addRestaurant(newRestaurant);
                    return newRestaurant;
                }
            } 
            
            
            findDishes(filterFunction) {
                let array;
                if (filterFunction instanceof Function){
                    array = Array.from(this.#dishes.values()); //Hacemos una copia para no perder la ordenación actual.
                    let filteredArray = [];
                    //array.sort(filterFunction);
                    for (let index = 0; index < array.length; index++){
                        if (filterFunction(array[index])){
                            filteredArray.push(array[index]);
                        }       
                    }
                    if (filteredArray.length > 0) {
                        return filteredArray;
                    } else {
                        return console.log("No hay elementos que cumplan con el filtro seleccionado.");
                    }
                } else {
                    return console.log("La función de filtro no es válida.");
                }  

                //return array;
            }

            getCategory(name) {
                let cat = this.#categories.get(name);
                if (!cat) {
                  cat = new Category(name, description);
                } else {
                  cat = cat.category;
                }
                return cat;
            }

            getRestaurant(name) {
                let rest = this.#restaurants.get(name);
                if (!rest) {
                  rest = new Restaurant(name, description);
                } else {
                  rest = rest.restaurant;
                }
                return rest;
            }

            getDish(name) {
                let dis = this.#dishes.get(name);
                if (!dis) {
                  dis = new Dish(name, description);
                } else {
                  dis = dis.dish;
                }
                return dis;
            }

        }
   
        const instance = new RestaurantsManager();
        Object.freeze(instance);
        return instance;
    }
  
    return {
      getInstance() {
        if (!instantiated) {
          instantiated = init();
        }
        return instantiated;
      },
    };
  })();

  export default RestaurantsManager;

  export { 
    Dish, Category, Allergen, Menu, Restaurant, Coordinate,
  }; 
