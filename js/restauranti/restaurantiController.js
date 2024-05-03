import RestaurantsManager, {
    Dish, Category, Allergen, Menu, Restaurant, Coordinate,
} from './restaurantiModel.js'; 

const MODEL = Symbol('RestaurantiModel');
const VIEW = Symbol('RestaurantiView');

class RestaurantiController {
    constructor(model, view) {
        this[MODEL] = model;
        this[VIEW] = view;

        this[VIEW].showAdminMenu();
        
        this.onInit(); 
        
        this[VIEW].bindInit(this.handleInit);    
    }

    onInit = () => {
        this[VIEW].showCategories();
        this[VIEW].bindCategoryLinks(this.handleCategoryClick); // principal categories        
    }

    onAddCategory = () => {
        this[VIEW].showCategoriesInMenu(this[MODEL].categories);
    };

    onAddRestaurant = () => {
        this[VIEW].showRestaurantInMenu(this[MODEL].restaurants);
    }

    handleInit = () => {
        this.onInit();
        
    }

    onLoad = (dishes, categories, allergens, menus, restaurants) => {
        for (const dish of dishes) {
            this[MODEL].addDish(dish);
            //this[VIEW].showPlatos(dish);
        }

        // Añadir categorías al modelo
        for (const category of categories) {
            this[MODEL].addCategory(category);
            //this[VIEW].showCategory(category);
        }

        // Añadir alérgenos al modelo
        for (const allergen of allergens) {
            this[MODEL].addAllergen(allergen);
            //this[VIEW].showAllergen(allergen);
        }

        // Añadir menús al modelo
        for (const menu of menus) {
            this[MODEL].addMenu(menu);
            //this[VIEW].showMenu(menu);
        }

        // Añadir restaurantes al modelo
        for (const restaurant of restaurants) {
            this[MODEL].addRestaurant(restaurant);
            //this[VIEW].showRestaurant(restaurant);
        }

        for (const dish of dishes) {
            if (dish.name === 'Guiso de alubias' || dish.name === 'Guiso de garbanzos' || dish.name === 'Sopa de gambas' || dish.name === 'Ajoblanco') {
                this[MODEL].assignCategoryToDish(categories[0], dish);
            } else if (dish.name === 'Mandu al vapor' || dish.name === 'Espagueti con mollejas' || dish.name === 'Macarrones gratinados' || dish.name === 'Lasagna') {
                this[MODEL].assignCategoryToDish(categories[1], dish);
            } else if (dish.name === 'Tarta de queso' || dish.name === 'Pastel de moca' || dish.name === 'Tiramisu' || dish.name === 'Soufle de chocolate') {
                this[MODEL].assignCategoryToDish(categories[2], dish);
            }        
        } 
        
        for (const dish of dishes) {
            if (dish.name === 'Macarrones gratinados' || dish.name === 'Lasagna' || dish.name === 'Soufle de chocolate' || dish.name === 'Pastel de moca') {
                this[MODEL].assignAllergenToDish(allergens[0], dish);
            }else if (dish.name === 'Ajoblanco' || dish.name === 'Lasagna' || dish.name === 'Tiramisu' || dish.name === 'Mandu al vapor') {
                this[MODEL].assignAllergenToDish(allergens[1], dish);
            }else if (dish.name === 'Tarta de queso' || dish.name === 'Lasagna' || dish.name === 'Soufle de chocolate' || dish.name === 'Pastel de moca') {
                this[MODEL].assignAllergenToDish(allergens[2], dish);
            }else if (dish.name === 'Sopa de gambas' || dish.name === 'Macarrones gratinados') {
                this[MODEL].assignAllergenToDish(allergens[3], dish);
            }
        }
        
        for (const dish of dishes) {
            if (dish.name === 'Guiso de alubias' || dish.name === 'Mandu al vapor' || dish.name === 'Pastel de moca') {
                this[MODEL].assignDishToMenu(menus[0], dish);
            }else if (dish.name === 'Sopa de gambas' || dish.name === 'Macarrones gratinados' || dish.name === 'Tiramisu') {
                this[MODEL].assignDishToMenu(menus[1], dish);
            }else if (dish.name === 'Guiso de garbanzos' || dish.name === 'Lasagna' || dish.name ==='Soufle de chocolate') {
                this[MODEL].assignDishToMenu(menus[2], dish);
            }
        }

        /*for (const categoryObj of this[MODEL].categories) {
            const category = categoryObj.category;
            const categoryDishes = categoryObj.dishes;
        
            console.log(`Platos en la categoría ${category.name}:`);
            
            for (const dish of categoryDishes) {
                console.log(dish.name);
            } 
        }*/

        this.onAddCategory();
        this[VIEW].bindCategoryNav(this.handleShowCategoryNav);
        this[VIEW].bindAllergenNav(this.handleShowAllergenNav);
        this[VIEW].bindMenuNav(this.handleShowMenuNav);
        this.onAddRestaurant();
        this[VIEW].bindRestaurantNav(this.handleShowRestaurantNav);
            
        this[VIEW].bindAdminMenuCategory(this.handleNewCategoryForm, this.handleModCategoryform);
        this[VIEW].bindAdminMenuRestaurant(this.handleNewRestaurantform); 
        this[VIEW].bindAdminMenuDish(this.handleNewDishform, this.handleRemoveDishForm);
        this[VIEW].bindAdminMenu(this.handleChangeMenuform);   
        
        this[VIEW].bindRestaurant(this.handleRestaurantFoot);
        this[VIEW].bindCategory(this.handleCategoryFoot);
        this[VIEW].bindAllergen(this.handleAllergenFoot);
        this[VIEW].bindMenu(this.handleMenuFoot);
    };

