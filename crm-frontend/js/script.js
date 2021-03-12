'use strict';
document.addEventListener('DOMContentLoaded', function() { 
  const table = document.querySelector('tbody');
  const btn = document.querySelector('.main__btn');
  const close = document.querySelectorAll('.close');
  const modal = document.querySelector('.modal');
  const form = document.querySelector('.modal__form-new');
  const modalOverlay = document.querySelector('.modal_overlay');
  const legend = document.querySelector('.modal__legend');
  const spanId = document.querySelector('.modal__span');
  const btnUnderlined = document.querySelector('.modal__btn--underlined');
  
  let response, data, rowOfTable;
  let surname = document.getElementById('surname');
  let name = document.getElementById('name');
  let lastName = document.getElementById('lastName');
  let fields = [
    'id',
    'surname',
  ];

  window.onload = function () {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function () {
      document.body.classList.add('loaded');
      document.body.classList.remove('loaded_hiding');
    }, 500);
  };

// СОРТИРОВКА-------------------------------------------------------------------------
  let deleteRows = function() {
    let rows = table.querySelectorAll('tr');
    rows.forEach(row => row.remove());
  };
 
  function inAscendingOrder(field) {
    return (a, b) => {
    if (a[field] > b[field]) {
      return 1;
    }
    if (a[field] < b[field]) {
      return -1;
    }
    return 0;
    }
  };

  function inDescendingOrder(field) {
    return (a, b) => {
    if (a[field] < b[field]) {
      return 1;
    }
    if (a[field] > b[field]) {
      return -1;
    }
    return 0;
    }
  };

  function changeActiveCell(target) {
    let selectedCell = document.querySelector('.selected');
    if (target.querySelector('span:first-child').innerHTML !== selectedCell.innerHTML) {
      selectedCell.nextElementSibling.classList.add('hide');
      selectedCell.classList.add('hide');
      document.querySelector('.alphabet').classList.add('hide');
      selectedCell.removeAttribute('class');
      target.querySelector('span:first-child').setAttribute('class', 'selected');
      target.querySelector('span:nth-child(2)').classList.remove('hide');
      if (target.querySelector('.alphabet')) {
        target.querySelector('.alphabet').classList.remove('hide');
      }
    };
  }

  async function setHandlers() {
    const labels = document.querySelectorAll('th');
    response = await fetch('http://localhost:3000/api/clients');
    data = await response.json();
    let dataSorted, target;
    let firstCell = document.querySelector('th:first-child span:nth-child(2)');
    let secondCell = document.querySelector('th:nth-child(2) span:nth-child(2)');
    let thirdCell = document.querySelector('th:nth-child(3) span:last-child');
    let fourthCell = document.querySelector('th:nth-child(4) span:last-child');
    
    labels[0].addEventListener('click', (e) => {
      target = e.currentTarget;
      changeActiveCell(target);
      deleteRows();
      if (firstCell.classList.contains('arrow-up')) {
        dataSorted = data.sort(inDescendingOrder(fields[0]));
        firstCell.classList.remove('arrow-up');
      } else {
        dataSorted = data.sort(inAscendingOrder(fields[0]));
        firstCell.classList.add('arrow-up');
      };
      formTable(dataSorted);
    });

    labels[1].addEventListener('click', (e) => {
      target = e.currentTarget;
      changeActiveCell(target);
      deleteRows();
      if (!secondCell.classList.contains('arrow-up')) {
        dataSorted = data.sort(inDescendingOrder(fields[1]));
        secondCell.classList.add('arrow-up');
        document.querySelector('.alphabet').textContent = 'Я-А';
      } else {
        dataSorted = data.sort(inAscendingOrder(fields[1]));
        secondCell.classList.remove('arrow-up');
        document.querySelector('.alphabet').textContent = 'А-Я';
      };
      formTable(dataSorted);
    });

    labels[2].addEventListener('click', (e) => {
      target = e.currentTarget;
      changeActiveCell(target);
      deleteRows();
      if (thirdCell.classList.contains('arrow-up')) {
        dataSorted = data.sort((a, b) => {
          if ((new Date(a.createdAt).getTime()) > (new Date(b.createdAt).getTime())) {
            return 1;
          }
          if ((new Date(a.createdAt).getTime()) < (new Date(b.createdAt).getTime())) {
            return -1;
          }
          return 0;
        });
        thirdCell.classList.remove('arrow-up');
      } else {
        dataSorted = data.sort((a, b) => {
          if ((new Date(a.createdAt).getTime()) < (new Date(b.createdAt).getTime())) {
            return 1;
          }
          if ((new Date(a.createdAt).getTime()) > (new Date(b.createdAt).getTime())) {
            return -1;
          }
          return 0;
          });
        thirdCell.classList.add('arrow-up');
      };
      formTable(dataSorted);
    });
      
    labels[3].addEventListener('click', (e) => {
      target = e.currentTarget;
      changeActiveCell(target);
      deleteRows();
      if (fourthCell.classList.contains('arrow-up')) {
        dataSorted = data.sort((a, b) => {
          if ((new Date(a.updatedAt).getTime()) > (new Date(b.updatedAt).getTime())) {
            return 1;
          }
          if ((new Date(a.updatedAt).getTime()) < (new Date(b.updatedAt).getTime())) {
            return -1;
          }
          return 0;
        });
        fourthCell.classList.remove('arrow-up');
      } else {
        dataSorted = data.sort((a, b) => {
          if ((new Date(a.updatedAt).getTime()) < (new Date(b.updatedAt).getTime())) {
            return 1;
          }
          if ((new Date(a.updatedAt).getTime()) > (new Date(b.updatedAt).getTime())) {
            return -1;
          }
          return 0;
        });
        fourthCell.classList.add('arrow-up');
      };
      formTable(dataSorted);
    })
  };
  setHandlers();

  function addContacts() {
    let inputContact = document.querySelectorAll('.input--border');
    let selectedDataset = document.querySelectorAll('.select-selected');
    let arr = [];
    for (let i = 0; i < inputContact.length; i++) {
      let obj = {};
      obj.type = selectedDataset[i].dataset.name;
      obj.value = inputContact[i].value;
      arr.push(obj);
    };
    return arr;
  };
 
  async function createCustomerRecord() {
    response = await fetch('http://localhost:3000/api/clients', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: `${name.value.trim()}`,
        surname: `${surname.value.trim()}`,
        lastName: `${lastName.value.trim()}`,
        contacts: addContacts(),
      }),
    });
    data = await response.json();
  }; 

  async function changeCustomerRecord(e) {
    response = await fetch(`http://localhost:3000/api/clients/${spanId.dataset.id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: `${name.value.trim()}`,
      surname: `${surname.value.trim()}`,
      lastName: `${lastName.value.trim()}`,
      contacts: addContacts(),
      }),
    });
    data = await response.json();
  }; 

  async function showListOfClients() {
    response = await fetch('http://localhost:3000/api/clients');
    data = await response.json();
    let dataSorted = data.sort(inAscendingOrder('id'));
    formTable(dataSorted);
  };
  showListOfClients();

  function formTable(newArr = []) {
    for (let i = 0; i < newArr.length; i++) {
      rowOfTable = addClientToTable(newArr[i]);
      // добавляем обработчик на кнопки
      rowOfTable.btnChange.addEventListener('click',  async (el) => {
        el.target.previousSibling.classList.remove('write');
        el.target.previousSibling.classList.add('lil-preloader');
        el.target.style.color = 'var(--lilac-color)';
        await changeDataOfClient(el);
        legend.textContent = 'Изменить данные';
        btnUnderlined.textContent = 'Удалить клиента';
        btnUnderlined.setAttribute('data-id', el.target.dataset.id);
        //modal.classList.add('changing');
        modal.classList.remove('hide');
        modalOverlay.classList.remove('hide');
        
        el.target.previousSibling.classList.add('write');
        el.target.previousSibling.classList.remove('lil-preloader');
        el.target.style.color = '#333';
      });

      rowOfTable.btnDelete.addEventListener('click', (elm) => {
        elm.target.previousSibling.classList.remove('del');
        elm.target.previousSibling.classList.add('red-preloader');
        elm.target.style.color = 'var(--red-color)';
        showSpinner();
        // elm.target.classList.add('del');
        // elm.target.classList.remove('red-preloader');
        // elm.target.style.color = '#333';
        document.querySelector('.modal-del .modal__btn--lilac').addEventListener('click', (e) => {
          e.preventDefault();
          deleteCustomerRecord(elm);
        });
      });
    };
  };

  function showSpinner() {
    const modalDel = document.querySelector('.modal-del');
    modalDel.classList.remove('hide');
    modalOverlay.classList.remove('hide');
  };

  async function changeDataOfClient(e) {
    response = await fetch('http://localhost:3000/api/clients');
    data = await response.json();    
    
    let index;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === e.target.dataset.id) {
        index = data.findIndex(item => item.id === e.target.dataset.id); 
        spanId.setAttribute('data-id', data[i].id);
        spanId.textContent = 'ID:' + ' ' + data[i].id;
      };
    };
    
    let className;
    let cell = e.target.parentNode.previousSibling;
    let linkContacts = cell.querySelectorAll('td > a');
    let fullNameInputs = document.querySelectorAll('.modal input');
    let props = [
      data[index].surname,
      data[index].name,
      data[index].lastName,
    ];
    
    for (let i = 0; i < fullNameInputs.length; i++) {
      fullNameInputs[i].value = props[i];
      fullNameInputs[i].classList.add('valid');
    };
  
    for (let i = 0; i < linkContacts.length; i++) {
      transformSelect(e);
      createBtnCancel();
      document.querySelectorAll('.input--border')[i].value = linkContacts[i].getAttribute('aria-label');
      className = linkContacts[i].className;
      let necessary = options.find(option => className === option.value);
      selectedItem.innerHTML = necessary.label;
      selectedItem.dataset.name = necessary.value;
    }; 

    const cancels = document.querySelectorAll('.cancel');
    cancels.forEach(cancel => {
      cancel.addEventListener('click', (e) => {
        cancel.parentNode.remove();
      });
    });
  };

  function createBtnCancel() {
    let btnDelOfInput = document.createElement('button');
    btnDelOfInput.setAttribute('type', 'button');
    let tooltip = document.createElement('span');
    tooltip.setAttribute('class', 'tooltip');
    tooltip.textContent = 'Удалить контакт';
    btnDelOfInput.append(tooltip);
    btnDelOfInput.classList.add('cancel');
    document.querySelectorAll('.modal__block-complex').forEach(block => block.append(btnDelOfInput));
  };

  function addClientToTable(object) {
    let tr = document.createElement('tr');
    let btnChange = document.createElement('button');
    let btnDelete = document.createElement('button');
    let btns = document.createElement('td');
    let id = document.createElement('td');
    let fullName = document.createElement('td');
    let contacts = document.createElement('td');
    let blockOfCreation = document.createElement('td');
    let blockOfUpdate = document.createElement('td'); 
    let dateOfCreation = document.createElement('time');
    let dateOfUpdate = document.createElement('time');
    let timeOfCreation = document.createElement('time');
    let timeOfUpdate = document.createElement('time');
    let preElemLil = document.createElement('span');
    let preElemRed = document.createElement('span');
    let sub = document.createElement('div');

    id.textContent = object.id;
    fullName.textContent = `${object.surname} ${object.name} ${object.lastName}`;
    dateOfCreation.textContent = new Date(object.createdAt).toLocaleDateString();
    dateOfUpdate.textContent = new Date(object.updatedAt).toLocaleDateString();
    dateOfCreation.setAttribute('datetime', new Date(object.createdAt).toISOString());
    dateOfUpdate.setAttribute('datetime', new Date(object.updatedAt).toISOString());
    timeOfCreation.textContent = new Date(object.createdAt).toLocaleTimeString().slice(0,-3);
    timeOfUpdate.textContent = new Date(object.updatedAt).toLocaleTimeString().slice(0,-3);
    timeOfCreation.setAttribute('class', 'clock');
    timeOfUpdate.setAttribute('class', 'clock');
    sub.setAttribute('class', 'sub');
    preElemLil.setAttribute('class', 'write pictogram');
    preElemRed.setAttribute('class', 'del cross');
    btnChange.textContent = 'Изменить';
    btnDelete.textContent = 'Удалить';
    btnChange.setAttribute('class', 'change');
    btnChange.setAttribute('data-id', object.id);
    btnDelete.setAttribute('data-id', object.id);
    btnDelete.setAttribute('class', 'delete');
    btns.setAttribute('class', 'group');

    createIconOfContact(object, contacts);
    hideContacts(object, contacts);

    table.append(tr);
    tr.append(id);
    tr.append(fullName);
    blockOfCreation.append(dateOfCreation);
    blockOfUpdate.append(dateOfUpdate);
    blockOfCreation.append(timeOfCreation);
    blockOfUpdate.append(timeOfUpdate);
    tr.append(blockOfCreation);
    tr.append(blockOfUpdate);
    tr.append(contacts);
    btns.append(preElemLil);
    btns.append(btnChange);
    sub.append(preElemRed);
    sub.append(btnDelete);
    btns.append(sub);
    tr.append(btns);

    setTooltip();
    return {
      tr,
      btnChange,
      btnDelete,
    };
  };

  function createIconOfContact(object, contacts) {
    let style = [
      'phone',
      'another',
      'mail',
      'vk',
      'fb',
    ];
    let contact;
    for (let j = 0; j < object.contacts.length; j++) {
      for (let f = 0; f < style.length; f++) {
        if (object.contacts[j].type === style[f]) {
          contact = document.createElement('a');  
          contact.classList.add(style[f]);
          
          if (object.contacts[j].type === 'phone') {
            contact.setAttribute('href', `tel:${object.contacts[j].value}`);
          };
          if (object.contacts[j].type === 'vk') {
            contact.setAttribute('href', `https://vk.com/${object.contacts[j].value}`);
            contact.setAttribute('target', '_blank');
          };
          if (object.contacts[j].type === 'mail') {
            contact.setAttribute('href', `mailto:${object.contacts[j].value}`);
          };
          if (object.contacts[j].type === 'fb') {
            contact.setAttribute('href', `https://facebook.com/${object.contacts[j].value}`);
            contact.setAttribute('target', '_blank');
          };            
          contact.setAttribute('aria-label', `${object.contacts[j].value}`);
          let tooltip = document.createElement('p');
          tooltip.setAttribute('class', 'tooltip');
                
          if (object.contacts[j].value.includes('@') && object.contacts[j].value.includes(' ')) {
            let link = document.createElement('span');
            link.setAttribute('class', 'link');
            link.textContent = object.contacts[j].value.split(' ')[1];
            tooltip.textContent = object.contacts[j].value.split(' ')[0] + ' ';
            tooltip.append(link);
          } else {
            tooltip.textContent = object.contacts[j].value;
          }
          contact.append(tooltip);
          contacts.append(contact);
        };
      };
    };
  };

  function hideContacts(object, contacts) {
    if (object.contacts.length > 5) {
      for (let k = 4; k < contacts.childNodes.length; k++) {
        contacts.childNodes[k].style.display = 'none';
      }
      let cover = document.createElement('button');
      cover.setAttribute('class', 'cover');
      let number = contacts.childNodes.length - 4;
      let elem = document.createElement('span');
      elem.setAttribute('class', 'cover__elem');
      elem.textContent = `+${number}`;
      cover.append(elem);
      contacts.append(cover);
      cover.addEventListener('click', () => {
        contacts.childNodes.forEach(child => child.removeAttribute('style'));
        setTooltip();
        cover.classList.add('hide');
        setTimeout(function () {
          for (let k = 4; k < contacts.childNodes.length - 1; k++) {
            contacts.childNodes[k].style.display = 'none';
          }
          cover.classList.remove('hide');
        }, 60000);
      });
    };
  };

  function setTooltip() {
    let tooltips = document.querySelectorAll('.tooltip');
    for (let l = 0; l < tooltips.length; l++) {
      let width = getComputedStyle(tooltips[l]).width;
      let need = (parseInt(width) + 17) / 2 * -1;
      tooltips[l].style.left = `${need}px`;
    };
  };

  async function deleteCustomerRecord(el) {
    response = await fetch(`http://localhost:3000/api/clients/${el.target.dataset.id}`, {
      method: 'DELETE',
    }),
    data = await response.json();
  };
   
  btn.addEventListener('click', (e) => {
    legend.textContent = 'Новый клиент';
    btnUnderlined.textContent = 'Отмена';
    spanId.textContent = '';
    modal.classList.remove('hide');
    modalOverlay.classList.remove('hide');
  });
  
  // форма добавления клиента
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (legend.innerHTML === 'Изменить данные') {
      check();
      changeCustomerRecord();
    } else {
      check();
      createCustomerRecord();
    }
    showPreloader();
    await showListOfClients();
  });

 // закрыть модальное окно
  close.forEach(btnClose => {
    btnClose.addEventListener('click', (e) => {
      window.location.reload();
    });
  });

  // отключение модального окна при нажатии на задний фон
  modalOverlay.addEventListener('click', () => {
    window.location.reload();
  });

  btnUnderlined.addEventListener('click', function(el) {
    if (btnUnderlined.innerHTML === 'Отмена') {
      window.location.reload();
    };
    if (btnUnderlined.innerHTML === 'Удалить клиента') {
      deleteCustomerRecord(el);
      showListOfClients();
    };
  });
  
