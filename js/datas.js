// ----------------------------------------------------------
// Создание глобальных переменных
(function() {
    window.datas = {
        commentsList: [
            'Всё отлично!',
            'В целом всё неплохо. Но не всё.',
            'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
            'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
            'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
            'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
        ],

        descriptionList: [
            'Тестим новую камеру!',
            'Затусили с друзьями на море',
            'Как же круто тут кормят',
            'Отдыхаем...',
            'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
            'Вот это тачка!'
        ],

        likesNumbers: [],

        commentsNumbers: [],
    };

    for (let i = 15; i <= 200; i++) {
        window.datas.likesNumbers.push(i);
    };

    for (let i = 0; i <= 20; i++) {
        window.datas.commentsNumbers.push(i);
    };

    // ----------------------------------------------------------
    // Создание массива данных для автозаполнения фото их лайков и коментов
    window.picturesDatas = [];

    for (let i = 1; i <= 26; i++) {
        let dataPic = {
                        url: './photos/' + i + '.jpg',
                        // url: './photos/1.jpg', 
                        likes: window.datas.likesNumbers[window.likesNumbersIndex],
                        numberOfCommets: window.datas.commentsNumbers[window.commentsNumbersIndex],
                        comments: window.datas.commentsList[window.commentsListIndex],
                        description: window.datas.descriptionList[window.descriptionListIndex]
                    };
        window.picturesDatas.push(dataPic);
    };

    // ----------------------------------------------------------
    // Закрытие на Esc
    window.onPopupEscPress = function(evt) {
        if (evt.keyCode === 27) {
            window.pictureClose();
            window.uploadOverlayClose();
        }
    };

})();



// // ----------------------------------------------------------
// // backend.js
// (function() {  
//     // var URLdownload = '#';
//     // var URLupload = '#';

//     var onLoad = function(data) { // Надо ли делать глобальную область видимости?????
//         console.log(data);
//     };

//     var onError = function(error) {
//         console.error(error);
//     };

//     // Загрузка с сервера
//     window.download = function(url, onLoad, onError) {
//         var xhr = new XMLHttpRequest; // Получение данных с сервера
//         xhr.responseType = 'json'; // Конвертируем полученные данные в нужный тип для работы в JS

//         xhr.addEventListener('load', function() {
//             var error;
//             switch (xhr.status) {
//                 case 200:
//                     onLoad(xhr.response);
//                     break;

//                 case 400:
//                     error = 'Неверный запрос';
//                     break;
//                 case 401:
//                     error = 'Пользователь не авторизован';
//                     break;
//                 case 404:
//                     error = 'Ничего не найдено';
//                     break;

//                 default:
//                     error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
//             }

//             if (error) {
//                 onError(error);
//             }
//         });

//         xhr.addEventListener('error', function() {
//             onError('Произошла ошибка соединения');
//         });

//         xhr.addEventListener('timeout', function() {
//             onError('Запрос не успел выаолниться за ' + xhr.timeout + 'мс');
//         });

//         xhr.timeout = 10000; // 10s

//         xhr.open('GET', url);
//         xhr.send();
//     };
    

  

//     // ----------------------------------------------------------
//     // Загрузка на сервер
//     window.upload = function(url, data, onLoad, onError) {
//         var xhr = new XMLHttpRequest; // Получение данных с сервера
//         xhr.responseType = 'json'; // Конвертируем полученные данные в нужный тип для работы в JS

//         xhr.addEventListener('load', function() {
//             onLoad(xhr.response);

//             if ( xhr.status === 200) {
//                 onLoad(xhr.response);
//             } else {
//                 onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
//             }
//         });

//         xhr.addEventListener('error', function() {
//             onError('Произошла ошибка соединения');
//         });

//         xhr.addEventListener('timeout', function() {
//             onError('Запрос не успел выаолниться за ' + xhr.timeout + 'мс');
//         });

//         xhr.open('POST', url);
//         xhr.send(data);
//     };

// })();

// // ----------------------------------------------------------
// // Отрисовка по шаблону изображений
// (function() {
//     var picturesTemplate = document.querySelector('#picture-template')
//     .content
//     .querySelector('.picture');

//     window.picturesContainer = document.querySelector('.pictures');

//     window.picturesRender = function (picture) {
//         var pictureElement = picturesTemplate.cloneNode(true);

