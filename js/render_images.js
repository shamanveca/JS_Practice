// ----------------------------------------------------------
// Отрисовка по шаблону изображений
(function() {
    var picturesTemplate = document.querySelector('#picture-template')
    .content
    .querySelector('.picture');

    window.picturesContainer = document.querySelector('.pictures');

    window.picturesRender = function (picture) {
        var pictureElement = picturesTemplate.cloneNode(true);

        pictureElement.querySelector('img').src = picture.url;
        pictureElement.querySelector('.picture-likes').textContent = picture.likes;
        pictureElement.querySelector('.picture-comments').textContent = picture.numberOfCommets;

        return pictureElement;
    };

    window.fragment = document.createDocumentFragment();

    for (var j = 0; j < window.picturesDatas.length; j++) {

        window.likesNumbersIndex = Math.floor(Math.random() * window.datas.likesNumbers.length);
        window.picturesDatas[j].likes = window.datas.likesNumbers[window.likesNumbersIndex];

        window.commentsNumbersIndex = Math.floor(Math.random() * window.datas.commentsNumbers.length);
        window.picturesDatas[j].numberOfCommets = window.datas.commentsNumbers[window.commentsNumbersIndex];

        window.commentsListIndex = Math.floor(Math.random() * window.datas.commentsList.length);
        window.picturesDatas[j].comments = window.datas.commentsList[window.commentsListIndex];

        window.descriptionListIndex = Math.floor(Math.random() * window.datas.descriptionList.length);
        window.picturesDatas[j].description = window.datas.descriptionList[window.descriptionListIndex];

        window.fragment.appendChild(window.picturesRender(window.picturesDatas[j]));
    };

    window.picturesContainer.appendChild(window.fragment);


    // // ----------------------------------------------------------
    // // Загрузка данных с сервера и отрисовка
    // // ЗАКОМЕНЧЕНО ПОТОМУ ЧТО НЕТ РЕАЛЬНОГО СЕРВЕРА ДЛЯ ПРОВЕРКИ РАБОТОСПОСОБНОСТИ

    // var URLdownload = '#';
    // window.load(URLdownload, function(picturesDatas) {
    //     var fragment = document.createDocumentFragment();

    //     for (var i = 0; i < picturesDatas.length; i++) {

    //         window.likesNumbersIndex = Math.floor(Math.random() * window.datas.likesNumbers.length);
    //         picturesDatas[i].likes = window.datas.likesNumbers[window.likesNumbersIndex];

    //         window.commentsNumbersIndex = Math.floor(Math.random() * window.datas.commentsNumbers.length);
    //         picturesDatas[i].numberOfCommets = window.datas.commentsNumbers[window.commentsNumbersIndex];

    //         window.commentsListIndex = Math.floor(Math.random() * window.datas.commentsList.length);
    //         picturesDatas[i].comments = window.datas.commentsList[window.commentsListIndex];

    //         window.descriptionListIndex = Math.floor(Math.random() * window.datas.descriptionList.length);
    //         picturesDatas[i].description = window.datas.descriptionList[window.descriptionListIndex];


    //         fragment.appendChild(picturesRender(window.picturesDatas[i]));
    //     }

    //     picturesContainer.appendChild(fragment);
    // });

})();