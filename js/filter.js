// ----------------------------------------------------------
// filter.js
(function() {
    // Блок фильтров
    var filtersBlock = document.querySelector('.filters');
    // Инпуты
    var filter = document.querySelectorAll('input[type="radio"][name="filter"]');

    filtersBlock.classList.remove('hidden');

    // Функция удаелния дочерних элементов у родителя
    var removeAllChild = function (parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    };

    // Функция перерисовки элементов на странице
    var reRenderPageForFilter = function (arr) {
        removeAllChild(window.fragment);
        removeAllChild(window.picturesContainer);

        arr.forEach(function(el) {
            window.fragment.appendChild(window.picturesRender(el));
        });
        
        window.picturesContainer.appendChild(window.fragment);
    }

    // Навешивание обработчика на изменение radio кнопок и получение значения value
    filter.forEach(radio => {
        radio.addEventListener('change', function() {
            switch(radio.value) {
                case "recommend":
                    // Массив из случайных 10ти элементов
                    var recommend = [];

                    while (recommend.length < 10) {
                        var randomIndex = Math.floor(Math.random() * window.picturesDatas.length);
                        if (!recommend.includes(window.picturesDatas[randomIndex])) {
                            recommend.push(window.picturesDatas[randomIndex]);
                        }
                    }

                    reRenderPageForFilter(recommend);
                    break;

                case "popular":
                    // Дефолтная страница с первоначальной отрисовкой
                    reRenderPageForFilter(window.picturesDatas);
                    break;

                case "discussed":
                    // Делаем копию основного массива так как метод sort() изменяет исходный массив
                    var picturesDatasCopy = window.picturesDatas.slice();
                    // Сортируем массив по убыванию кол-ва комментариев
                    var discussed = picturesDatasCopy.sort(function(first, second) {
                        return second.numberOfCommets - first.numberOfCommets;
                    });

                    reRenderPageForFilter(discussed);
                    break;
                case "random":
                    // Делаем копию основного массива чтобы перетасовка элементов его не коснулась
                    var arrForShuffle = window.picturesDatas.slice();

                    // Вариация алгоритма Фишера-Йетса
                    var shuffle = function (arr) {
                        var j, temp;
                        // Делаем перебор элементов с конца массива
                        for (var i = arr.length - 1; i > 0; i--) {
                            // Присваиваем рандомное значение для одного из индексов
                            j = Math.floor(Math.random() * (i + 1));
                            // Осуществляем перестановку элементов в массиве
                            temp = arr[j];
                            arr[j] = arr[i];
                            arr[i] = temp;
                        }
                        return arr;
                    };

                    reRenderPageForFilter(shuffle(arrForShuffle));
                    break;
                default:
                    // Дефолтная страница с первоначальной отрисовкой
                    reRenderPageForFilter(window.picturesDatas);
            }
        }); 
    });
    
})();