//         pictureElement.querySelector('img').src = picture.url;
//         pictureElement.querySelector('.picture-likes').textContent = picture.likes;
//         pictureElement.querySelector('.picture-comments').textContent = picture.numberOfCommets;

//         return pictureElement;
//     };

//     window.fragment = document.createDocumentFragment();

//     for (var j = 0; j < window.picturesDatas.length; j++) {

//         window.likesNumbersIndex = Math.floor(Math.random() * window.datas.likesNumbers.length);
//         window.picturesDatas[j].likes = window.datas.likesNumbers[window.likesNumbersIndex];

//         window.commentsNumbersIndex = Math.floor(Math.random() * window.datas.commentsNumbers.length);
//         window.picturesDatas[j].numberOfCommets = window.datas.commentsNumbers[window.commentsNumbersIndex];

//         window.commentsListIndex = Math.floor(Math.random() * window.datas.commentsList.length);
//         window.picturesDatas[j].comments = window.datas.commentsList[window.commentsListIndex];

//         window.descriptionListIndex = Math.floor(Math.random() * window.datas.descriptionList.length);
//         window.picturesDatas[j].description = window.datas.descriptionList[window.descriptionListIndex];

//         window.fragment.appendChild(window.picturesRender(window.picturesDatas[j]));
//     };

//     window.picturesContainer.appendChild(window.fragment);


//     // ----------------------------------------------------------
//     // // Загрузка данных с сервера и отрисовка
//     // var URLdownload = '#';
//     // window.load(URLdownload, function(picturesDatas) {
//     //     var fragment = document.createDocumentFragment();

//     //     for (var i = 0; i < picturesDatas.length; i++) {

//     //         window.likesNumbersIndex = Math.floor(Math.random() * window.datas.likesNumbers.length);
//     //         picturesDatas[i].likes = window.datas.likesNumbers[window.likesNumbersIndex];

//     //         window.commentsNumbersIndex = Math.floor(Math.random() * window.datas.commentsNumbers.length);
//     //         picturesDatas[i].numberOfCommets = window.datas.commentsNumbers[window.commentsNumbersIndex];

//     //         window.commentsListIndex = Math.floor(Math.random() * window.datas.commentsList.length);
//     //         picturesDatas[i].comments = window.datas.commentsList[window.commentsListIndex];

//     //         window.descriptionListIndex = Math.floor(Math.random() * window.datas.descriptionList.length);
//     //         picturesDatas[i].description = window.datas.descriptionList[window.descriptionListIndex];


//     //         fragment.appendChild(picturesRender(window.picturesDatas[i]));
//     //     }

//     //     picturesContainer.appendChild(fragment);
//     // });

// })();


// // ----------------------------------------------------------
// // filter.js
// (function() {
//     // Блок фильтров
//     var filtersBlock = document.querySelector('.filters');
//     // Инпуты
//     var filter = document.querySelectorAll('input[type="radio"][name="filter"]');

//     filtersBlock.classList.remove('hidden');

//     // Функция удаелния дочерних элементов у родителя
//     var removeAllChild = function (parent) {
//         while (parent.firstChild) {
//             parent.removeChild(parent.firstChild);
//         }
//     };

//     // Функция перерисовки элементов на странице
//     var reRenderPageForFilter = function (arr) {
//         removeAllChild(window.fragment);
//         removeAllChild(window.picturesContainer);

//         arr.forEach(function(el) {
//             window.fragment.appendChild(window.picturesRender(el));
//         });
        
//         window.picturesContainer.appendChild(window.fragment);
//     }

//     // Навешивание обработчика на изменение radio кнопок и получение значения value
//     filter.forEach(radio => {
//         radio.addEventListener('change', function() {
//             switch(radio.value) {
//                 case "recommend":
//                     // Массив из случайных 10ти элементов
//                     var recommend = [];

//                     while (recommend.length < 10) {
//                         var randomIndex = Math.floor(Math.random() * window.picturesDatas.length);
//                         if (!recommend.includes(window.picturesDatas[randomIndex])) {
//                             recommend.push(window.picturesDatas[randomIndex]);
//                         }
//                     }

//                     reRenderPageForFilter(recommend);
//                     break;

//                 case "popular":
//                     // Дефолтная страница с первоначальной отрисовкой
//                     reRenderPageForFilter(window.picturesDatas);
//                     break;

