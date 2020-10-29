let addItemForm = document.querySelector('#addItemForm');
let itemsList = document.querySelector('.actionItems');
let storage = chrome.storage.sync;

storage.get(['actionItems', 'name'], (data) => {
  let actionItems = data.actionItems;
  renderActionItems(actionItems)
})

const renderActionItems = (actionItems) => {
  actionItems.forEach((item) => {
    renderActionItem(item.text);
  });
}

addItemForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let itemText = addItemForm.elements.namedItem('itemText').value;
  if (itemText) {
    add(itemText);
    renderActionItem(itemText);
    addItemForm.elements.namedItem('itemText').value = '';
  }
})

const add = (text) => {

  let actionItem = {
    id: 1,
    added: new Date().toString(),
    text: text,
    completed: null
  }


  chrome.storage.sync.get(['actionItems'], (data) => {
    let items = data.actionItems;
    if (!items) {
      items = [actionItem]
    } else {
      items.push(actionItem)
    }
    chrome.storage.sync.set({
      actionItems: items
    }, () => {
      chrome.storage.sync.get(['actionItems'], (data) => {
        console.log(data);
      })
    })
  })

}

const renderActionItem = (text) => {
  let element = document.createElement('div');
  element.classList.add('actionItem__item');
  let mainElement = document.createElement('div');
  mainElement.classList.add('actionItem__main');
  let checkEl = document.createElement('div');
  checkEl.classList.add('actionItem__check');
  let textEl = document.createElement('div');
  textEl.classList.add('actionItem__text');
  let deleteEl = document.createElement('div');
  deleteEl.classList.add('actionItem__delete');

  checkEl.innerHTML = ` 
      <div class="actionItem__checkBox">
        <i class="fas fa-check"></i>
      </div>`

  textEl.textContent = text;
  deleteEl.innerHTML = `<i class="fas fa-times"></i>`;

  mainElement.appendChild(checkEl);
  mainElement.appendChild(textEl);
  mainElement.appendChild(deleteEl);
  element.appendChild(mainElement);
  // console.log(element);
  itemsList.prepend(element);
}