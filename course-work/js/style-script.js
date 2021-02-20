// 'use strict';
// document.addEventListener('DOMContentLoaded', function() {
  let block, i, j, selElmnt, selectedItem, optionList, optionItem, option, select, input, container;
  const addBtns = document.querySelectorAll('.modal__btn--full');
  let wrap = document.querySelector('.modal__wrap');
  let count = 0;
  let options = [
    {value: 'phone', label: 'Телефон'},
    {value: 'another', label: 'Доп.телефон'},
    {value: 'mail', label: 'Email'},
    {value: 'vk', label: 'Vk'},
    {value: 'fb', label: 'Facebook'},
  ];

  function createSelect() {
    container = document.createElement('div');
    container.classList.add('modal__block-complex');
    select = document.createElement('select');
    input = document.createElement('input');
    select.classList.add('modal__select', 'visually-hidden');
    input.classList.add('input--border');
    input.setAttribute('type', 'text'); 
    input.setAttribute('placeholder', 'Введите данные контакта');
    for (let k = 0; k < options.length; k++) {
      let obj = options[k];
      let keys = Object.keys(options[k]);
      option = document.createElement('option');
      for (let key of keys) {
        option.setAttribute(Object.keys(obj)[0], obj[keys[0]]);
        option.setAttribute(Object.keys(obj)[1], obj[keys[1]]);
        select.append(option);
      };
    };
    container.append(select);
    container.append(input);
    wrap.append(container);
  };

  addBtns.forEach(addBtn => {
    addBtn.addEventListener('click', transformSelect);
  });
  
  function transformSelect(e) {
    e.preventDefault();
    if (document.querySelector('.hide')) {
      wrap.classList.remove('hide');
    };
    createSelect();
    block = document.querySelectorAll('.modal__block-complex');
    for (i = count++; i < block.length; i++) {
      selElmnt = block[i].getElementsByTagName('select')[0];
      selectedItem = document.createElement('div');
      selectedItem.setAttribute('class', 'select-selected');
      selectedItem.setAttribute('data-name', 'phone');
      selectedItem.innerHTML = selElmnt.options[selElmnt.selectedIndex].label;
      block[i].append(selectedItem);
      optionList = document.createElement('div');
      optionList.setAttribute('class', 'select-items select-hide');
      for (j = 0; j < selElmnt.length; j++) {
        optionItem = document.createElement('div');
        optionItem.innerHTML = selElmnt.options[j].label;
        optionItem.setAttribute('data-name', selElmnt.options[j].value);
        optionItem.addEventListener('click', function(e) {
        let blockSame, i, k, selectGroup, h;
        selectGroup = this.parentNode.parentNode.getElementsByTagName('select')[0];
        console.log(selectGroup);
        h = this.parentNode.previousSibling;
        console.log(this.previousSibling);
        for (i = 0; i < selectGroup.length; i++) {
          if (selectGroup.options[i].label == this.innerHTML) {
            selectGroup.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            h.setAttribute('data-name', selectGroup.options[i].value);
            blockSame = this.parentNode.getElementsByClassName('same-as-selected');
            for (k = 0; k < blockSame.length; k++) {
              blockSame[k].removeAttribute('class');
            };
            //скрываем в списке выбранный элемент
            let currentHidden = document.querySelector('.select-hide');
            this.setAttribute('class', 'select-hide');
            currentHidden.classList.remove('select-hide');
            break;
          };
        };
        h.click();
      });
      optionList.append(optionItem);
      };
      block[i].append(optionList);
    
      selectedItem.addEventListener('click', function(e) {
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle('select-hide');
        console.log(this.nextSibling);
        this.classList.toggle('select-arrow-active');
        //скрываем option Телефон в списке
        if (selectedItem.innerHTML == selElmnt.options[0].label) {
          let first = document.querySelector('.select-items :first-child');
          first.classList.add('select-hide');
        };
      });
    };
  };
  

  function closeAllSelect(elmnt) {
    let items, selected, i, arr = [];
    items = document.getElementsByClassName('select-items');
    selected = document.getElementsByClassName('select-selected');
    for (i = 0; i < selected.length; i++) {
      if (elmnt == selected[i]) {
        arr.push(i);
      } else {
        selected[i].classList.remove('select-arrow-active');
      }
    }
    for (i = 0; i < items.length; i++) {
      if (arr.indexOf(i)) {
        items[i].classList.add('select-hide');
      };
    };
  };
  
  document.addEventListener('click', closeAllSelect);
  // });  
// });