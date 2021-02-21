'use strict';
document.addEventListener('DOMContentLoaded', function() { 
  const table = document.querySelector('tbody');
  const btn = document.querySelector('.main__btn');
  const close = document.querySelectorAll('.close');
  const modal = document.querySelector('.modal');
  const form = document.querySelector('.modal__form-new');
  const modalDel = document.querySelector('.modal-del');
  const modalOverlay = document.querySelector('.modal_overlay');
  const legend = document.querySelector('.modal__legend');
  const spanId = document.querySelector('.modal__span');
  const btnUnderlined = document.querySelector('.modal__btn--underlined');
  const labels = document.querySelectorAll('th');
  let response, data, i, inputContact, selectedDataset, rowOfTable;
  let surname = document.getElementById('surname');
  let name = document.getElementById('name');
  let lastName = document.getElementById('lastName');
  let fields = [
    'id',
    'surname',
    'createdAt',
    'updatedAt',
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

  async function sortArray(field) {
    response = await fetch('http://localhost:3000/api/clients');
    data = await response.json();
    let dataSorted = data.sort(inAscendingOrder(field));
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

  async function handle() {
    response = await fetch('http://localhost:3000/api/clients');
    data = await response.json();
    let dataSorted;
    let target;
    labels[0].addEventListener('click', (e) => {
      target = e.currentTarget;
      changeActiveCell(target);
      deleteRows();
      if (document.querySelector('th:first-child span:nth-child(2)').classList.contains('arrow-up')) {
        dataSorted = data.sort(inDescendingOrder(fields[0]));
        document.querySelector('th:first-child span:nth-child(2)').classList.remove('arrow-up');
      } else {
        dataSorted = data.sort(inAscendingOrder(fields[0]));
        document.querySelector('th:first-child span:nth-child(2)').classList.add('arrow-up');
      };
      formTable(dataSorted);
    });

    labels[1].addEventListener('click', (e) => {
      target = e.currentTarget;
      changeActiveCell(target);
      deleteRows();
      if (!document.querySelector('th:nth-child(2) span:nth-child(2)').classList.contains('arrow-up')) {
        dataSorted = data.sort(inDescendingOrder(fields[1]));
        document.querySelector('th:nth-child(2) span:nth-child(2)').classList.add('arrow-up');
        document.querySelector('.alphabet').textContent = 'Я-А';
      } else {
        dataSorted = data.sort(inAscendingOrder(fields[1]));
        document.querySelector('th:nth-child(2) span:nth-child(2)').classList.remove('arrow-up');
        document.querySelector('.alphabet').textContent = 'А-Я';
      };
      formTable(dataSorted);
    });

    labels[2].addEventListener('click', (e) => {
      target = e.currentTarget;
      changeActiveCell(target);
      deleteRows();
      if (document.querySelector('th:nth-child(3) span:last-child').classList.contains('arrow-up')) {
        data.sort((a, b) => {
          if ((new Date(a.createdAt).getMonth()) > (new Date(b.createdAt).getMonth())) {
            return 1;
          }
          if ((new Date(a.createdAt).getMonth()) < (new Date(b.createdAt).getMonth())) {
            return -1;
          }
          return 0;
          });
          dataSorted = data.sort((a, b) => {
            if ((new Date(a.createdAt).getFullYear()) > (new Date(b.createdAt).getFullYear())) {
              return 1;
            }
            if ((new Date(a.createdAt).getFullYear()) < (new Date(b.createdAt).getFullYear())) {
              return -1;
            }
            return 0;
          });
          document.querySelector('th:nth-child(3) span:last-child').classList.remove('arrow-up');
        } else {
            data.sort((a, b) => {
              if ((new Date(a.createdAt).getMonth()) < (new Date(b.createdAt).getMonth())) {
                return 1;
              }
              if ((new Date(a.createdAt).getMonth()) > (new Date(b.createdAt).getMonth())) {
                return -1;
              }
              return 0;
            });
            dataSorted = data.sort((a, b) => {
              if ((new Date(a.createdAt).getFullYear()) < (new Date(b.createdAt).getFullYear())) {
                return 1;
              }
              if ((new Date(a.createdAt).getFullYear()) > (new Date(b.createdAt).getFullYear())) {
                return -1;
              }
              return 0;
            });
            document.querySelector('th:nth-child(3) span:last-child').classList.add('arrow-up');
          };
      formTable(dataSorted);
    });

    labels[3].addEventListener('click', (e) => {
      target = e.currentTarget;
      changeActiveCell(target);
      deleteRows();
      if (document.querySelector('th:nth-child(4) span:last-child').classList.contains('arrow-up')) {
        data.sort((a, b) => {
          if ((new Date(a.updatedAt).getMonth()) > (new Date(b.updatedAt).getMonth())) {
            return 1;
          }
          if ((new Date(a.updatedAt).getMonth()) < (new Date(b.updatedAt).getMonth())) {
            return -1;
          }
          return 0;
          });
        dataSorted = data.sort((a, b) => {
          if ((new Date(a.updatedAt).getFullYear()) > (new Date(b.updatedAt).getFullYear())) {
            return 1;
          }
          if ((new Date(a.updatedAt).getFullYear()) < (new Date(b.updatedAt).getFullYear())) {
            return -1;
          }
          return 0;
        });
        document.querySelector('th:nth-child(4) span:last-child').classList.remove('arrow-up');
        } else {
          data.sort((a, b) => {
            if ((new Date(a.updatedAt).getMonth()) < (new Date(b.updatedAt).getMonth())) {
              return 1;
            }
            if ((new Date(a.updatedAt).getMonth()) > (new Date(b.updatedAt).getMonth())) {
              return -1;
            }
            return 0;
          });
          dataSorted = data.sort((a, b) => {
            if ((new Date(a.updatedAt).getFullYear()) < (new Date(b.updatedAt).getFullYear())) {
              return 1;
            }
            if ((new Date(a.updatedAt).getFullYear()) > (new Date(b.updatedAt).getFullYear())) {
              return -1;
            }
            return 0;
          });
          document.querySelector('th:nth-child(4) span:last-child').classList.add('arrow-up');
          };
      formTable(dataSorted);
    })
  };
  handle();

  function addContacts() {
    inputContact = document.querySelectorAll('.input--border');
    selectedDataset = document.querySelectorAll('.select-selected');
    let arr = [];
    
    for (i = 0; i < inputContact.length; i++) {
      let obj = {};
      obj.type = selectedDataset[i].dataset.name;
      obj.value = inputContact[i].value;
      console.log(obj);
      arr.push(obj);
    };
    return arr;
  };
 
  async function createCustomerRecord() {
      response = await fetch('http://localhost:3000/api/clients', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: `${name.value}`,
        surname: `${surname.value}`,
        lastName: `${lastName.value}`,
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
      name: `${name.value}`,
      surname: `${surname.value}`,
      lastName: `${lastName.value}`,
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
    for (i = 0; i < newArr.length; i++) {
      rowOfTable = addClientToTable(newArr[i]);

      // добавляем обработчик на кнопки
      rowOfTable.btnChange.addEventListener('click', (el) => {
        legend.textContent = 'Изменить данные';
        btnUnderlined.textContent = 'Удалить клиента';
        btnUnderlined.setAttribute('data-id', el.target.dataset.id);
        modal.classList.remove('hide');
        modalOverlay.classList.remove('hide');
        changeDataOfClient(el);
      });

      rowOfTable.btnDelete.addEventListener('click', (el) => {
        modalDel.classList.remove('hide');
        modalOverlay.classList.remove('hide');
        document.querySelector('.modal-del .modal__btn--lilac').addEventListener('click', (e) => {
          e.preventDefault();
          deleteCustomerRecord(el);
        });
      });
    };
  };

  async function changeDataOfClient(e) {
    response = await fetch('http://localhost:3000/api/clients/');
    data = await response.json();    
    
    let index;
    for (i = 0; i < data.length; i++) {
      if (data[i].id === e.target.dataset.id) {
        index = data.findIndex(item => item.id === e.target.dataset.id); 
        spanId.setAttribute('data-id', data[i].id);
        spanId.textContent = 'ID:' + ' ' + data[i].id;
      };
    };
    let className;
    let cell = e.target.parentNode.previousSibling;
    let spanContacts = cell.querySelectorAll('span');
    let fullNameInputs = document.querySelectorAll('.modal input');
    let props = [
      data[index].surname,
      data[index].name,
      data[index].lastName,
    ];
    
    for (i = 0; i < fullNameInputs.length; i++) {
      fullNameInputs[i].value = props[i];
    };
    
    for (i = 0; i < spanContacts.length; i++) {
      transformSelect(e);
      createBtnCancel();
      document.querySelectorAll('.input--border')[i].value = spanContacts[i].getAttribute('aria-label');
      className = spanContacts[i].className;
      let necessary = options.find(option => className === option.value);
      selectedItem.innerHTML = necessary.label;
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
    let day = new Date(object.createdAt).getDate();
    let dayFormated = (day < 10 ? '0' : '') + day;
    let month = new Date(object.createdAt).getMonth() + 1;
    let monthFormated = (month < 10 ? '0' : '') + month;
    let dayUpdate = new Date(object.updatedAt).getDate();
    let dayUpdateFormated = (dayUpdate < 10 ? '0' : '') + dayUpdate;
    let monthUpdate = new Date(object.updatedAt).getMonth() + 1;
    let monthUpdateFormated = (monthUpdate < 10 ? '0' : '') + monthUpdate;
    let year = new Date(object.createdAt).getFullYear();
    let dateOfCreation = document.createElement('time');
    let dateOfUpdate = document.createElement('time');
    let timeOfCreation = document.createElement('time');
    let timeOfUpdate = document.createElement('time');
    let hours = new Date(object.createdAt).getHours();
    let hoursFrmd = (hours < 10 ? '0' : '') + hours;
    let minutes = new Date(object.createdAt).getMinutes();
    let minutesFormated = (minutes < 10 ? '0' : '') + minutes;
    let hourOfUpdate = new Date(object.updatedAt).getHours();
    let hourOfUpdateFrmd = (hourOfUpdate < 10 ? '0' : '') + hourOfUpdate;
    let minutesOfUpdate = new Date(object.updatedAt).getMinutes();
    let minutesFormatedOfUpdate = (minutesOfUpdate < 10 ? '0' : '') + minutesOfUpdate;
    
    id.textContent = object.id;
    fullName.textContent = `${object.surname} ${object.name} ${object.lastName}`;
    dateOfCreation.textContent = `${dayFormated}.${monthFormated}.${year}`;
    dateOfUpdate.textContent = `${dayUpdateFormated}.${monthUpdateFormated}.${year}`;
    timeOfCreation.textContent = `${hoursFrmd}:${minutesFormated}`;
    timeOfUpdate.textContent = `${hourOfUpdateFrmd}:${minutesFormatedOfUpdate}`;
    btnChange.textContent = 'Изменить';
    btnDelete.textContent = 'Удалить';
    timeOfCreation.setAttribute('class', 'clock');
    timeOfUpdate.setAttribute('class', 'clock');
    btnChange.setAttribute('class', 'change');
    btnChange.setAttribute('data-id', object.id);
    btnDelete.setAttribute('data-id', object.id);
    btnDelete.setAttribute('class', 'delete');
    btns.setAttribute('class', 'group');

    (function () {
      let style = [
        'phone',
        'another',
        'mail',
        'vk',
        'fb',
      ];
  
      for (let j = 0; j < object.contacts.length; j++) {
        for (let f = 0; f < style.length; f++) {
          if (object.contacts[j].type === style[f]) {
            let contact = document.createElement('span');  
            contact.classList.add(style[f]);
            contact.setAttribute('data-balloon-pos', 'up');
            contact.setAttribute('aria-label', `${object.contacts[j].value}`);
            contacts.append(contact);
          };
        };
      };
    })();
    
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
    btns.append(btnChange);
    btns.append(btnDelete);
    tr.append(btns);
    
    return {
      tr,
      btnChange,
      btnDelete,
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
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (legend.innerHTML === 'Изменить данные') {
      changeCustomerRecord();
    } else {
      createCustomerRecord();
    }
    showListOfClients();
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
  
 
  //Поиск-------------------------------------------------------------------
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
});