    handleShowCategoryNav = () => {
        this[VIEW].showCategoriesInMenu(this[MODEL].categories);
        this.onAddCategory();
        this[VIEW].bindSubCategoryNav(this.handleCategoryClick);
    }

    handleShowAllergenNav = () => {
        this[VIEW].showAllergenInMenu(this[MODEL].allergens);
        this[VIEW].bindSubAllergenNav(this.handleAllergenClick);
    }

    handleShowMenuNav = () => {
        this[VIEW].showMenuInMenu(this[MODEL].menus);
        this[VIEW].bindSubMenuNav(this.handleMenuClick);
    }

    handleShowRestaurantNav = () => {
        this[VIEW].showRestaurantInMenu(this[MODEL].restaurants);
        this[VIEW].bindSubRestaurantNav(this.handleRestaurantClick);
    }

    handleNewCategoryForm = () => {
        this[VIEW].showNewCategoryForm();
        this[VIEW].bindNewCategoryForm(this.handleCreateCategory);
    };

    handleCreateCategory = (name, desc) => {
        console.log(name);
        let cat = this[MODEL].createCategory(name, desc);
        let done; 
        let error;
        try {
            this[MODEL].addCategory(cat);
            done = true;
            // invocar al modal para decir que todo va bien
            this[VIEW].showNewCategoryModal(done, cat, error);
            this.onAddCategory();
        } catch (error){
            // invocar al modal con el mensaje de que ya existía
            done = false;
            error = error;
            this[VIEW].showNewCategoryModal(done, cat, error);
        }       
    }

    handleModCategoryform = () => {
        const category = this[MODEL].categories;
        const dish = this[MODEL].dishes;

        this[VIEW].showModCategoryForm(dish, category);
        this[VIEW].bindModCategoryForm(this.handleModifyCategory, this.handleDeleteCategory);
    } 
    
