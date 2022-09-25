//DEGISKENLER
let ingredients = [
  /* DIREKT DONGU KULLANABILMEK ICIN GLOBALDE 
  MALZEMELERI ARRAYIN ICINDE MINIK ARRAYLERE BOLDUM
   */
  ['marul', 5],
  ['sos', 5],
  ['sogan', 5],
  ['kofte', 5],
  ['tavuk', 5],
  ['domates', 5],
  ['ekmek', 5],
  ['tursu', 5],
  ['patates', 5],
  ['kola', 5],
];

let selectedIngredients = []; // <= KULLANICININ SECTIGI MALZEMELER BURADA TUTULACAK
let menu;
let cookingOption;
let enoughIngredients = true; // <= EGER MALZEME YOKSA YENI ISTEK YAPMAMASINI SAGLAYAN BOOLEAN
let burgerOptionAsked = false;

//DOM SELECTORELERI
const continueBtn = document.querySelector('.continueBtn');
const notification = document.querySelector('.notification');
const checkboxes = document.querySelectorAll('.checkbox');
const ingredientsContainer = document.querySelector('.ingredientsContainer');
const header = document.querySelector('.header');
const potatoesNotification = document.querySelector('.potatoes');
const drinkNotification = document.querySelector('.drink');
const kofteButton = document.querySelector('.kofte');
const tavukButton = document.querySelector('.tavuk');
const azButton = document.querySelector('.az');
const ortaButton = document.querySelector('.orta');
const cokButton = document.querySelector('.cok');
const optionButtons = document.querySelectorAll('.btn');
const newOrderButton = document.querySelector('.newOrder');

//YENI SIPARIS ALINDIGINDA GEREKLI DUZENLEMELERI YAPAN FONKSIYON
const newOrder = () => {
  notification.textContent = '';
  newOrderButton.classList.add('hidden');
  header.classList.remove('hidden');
  ingredientsContainer.classList.remove('hidden');
  continueBtn.classList.remove('hidden');
  potatoesNotification.textContent = '';
  drinkNotification.textContent = '';
};

//MENU SECIMINI AYARLAYAN VE GEREKLI MALZEMELERIN DUZENLEMESINI YAPAN FONKSIYONLAR
const menuChooser = (event) => {
  menu = event.target.innerHTML;
  burgerOptionAsked = true;
};
const cookingOptionChooser = (event) => {
  cookingOption = event.target.value;
};
const stockCheckIngredients = () => {
  checkboxes.forEach((item) =>
    item.checked ? selectedIngredients.push(item.value) : null
  );
};

const ingredientFinder = () => {
  // KULLANILAN MALZEMELERIN SAYISINI AZALTIYOR
  ingredients[6][1] = ingredients[6][1] - 1;
  ingredients[8][1] = ingredients[8][1] - 1;
  ingredients[9][1] = ingredients[9][1] - 1;
  for (let i = 0; i < ingredients.length; i++) {
    if (selectedIngredients.includes(ingredients[i][0])) {
      ingredients[i][1] = ingredients[i][1] - 1;
    }
    if (ingredients[i][1] === -1) {
      //EGER MALZEME YOKSA YENI ISTEK YAPMAMASINI SAGLAYAN BOOLEAN
      enoughIngredients = false;
    }
  }
};

//BURADA PROMISE DONDUREN FONKSIYONLAR BASLIYOR
//KULLANICIDAN ISTEK ALAN FONKSIYON
const getRequests = () => {
  return new Promise((resolve) => {
    ingredientsContainer.classList.add('hidden');
    continueBtn.classList.add('hidden');
    notification.textContent = 'siparisiniz aliniyor';
    header.classList.add('hidden');
    setTimeout(() => {
      notification.textContent = 'siparisiniz alindi';
      resolve();
    }, 1000);
  });
};

//STOK KONTROLU YAPAN FONKSIYON
const stockControl = () => {
  let stockControlled = true;
  stockCheckIngredients();
  ingredientFinder();
  notification.textContent = 'malzeme kontrolu yapiliyor';
  if (stockControlled) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (enoughIngredients) {
          notification.textContent = 'kofte mi tavuk mu?';
          kofteButton.classList.remove('hidden');
          tavukButton.classList.remove('hidden');
          resolve();
        } else {
          reject(
            (notification.textContent =
              'yeterli malzeme yok sonra tekrar gelin')
          );
        }
      }, 3000);
    });
  }
};

