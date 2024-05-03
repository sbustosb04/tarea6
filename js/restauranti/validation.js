function showFeedBack(input, valid, message) {
    const validClass = (valid) ? 'is-valid' : 'is-invalid';
    const messageDiv = (valid) ?
    input.parentElement.querySelector('div.valid-feedback') :
    input.parentElement.querySelector('div.invalid-feedback');
    for (const div of input.parentElement.getElementsByTagName('div')) {
        div.classList.remove('d-block');
    }
    messageDiv.classList.remove('d-none');
    messageDiv.classList.add('d-block');
    input.classList.remove('is-valid');
    input.classList.remove('is-invalid');
    input.classList.add(validClass);
    if (message) {
        messageDiv.innerHTML = message;
    }
}

function defaultCheckElement(event) {
    this.value = this.value.trim();
    if (!this.checkValidity()) {
        showFeedBack(this, false);
    } else {
        showFeedBack(this, true);
    }
}

function newCategoryValidation(handler) {
    const form = document.forms.fNewCategory;
    form.setAttribute('novalidate', true);
    form.addEventListener('submit', function (event) {
      let isValid = true;
      let firstInvalidElement = null;
  
      this.ncDescription.value = this.ncDescription.value.trim();
      showFeedBack(this.ncDescription, true);
  
      if (!this.ncTitle.checkValidity()) {
        isValid = false;
        showFeedBack(this.ncTitle, false);
        firstInvalidElement = this.ncTitle;
      } else {
        showFeedBack(this.ncTitle, true);
      }
  
      if (!isValid) {
        firstInvalidElement.focus();
      } else {
        handler(this.ncTitle.value, this.ncDescription.value);
      }
      event.preventDefault();
      event.stopPropagation();
    });
  
    form.addEventListener('reset', (function (event) {
      for (const div of this.querySelectorAll('div.valid-feedback, div.invalid-feedback')) {
        div.classList.remove('d-block');
        div.classList.add('d-none');
      }
      for (const input of this.querySelectorAll('input')) {
        input.classList.remove('is-valid');
        input.classList.remove('is-invalid');
      }
      this.ncTitle.focus();
    }));
    
  form.ncTitle.addEventListener('change', defaultCheckElement);
}

function newRestaurantValidation(handler) {
  const form = document.forms.fNewRestaurant;
  form.setAttribute('novalidate', true);
  form.addEventListener('submit', function (event) {
    let isValid = true;
    let firstInvalidElement = null;

    this.nrDescription.value = this.nrDescription.value.trim();
    showFeedBack(this.nrDescription, true);

    if (!this.nrTitle.checkValidity()) {
      isValid = false;
      showFeedBack(this.nrTitle, false);
      firstInvalidElement = this.nrTitle;
    } else {
      showFeedBack(this.nrTitle, true);
    }

    // Validación del campo de latitud
    if (!this.nrLatitud.checkValidity()) {
      isValid = false;
      showFeedBack(this.nrLatitud, false);
      if (!firstInvalidElement) {
        firstInvalidElement = this.nrLatitud;
      }
    } else {
      showFeedBack(this.nrLatitud, true);
    }

    // Validación del campo de longitud
    if (!this.nrLongitud.checkValidity()) {
      isValid = false;
      showFeedBack(this.nrLongitud, false);
      if (!firstInvalidElement) {
        firstInvalidElement = this.nrLongitud;
      }
    } else {
      showFeedBack(this.nrLongitud, true);
    }
    
    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      handler(this.nrTitle.value, this.nrDescription.value, this.nrLatitud.value, this.nrLongitud.value);
    }
    event.preventDefault();
    event.stopPropagation();
  });

  form.addEventListener('reset', (function (event) {
    for (const div of this.querySelectorAll('div.valid-feedback, div.invalid-feedback')) {
      div.classList.remove('d-block');
      div.classList.add('d-none');
    }
    for (const input of this.querySelectorAll('input')) {
      input.classList.remove('is-valid');
      input.classList.remove('is-invalid');
    }
    this.nrTitle.focus();
  }));
  
form.nrTitle.addEventListener('change', defaultCheckElement);
}