//ПОИСК-------------------------------------------------------------------
  let timerId;
  let searchInput = document.querySelector('.header__input');
   
  searchInput.addEventListener('input', async function() {
    response = await fetch('http://localhost:3000/api/clients');
    data = await response.json();
    clearTimeout(timerId);
    let text = searchInput.value;
    timerId = setTimeout(function() {
      data.forEach(async (arr) => {
        function newData (id, surname, name, lastName) {
          this.id = id;
          this.surname = surname;
          this.name = name;
          this.lastName = lastName;
        };
        let dataFormated = new newData (arr.id, arr.surname, arr.name, arr.lastName);
        let values = Object.values(dataFormated);
        for (let value of values) {
          if (text === value) {
            response = await fetch(`http://localhost:3000/api/clients/${dataFormated.id}`);
            data = await response.json();
            let array = [];
            array.push(data);
            deleteRows();
            formTable(array);
          };
        };
      });
    }, 300);
  });

  document.querySelector('.modal_overlay').addEventListener('mouseover', () => {
    disableScroll();
  });
  document.querySelector('.modal_overlay').addEventListener('mouseout', () => {
    enableScroll();
  });

//ВАЛИДАЦИЯ-------------------------------------------------------------------------------------
  let blockForErrors = document.querySelector('.modal__errors');
  let errors = [
    `Незаполнено поле 'Фамилия'`,
    `Незаполнено поле 'Имя'`,
  ];
  let field = [
    surname,
    name,
  ]

  function addElmnts() {
    for (let i = 0; i < field.length; i++) {
      if (field[i].value === '  ' || !field[i].value) {
        field[i].classList.add('error');
        let errorText = document.createElement('p');
        errorText.setAttribute('class', 'error-text');
        errorText.textContent = errors[i];
        blockForErrors.append(errorText);
      };
    };
  };

  function check() {
    let inputContact = document.querySelectorAll('.input--border');
    let countNull = 0;
    addElmnts();
    inputContact.forEach(contact => {
      if (contact.value === '  ' || !contact.value) {
        countNull++;
        contact.classList.add('input-error');
        let errorText = document.createElement('p');
        errorText.setAttribute('class', 'error-text');
        if (countNull === 1) {
          errorText.textContent = 'Незаполнено поле c контактом';
          blockForErrors.append(errorText);
        };
      };
    });
  };

  function cleanError(el) {
    let errorText = document.querySelectorAll('.error-text');
    el.oninput = function() {
      if (el.classList.contains('error')) {
        el.classList.remove('error');
        // checkInput(surname, errors[0]);
        // checkInput(name, errors[1]);
        if (el === surname) {
          for (let i = 0; i < errorText.length; i++) {
            if (errorText[i].innerHTML === errors[0]) {
              errorText[i].remove();
            };
          };
        };

        if (el === name) {
          for (let i = 0; i < errorText.length; i++) {
            if (errorText[i].innerHTML === errors[1]) {
              errorText[i].remove();
            };
          };
        }; 
      };    
    if (el.classList.contains('input-error')) {
      el.classList.remove('input-error');
      if (!document.querySelector('.input-error')) {
        for (let i = 0; i < errorText.length; i++) {
          if (errorText[i].innerHTML === 'Незаполнено поле c контактом') {
            errorText[i].remove();
          };
        };
      }
    };
  
  };
  };

  form.addEventListener('focus', () => {
    let elem = document.activeElement;
    if (elem !== document.querySelector('button')) cleanError(elem);
  }, true);

  document.querySelectorAll('.modal__input').forEach(item => {
    item.addEventListener('blur', () => {
      if (!item.value) {
        item.classList.remove('valid');
      } else {
        item.classList.add('valid');
      }
    })
  });

  function showPreloader() {
    let spinner = document.querySelector('.btn-preloader');
    spinner.classList.remove('hide');
  }

  function showPreloader() {
    let spinner = document.querySelector('.btn-preloader');
    spinner.classList.remove('hide');
  }
});