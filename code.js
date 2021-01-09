types = {};
types.main = 'main';
types.btn = 'button';
types.card = 'card';
types.carousel = 'carousel';
types.col = 'column';
types.container = 'row';
types.navbar = 'navbar';

function getType(element) {
  for (let i in types)
    if (element.classList.contains(i))
      return types[i];
  if (element.tagName === 'FORM')
    return 'form';
}

function v(select) {
  return $(select).value;
}

let code = {};
let options = {};

code.button = () => {
  let type = v('#button-type');
  let size = v('#button-size');
  return `<button type="button" class="btn ${type} ${size} selectable">Button</button>`;
}

options['button-size'] = {};
options['button-size'].medium = '';
options['button-size'].small = 'btn-sm';
options['button-size'].large = 'btn-lg';

options['button-type'] = {};
options['button-type'].primary = 'btn-primary';
options['button-type'].secondary = 'btn-secondary';
options['button-type'].success = 'btn-success';
options['button-type'].danger = 'btn-danger';
options['button-type'].warning = 'btn-warning';
options['button-type'].info = 'btn-info';
options['button-type'].light = 'btn-light';
options['button-type'].dark = 'btn-dark';
options['button-type'].link = 'btn-link';

code.card = () => {
  let image = $('#image').checked ? `<img src="..." class="card-img-top" alt="...">` : '';
  let header = $('#header').checked ? `<div class="card-header">
    Header
  </div>` : '';
  let button = $('#card-button').checked ? `<a href="#" class="btn btn-primary">Button</a>` : '';
  return `<div class="card selectable" style="width: 18rem;">
    ${image}
    ${header}
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">Card text</p>
      ${button}
    </div>
  </div>`;
}

options['card'] = {};
options['card'].image = false;
options['card'].header = true;
options['card']['card-button'] = true;

let carouselId = 0;
code.carousel = () => {
  let id = ++carouselId;
  let indicators = $('#indicators').checked ? `<ol class="carousel-indicators">
    <li data-bs-target="#carouselExample${id}" data-bs-slide-to="0" class="active"></li>
    <li data-bs-target="#carouselExample${id}" data-bs-slide-to="1"></li>
    <li data-bs-target="#carouselExample${id}" data-bs-slide-to="2"></li>
  </ol>` : '';
  let caption = $('#captions').checked ? `<div class="carousel-caption">
    <p>Slide</p>
  </div>` : '';
  return `<div id="carouselExample${id}" class="carousel slide selectable" data-bs-ride="carousel">
    ${indicators}
    <div class="carousel-inner">
      <div class="carousel-item active" style="height:100px">
        <img src="..." class="d-block w-100" alt="...">
        ${caption}
      </div>
      <div class="carousel-item">
        <img src="..." class="d-block w-100" alt="...">
        ${caption}
      </div>
      <div class="carousel-item">
        <img src="..." class="d-block w-100" alt="...">
        ${caption}
      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExample${id}" role="button" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExample${id}" role="button" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </a>
  </div>`;
};

options['carousel'] = [];
options['carousel'].indicators = true;
options['carousel'].captions = true;

let formID = 0;
code.form = () => {
  let id = ++formID;
  let email = $('#email').checked ? `<div class="mb-3">
    <label for="exampleInputEmail${id}" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail${id}">
  </div>` : '';
  let password = $('#password').checked ? `<div class="mb-3">
    <label for="exampleInputPassword${id}" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword${id}">
  </div>` : '';
  let checkbox = $('#checkbox').checked ? `<div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck${id}">
    <label class="form-check-label" for="exampleCheck${id}">Checkbox</label>
  </div>` : '';
  let select = $('#select').checked ? `<select class="form-select mb-3">
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>` : '';
  let text = $('#text').checked ? `<div class="mb-3">
    <label for="exampleInputText${id}" class="form-label">Text</label>
    <input type="text" class="form-control" id="exampleInputText${id}">
  </div>` : '';
  let textarea = $('#textarea').checked ? `<div class="mb-3">
  <label for="exampleTextarea${id}" class="form-label">Textarea</label>
  <textarea class="form-control" id="exampleTextarea${id}" rows="3"></textarea>
</div>` : '';
  let submit = $('#submit').checked ? `<button type="submit" class="btn btn-primary">Submit</button>` : '';
  return `<form class="selectable">
    ${email}
    ${password}
    ${checkbox}
    ${select}
    ${text}
    ${textarea}
    ${submit}
  </form>`;
};

options['form'] = {};
options['form'].email = true;
options['form'].password = true;
options['form'].checkbox = true;
options['form'].select = false;
options['form'].text = false;
options['form'].textarea = false;
options['form'].submit = true;

let navbarID = 0;
code.navbar = () => {
  let id = ++navbarID;
  let navbarColor = v('#navbar-color');
  return `<nav class="navbar navbar-expand-lg navbar-${navbarColor} bg-${navbarColor} selectable">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent${id}" aria-controls="navbarSupportedContent${id}" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent${id}">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown${id}" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown${id}">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li>
        </ul>
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>`;
};

options['navbar-color'] = {};
options['navbar-color'].light = 'light';
options['navbar-color'].dark = 'dark';

code.row = () => {
  let numCols = Number(v('#num-cols'));
  return `<div class="container selectable">
    <div class="row">
      ${`<div class="col selectable">
        Column (double-click to select row)
      </div>\n`.repeat(numCols)}
    </div>
  </div>`;
};

options['num-cols'] = {};
for (let i = 2; i <= 6; i++)
  options['num-cols'][i] = i;