function modCategoryValidation(handler) {
  const form = document.forms.fModCat;
  form.setAttribute('novalidate', true);
  form.addEventListener('submit', function (event) {
      let isValid = true;
      let firstInvalidElement = null;

      if (!this.mCat.value || this.mCat.value === "") {
          isValid = false;
          showFeedBack(this.mCat, false, 'La categoría es obligatoria.');
          if (!firstInvalidElement) firstInvalidElement = this.mCat;
      } else {
          showFeedBack(this.mCat, true);
      }

      if (!isValid) {
          firstInvalidElement.focus();
      } else {
          handler(this.mCat.value);
      }

      event.preventDefault();
      event.stopPropagation();
  });

  form.addEventListener('reset', function (event) {
      for (const div of this.querySelectorAll('div.valid-feedback, div.invalid-feedback')) {
          div.classList.remove('d-block');
          div.classList.add('d-none');
      }
      for (const input of this.querySelectorAll('select')) {
          input.classList.remove('is-valid');
          input.classList.remove('is-invalid');
      }
      this.mcDish.focus();
  });
}

function newDishValidation(handler) {
  const form = document.forms.fNewDish;
  form.setAttribute('novalidate', true);
  form.addEventListener('submit', function (event) {
    let isValid = true;
    let firstInvalidElement = null;

    this.ndDescription.value = this.ndDescription.value.trim();
    showFeedBack(this.ndDescription, true);

    // Validación del campo de título
    if (!this.ndTitle.checkValidity()) {
      isValid = false;
      showFeedBack(this.ndTitle, false);
      firstInvalidElement = this.ndTitle;
    } else {
      showFeedBack(this.ndTitle, true);
    }

       // Validación del campo de categoría
       if (!this.ndCategory.checkValidity()) {
        isValid = false;
        showFeedBack(this.ndCategory, false);
        if (!firstInvalidElement) {
          firstInvalidElement = this.ndCategory;
        }
      } else {
        showFeedBack(this.ndCategory, true);
      }
  
      // Validación de al menos un alérgeno seleccionado
       const allergenCheckboxes = document.querySelectorAll('input[name="ndAllergen[]"]');
      let isAtLeastOneAllergenChecked = false;
      allergenCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
          isAtLeastOneAllergenChecked = true;
        }
      });
      if (!isAtLeastOneAllergenChecked) {
        isValid = false;
        showFeedBack(allergenCheckboxes[0], false);
        if (!firstInvalidElement) {
          firstInvalidElement = allergenCheckboxes[0];
        }
      } else {
        allergenCheckboxes.forEach(checkbox => {
          showFeedBack(checkbox, true);
        });
      } 
    
      // Validación de los ingredientes
      const ingredientsInputs = document.querySelectorAll('input[name="ingredient[]"]');
      ingredientsInputs.forEach(input => {
        if (!input.checkValidity()) {
          isValid = false;
          showFeedBack(input, false);
          if (!firstInvalidElement) {
            firstInvalidElement = input;
          }
        } else {
          showFeedBack(input, true);
        }
      }); 
  
      // Validación del campo de URL de la imagen
       if (!this.ndUrl.checkValidity()) {
        isValid = false;
        showFeedBack(this.ndUrl, false);
        if (!firstInvalidElement) {
          firstInvalidElement = this.ndUrl;
        }
      } else {
        showFeedBack(this.ndUrl, true);
      } 
  
      if (!isValid) {
        firstInvalidElement.focus();
      } else {
        handler(
          this.ndTitle.value,
          this.ndDescription.value,
          Array.from(ingredientsInputs).map(input => input.value.trim()),
          this.ndUrl.value
        );
      }
  
      event.preventDefault();
      event.stopPropagation();
    });

  form.addEventListener('reset', (function (event) {
    for (const div of this.querySelectorAll('div.valid-feedback, div.invalid-feedback')) {
      div.classList.remove('d-block');
      div.classList.add('d-none');
    }
    for (const input of this.querySelectorAll('input')) {
      input.classList.remove('is-valid');
      input.classList.remove('is-invalid');
    }
    this.ndTitle.focus();
  }));
  
form.ndTitle.addEventListener('change', defaultCheckElement);
} 




export { newCategoryValidation, newRestaurantValidation, newDishValidation, modCategoryValidation };
