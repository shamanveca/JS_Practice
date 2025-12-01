// ----------------------------------------------------------
// Форма загрузки фото (Эффекты и ползунок)
(function() {
    var uploadOverlay = document.querySelector('.upload-overlay');

    // ----------------------------------------------------------
    // Данные для изменения изображения
    var effectImagePreview = document.querySelector('.effect-image-preview');
    var effects = document.querySelectorAll('input[type="radio"][name="effect"]');
    var indexEffect;
    // Навешивание обработчика на изменение radio кнопок и получение значения value
    effects.forEach(radio => {
        radio.addEventListener('change', function() {
            // проверка значения, установка эффекта, установка ползунка
            if (radio.value === "chrome") {
                effectImagePreview.style.filter = "grayscale(100%)";
                scalePin.style.left = "100%";
                scaleLine.style.width = "100%";
            } else if (radio.value === "sepia") {
                effectImagePreview.style.filter = "sepia(100%)";
                scalePin.style.left = "100%";
                scaleLine.style.width = "100%";
            } else if (radio.value === "marvin") { 
                effectImagePreview.style.filter = "invert(100%)";
                scalePin.style.left = "100%";
                scaleLine.style.width = "100%";
            } else if (radio.value === "phobos") {
                effectImagePreview.style.filter = "blur(15px)"; // 15 это макс
                scalePin.style.left = "100%";  
                scaleLine.style.width = "100%";
            } else if (radio.value === "heat") {
                effectImagePreview.style.filter = "brightness(200%)"; // 200 макс
                scalePin.style.left = "100%";
                scaleLine.style.width = "100%";  
            } else {
                effectImagePreview.style.filter = "none";
                scalePin.style.left = "0%";
                scaleLine.style.width = "0%";
            }
        }); 
    });

    
    // ----------------------------------------------------------
    // Данные для перетаскивания ползунка (Drag'n'Drop)
    var scalePin = uploadOverlay.querySelector('.upload-effect-level-pin');
    var scaleLine = uploadOverlay.querySelector('.upload-effect-level-val');
    // Ширина полосы 455px это наши 100%
    // второй вариант получить показатели left ползунка (они в процентах)
    // и сделать этот показатель переменной для параметра стилей

    var lineWidth = 455;


    scalePin.addEventListener('mousedown', function(evt) {
        evt.preventDefault();

        var startCoord = evt.clientX;

        var onMouseMove = function(moveEvt) {
            var shift = startCoord - moveEvt.clientX;

            startCoord = moveEvt.clientX;

            // scalePin.style.left = (scalePin.offsetLeft - shift) + 'px'; // Расстояние в пикселях
            scalePin.style.left = ((scalePin.offsetLeft - shift) / lineWidth * 100) + '%'; // Расстояние в процентах
            scaleLine.style.width = scalePin.style.left;
            indexEffect = (Math.floor((scalePin.offsetLeft - shift) / lineWidth * 100));

            if (indexEffect > 100) {
                indexEffect = 100;
                scalePin.style.left = indexEffect + "%";
                scaleLine.style.width = indexEffect + "%";
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            } else if (indexEffect < 0) {
                indexEffect = 0;
                scalePin.style.left = indexEffect + "%";
                scaleLine.style.width = indexEffect + "%";
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };

            effects.forEach(radio => {
                if (radio.checked) {
                    // проверка значения и установка эффекта
                    if (radio.value === "chrome") {
                        effectImagePreview.style.filter = "grayscale(" + indexEffect + "%)";
                    } else if (radio.value === "sepia") {
                        effectImagePreview.style.filter = "sepia(" + indexEffect + "%)";
                    } else if (radio.value === "marvin") { 
                        effectImagePreview.style.filter = "invert(" + indexEffect + "%)";
                    } else if (radio.value === "phobos") {
                        effectImagePreview.style.filter = "blur(" + (indexEffect * 0.15) + "px)";  // 15 это макс
                    } else if (radio.value === "heat") {
                        effectImagePreview.style.filter = "brightness(" + (indexEffect * 2) + "%)";  // 200 макс
                    } else {
                        effectImagePreview.style.filter = "none";
                    }
                }
            });

        
        };

        var onMouseUp = function(upEvt) {
            upEvt.preventDefault();


            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    // ----------------------------------------------------------
    // Отправка формы на сервер и закрытие окна формы
    var form = document.querySelector('#upload-select-image');
    form.addEventListener('submit', function(evt) {
        var URLupload = '#';
        window.upload(URLupload, new FormData(form), function(response) {
            uploadOverlay.classList.add('hidden');
        });
        evt.preventDefault();
    });
    
})();