const askBurgerType = () => {
  kofteButton.classList.add('hidden');
  tavukButton.classList.add('hidden');
  notification.textContent = 'menu sorgusu yapiliyor';
  if (burgerOptionAsked === true) {
    switch (menu) {
      case 'kofte':
        menu = 'kofte';
        ingredients[3][1] = ingredients[3][1] - 1;
        break;
      case 'tavuk':
        menu = 'tavuk';
        ingredients[4][1] = ingredients[4][1] - 1;
        break;
    }
  }

  return new Promise((resolve) => {
    if (menu) {
      setTimeout(() => {
        if (menu === 'kofte') {
          notification.textContent = `kofteniz nasil olsun`;
          azButton.classList.remove('hidden');
          ortaButton.classList.remove('hidden');
          cokButton.classList.remove('hidden');
        }
        resolve(menu);
      }, 1000);
    }
  });
};

const askCooking = () => {
  let preparationTime = 0;
  if (menu === 'tavuk') {
    notification.textContent = 'tavuklar pisiriliyor';
  }

  if (menu === 'kofte') {
    notification.textContent = 'kofteniz pisiriliyor';
    optionButtons.forEach((btn) => btn.classList.add('hidden'));
    switch (cookingOption) {
      case 'az':
        preparationTime = 2000;
        break;
      case 'orta':
        preparationTime = 3000;
        break;
      case 'cok':
        preparationTime = 4000;
        break;
    }
  } else if (menu === 'tavuk') {
    preparationTime = 3000;
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      if (menu === 'kofte') {
        notification.textContent = 'kofteniz pisirildi';
      }
      resolve();
    }, preparationTime);
  });
};

const makeBurger = () => {
  notification.textContent = 'hamburger yapiliyor';
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
};

const cookPotatoes = async () => {
  potatoesNotification.textContent = 'patatesler kizartiliyor';
  return new Promise((resolve) => {
    setTimeout(() => {
      potatoesNotification.textContent = 'patatesler kizartildi';
      resolve();
    }, 5000);
  });
};

const prepareDrink = async () => {
  drinkNotification.textContent = 'icecek hazirlaniyor';
  return new Promise((resolve) => {
    setTimeout(() => {
      drinkNotification.textContent = 'icecek hazir';
      resolve();
    }, 2000);
  });
};

const prepareMenu = () => {
  potatoesNotification.textContent = '';
  drinkNotification.textContent = '';
  notification.textContent = 'urunler tepsiye konuyor';
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

const serveCustomer = () => {
  notification.textContent = 'musteriye servis yapiliyor';
  return new Promise((resolve) => {
    setTimeout(() => {
      notification.textContent = 'musteriye servis yapildi';
      newOrderButton.classList.remove('hidden');
      resolve();
    }, 1000);
  });
};
/*BURADA ISE GENEL DIYAGRAM KUCUK AKISLARA BOLUNDU.
 KULLANICININ SECIMLERINE GORE AKIS DEGISIYOR */
const firstFlow = () => {
  getRequests().then(() => {
    stockControl().then(() => {
      prepareDrink();
      cookPotatoes();
    });
  });
};

const secondFlow = (event) => {
  menuChooser(event);
  if (menu === 'tavuk') {
    askBurgerType()
      .then(() => askCooking())
      .then(() => makeBurger())
      .then(() => prepareMenu())
      .then(() => serveCustomer());
  }
};

const thirdFlow = (event) => {
  menuChooser(event);
  if (menu === 'kofte') {
    askBurgerType();
  }
};

const lastFlow = (event) => {
  cookingOptionChooser(event);
  askCooking()
    .then(() => makeBurger())
    .then(() => prepareMenu())
    .then(() => serveCustomer());
};

/* SON OLARAK AKISLARI SAGLAMAK ICIN EVENT LISTENERLAR EKLENIYOR */
continueBtn.addEventListener('click', () => firstFlow());
tavukButton.addEventListener('click', (event) => secondFlow(event));
kofteButton.addEventListener('click', (event) => thirdFlow(event));
optionButtons.forEach((button) =>
  button.addEventListener('click', (event) => lastFlow(event))
);
newOrderButton.addEventListener('click', () => newOrder());
