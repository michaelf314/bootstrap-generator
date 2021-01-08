let selected = {};
selected.left = $('#button');
selected.main = $('#main');
let selectedLeft = $('#button'), selectedMain = $('#main');

function $(selector) {
  return document.querySelector(selector);
}

function canInsert(elementType, parentType) {
  return parentType === 'main' || parentType === 'column';
}

document.querySelectorAll('#insert button').forEach((button) => button.addEventListener('click', (e) => {
  let position = e.target.id;
  let newElement = code[selected.left.id]();
  selected.main.insertAdjacentHTML(position, '\n' + newElement + '\n');
  document.querySelectorAll('.selectable').forEach((e) => {
    e.addEventListener('click', updateSelected);
    e.classList.remove('selectable');
    if (getType(e) === 'row')
      e.addEventListener('dblclick', updateSelected);
  });
  updateCode();
}));

$('#delete').addEventListener('click', (e) => {
  selected.main.remove();
  $('#main').click();
  updateCode();
})

function displayOptions() {
  document.querySelectorAll('div[id$=options]').forEach((div) => div.classList.add('hidden'));
  options = $(`#${selected.left.id}-options`);
  if (options)
    options.classList.remove('hidden');
}

function enableButtons() {
  let leftType = selected.left.id;
  let rightType = getType(selected.main);
  let parentType = getType(selected.main.parentElement);
  $('#beforebegin').disabled = $('#afterend').disabled = canInsert(leftType, rightType);
  $('#afterbegin').disabled = $('#beforeend').disabled = canInsert(leftType, parentType);
  $('#delete').disabled = rightType === 'main';
}
enableButtons();

function updateSelected(e) {
  let container = $('#left').contains(e.currentTarget) ? 'left' : 'main';
  selected[container].classList.remove('select-outline');
  selected[container] = e.currentTarget;
  selected[container].classList.add('select-outline');
  e.stopPropagation();
  enableButtons();
  if (container === 'left') {
    displayOptions();
    $('#selected-left').innerHTML = selected.left.id;
  }
  else {
    $('#selected-main').innerHTML = $('#selected-delete').innerHTML = getType(selected.main);
  }
}
selected.main.classList.add('select-outline');
selected.main.addEventListener('click', updateSelected);
selected.left.classList.add('select-outline');
document.querySelectorAll('#components button').forEach((button) => {
  button.addEventListener('click', updateSelected);
});

function checkboxHTML(optionName) {
  let option = options[optionName];
  let html = `<b>${optionName.replace('-', ' ')} options</b><br>`;
  for (let i in option)
    html += `<input type="checkbox" id="${i}" ${option[i] ? 'checked' : ''}>
  <label for="${i}">${i}</label><br>`;
  return html;
}

function selectHTML(optionName) {
  let option = options[optionName];
  let html = `<b>${optionName.replace('-', ' ')}</b><br>
  <select class="form-select" aria-label="Default select example" id="${optionName}" style="width:auto; margin:auto;">`;
  for (let i in option)
    html += `<option value="${option[i]}">${i}</option>`;
  html += `</select>`;
  return html;
}

function addOption(componentID, optionName, inputType=selectHTML) {
  $('#'+componentID).insertAdjacentHTML('beforeend', inputType(optionName));
}
addOption('button-options', 'button-type');
addOption('button-options', 'button-size');
addOption('navbar-options', 'navbar-color');
addOption('row-options', 'num-cols');
addOption('card-options', 'card', checkboxHTML);
addOption('carousel-options', 'carousel', checkboxHTML);
addOption('form-options', 'form', checkboxHTML);

function updateCode() {
  $('#code textarea').innerHTML = html_beautify($('#main').innerHTML.replace(/ ?select-outline/, ''), {'max_preserve_newlines': 0});
}
$('#code-tab').addEventListener('click', updateCode);

$('#copy').addEventListener("click", () => {
  var copyText = $("#code textarea");
  copyText.select();
  document.execCommand("copy");
  $('#copied').classList.remove('hidden');
});

$('#copy').addEventListener("mouseout", () => {
  $('#copied').classList.add('hidden');
});