//                 case "discussed":
//                     // Делаем копию основного массива так как метод sort() изменяет исходный массив
//                     var picturesDatasCopy = window.picturesDatas.slice();
//                     // Сортируем массив по убыванию кол-ва комментариев
//                     var discussed = picturesDatasCopy.sort(function(first, second) {
//                         return second.numberOfCommets - first.numberOfCommets;
//                     });

//                     reRenderPageForFilter(discussed);
//                     break;
//                 case "random":
//                     // Делаем копию основного массива чтобы перетасовка элементов его не коснулась
//                     var arrForShuffle = window.picturesDatas.slice();

//                     // Вариация алгоритма Фишера-Йетса
//                     var shuffle = function (arr) {
//                         var j, temp;
//                         // Делаем перебор элементов с конца массива
//                         for (var i = arr.length - 1; i > 0; i--) {
//                             // Присваиваем рандомное значение для одного из индексов
//                             j = Math.floor(Math.random() * (i + 1));
//                             // Осуществляем перестановку элементов в массиве
//                             temp = arr[j];
//                             arr[j] = arr[i];
//                             arr[i] = temp;
//                         }
//                         return arr;
//                     };

//                     reRenderPageForFilter(shuffle(arrForShuffle));
//                     break;
//                 default:
//                     // Дефолтная страница с первоначальной отрисовкой
//                     reRenderPageForFilter(window.picturesDatas);
//             }
//         }); 
//     });
    
// })();


// // ----------------------------------------------------------
// // Открытие полноразмерной фотографии + отрисовка коментов
// (function() {
//     var openGallery = document.querySelector('.gallery-overlay');
//     var galleryPreview = openGallery.querySelector('.gallery-overlay-preview');
//     var galleryIMG = openGallery.querySelector('.gallery-overlay-image');
//     var galleryLikes = openGallery.querySelector('.likes-count');
//     var galleryCommentsNumber = openGallery.querySelector('.comments-count');
//     var galleryCommentsNumberWrapper = openGallery.querySelector('.gallery-overlay-controls-comments');
//     var description = openGallery.querySelector('.description');

//     var pictureTap = document.querySelectorAll('.picture');
//     var pictureCross = openGallery.querySelector('.gallery-overlay-close');

//     var pictureOpen = function() {
//         openGallery.classList.remove('hidden');

//         document.addEventListener('keydown', window.onPopupEscPress);
//     };

//     window.pictureClose = function() {
//         openGallery.classList.add('hidden');

//         document.removeEventListener('keydown', window.onPopupEscPress);
//     };

//     // Отслеживание на какую фотку нажали и ее открытие с соотв. элементами
//     for (let i = 0; i < pictureTap.length; i++) {
//         pictureTap[i].addEventListener('click', function(evt) {
//             evt.preventDefault();

//             pictureOpen();
//             // Вставка фото, лайков и кол-во коментов
//             galleryIMG.src = window.picturesDatas[i].url;
//             galleryLikes.textContent = window.picturesDatas[i].likes;
//             galleryCommentsNumber.textContent = window.picturesDatas[i].numberOfCommets;
//             // ----------------------------------------------------------
//         });  
//     }

//     // Закрытие
//     pictureCross.addEventListener('click', function() {
//         window.pictureClose();
//     });

//     // ----------------------------------------------------------
//     // Скрывает кол-во коментов и вместо них отображает описание владельца фото
//     galleryCommentsNumberWrapper.classList.add('hidden');
//     description.classList.remove('hidden');

//         // Создание массива из 6 цифр для рандомизации фотографий авторов
//         var avatarNumber = [];
//         for (let j = 1; j <= 6; j++) {
//             avatarNumber.push(j);
//         };
//         var avatarNumberIndex = Math.floor(Math.random() * avatarNumber.length);

//     description.querySelector('.social-picture').src = './img/avatar-' + avatarNumber[avatarNumberIndex] + '.jpg';
//     description.querySelector('.description-text').textContent = window.picturesDatas[0].description;


//     // ----------------------------------------------------------
//     // создание и отображение комментариев
//     var elementUL = document.createElement('ul');
//     elementUL.classList.add('social-comments');

//     for (let i = 0; i < 3; i++) { // picturesDatas[0].numberOfCommets
//         let elementLI = document.createElement('li');
//         let elementIMG = document.createElement('img');
//         let elementP = document.createElement('p');