    handleModifyCategory = (selectedDish, selectedCategory) => {
        let dishMod = null;
        let newCategory = null;
        let done;
        let error;        
        try {
            // Buscar la nueva categoría
            for (const categoryObj of this[MODEL].categories) {
                const category = categoryObj.category;
                if (category.name === selectedCategory) {
                    newCategory = category;
                    break;
                }
            }

            let dish = this[MODEL].dishes;
            for (const dis of dish) {
                if(dis.name === selectedDish) {
                    dishMod = dis;
                    break;
                }
            }
    
            if (newCategory && dishMod) { 
                console.log(newCategory, dishMod);
                this[MODEL].assignCategoryToDish(newCategory, dishMod);
                done = true;
                this[VIEW].showModCategoryModal(done, newCategory, error);
            }
        } catch (error) {
            done = false;
            error = error;
            this[VIEW].showModCategoryModal(done, newCategory, error);
        }
    };
       
    handleDeleteCategory = (selectedCategoryName) => {
        let done;
        let error; 
        try {
            let categoryToRemove = null;
            for (const categoryObj of this[MODEL].categories) {
                const category = categoryObj.category;
                if (category.name === selectedCategoryName) {
                    categoryToRemove = category;
                    break;
                }
            }
            if (categoryToRemove) {
                this[MODEL].removeCategory(categoryToRemove);
                done = true;
                this[VIEW].showRemoveCategoryModal(done, categoryToRemove, error);
                this.onAddCategory();
            }
        } catch (error) {
            done = false;
            error = error.message;
            this[VIEW].showRemoveCategoryModal(done, categoryToRemove, error);
        }
    };


    handleNewRestaurantform = () => {
        this[VIEW].showNewRestaurantForm();
        this[VIEW].bindNewRestaurantForm(this.handleCreateRestaurant);
    }

    handleCreateRestaurant = (name, desc, lat, lon) => {
        let location = new Coordinate(lat, lon);
        let rest = this[MODEL].createRestaurant(name, desc, location);
    
        let done; let
          error;
        try {
          this[MODEL].addRestaurant(rest);
          done = true;
          this.onAddRestaurant();
        } catch (exception) {
          done = false;
          error = exception;
        }
        this[VIEW].showNewRestaurantModal(done, rest, error);
    };

    handleNewDishform = () => {
        const category = this[MODEL].categories;
        const allergen = this[MODEL].allergens;
        this[VIEW].showNewDishForm(category, allergen);
        this[VIEW].bindNewDishForm(this.handleCreateDish, this.handleAddIngredient);
    }

    handleCreateDish = (dishData) => {
        const { name, description, category, allergens, ingredients, imageUrl } = dishData;
        let dis = '';
        let cat = null;
        let aller = [];   
        let done; 
        let error;
        try {
            for (const categoryObj of this[MODEL].categories) {
                const categoryItem = categoryObj.category;
                if (categoryItem.name === category) {
                    cat = categoryItem;
                    break;
                }
            }
            for (const allergenObj of this[MODEL].allergens) {
                const allergenItem = allergenObj.allergen;
                if(allergenItem.name === allergens) {
                    aller = allergenItem;
                    break;
                }
            }
            if (name) {
                dis = this[MODEL].createDish(name, description, ingredients, imageUrl);
                this[MODEL].addDish(dis);
                this[MODEL].assignCategoryToDish(cat, dis);
                this[MODEL].assignAllergenToDish(aller, dis);
                done = true;
                this[VIEW].showNewDishModal(done, dis, error);
            }    
        } catch (exception) {
          done = false;
          error = exception;
          this[VIEW].showNewDishModal(done, dis, error);
        }
    };

    handleAddIngredient = () => {
        const ingredientInput = document.querySelector('input[name="ingredient[]"]');
        ingredientInput.value = '';
    }; 

    handleChangeMenuform = () => {
        const menu = this[MODEL].menus;
        const dish = this[MODEL].dishes;
    
        this[VIEW].showNewMenuForm(menu, dish);
        
        // Agregar evento change al select de menú
        const menuSelect = document.getElementById('cMenu');
        menuSelect.addEventListener('change', (event) => {
            const selectedMenuName = event.target.value;
            let foundMenu = null;
            for (const menuObj of menu) {
                const menu = menuObj.menu;
                if (menu.name === selectedMenuName) {
                    foundMenu = menu;
                    break;
                }
            }

            if (foundMenu) {
                const menuDishes = this[MODEL].getDishesInMenu(foundMenu);
                this[VIEW].showDishMenuForm(selectedMenuName, menuDishes, menu);
            }
        });
        this[VIEW].bindChangeDishInMenu(this.handleChangeInMenu, this.handleAsignMenu, this.handleDesasignMenu);
    }
    
