// ----------------------------------------------------------
// Загрузка и проверка формата изображения
(function() {
    // Переменные для Открытие и закрытие
    var uploadOverlay = document.querySelector('.upload-overlay');
    var uploadOverlayCross = uploadOverlay.querySelector('.upload-form-cancel');

    window.uploadOverlayClose = function() {
        uploadOverlay.classList.add('hidden');
        document.removeEventListener('keydown', window.onPopupEscPress);
    };

    uploadOverlayCross.addEventListener('click', function() {
        window.uploadOverlayClose();
    });

    // Переменные для загрузки и проверки изображения
    var fileChooser = document.querySelector('.upload-input');
    var preview = document.querySelector('.effect-image-preview');
    var FILE_TYPES = ['jpg', 'jpeg', 'png'];

    fileChooser.addEventListener('change', function() {
        // При выборе файла зачастую можно загрузить сразу несколько фото
        // Из-за особенностей стиля и формата нам нужно только 1 фото, самое первое
        // Поэтому обращаемся с св-ву "files" (который будет являться массивом) и берем первый элемент
        var file = fileChooser.files[0];
        // Берем имя этого фалйа и сводим для подстраховки в нижний регисрт, 
        // чтобы избежать ошибки в момент сравнения типа фалов
        var fileName = file.name.toLowerCase();
        // Задаем функцию проверки совпадения массива типов изображения и окончания файла
        // Если окончание файла совпадает хотя бы с одним элементом массива,
        // то функция возвращает true
        var matches = FILE_TYPES.some(function(it) {
            return fileName.endsWith(it);
        });

        if (matches) {
            // Если проверка фото прошла успешно, то мы создаем с помощью конструктора
            // новую переменную которая сможет прочитать изображение и перевести его
            // в формат base-64
            var reader = new FileReader();

            // После загрузки изображения прописываем в src ссылку на данное фото
            // Если правильно понял ссылка хранится в result, а туда попадает после
            // конвертации с помощью метода readAsDataURL конструктора FileReader()
            reader.addEventListener('load', function() {
                preview.src = reader.result;
            });

            reader.readAsDataURL(file);
        }
       

        uploadOverlay.classList.remove('hidden');
        document.addEventListener('keydown', window.onPopupEscPress);
    });
    
})();