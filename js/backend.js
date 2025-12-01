// ----------------------------------------------------------
// backend.js
(function() {  
    // var URLdownload = '#';
    // var URLupload = '#';

    var onLoad = function(data) { // Надо ли делать глобальную область видимости?????
        console.log(data);
    };

    var onError = function(error) {
        console.error(error);
    };

    // Загрузка с сервера
    window.download = function(url, onLoad, onError) {
        var xhr = new XMLHttpRequest; // Получение данных с сервера
        xhr.responseType = 'json'; // Конвертируем полученные данные в нужный тип для работы в JS

        xhr.addEventListener('load', function() {
            var error;
            switch (xhr.status) {
                case 200:
                    onLoad(xhr.response);
                    break;

                case 400:
                    error = 'Неверный запрос';
                    break;
                case 401:
                    error = 'Пользователь не авторизован';
                    break;
                case 404:
                    error = 'Ничего не найдено';
                    break;

                default:
                    error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
            }

            if (error) {
                onError(error);
            }
        });

        xhr.addEventListener('error', function() {
            onError('Произошла ошибка соединения');
        });

        xhr.addEventListener('timeout', function() {
            onError('Запрос не успел выаолниться за ' + xhr.timeout + 'мс');
        });

        xhr.timeout = 10000; // 10s

        xhr.open('GET', url);
        xhr.send();
    };
    

  

    // ----------------------------------------------------------
    // Загрузка на сервер
    window.upload = function(url, data, onLoad, onError) {
        var xhr = new XMLHttpRequest; // Получение данных с сервера
        xhr.responseType = 'json'; // Конвертируем полученные данные в нужный тип для работы в JS

        xhr.addEventListener('load', function() {
            onLoad(xhr.response);

            if ( xhr.status === 200) {
                onLoad(xhr.response);
            } else {
                onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
            }
        });

        xhr.addEventListener('error', function() {
            onError('Произошла ошибка соединения');
        });

        xhr.addEventListener('timeout', function() {
            onError('Запрос не успел выаолниться за ' + xhr.timeout + 'мс');
        });

        xhr.open('POST', url);
        xhr.send(data);
    };

})();