    handleChangeInMenu = (menuName, dish1Name, dish2Name) => {
        let done; 
        let error; 
        let menuChange = null;
        try{
            for (const menuObj of this[MODEL].menus) {
                const menu = menuObj.menu;
                if (menu.name === menuName) {
                    menuChange = menu;
                    break;
                }
            }
        
            let dishChange1 = this[MODEL].dishes;
            let dishChange2 = this[MODEL].dishes;
            for (const dis of dishChange1) {
                if (dis.name === dish1Name) {
                    dishChange1 = dis;
                    break;
                }
            }
            for (const dis of dishChange2) {    
                if (dis.name === dish2Name) {
                    dishChange2 = dis;
                    break;
                }
            }
            if (menuChange && dishChange1 && dishChange2) {
                this[MODEL].changeDishesPositionsInMenu(menuChange, dishChange1, dishChange2);
                done = true;
                this[VIEW].showChangeDishMenuModal(done, menuChange, error);
            }
        }catch (exception) {
            done = false;
            error = exception;
        }
        this[VIEW].showChangeDishMenuModal(done, menuChange, error);
    }
    

    handleAsignMenu = (menuName,selectedDishes) => {
        console.log(menuName,selectedDishes);
        let done; 
        let error;
        try{
            let menuChange = null;
            for (const menuObj of this[MODEL].menus) {
                const menu = menuObj.menu;
                if (menu.name === menuName) {
                    menuChange = menu;
                    break;
                }
            }
            let newDishes = [];
            let dish = this[MODEL].dishes;
            for (const dis of dish) {
                if (dis.name === selectedDishes) {
                    newDishes.push(dis);
                }
            } 
            this[MODEL].assignDishToMenu(menuChange,...newDishes);
            done = true;
            this[VIEW].showChangeDishMenuModal(done, menuChange, error);
        }catch (exception) {
            done = false;
            error = exception;
        }
        this[VIEW].showChangeDishMenuModal(done, menuChange, error);
    }

    handleDesasignMenu = (menuName,selectedDishes) => {
        let done; 
        let error;
        try{
            console.log(menuName,selectedDishes);
            let menuChange = null;
            for (const menuObj of this[MODEL].menus) {
                const menu = menuObj.menu;
                if (menu.name === menuName) {
                    menuChange = menu;
                    break;
                }
            }
            let deleteDish = null;
            let dish = this[MODEL].dishes;
            for (const dis of dish) {
                if (dis.name === selectedDishes) {
                    deleteDish =dis;
                }
            } 
            this[MODEL].deassignDishToMenu(menuChange,...deleteDish);
            done = true;
            this[VIEW].showChangeDishMenuModal(done, menuName, error);
        }catch (exception) {
            done = false;
            error = exception;
        }
        this[VIEW].showChangeDishMenuModal(done, menuName, error);        
    }

    handleRemoveDishForm = () => {
        const dish = this[MODEL].dishes;
        this[VIEW].showRemoveDishForm(dish);
        this[VIEW].bindDeleteDishLinks(this.handleDeleteDish);
    }

