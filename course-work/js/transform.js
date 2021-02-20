function transformSelect(e) {
    e.preventDefault();
    if (document.querySelector('.hide')) {
      wrap.classList.remove('hide');
    };
    createSelect();
    block = document.querySelectorAll('.modal__block-complex');
    for (i = 0; i < block.length; i++) {
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
        h = this.parentNode.previousSibling;
        for (i = 0; i < selectGroup.length; i++) {
          if (selectGroup.options[i].label == this.innerHTML) {
            selectGroup.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            h.setAttribute('data-name', selectGroup.options[i].value);
            blockSame = this.parentNode.getElementsByClassName('same-as-selected');
            for (k = 0; k < blockSame.length; k++) {
              blockSame[k].removeAttribute('class');
            };
            let currentHide = document.querySelector('.select-hide');
            this.setAttribute('class', 'select-hide');
            currentHide.classList.remove('select-hide');
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
        this.classList.toggle('select-arrow-active');
        if (selectedItem.innerHTML == selElmnt.options[0].label) {
          let first = document.querySelector('.select-items :first-child');
          first.classList.add('select-hide');
        };
      });
    };
  };
  

  // закрыть модальное окно
  close.forEach(btnClose => {
    btnClose.addEventListener('click', (e) => {
      btnClose.closest('.modal').classList.add('hide');
      modalOverlay.classList.add('hide');
      wrap.classList.add('hide');
      document.querySelectorAll('.modal input').forEach(input => input.value = '');
      
    });
  });

  // отключение модального окна при нажатии на задний фон
  modalOverlay.addEventListener('click', () => {
    document.querySelectorAll('.modal').forEach(modal => modal.classList.add('hide'));
    modalOverlay.classList.add('hide');
    
  });

  
  // table.addEventListener('click', function(e) {
  //   e.preventDefault();
  //   modalDel.classList.remove('hide');
  //   modalOverlay.classList.remove('hide');
  //   // if (e.target.closest('.group')) {
  //   //   e.target.closest('tr').remove();
  //   //   deleteCustomerRecord(e);
  //   // };
  // });

  for (j = 0; j < 2; j++) {
    labels[j].addEventListener('click', function() {
      deleteRows();
      let dataSorted = data.sort(byField(fields[j]));
      formTable(dataSorted);
    });
  }

  let array = [
    `${arr.id}`,
    `${arr.surname}`,
    `${arr.name}`,
    `${arr.lastName}`,
  ];