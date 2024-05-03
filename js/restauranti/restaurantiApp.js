import RestaurantsManager, {
    Dish, Category, Allergen, Menu, Restaurant, Coordinate,
} from './restaurantiModel.js'; 
import RestaurantiController from './restaurantiController.js';
import RestaurantiView from './restaurantiView.js';

const RestaurantiApp = 
new RestaurantiController(RestaurantsManager.getInstance(), 
new RestaurantiView());

let d1 = new Dish('Guiso de alubias', 'Alubias vegetarianas', ['Alubia', 'Cebolla'], 'img/d1.jpg');
let d2 = new Dish('Guiso de garbanzos', 'Garbanzos con chorizo', ['Garbanzo', 'Chorizo'], 'img/d2.jpg');
let d3 = new Dish('Sopa de gambas', 'Gambas estofadas', ['Gambas', 'Cebolleta'], 'img/d3.jpg');
let d4 = new Dish('Ajoblanco', 'Sopa de ajoblanco', ['Ajo', 'almendra'], 'img/d4.jpg');
let d5 = new Dish('Mandu al vapor', 'Pasta cocinada al vapor', ['Obleas arroz', 'tofu'], 'img/d5.jpg');
let d6 = new Dish('Espagueti con mollejas', 'Salteado de espagueti y mollejas ', ['Espagueti', 'Mollejas'], 'img/d6.jpg');
let d7 = new Dish('Macarrones gratinados', 'Macarrones con berengena', ['Macarrones', 'Tomate'], 'img/d7.jpg');
let d8 = new Dish('Lasagna', 'Lasagna de carne', ['Pasta', 'Carne'], 'img/d8.jpg');
let d9 = new Dish('Pastel de moca', 'Bizcocho de moca', ['Harina', 'Cafe'], 'img/d9.jpg');
let d10 = new Dish('Tarta de queso', 'Tarta de requeson', ['Harina', 'Requesón'], 'img/d10.jpg');
let d11 = new Dish('Tiramisu', 'Bizcocho con mascarpone y cacao', ['Queso', 'Cacao'], 'img/d11.jpg');
let d12 = new Dish('Soufle de chocolate', 'Bizchoco de chocolate caliente', ['Harina', 'Chocolate'], 'img/d12.jpg');
let d13 = new Dish('Magdalena', 'Magdalena casera', ['Harina', 'Azucar'], 'img/d13.jpg');

let cat1 = new Category('Guisos', 'Sopas y estofados caseros');
let cat2 = new Category('Pasta', 'Pastas de elaboración propia');
let cat3 = new Category('Postres', 'Postres artesanales');
let cat4 = new Category('Cat4', 'Categoria4');

let a1 = new Allergen('Cereales', 'Trigo, Arroz');
let a2 = new Allergen('Frutos secos', 'Almendras, pistachos');
let a3 = new Allergen('Lácteos', 'Leche, queso, yogur');
let a4 = new Allergen('Mariscos', 'Gambas, calamar, mejillones');
let a5 = new Allergen('A5', 'alergeno5');

let m1 = new Menu('Menu 1', 'Menu diario');
let m2 = new Menu('Menu 2', 'Menu Vegetariano');
let m3 = new Menu('Menu 3', 'Menu celebración');
let m4 = new Menu('m4', 'Menu4');

// Crea las coordenadas para pasarselas a los restaurantes
let c1 = new Coordinate(2938344, 32234342);
let c2 = new Coordinate(-900000,580111);
let c3 = new Coordinate(23456666, 6662235);
let c4 = new Coordinate(-111112231, 2345);

let r1 = new Restaurant('Park Restauranti', 'restaurante', c1);
let r2 = new Restaurant('Central Restauranti', 'restaurante 2', c2);
let r3 = new Restaurant('Square Restauranti', 'restaurante 3', c3);
let r4 = new Restaurant('r4', 'restaurante 4', c2);

RestaurantiApp.onLoad([
    d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13],
   [cat1, cat2, cat3], 
   [a1, a2, a3, a4],
   [m1, m2, m3],
   [r1, r2, r3],
);


export default RestaurantiApp;