//         elementLI.classList.add('social-comment');
        
//         // Атрибуты для IMG аватаров
//         elementIMG.classList.add('social-picture');
        
//         avatarNumberIndex = Math.floor(Math.random() * avatarNumber.length);

//         elementIMG.src = './img/avatar-' + avatarNumber[avatarNumberIndex] + '.jpg';
//         elementIMG.alt = 'Аватар комментатора фотографии';
//         elementIMG.width = '35';
//         elementIMG.height = '35';

//         // Атрибуты для P
//         elementP.classList.add('social-text');
//         elementP.textContent = picturesDatas[0].comments;

//         // Сборка элементов
//         elementLI.appendChild(elementIMG);
//         elementLI.appendChild(elementP);
//         elementUL.appendChild(elementLI);
//     }


//     galleryPreview.appendChild(elementUL);

// })();



// // ----------------------------------------------------------
// // Форма загрузки фото (Эффекты и ползунок)
// (function() {
//     var uploadOverlay = document.querySelector('.upload-overlay');

//     // ----------------------------------------------------------
//     // Данные для изменения изображения
//     var effectImagePreview = document.querySelector('.effect-image-preview');
//     var effects = document.querySelectorAll('input[type="radio"][name="effect"]');
//     var indexEffect;
//     // Навешивание обработчика на изменение radio кнопок и получение значения value
//     effects.forEach(radio => {
//         radio.addEventListener('change', function() {
//             // проверка значения, установка эффекта, установка ползунка
//             if (radio.value === "chrome") {
//                 effectImagePreview.style.filter = "grayscale(100%)";
//                 scalePin.style.left = "100%";
//                 scaleLine.style.width = "100%";
//             } else if (radio.value === "sepia") {
//                 effectImagePreview.style.filter = "sepia(100%)";
//                 scalePin.style.left = "100%";
//                 scaleLine.style.width = "100%";
//             } else if (radio.value === "marvin") { 
//                 effectImagePreview.style.filter = "invert(100%)";
//                 scalePin.style.left = "100%";
//                 scaleLine.style.width = "100%";
//             } else if (radio.value === "phobos") {
//                 effectImagePreview.style.filter = "blur(15px)"; // 15 это макс
//                 scalePin.style.left = "100%";  
//                 scaleLine.style.width = "100%";
//             } else if (radio.value === "heat") {
//                 effectImagePreview.style.filter = "brightness(200%)"; // 200 макс
//                 scalePin.style.left = "100%";
//                 scaleLine.style.width = "100%";  
//             } else {
//                 effectImagePreview.style.filter = "none";
//                 scalePin.style.left = "0%";
//                 scaleLine.style.width = "0%";
//             }
//         }); 
//     });

    
//     // ----------------------------------------------------------
//     // Данные для перетаскивания ползунка (Drag'n'Drop)
//     var scalePin = uploadOverlay.querySelector('.upload-effect-level-pin');
//     var scaleLine = uploadOverlay.querySelector('.upload-effect-level-val');
//     // Ширина полосы 455px это наши 100%
//     // второй вариант получить показатели left ползунка (они в процентах)
//     // и сделать этот показатель переменной для параметра стилей

//     var lineWidth = 455;


//     scalePin.addEventListener('mousedown', function(evt) {
//         evt.preventDefault();

//         var startCoord = evt.clientX;

//         var onMouseMove = function(moveEvt) {
//             var shift = startCoord - moveEvt.clientX;

//             startCoord = moveEvt.clientX;

//             // scalePin.style.left = (scalePin.offsetLeft - shift) + 'px'; // Расстояние в пикселях
//             scalePin.style.left = ((scalePin.offsetLeft - shift) / lineWidth * 100) + '%'; // Расстояние в процентах
//             scaleLine.style.width = scalePin.style.left;
//             indexEffect = (Math.floor((scalePin.offsetLeft - shift) / lineWidth * 100));

//             if (indexEffect > 100) {
//                 indexEffect = 100;
//                 scalePin.style.left = indexEffect + "%";
//                 scaleLine.style.width = indexEffect + "%";
//                 document.removeEventListener('mousemove', onMouseMove);
//                 document.removeEventListener('mouseup', onMouseUp);
//             } else if (indexEffect < 0) {
//                 indexEffect = 0;
//                 scalePin.style.left = indexEffect + "%";
//                 scaleLine.style.width = indexEffect + "%";
//                 document.removeEventListener('mousemove', onMouseMove);
//                 document.removeEventListener('mouseup', onMouseUp);
//             };

