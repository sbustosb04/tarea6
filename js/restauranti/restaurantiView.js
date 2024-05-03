import { newCategoryValidation, newRestaurantValidation, newDishValidation, modCategoryValidation} from './validation.js';

const EXECUTE_HANDLER = Symbol('excecuteHandler');

class RestaurantiView {
    constructor(){
        this.main = document.getElementsByTagName('main')[0];
        this.categories = document.getElementById('categories');
        this.menu = document.querySelector('.navbar-nav');
    }
    
    [EXECUTE_HANDLER](handler, handlerArguments, scrollElement, data, url, event) {
        handler(...handlerArguments);
        const scroll = document.querySelector(scrollElement);
        if (scroll) scroll.scrollIntoView();
        history.pushState(data, null, url);
        event.preventDefault();
    }

    init() {
        this.main.replaceChildren();
        this.main.insertAdjacentHTML('afterbegin', `<div class="container">
        <div class="row">
          <div class="col d-md-flex align-items-md-stretch flex-md-nowrap">
            <div class="flex-sm-grow-1">
              <h4 class="d-lg-none">Carta</h4>
            </div>
            <div
              class="article-banner-text d-flex flex-column align-items-center justify-content-center flex-sm-grow-1">
              <h4>Artículo semanal</h4>
              <h5>Coworking</h5>
              <p>¿Cómo compartir espacios de trabajo?</p>
              <a id="button" class="btn" href="#">Ver artículo</a>
            </div>
          </div>
        </div>
      </div>`);
    }

    bindInit(handler) { 
        /*document.getElementById('logo').addEventListener('click', (event) => { 
            handler();            
            event.preventDefault();
            console.log(event.currentTarget);// Referencia al elemento que esta generando el evento          
        }); */
        document.getElementById('logo').addEventListener('click', (event) => {
            this[EXECUTE_HANDLER](handler, [], 'body', { action: 'init' }, '#', event);
            this.clearMain();
            handler();
            console.log(event.currentTarget);
          });      
    }

    bindCategoryLinks(handler) {
        document.getElementById('link-guisos').addEventListener('click', (event) => {
            handler(event.currentTarget.dataset.category);   
            event.preventDefault();
            console.log(event.currentTarget);    
        });  
        document.getElementById('link-pasta').addEventListener('click', (event) => {
            handler(event.currentTarget.dataset.category);   
            event.preventDefault();
            console.log(event.currentTarget);    
        });
        document.getElementById('link-postres').addEventListener('click', (event) => {
            handler(event.currentTarget.dataset.category);   
            event.preventDefault();
            console.log(event.currentTarget);    
        });
    }

    showCategoriesInMenu(categories) {
        const navCats = document.getElementById('navCats');
        const container = navCats.nextElementSibling;
        container.replaceChildren();
        for (const category of categories) {
          container.insertAdjacentHTML('beforeend', 
            `<li><a data-category="${category.category.name}" class="subNavCats dropdown-item" 
            href="#category-list">${category.category.name}</a></li>`);
        }
    } 

    bindCategoryNav(handler) {
        document.getElementById('navCats').addEventListener('click', (event) => {
            handler();   
            event.preventDefault();
            console.log(event.currentTarget);    
        });  
    }

