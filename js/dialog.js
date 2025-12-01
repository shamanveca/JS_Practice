// ----------------------------------------------------------
// Реализация Drag'n'Drop (Перетаскивание) окна персонажа
(function() {
    var setupUserDialog = document.querySelector('.setup');
    var dialogHanddle = setupUserDialog.querySelector('.setup-user-pic');

    dialogHanddle.addEventListener('mousedown', function(evt) {
        evt.preventDefault();

        var startCoords = {
            x: evt.clientX,
            y: evt.clientY
        };

        var dragger = false;

        var onMouseMove = function(moveEvt) {
            moveEvt.preventDefault();
            dragger = true;

            var shift = {
                x: startCoords.x - moveEvt.clientX,
                y: startCoords.y - moveEvt.clientY
            };

            startCoords = {
                x: moveEvt.clientX,
                y: moveEvt.clientY
            };

            setupUserDialog.style.top = (setupUserDialog.offsetTop - shift.y) + 'px';
            setupUserDialog.style.left = (setupUserDialog.offsetLeft - shift.x) + 'px';
        };

        var onMouseUp = function(upEvt) {
            upEvt.preventDefault();

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);

            if (dragger) {
                var onClickPreventDefault = function(evt) {
                    evt.preventDefault();

                    dialogHanddle.removeEventListener('click', onClickPreventDefault);
                };
                dialogHanddle.addEventListener('click', onClickPreventDefault);
            }
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

})();