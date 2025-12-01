// ----------------------------------------------------------
// Открытие полноразмерной фотографии + отрисовка коментов
(function() {
    var openGallery = document.querySelector('.gallery-overlay');
    var galleryPreview = openGallery.querySelector('.gallery-overlay-preview');
    var galleryIMG = openGallery.querySelector('.gallery-overlay-image');
    var galleryLikes = openGallery.querySelector('.likes-count');
    var galleryCommentsNumber = openGallery.querySelector('.comments-count');
    var galleryCommentsNumberWrapper = openGallery.querySelector('.gallery-overlay-controls-comments');
    var description = openGallery.querySelector('.description');

    var pictureTap = document.querySelectorAll('.picture');
    var pictureCross = openGallery.querySelector('.gallery-overlay-close');

    var pictureOpen = function() {
        openGallery.classList.remove('hidden');

        document.addEventListener('keydown', window.onPopupEscPress);
    };

    window.pictureClose = function() {
        openGallery.classList.add('hidden');

        document.removeEventListener('keydown', window.onPopupEscPress);
    };

    // Отслеживание на какую фотку нажали и ее открытие с соотв. элементами
    for (let i = 0; i < pictureTap.length; i++) {
        pictureTap[i].addEventListener('click', function(evt) {
            evt.preventDefault();

            pictureOpen();
            // Вставка фото, лайков и кол-во коментов
            galleryIMG.src = window.picturesDatas[i].url;
            galleryLikes.textContent = window.picturesDatas[i].likes;
            galleryCommentsNumber.textContent = window.picturesDatas[i].numberOfCommets;
            // ----------------------------------------------------------
        });  
    }

    // Закрытие
    pictureCross.addEventListener('click', function() {
        window.pictureClose();
    });

    // ----------------------------------------------------------
    // Скрывает кол-во коментов и вместо них отображает описание владельца фото
    galleryCommentsNumberWrapper.classList.add('hidden');
    description.classList.remove('hidden');

        // Создание массива из 6 цифр для рандомизации фотографий авторов
        var avatarNumber = [];
        for (let j = 1; j <= 6; j++) {
            avatarNumber.push(j);
        };
        var avatarNumberIndex = Math.floor(Math.random() * avatarNumber.length);

    description.querySelector('.social-picture').src = './img/avatar-' + avatarNumber[avatarNumberIndex] + '.jpg';
    description.querySelector('.description-text').textContent = window.picturesDatas[0].description;


    // ----------------------------------------------------------
    // создание и отображение комментариев
    var elementUL = document.createElement('ul');
    elementUL.classList.add('social-comments');

    for (let i = 0; i < 3; i++) { // picturesDatas[0].numberOfCommets
        let elementLI = document.createElement('li');
        let elementIMG = document.createElement('img');
        let elementP = document.createElement('p');

        elementLI.classList.add('social-comment');
        
        // Атрибуты для IMG аватаров
        elementIMG.classList.add('social-picture');
        
        avatarNumberIndex = Math.floor(Math.random() * avatarNumber.length);

        elementIMG.src = './img/avatar-' + avatarNumber[avatarNumberIndex] + '.jpg';
        elementIMG.alt = 'Аватар комментатора фотографии';
        elementIMG.width = '35';
        elementIMG.height = '35';

        // Атрибуты для P
        elementP.classList.add('social-text');
        elementP.textContent = picturesDatas[0].comments;

        // Сборка элементов
        elementLI.appendChild(elementIMG);
        elementLI.appendChild(elementP);
        elementUL.appendChild(elementLI);
    }


    galleryPreview.appendChild(elementUL);

})();