    bindSubCategoryNav(handler) {
        const subcategoryLinks = document.querySelectorAll('.subNavCats.dropdown-item');
        console.log(subcategoryLinks);
        subcategoryLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                const categoryName = link.getAttribute('data-category');
                handler(categoryName);   
                event.preventDefault();
                console.log(event.currentTarget);    
            });
        });
    }
    
    showAllergenInMenu(allergens) {
        const navAller = document.getElementById('navAller');
        const container = navAller.nextElementSibling;
        container.replaceChildren();
        for (const allergen of allergens) {
          container.insertAdjacentHTML('beforeend', 
            `<li><a data-allergen="${allergen.allergen.name}" class="subNavAller dropdown-item" 
            href="#allergen-list">${allergen.allergen.name}</a></li>`);
        }
    } 

    bindAllergenNav(handler) {
        document.getElementById('navAller').addEventListener('click', (event) => {
            handler();   
            event.preventDefault();
            console.log(event.currentTarget);    
        });  
    }

    bindSubAllergenNav(handler) {
        const suballergenLinks = document.querySelectorAll('.subNavAller.dropdown-item');
        console.log(suballergenLinks);
        suballergenLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                const allergenName = link.getAttribute('data-allergen');
                handler(allergenName);   
                event.preventDefault();
                console.log(event.currentTarget);    
            });
        });
    }

    showMenuInMenu(menus) {
        const navMenu = document.getElementById('navMenu');
        const container = navMenu.nextElementSibling;
        container.replaceChildren();
        for (const menu of menus) {
          container.insertAdjacentHTML('beforeend', 
            `<li><a data-menu="${menu.menu.name}" class="subNavMenu dropdown-item" 
            href="#menu-list">${menu.menu.name}</a></li>`);
        }
    } 

    bindMenuNav(handler) {
        document.getElementById('navMenu').addEventListener('click', (event) => {
            handler();   
            event.preventDefault();
            console.log(event.currentTarget);    
        });  
    }

    bindSubMenuNav(handler) {
        const submenuLinks = document.querySelectorAll('.subNavMenu.dropdown-item');
        console.log(submenuLinks);
        submenuLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                const menuName = link.getAttribute('data-menu');
                handler(menuName);   
                event.preventDefault();
                console.log(event.currentTarget);    
            });
        });
    }

    showRestaurantInMenu(restaurants) {
        const navRest = document.getElementById('navRest');
        const container = navRest.nextElementSibling;
        container.replaceChildren();
        for (const restaurant of restaurants) {
          container.insertAdjacentHTML('beforeend', 
            `<li><a data-restaurant="${restaurant.restaurant.name}" class="subNavRest dropdown-item" 
            href="#restaurant-list">${restaurant.restaurant.name}</a></li>`);
        }
    } 

    bindRestaurantNav(handler) {
        document.getElementById('navRest').addEventListener('click', (event) => {
            handler();   
            event.preventDefault();
            //console.log(event.currentTarget);    
        });  
    }

    bindSubRestaurantNav(handler) {
        const subrestaurantLinks = document.querySelectorAll('.subNavRest.dropdown-item');
        //console.log(subrestaurantLinks);
        subrestaurantLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                const restaurantName = link.getAttribute('data-restaurant');
                handler(restaurantName);   
                event.preventDefault();
                //console.log(event.currentTarget);    
            });
        });
    }

    bindRestaurant(handler) {
        document.getElementById('restaurant-foot').addEventListener('click', (event) => {
            handler();   
            event.preventDefault();
            console.log(event.currentTarget);    
        }); 
    }

    bindCategory(handler) {
        document.getElementById('category-foot').addEventListener('click', (event) => {
            handler();   
            event.preventDefault();
            console.log(event.currentTarget);    
        }); 
    }

    bindAllergen(handler) {
        document.getElementById('allergen-foot').addEventListener('click', (event) => {
            handler();   
            event.preventDefault();
            console.log(event.currentTarget);    
        }); 
    }
    
    bindMenu(handler) {
        document.getElementById('menu-foot').addEventListener('click', (event) => {
            handler();   
            event.preventDefault();
            console.log(event.currentTarget);    
        }); 
    }

    bindAdminMenuCategory(hNewCategory, hModCategory) {
        const newCategoryLink = document.getElementById('lnewCategory');
        newCategoryLink.addEventListener('click', (event) => {
        this[EXECUTE_HANDLER](hNewCategory, [], '#new-category', { action:
        'newCategory' }, '#', event);
        });

        const modCategoryLink = document.getElementById('lchCategory');
        modCategoryLink.addEventListener('click', (event) => {
        this[EXECUTE_HANDLER](hModCategory, [], '#new-category', { action:
        'newCategory' }, '#', event);
        });
    }

    bindAdminMenuRestaurant(hNewRestaurant) {
        const newRestaurantLink = document.getElementById('lnewRestaurant');
        newRestaurantLink.addEventListener('click', (event) => {
        this[EXECUTE_HANDLER](hNewRestaurant, [], '#new-restaurant', { action:
        'newRestaurant' }, '#', event);
        });
    }

    bindAdminMenu(hChangeMenu) {
        const newMenuLink = document.getElementById('lchMenu');
        newMenuLink.addEventListener('click', (event) => {
        this[EXECUTE_HANDLER](hChangeMenu, [], '#change-Category', { action:
        'changeMenu' }, '#', event);
        });
    }

    bindAdminMenuDish(hNewDish, hRemoveDish) {
        const newDishLink = document.getElementById('lnewDish');
        newDishLink.addEventListener('click', (event) => {
        this[EXECUTE_HANDLER](hNewDish, [], '#new-dish', { action:
        'newDish' }, '#', event);
        });

        const delDishLink = document.getElementById('ldelDish');
        delDishLink.addEventListener('click', (event) => {
        this[EXECUTE_HANDLER](hRemoveDish, [], '#del-dish', {
        action: 'removeDish' }, '#', event);
        });
    }
    
    bindNewCategoryForm(handler){
        newCategoryValidation(handler); 
    }

    bindNewRestaurantForm(handler){
        newRestaurantValidation(handler);
    }

    // MODALES VALIDACIONES

    showNewCategoryModal(done, cat, error) {
        const messageModalContainer = document.getElementById('messageModal');
        const messageModal = new bootstrap.Modal('#messageModal');
        const title = document.getElementById('messageModalTitle');
        title.innerHTML = 'Nueva Categoría';
        const body = messageModalContainer.querySelector('.modal-body');
        body.replaceChildren();
        if (done) {
            body.insertAdjacentHTML('afterbegin', `<div class="p-3">La categoría
            <strong>${cat.name}</strong> ha sido creada correctamente.</div>`);
        } else {
            body.insertAdjacentHTML(
                'afterbegin',
                `<div class="error text-danger p-3"><i class="bi bi-exclamation-
                triangle"></i> La categoría <strong>${cat.name}</strong> ya está
                creada.</div>`,
            );
        }
        messageModal.show();
        const listener = (event) => {
            if (done) {
                document.fNewCategory.reset();
            }
            document.fNewCategory.ncTitle.focus();
        };
        messageModalContainer.addEventListener('hidden.bs.modal', listener, {
            once: true });
    }  

    showModCategoryModal(done, cat, error) {
        const messageModalContainer = document.getElementById('messageModal');
        const messageModal = new bootstrap.Modal('#messageModal');
        const title = document.getElementById('messageModalTitle');
        if (done) {
            title.innerHTML = 'Modificación de categoría exitosa';
        } else {
            title.innerHTML = 'Error al modificar la categoría';
        }
        const body = messageModalContainer.querySelector('.modal-body');
        body.replaceChildren();
        if (done) {
            body.insertAdjacentHTML('afterbegin', `<div class="p-3">La categoría ${cat.name} del plato ha sido modificada correctamente.</div>`);
        } else {
            body.insertAdjacentHTML('afterbegin', `<div class="error text-danger p-3">${error.message}</div>`);
        }
        messageModal.show();
        const listener = (event) => {
            if (done) {
                document.fModCat.reset();
            }
            document.fModCat.mcDish.focus();
        };
        messageModalContainer.addEventListener('hidden.bs.modal', listener, 
        { once: true });
    }
    
    showRemoveCategoryModal(done, cat, error) {
        const messageModalContainer = document.getElementById('messageModal');
        const messageModal = new bootstrap.Modal('#messageModal');
        const title = document.getElementById('messageModalTitle');
        title.innerHTML = 'Borrado de categoría';
        const body = messageModalContainer.querySelector('.modal-body');
        body.replaceChildren();
        if (done) {
            body.insertAdjacentHTML('afterbegin', `<div class="p-3">La categoría
            <strong>${cat.name}</strong> ha sido eliminada correctamente.</div>`);
        } else {
            body.insertAdjacentHTML(
                'afterbegin',
                `<div class="error text-danger p-3"><i class="bi bi-exclamation-
                triangle"></i> La categoría <strong>${cat.name}</strong> no se ha podido
                borrar.</div>`,
            );
        }
        messageModal.show();
        const listener = (event) => {
            if (done) {
                const removeButton = document.getElementById('dnCategory');
                if (removeButton) {
                    removeButton.click();
                }
            }
        };
        messageModalContainer.addEventListener('hidden.bs.modal', listener, {
            once: true });
    }
    
    
    showNewRestaurantModal(done, rest, error) {
        const messageModalContainer = document.getElementById('messageModal');
        const messageModal = new bootstrap.Modal('#messageModal');
        const title = document.getElementById('messageModalTitle');
        title.innerHTML = 'Nuevo Restaurante';
        const body = messageModalContainer.querySelector('.modal-body');
        body.replaceChildren();
        if (done) {
            body.insertAdjacentHTML('afterbegin', `<div class="p-3">El restaurante
            <strong>${rest.name}</strong> ha sido creado correctamente.</div>`);
        } else {
            body.insertAdjacentHTML(
                'afterbegin',
                `<div class="error text-danger p-3"><i class="bi bi-exclamation-
                triangle"></i> El restaurante <strong>${rest.name}</strong> ya está
                creado.</div>`,
            );
        }
        messageModal.show();
        const listener = (event) => {
            if (done) {
                document.fNewRestaurant.reset();
            }
            document.fNewRestaurant.nrTitle.focus();
        };
        messageModalContainer.addEventListener('hidden.bs.modal', listener, {
            once: true });
    } 
    
    showNewDishModal(done, dis, error) {
        const messageModalContainer = document.getElementById('messageModal');
        const messageModal = new bootstrap.Modal('#messageModal');
        const title = document.getElementById('messageModalTitle');
        title.innerHTML = 'Nuevo Plato';
        const body = messageModalContainer.querySelector('.modal-body');
        body.replaceChildren();
        if (done) {
            body.insertAdjacentHTML('afterbegin', `<div class="p-3">El plato
            <strong>${dis.name}</strong> ha sido creado correctamente.</div>`);
        } else {
            body.insertAdjacentHTML(
                'afterbegin',
                `<div class="error text-danger p-3"><i class="bi bi-exclamation-
                triangle"></i> El plato <strong>${dis.name}</strong> ya está
                creado.</div>`,
            );
        }
        messageModal.show();
        const listener = (event) => {
            if (done) {
                document.fNewDish.reset();
            }
            document.fNewDish.ndTitle.focus();
        };
        messageModalContainer.addEventListener('hidden.bs.modal', listener, {
            once: true });
    } 

    showChangeDishMenuModal(done, menu, error) {
        const messageModalContainer = document.getElementById('messageModal');
        const messageModal = new bootstrap.Modal('#messageModal');
        const title = document.getElementById('messageModalTitle');
        title.innerHTML = 'Platos del Menu';
        const body = messageModalContainer.querySelector('.modal-body');
        body.replaceChildren();
        if (done) {
            body.insertAdjacentHTML('afterbegin', `<div class="p-3">Los platos del
            <strong>${menu.name}</strong> han sido modificados correctamente.</div>`);
        } else {
            body.insertAdjacentHTML(
                'afterbegin',
                `<div class="error text-danger p-3"><i class="bi bi-exclamation-
                triangle"></i> Los platos del <strong>${menu.name}</strong> no han podido ser modificados.</div>`,
            );
        }
        messageModal.show();
        const listener = (event) => {
            if (done) {
                document.fNewMenu.reset();
            }
            document.fNewMenu.cMenu.focus();
        };
        messageModalContainer.addEventListener('hidden.bs.modal', listener, {
            once: true });
    } 
    

    showCategories(){
        this.categories.replaceChildren();
        this.categories.insertAdjacentHTML('beforeend', `<div class="container mt-5">    
        <div class="row justify-content-center text-center">
            <div class="col-md-4 mb-4">
                <div class="card shadow">
                  <a href="#" id="link-guisos" data-category="Guisos"><img src="img/sopa-marisco.jpg" class="card-img-top img-categoria" alt="Sopa de marisco"></a>
                    <div class="card-body">
                        <h5 class="card-title">Guisos</h5>
                        <!-- Contenido adicional si es necesario -->
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-4">
                <div class="card shadow">
                  <a href="#" id="link-pasta" data-category="Pasta"><img src="img/pasta.jpg" class="card-img-top img-categoria" alt="Pasta>"></a>
                    <div class="card-body">
                      <h5 class="card-title">Pasta</h5>
                        <!-- Contenido adicional si es necesario -->
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-4">
                <div class="card shadow">
                  <a href="#" id="link-postres" data-category="Postres"><img src="img/postres.jpg" class="card-img-top img-categoria" alt="Postres"></a>
                    <div class="card-body">
                      <h5 class="card-title">Postres</h5>
                        <!-- Contenido adicional si es necesario -->
                    </div>
                </div>
            </div>
        </div>    
      </div> `);
    }

    showAdminMenu() {
        const menuOption = document.createElement('li');
        menuOption.classList.add('nav-item');
        menuOption.classList.add('dropdown');
        menuOption.insertAdjacentHTML(
            'afterbegin',
            `<a class="nav-link dropdown-toggle" href="#" id="adminMenu"
            role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Opciones</a>`
        );
        const suboptions = document.createElement('ul');
        suboptions.classList.add('dropdown-menu');
        suboptions.insertAdjacentHTML(
            'beforeend', `<li><a id="lnewRestaurant"
            class="dropdown-item" href="#new-restaurant">Crear restaurante</a></li>`
        );
        suboptions.insertAdjacentHTML(
            'beforeend', 
            `<li><a id="lnewCategory"
            class="dropdown-item" href="#new-category">Crear categoría</a></li>`
        );
        suboptions.insertAdjacentHTML(
            'beforeend', `<li><a id="lchCategory"
            class="dropdown-item" href="#change-Category">Eliminar/Modificar categoría</a></li>`
        );
        suboptions.insertAdjacentHTML(
            'beforeend', `<li><a id="lchMenu"
            class="dropdown-item" href="#change-menu">Modificar menu</a></li>`
        );
        suboptions.insertAdjacentHTML(
            'beforeend', 
            `<li><a id="lnewDish"
            class="dropdown-item" href="#new-dish">Crear plato</a></li>`
        );
        suboptions.insertAdjacentHTML(
            'beforeend', `<li><a id="ldelDish"
            class="dropdown-item" href="#del-dish">Eliminar plato</a></li>`
        );
        menuOption.append(suboptions);
        this.menu.append(menuOption);
    }

    showNewRestaurantForm() {
        this.main.replaceChildren();
        if (this.categories.children.length > 1) this.categories.children[1].remove();
    
        const container = document.createElement('div');
        container.classList.add('container');
        container.classList.add('my-3');
        container.id = 'new-restaurant';
    
        container.insertAdjacentHTML(
            'afterbegin',
            '<h1 class="display-5">Nuevo restaurante</h1>',
        );
        container.insertAdjacentHTML(
            'beforeend',
            `<form name="fNewRestaurant" role="form" class="row g-3" novalidate>
                <div class="col-md-6 mb-3">
                    <label class="form-label" for="nrTitle">Título *</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-type"></i></span>
                        <input type="text" class="form-control" id="nrTitle" name="nrTitle"
                            placeholder="Nombre del restaurante" value="" required>
                        <div class="invalid-feedback">El título es obligatorio.</div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                </div>
                <div class="col-md-12 mb-3">
                    <label class="form-label" for="nrDescription">Descripción</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-body-text"></i></span>
                        <input type="text" class="form-control" id="nrDescription" name="nrDescription" value="">
                        <div class="invalid-feedback"></div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                </div>
                <div class="col-md-6 mb-3">
                <label class="form-label" for="nrLocation">Localización</label>
                <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-file-image"></i></span>
                    <input type="number" class="form-control" id="nrLatitud" name="nrLatitud" placeholder="Latitud"
                        value="" required>
                    <input type="number" class="form-control" id="nrLongitud" name="nrLongitud" placeholder="Longitud"
                        value="" required>    
                    <div class="invalid-feedback">Las coordenadas no son válidas.</div>
                    <div class="valid-feedback">Correcto.</div>
                </div>
            </div>
                <div class="mb-12">
                    <button class="btn btn-warning" type="submit">Enviar</button>
                    <button class="btn btn-warning" type="reset">Cancelar</button>
                </div>
            </form>`,
        );
        this.main.append(container);
    }

    showNewCategoryForm() {
        this.main.replaceChildren();
        if (this.categories.children.length > 1) this.categories.children[1].remove();
    
        const container = document.createElement('div');
        container.classList.add('container');
        container.classList.add('my-3');
        container.id = 'new-category';
    
        container.insertAdjacentHTML(
            'afterbegin',
            '<h1 class="display-5">Nueva categoría</h1>',
        );
        container.insertAdjacentHTML(
            'beforeend',
            `<form name="fNewCategory" role="form" class="row g-3" novalidate>
                <div class="col-md-6 mb-3">
                    <label class="form-label" for="ncTitle">Título *</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-type"></i></span>
                        <input type="text" class="form-control" id="ncTitle" name="ncTitle"
                            placeholder="Título de categoría" value="" required>
                        <div class="invalid-feedback">El título es obligatorio.</div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label" for="ncUrl">URL de la imagen *</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-file-image"></i></span>
                        <input type="url" class="form-control" id="ncUrl" name="ncUrl" placeholder="URL de la imagen"
                            value="">
                    </div>
                </div>
                <div class="col-md-12 mb-3">
                    <label class="form-label" for="ncDescription">Descripción</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-body-text"></i></span>
                        <input type="text" class="form-control" id="ncDescription" name="ncDescription" value="">
                        <div class="invalid-feedback"></div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                </div>
                <div class="mb-12">
                    <button class="btn btn-warning" id="snCategory" type="submit">Enviar</button>
                    <button class="btn btn-warning" type="reset">Cancelar</button>
                </div>
            </form>`,
        );
        this.main.append(container);
    } 

    bindModCategoryForm(hModCategory, hDelCategory) {
        modCategoryValidation(hModCategory, hDelCategory);
        const modCategoryForm = document.forms.fModCat;
    
        modCategoryForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Evitamos el envío del formulario por defecto
            const selectedDish = modCategoryForm.elements['mcDish'].value;
            const selectedCategory = modCategoryForm.elements['mCat'].value;
            hModCategory(selectedDish, selectedCategory);
        });
    
        const deleteCategoryButton = document.getElementById('deleteCategory');
        deleteCategoryButton.addEventListener('click', () => {
            const selectedCategory = modCategoryForm.elements['mCat'].value;
            hDelCategory(selectedCategory);
        });
    }

    showModCategoryForm(dish, category) {
        this.main.replaceChildren();
        if (this.categories.children.length > 1) this.categories.children[1].remove();
    
        const container = document.createElement('div');
        container.classList.add('container');
        container.classList.add('my-3');
        container.id = 'new-menu';
    
        container.insertAdjacentHTML(
            'afterbegin',
            '<h1 class="display-5">Modifica la categoría del plato</h1>',
        );
        container.insertAdjacentHTML(
            'beforeend',
            `<form name="fModCat" role="form" class="row g-3" novalidate>
                <div class="col-md-12 mb-3">
                    <label class="form-label" for="mcDish">Elige el plato</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-type"></i></span>
                        <select class="form-select" id="mcDish" name="mcDish">
                            <option selected disabled>Selecciona un plato</option>
                                ${this.generateDishOptions(dish)}
                        </select>    
                        <div class="invalid-feedback">Es necesario elegir un plato para modificar la categoría.</div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                </div>
                <div class="col-md-12 mb-3">
                <label class="form-label" for="mCat">Elige la nueva categoría</label>
                <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-type"></i></span>
                    <select class="form-select" id="mCat" name="mCat" required>
                        <option selected disabled>Selecciona una categoría</option>
                            ${this.generateCategoryOptions(category)}
                    </select>    
                    <div class="invalid-feedback">La categoría es obligatoria.</div>
                    <div class="valid-feedback">Correcto.</div>
                </div>
            </div>
                <div class="mb-12">
                    <button class="btn btn-warning" type="submit">Modificar</button>
                    <button class="btn btn-danger" id="deleteCategory" type="button">Eliminar</button>
                </div>
            </form>`,
        );
        this.main.append(container);
    }

    generateDishOptions(dishes) {
        let optionsHTML = '';
        for (const dish of dishes) {
            optionsHTML += `<option value="${dish.name}">${dish.name}</option>`;
        }
        return optionsHTML;
    }

    bindChangeDishInMenu(hcMenu, haMenu,hdMenu) {
        const changeDisForm = document.forms.fNewMenu;
        changeDisForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const selectedMenu = changeDisForm.elements['cMenu'].value;
            let selectedDish1 = '';
            let selectedDish2 = '';
        
            // Iterar sobre los elementos seleccionados
            let count = 0;
            for (const checkbox of changeDisForm.querySelectorAll('input[name="nmDish"]:checked')) {
                if (count === 0) {
                    selectedDish1 = checkbox.value;
                } else if (count === 1) {
                    selectedDish2 = checkbox.value;
                    break; // Salir del bucle después de encontrar los primeros dos platos seleccionados
                }
                count++;
            }
            hcMenu(selectedMenu, selectedDish1, selectedDish2);
        });

        const asignMenu = document.getElementById('asignar');
        asignMenu.addEventListener('click', () => {
            const selectedMenu = changeDisForm.elements['cMenu'].value;
            const selectedDish = [];
            const dishCheckboxes = changeDisForm.querySelectorAll('input[name="nmDish"]:checked');
            for (const checkbox of dishCheckboxes) {
                selectedDish.push(checkbox.value);
            }
            haMenu(selectedMenu, selectedDish);
        });
    
        const desasignMenu = document.getElementById('desasignar');
        desasignMenu.addEventListener('click', () => {
            const selectedMenu = changeDisForm.elements['cMenu'].value;
            const selectedDish = [];
            const dishCheckboxes = changeDisForm.querySelectorAll('input[name="nmDish"]:checked');
            for (const checkbox of dishCheckboxes) {
                selectedDish.push(checkbox.value);
            }
            hdMenu(selectedMenu, selectedDish);
        });
    }
   
    showNewMenuForm(menu, dish) {
        this.main.replaceChildren();
        if (this.categories.children.length > 1) this.categories.children[1].remove();
    
        const container = document.createElement('div');
        container.classList.add('container');
        container.classList.add('my-3');
        container.id = 'new-menu';
    
        container.insertAdjacentHTML(
            'afterbegin',
            '<h1 class="display-5">Modifica el menu</h1>',
        );
        container.insertAdjacentHTML(
            'beforeend',
            `<form name="fNewMenu" role="form" class="row g-3" novalidate>
                <div class="col-md-12 mb-3">
                    <label class="form-label" for="cMenu">Elige el menú</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-type"></i></span>
                        <select class="form-select" id="cMenu" name="cMenu" required>
                            <option selected disabled>Selecciona un menu</option>
                                ${this.generateMenuOptions(menu)}
                        </select>    
                        <div class="invalid-feedback">La categoría es obligatoria.</div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                </div>
                <div class="col-md-12 mb-3">
                    <label class="form-label" for="cDish">Platos *</label>
                    <div class="input-group">
                        ${this.generateDishCheckboxes(dish)}
                        <div class="invalid-feedback">Al menos un alérgeno es obligatorio.</div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                </div>    

                <div class="mb-12">
                    <button class="btn btn-warning" id="asignar" type="button">Asignar</button>
                    <button class="btn btn-warning" id="desasignar" type="button">Desasignar</button>
                    <button class="btn btn-warning" type="submit">Cambiar posicion</button>
                </div>
            </form>`,
        );
        this.main.append(container);
    }

    generateMenuOptions(menus) {
        let optionsHTML = '';
        for (const menuObj of menus) {
            optionsHTML += `<option value="${menuObj.menu.name}">${menuObj.menu.name}</option>`;
        }
        return optionsHTML;
    }

    generateDishCheckboxes(dishes) {
        //console.log(allergens);
        let checkboxesHTML = '';
        for(const dish of dishes) {
            checkboxesHTML += `
            <div class="form-check">
            <input class="form-check-input" type="checkbox" id="nmDish-${dish.name}" name="nmDish" value="${dish.name}">
            <label class="form-check-label checkbox-label" for="nmDish-${dish.name}">${dish.name}</label>
        </div>
        `;
        }
        return checkboxesHTML;
    }

    showDishMenuForm(menuName, menuDishes) {
        let menuDishesContainer = document.getElementById('menu-dishes');
        
        if (menuDishesContainer) {
            menuDishesContainer.innerHTML = '';
        } else {
            menuDishesContainer = document.createElement('div');    
            menuDishesContainer.classList.add('container','text-center', 'd-inline-block', 'p-2', 'my-3', 'shadow-sm');
            menuDishesContainer.id = 'menu-dishes';
            const formContainer = document.getElementById('new-menu');
            formContainer.insertAdjacentElement('beforeend', menuDishesContainer);
        }    

        menuDishesContainer.insertAdjacentHTML(
            'afterbegin',
             `<h3>Platos del menu "${menuName}"</h3>`
        );

        // Generar dinámicamente una lista de platos asociados
        let dishesListHTML = '';
        for(const dish of menuDishes) {
            dishesListHTML += `
            <div>${dish.name}</div>
        `;
        }        
        menuDishesContainer.insertAdjacentHTML('beforeend', dishesListHTML);
    }

    bindNewDishForm(hNewDish, handlerAddIngredient) {
        newDishValidation(hNewDish);
        const newDisForm = document.forms.fNewDish;
    
        newDisForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Evitamos el envío del formulario por defecto
            const selectedAllergen = newDisForm.elements['ndAllergen'].value;
            const selectedCategory = newDisForm.elements['ndCategory'].value;
            const ingredients = Array.from(newDisForm.querySelectorAll('input[name="ingredient[]"]')).map(input => input.value.trim());
            
            const dishData = {
                name: newDisForm.elements['ndTitle'].value,
                description: newDisForm.elements['ndDescription'].value,
                category: selectedCategory,
                allergens: selectedAllergen,
                ingredients: ingredients,
                imageUrl: newDisForm.elements['ndUrl'].value
            };
            console.log(dishData);
            hNewDish(dishData);
        });
    
        const addIngredientButton = document.querySelector('.add-ingredient');
        addIngredientButton.addEventListener('click', (event) => { 
            handlerAddIngredient();            
            event.preventDefault();   
        });
    }
    

    showNewDishForm(category, allergen) {
        this.main.replaceChildren();
        if (this.categories.children.length > 1) this.categories.children[1].remove();
    
        const container = document.createElement('div');
        container.classList.add('container');
        container.classList.add('my-3');
        container.id = 'new-dish';
    
        container.insertAdjacentHTML(
            'afterbegin',
            '<h1 class="display-5">Nuevo plato</h1>',
        );
        container.insertAdjacentHTML(
            'beforeend',
            `<form name="fNewDish" role="form" class="row g-3" novalidate>
                <div class="col-md-6 mb-3">
                    <label class="form-label" for="ndTitle">Título *</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-type"></i></span>
                        <input type="text" class="form-control" id="ndTitle" name="ndTitle"
                            placeholder="Nombre del plato" value="" required>
                        <div class="invalid-feedback">El nombre es obligatorio.</div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                </div>
                <div class="col-md-12 mb-3">
                    <label class="form-label" for="ndCategory">Categoría *</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-type"></i></span>
                        <select class="form-select" id="ndCategory" name="ndCategory" required>
                            <option selected disabled>Selecciona una categoría</option>
                            ${this.generateCategoryOptions(category)}
                        </select>    
                        <div class="invalid-feedback">La categoría es obligatoria.</div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                </div>
                <div class="col-md-12 mb-3">
                    <label class="form-label" for="ndAllergen">Alergenos *</label>
                    <div class="input-group">
                        ${this.generateAllergenCheckboxes(allergen)}
                        <div class="invalid-feedback">Al menos un alérgeno es obligatorio.</div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                </div>    
                <div class="col-md-12 mb-3">
                    <label class="form-label" for="ndDescription">Descripción</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-body-text"></i></span>
                        <input type="text" class="form-control" id="ndDescription" name="ndDescription" value="">
                        <div class="invalid-feedback"></div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                </div>
                <div>
                <label class="form-label" for="ndIngredient">Ingredientes *</label>
                <div class="input-group">
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-ingredient"></i></span>
                        <input type="text" class="form-control" name="ingredient[]" placeholder="Ingrediente 1" required>
                        <button type="button" class="btn btn-secondary btn-outline-warning add-ingredient">Agregar otro ingrediente</button>
                    </div>        
                    <div class="invalid-feedback">El ingrediente no es válido.</div>
                    <div class="valid-feedback">Correcto.</div>
                </div>
                </div>
                <div class="col-md-6 mb-3">
                <label class="form-label" for="ndUrl">URL de la imagen *</label>
                <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-file-image"></i></span>
                    <input type="url" class="form-control" id="ndUrl" name="ndUrl" placeholder="URL de la imagen"
                        value="" required>
                    <div class="invalid-feedback">La URL no es válida.</div>
                    <div class="valid-feedback">Correcto.</div>
                </div>
            </div>
                <div class="mb-12">
                    <button class="btn btn-warning" type="submit">Enviar</button>
                    <button class="btn btn-warning" type="reset">Cancelar</button>
                </div>
            </form>`,
        );
        this.main.append(container);
    }

    generateCategoryOptions(categories) {
        let optionsHTML = '';
        for (const categoryObj of categories) {
            optionsHTML += `<option value="${categoryObj.category.name}">${categoryObj.category.name}</option>`;
        }
        return optionsHTML;
    }

    generateAllergenCheckboxes(allergens) {
        //console.log(allergens);
        let checkboxesHTML = '';
        for(const allergen of allergens) {
            checkboxesHTML += `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="ndAllergen-${allergen.allergen.name}" name="ndAllergen" value="${allergen.allergen.name}">
                <label class="form-check-label checkbox-label" for="ndAllergen-${allergen.allergen.name}">${allergen.allergen.name}</label>
            </div>
        `;
        }
        return checkboxesHTML
    }

     bindDeleteDishLinks(handler) {
        console.log('bindDeleteDishLinks function called');
        const deleteDishLinks = document.querySelectorAll('[data-dish]');
        console.log(deleteDishLinks);
        deleteDishLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                console.log('Enlace clickeado');
                const selectedDish = event.target.dataset.dish;
                handler(selectedDish);
            });
        });
    }    

    showRemoveDishForm(dishes) {
        this.main.replaceChildren();
        if (this.categories.children.length > 1)
        this.categories.children[1].remove();
        const container = document.createElement('div');
        container.classList.add('container');
        container.classList.add('my-3', 'text-center');
        container.id = 'remove-dish';
        container.insertAdjacentHTML(
        'afterbegin',
        '<h1 class="display-5">Eliminar platos</h1><br>',
        );
        const row = document.createElement('div');
        row.classList.add('row');

        for (const dish of dishes) {
        row.insertAdjacentHTML('beforeend', `<div class="col-lg-3 col-md-6">
        <div class="dis-list-image"><img alt="${dish.name}" style="width: 200px; height: 150px;"
        src="${dish.image}" />
        </div>
        <div class="dis-list-text enDish">
        <a data-dish="${dish.name}" href="#dish-
        list" class=""><h4 class="my-2">${dish.name}</h4></a>
        </div>
        <div><button class="btn btn-light mb-5 mt-2" data-
        dish="${dish.name}" type='button'>Eliminar</button></div>
        </div>`);
        }
        container.append(row);
        this.main.append(container);
    } 
    
    showRemoveDishModal(done, dish, error) {
        const removeDish = document.getElementById('remove-dish');
        const messageModalContainer = document.getElementById('messageModal');
        const messageModal = new bootstrap.Modal('#messageModal');
    
        const title = document.getElementById('messageModalTitle');
        title.innerHTML = 'Plato eliminado';
        const body = messageModalContainer.querySelector('.modal-body');
        body.replaceChildren();
        if (done) {
          body.insertAdjacentHTML('afterbegin', `<div class="p-3">El plato <strong>${dish.name}</strong> ha sido eliminado correctamente.</div>`);
        } else {
          body.insertAdjacentHTML(
            'afterbegin',
            '<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El plato no existe en el manager.</div>',
          );
        }
        messageModal.show();
        const listener = (event) => {
          if (done) {
            const button = removeDish.querySelector(`a.btn[data-dish="${dish.name}"]`);
            button.parentElement.parentElement.parentElement.remove();
          }
        };
        messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
      }

    showDishes(dishes, title, allergens) {
        const tableHTML = `
            <div class="titulo bg-dark bg-gradient text-white">
                <h3 class="">${title}</h3>
            </div>
            <table id="platos-table" class="table table-striped align-middle">
                <thead>
                    <tr>
                        <th>Plato</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Ingredientes</th>
                        <th>Alergenos</th>
                    </tr>
                </thead>
                <tbody>
                    ${(() => {
                        let html = '';
                        let index = 0;
                        for (const dish of dishes) {
                            html += `
                                <tr>
                                    <td><img src="${dish.image}" alt="${dish.name}" style="max-width: 100px; max-height: 100px;"></td>
                                    <td>${dish.name}</td>
                                    <td>${dish.description}</td>
                                    <td>${dish.ingredients.join(', ')}</td>
                                    <td>${allergens[index]}</td>
                                </tr>`;
                            index++;    
                        }
                        return html;
                    })()}
                </tbody>
            </table>
        `;
        this.main.replaceChildren();
        this.main.insertAdjacentHTML('afterbegin', tableHTML);
    }
    

    showRestauranti(restaurants) {         
        const tableHTML = `
        <div class="titulo bg-dark bg-gradient text-white">
            <h3 class="">Restaurante</h3>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Localizacion</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td>${restaurants.name}</td>
                    <td>${restaurants.location}</td>
                </tr>
            </tbody>
        </table>
        `;
        this.main.replaceChildren();
        this.main.insertAdjacentHTML('afterbegin', tableHTML);  
    }

    showRestaurants(restaurants) {
        const tableHTML = `
        <div class="titulo bg-dark bg-gradient text-white">
            <h3>Nuestros restaurantes</h3>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Localizacion</th>
                </tr>
            </thead>
            <tbody>
                ${(() => {
                    let html = '';
                    for (const restaurant of restaurants) {
                        html += `
                        <tr>
                            <td>${restaurant.restaurant.name}</td>
                            <td>${restaurant.restaurant.location}</td>
                        </tr>`;
                    }
                    return html;
                })()}
            </tbody>
        </table>
        `;
        this.main.replaceChildren();
        this.main.insertAdjacentHTML('afterbegin', tableHTML);
    }
    

    showCategoriesFoot(categories) {
        const tableHTML = `
            <div class="titulo bg-dark bg-gradient text-white">
                <h3>Categorías</h3>
            </div>
            <table id="platos-table" class="table table-striped align-middle">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    ${(() => {
                        let html = '';
                        for (const category of categories) {
                            html += `
                                <tr>
                                    <td>${category.category.name}</td>
                                    <td>${category.category.description}</td>
                                </tr>`;
                        }
                        return html;
                    })()}
                </tbody>
            </table>
        `;
        this.main.replaceChildren();
        this.main.insertAdjacentHTML('afterbegin', tableHTML);
    }
    

    showAllergensFoot(allergens) {
        const tableHTML = `
            <div class="titulo bg-dark bg-gradient text-white">
                <h3>Alergenos</h3>
            </div>
            <table id="platos-table" class="table table-striped align-middle">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    ${(() => {
                        let html = '';
                        for (const allergen of allergens) {
                            html += `
                        <tr>
                            <td>${allergen.allergen.name}</td>
                            <td>${allergen.allergen.description}</td>
                        </tr>`;
                        }
                        return html;
                    })()}
                </tbody>
            </table>
        `;
        this.main.replaceChildren();
        this.main.insertAdjacentHTML('afterbegin', tableHTML);
    }

    showMenusFoot(menus) {
        const tableHTML = `
            <div class="titulo bg-dark bg-gradient text-white">
                <h3>Menus</h3>
            </div>
            <table id="platos-table" class="table table-striped align-middle">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    ${(() => {
                        let html = '';
                        for (const menu of menus) {
                            html += `
                        <tr>
                            <td>${menu.menu.name}</td>
                            <td>${menu.menu.description}</td>
                        </tr>`;
                        }
                        return html;
                    })()}
                </tbody>
            </table>
        `;
        this.main.replaceChildren();
        this.main.insertAdjacentHTML('afterbegin', tableHTML);
    }

    showPlatos(dish) {
        console.log(`Plato: ${dish.name}, Description: ${dish.description}`);
    }

    showCategory(category) {
        console.log(`Category: ${category.name}, Description: ${category.description}`);
    }

    showAllergen(allergen) {
        console.log(`Allergen: ${allergen.name}, Description: ${allergen.description}`);
    }

    showMenu(menu) {
        console.log(`Menu: ${menu.name}`);
    }

    showRestaurant(restaurant) {
        console.log(`Restaurant: ${restaurant.name}`);
    }  
    
    clearMain() {
        this.main.innerHTML = ''; // Borra todo el contenido del main
    }   
}

export default RestaurantiView;