    handleDeleteDish = (selectedDish) => {
        console.log(selectedDish);
        let done;
        let error;
        let dishToRemove = null; 
        try {
            for (const dishObj of this[MODEL].dishes) {
                const dish = dishObj.dish;
                if (dish.name === selectedDish) {
                    dishToRemove = dish;
                    console.log(dishToRemove);
                    break;
                }
            }
            if (dishToRemove) {
                this[MODEL].removeDish(dishToRemove);
                done = true;
                this[VIEW].showRemoveDishModal(done, dishToRemove, error);
            }
        } catch (error) {
            done = false;
            error = error.message;
            this[VIEW].showRemoveCategoryModal(done, dishToRemove, error);
        }
    };

   
    handleCategoryClick = (categoryName) => {
        try {
            let foundCategory = null;

            for (const categoryObj of this[MODEL].categories) {
                const category = categoryObj.category;
                if (category.name === categoryName) {
                    foundCategory = category;
                    break;
                }
            }
    
            if (foundCategory) {
                const dishesInCategory = this[MODEL].getDishesInCategory(foundCategory);
                const allergens = this.getAlergenosDePlatos(dishesInCategory);
                
                this[VIEW].showDishes(dishesInCategory, categoryName, allergens);
            } else {
                console.error('La categoría no fue encontrada:', categoryName);
            }
        } catch (error) {
            console.error('Error al obtener los platos de la categoría:', error);
        }
    }

    handleAllergenClick = (allergenName) => {
        try {
            let foundAllergen = null;

            for (const allergenObj of this[MODEL].allergens) {
                const allergen = allergenObj.allergen;
                if (allergen.name === allergenName) {
                    foundAllergen = allergen;
                    break;
                }
            }
    
            if (foundAllergen) {
                const dishesWithAllergen = this[MODEL].getDishesWithAllergen(foundAllergen);

                const allergens = this.getAlergenosDePlatos(dishesWithAllergen);
                
                this[VIEW].showDishes(dishesWithAllergen, allergenName, allergens);
            } else {
                console.error('El alergeno no fue encontrado:', allergenName);
            }
        } catch (error) {
            console.error('Error al obtener los platos con alergenos:', error);
        }
    }

    handleMenuClick = (menuName) => {
        try {
            let foundMenu = null;

            for (const menuObj of this[MODEL].menus) {
                const menu = menuObj.menu;
                if (menu.name === menuName) {
                    foundMenu = menu;
                    break;
                }
            }
    
            if (foundMenu) {
                const dishesInMenu = this[MODEL].getDishesInMenu(foundMenu);
                const allergens = this.getAlergenosDePlatos(dishesInMenu);              
                this[VIEW].showDishes(dishesInMenu, menuName, allergens);
            } else {
                console.error('El menu no fue encontrado:', menuName);
            }
        } catch (error) {
            console.error('Error al obtener los platos del menu:', error);
        }
    }

    handleRestaurantClick = (restaurantName) => {
        try {
            let foundRestaurant = null;
            //console.log(restaurantName);
            for (const restaurantObj of this[MODEL].restaurants) {
                const restaurant = restaurantObj.restaurant;
                if (restaurant.name === restaurantName) {
                    foundRestaurant = restaurant;
                    break;
                }
            }
            
            if (foundRestaurant) {
                this[VIEW].showRestauranti(foundRestaurant);
            } else {
                console.error('El menu no fue encontrado:', menuName);
            }
        } catch (error) {
            console.error('Error al obtener los restaurantes:', error);
        }
    }

    handleRestaurantFoot = () => {
        this[VIEW].showRestaurants(this[MODEL].restaurants);
    }

    handleCategoryFoot = () => {
        this[VIEW].showCategoriesFoot(this[MODEL].categories);
    } 

    handleAllergenFoot = () => {
        this[VIEW].showAllergensFoot(this[MODEL].allergens);
    }

    handleMenuFoot = () => {
        this[VIEW].showMenusFoot(this[MODEL].menus);
    }

    getAlergenosDePlatos = (dishesArray) => {
        const allergens = [];
        for (const dish of dishesArray) {
            for (const allergenObj of this[MODEL].allergens) {
                const allergen = allergenObj.allergen;
                if (allergenObj.dishes.includes(dish)) {
                    allergens.push(allergen);
                }
            }
        }
        return allergens;
    } 

}

export default RestaurantiController;
