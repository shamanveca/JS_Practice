
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var userDialog = document.querySelector('.setup');

// Открытие и закрытие формы
var onPopupEscPress = function(evt) {
    if (evt.keyCode === 27) {
        closePopup();
    }
}

var openPopup = function () {
    userDialog.classList.remove('hidden');
    userDialog.querySelector('.setup-similar').classList.remove('hidden');

    document.addEventListener('keydown', onPopupEscPress);
}

var closePopup = function () {
    userDialog.classList.add('hidden');
    userDialog.querySelector('.setup-similar').classList.add('hidden');

    document.removeEventListener('keydown', onPopupEscPress);
}

setupOpen.addEventListener('click', function() {
    openPopup();
});

setupOpen.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 13) {
        openPopup();
    }
});

setupClose.addEventListener('click', function() {
    closePopup();
});

setupClose.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 13) {
        closePopup();
    }
});

// ----------------------------------------------------------
// Валидация поля ввода имени и изменение стандартных сообщений об ошибке
var userNameInput = userDialog.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function(evt) {
    if (userNameInput.validity.tooShort) {
        userNameInput.setCustomValidity('Имя должно состоять имнимум из 2ух символов');
    } else if (userNameInput.validity.tooLong) {
        userNameInput.setCustomValidity('Имя не должно превышеть 25ти символов');
    } else if (userNameInput.validity.valueMissing) {
        userNameInput.setCustomValidity('Обязательное поле');
    } else {
        userNameInput.setCustomValidity('');
    }
});

userNameInput.addEventListener('input', function(evt) {
    var target = evt.target;
    if (target.value.length < 2) {
        target.setCustomValidity('Имя должно состоять имнимум из 2ух символов');
    } else {
        target.setCustomValidity('');
    }
});

// ----------------------------------------------------------
// Изменение своего персонажа
var player = document.querySelector('.setup-player');
var playerCoat = player.querySelector('.wizard-coat');
var playerEyes = player.querySelector('.wizard-eyes');
var playerFireball = player.querySelector('.setup-fireball-wrap');

var Wizard_Fireball_Color = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

playerCoat.addEventListener('click', function() {
    RandomCoatIndex = Math.floor(Math.random() * Wizard_Coat_Color.length);
    playerCoat.style.fill = Wizard_Coat_Color[RandomCoatIndex];
});

playerEyes.addEventListener('click', function() {
    RandomEyesIndex = Math.floor(Math.random() * Wizard_Eyes_Color.length);
    playerEyes.style.fill = Wizard_Eyes_Color[RandomEyesIndex];
});

playerFireball.addEventListener('click', function() {
    RandomFireballIndex = Math.floor(Math.random() * Wizard_Fireball_Color.length);
    playerFireball.style.background = Wizard_Fireball_Color[RandomFireballIndex];
});




// ----------------------------------------------------------
// Отрисовка футера с похожими персонажами
// Блок куда будем добавлять похожих персонажей
var similarListElement = userDialog.querySelector('.setup-similar-list');

// Блок шаблон template, для отрисовки mock'ов (копий) волшебников пока нет настоящих
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

// var Wizard_Names = ['Дамблдор', 'Волдеморт', 'Доктор стрендж', 'Гарри Поттер'];

// var wizards = [
//     {
//         name: Wizard_Names[0],
//         coatColor: 'rgb(241, 43, 107)'
//     },

//     {
//         name: Wizard_Names[1],
//         coatColor: 'rgb(215, 210, 55)'
//     },

//     {
//         name: Wizard_Names[2],
//         coatColor: 'rgb(101, 137, 164)'
//     },

//     {
//         name: Wizard_Names[3],
//         coatColor: 'rgb(127, 127, 127)'
//     },
// ]

var Wizard_Names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var Wizard_Second_Names = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var Wizard_Coat_Color = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161) ', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var Wizard_Eyes_Color = ['black', 'red', 'blue', 'yellow', 'green'];


var wizards = [
    {
        // Рандомная генерация Имя + Фамилия
        name: Wizard_Names[RandomNameIndex] + ' ' + Wizard_Second_Names[RandomSecondNameIndex],
        coatColor: Wizard_Coat_Color[RandomCoatIndex],
        eyesColor: Wizard_Eyes_Color[RandomEyesIndex]
    },

    {
        name: Wizard_Names[RandomNameIndex] + ' ' + Wizard_Second_Names[RandomSecondNameIndex],
        coatColor: Wizard_Coat_Color[RandomCoatIndex],
        eyesColor: Wizard_Eyes_Color[RandomEyesIndex]
    },

    {
        name: Wizard_Names[RandomNameIndex] + ' ' + Wizard_Second_Names[RandomSecondNameIndex],
        coatColor: Wizard_Coat_Color[RandomCoatIndex],
        eyesColor: Wizard_Eyes_Color[RandomEyesIndex]
    },

    {
        name: Wizard_Names[RandomNameIndex] + ' ' + Wizard_Second_Names[RandomSecondNameIndex],
        coatColor: Wizard_Coat_Color[RandomCoatIndex],
        eyesColor: Wizard_Eyes_Color[RandomEyesIndex]
    }
]

var renderWizard = function (wizard) {
    // Клонируем шаблон со всеми внутреностями
    var wizardElement = similarWizardTemplate.cloneNode(true);

    // Изменяем облик исходя из данных массивов
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
}

// Отрисовываем всех персонажей
var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
    // Создание рандомного индекса для имени и фамилии и запись данных в объект
    var RandomNameIndex = Math.floor(Math.random() * Wizard_Names.length);
    var RandomSecondNameIndex = Math.floor(Math.random() * Wizard_Second_Names.length);
    wizards[i].name = Wizard_Names[RandomNameIndex] + ' ' + Wizard_Second_Names[RandomSecondNameIndex];

    // Создание рандомного индекса для цвета плаща и запись в объект
    var RandomCoatIndex = Math.floor(Math.random() * Wizard_Coat_Color.length);
    wizards[i].coatColor = Wizard_Coat_Color[RandomCoatIndex];

    // Создание рандомного индекса для цвета глаз и запись в объект
    var RandomEyesIndex = Math.floor(Math.random() * Wizard_Eyes_Color.length);
    wizards[i].eyesColor = Wizard_Eyes_Color[RandomEyesIndex];

    fragment.appendChild(renderWizard(wizards[i]));

    similarListElement.appendChild(fragment);
}


// // При загрузка и отправка данных при наличии сервера
// var form = userDialog.querySelector('.setup-wizard-form');
// form.addEventListener('submit', function(evt) {
//     window.upload(new FormData(form), function(response) {
//         userDialog.classList.add('hidden');
//     });
//     evt.preventDefault();
// });

// window.load(function(wizards) {
//     var fragment = document.createDocumentFragment();

//     for (var i = 0; i < 4; i++) {
//         fragment.appendChild(renderWizard(wizards[i]));
//     }
//     similarListElement.appendChild(fragment);

//     userDialog.querySelector('.setup-similar').classList.remove('hidden');
// });

// ---------------------------------------------
// avatar.js - Загрузка аватара и его превью
(function() {
    var fileChooser = document.querySelector('.upload input[type=file]');
    var preview = document.querySelector('.setup-user-pic');
    var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

    fileChooser.addEventListener('change', function() {
        var file = fileChooser.files[0];
        var fileName = file.name.toLowerCase();
        var matches = FILE_TYPES.some(function(it) {
            return fileName.endsWith(it);
        });

        if (matches) {
            var reader = new FileReader();

            reader.addEventListener('load', function() {
                preview.src = reader.result;
            });

            reader.readAsDataURL(file);
        }
    });

})();