//             effects.forEach(radio => {
//                 if (radio.checked) {
//                     // проверка значения и установка эффекта
//                     if (radio.value === "chrome") {
//                         effectImagePreview.style.filter = "grayscale(" + indexEffect + "%)";
//                     } else if (radio.value === "sepia") {
//                         effectImagePreview.style.filter = "sepia(" + indexEffect + "%)";
//                     } else if (radio.value === "marvin") { 
//                         effectImagePreview.style.filter = "invert(" + indexEffect + "%)";
//                     } else if (radio.value === "phobos") {
//                         effectImagePreview.style.filter = "blur(" + (indexEffect * 0.15) + "px)";  // 15 это макс
//                     } else if (radio.value === "heat") {
//                         effectImagePreview.style.filter = "brightness(" + (indexEffect * 2) + "%)";  // 200 макс
//                     } else {
//                         effectImagePreview.style.filter = "none";
//                     }
//                 }
//             });

        
//         };

//         var onMouseUp = function(upEvt) {
//             upEvt.preventDefault();


//             document.removeEventListener('mousemove', onMouseMove);
//             document.removeEventListener('mouseup', onMouseUp);
//         };

//         document.addEventListener('mousemove', onMouseMove);
//         document.addEventListener('mouseup', onMouseUp);
//     });

//     // ----------------------------------------------------------
//     // Отправка формы на сервер и закрытие окна формы
//     var form = document.querySelector('#upload-select-image');
//     form.addEventListener('submit', function(evt) {
//         var URLupload = '#';
//         window.upload(URLupload, new FormData(form), function(response) {
//             uploadOverlay.classList.add('hidden');
//         });
//         evt.preventDefault();
//     });
    
// })();



// // ----------------------------------------------------------
// // Загрузка и проверка формата изображения
// (function() {
//     // Переменные для Открытие и закрытие
//     var uploadOverlay = document.querySelector('.upload-overlay');
//     var uploadOverlayCross = uploadOverlay.querySelector('.upload-form-cancel');

//     window.uploadOverlayClose = function() {
//         uploadOverlay.classList.add('hidden');
//         document.removeEventListener('keydown', window.onPopupEscPress);
//     };

//     uploadOverlayCross.addEventListener('click', function() {
//         window.uploadOverlayClose();
//     });

//     // Переменные для загрузки и проверки изображения
//     var fileChooser = document.querySelector('.upload-input');
//     var preview = document.querySelector('.effect-image-preview');
//     var FILE_TYPES = ['jpg', 'jpeg', 'png'];

//     fileChooser.addEventListener('change', function() {
//         // При выборе файла зачастую можно загрузить сразу несколько фото
//         // Из-за особенностей стиля и формата нам нужно только 1 фото, самое первое
//         // Поэтому обращаемся с св-ву "files" (который будет являться массивом) и берем первый элемент
//         var file = fileChooser.files[0];
//         // Берем имя этого фалйа и сводим для подстраховки в нижний регисрт, 
//         // чтобы избежать ошибки в момент сравнения типа фалов
//         var fileName = file.name.toLowerCase();
//         // Задаем функцию проверки совпадения массива типов изображения и окончания файла
//         // Если окончание файла совпадает хотя бы с одним элементом массива,
//         // то функция возвращает true
//         var matches = FILE_TYPES.some(function(it) {
//             return fileName.endsWith(it);
//         });

//         if (matches) {
//             // Если проверка фото прошла успешно, то мы создаем с помощью конструктора
//             // новую переменную которая сможет прочитать изображение и перевести его
//             // в формат base-64
//             var reader = new FileReader();

//             // После загрузки изображения прописываем в src ссылку на данное фото
//             // Если правильно понял ссылка хранится в result, а туда попадает после
//             // конвертации с помощью метода readAsDataURL конструктора FileReader()
//             reader.addEventListener('load', function() {
//                 preview.src = reader.result;
//             });

//             reader.readAsDataURL(file);
//         }
       

//         uploadOverlay.classList.remove('hidden');
//         document.addEventListener('keydown', window.onPopupEscPress);
//     });
    
// })();