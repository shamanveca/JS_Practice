// 1. Допилить отображение гистограммы с соответствием именам (players и times)
// 2. Сделать их вертикальными
// 3. Постараться сделать все с помощью заранее определенных переменных,
//    а не написанием цифр внутри расчетов
// 4. Учесть что написано в ТЗ
// 5. Написать алгоритм нахождения максимального времени и пропорциональность
//    отображения столбцов гистограммы от высоты блока и макс времени


window.renderStatistics = function (ctx, players, times) {

    // Тень
    // ctx.fillRect(100, 10, 500, 200);
    ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.beginPath();
    ctx.moveTo(100, 10); // Смещение точки начала отрисовки на координаты Х и Y

    // Верх
    ctx.bezierCurveTo(110, 25, 140, 0, 180, 20);
    ctx.bezierCurveTo(180, 20, 210, 0, 250, 20);
    ctx.bezierCurveTo(250, 20, 280, 0, 320, 20);
    ctx.bezierCurveTo(320, 20, 350, 0, 390, 20);
    ctx.bezierCurveTo(390, 20, 420, 0, 460, 20);
    ctx.bezierCurveTo(460, 20, 510, 0, 535, 25);

    // Правая сторона
    ctx.bezierCurveTo(535, 25, 560, 45, 530, 110);
    ctx.bezierCurveTo(530, 110, 560, 150, 530, 200);
    ctx.bezierCurveTo(530, 110, 560, 255, 530, 290);

    // Низ
    ctx.bezierCurveTo(530, 290, 510, 310, 460, 290);
    ctx.bezierCurveTo(460, 290, 420, 310, 390, 290);
    ctx.bezierCurveTo(390, 290, 350, 310, 320, 290);
    ctx.bezierCurveTo(320, 290, 280, 310, 250, 290);
    ctx.bezierCurveTo(250, 290, 210, 310, 180, 290);
    ctx.bezierCurveTo(180, 290, 140, 310, 110, 290);

    // Левая сторона
    ctx.bezierCurveTo(110, 290, 80, 255, 110, 200);
    ctx.bezierCurveTo(110, 200, 80, 150, 110, 110);
    ctx.bezierCurveTo(110, 110, 80, 45, 110, 25);

    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    
    
    // Основное окно
    ctx.strokeStyle = "#ffffff";
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(100, 10);

    ctx.bezierCurveTo(100, 15, 130, -10, 170, 10);
    ctx.bezierCurveTo(170, 10, 200, -10, 240, 10);
    ctx.bezierCurveTo(240, 10, 270, -10, 310, 10);
    ctx.bezierCurveTo(310, 10, 340, -10, 380, 10);
    ctx.bezierCurveTo(380, 10, 410, -10, 450, 10);
    ctx.bezierCurveTo(450, 10, 500, -10, 525, 15);

    ctx.bezierCurveTo(525, 15, 550, 35, 520, 100);
    ctx.bezierCurveTo(520, 100, 550, 140, 520, 190);
    ctx.bezierCurveTo(520, 190, 550, 245, 520, 280);

    ctx.bezierCurveTo(520, 280, 500, 300, 450, 280);
    ctx.bezierCurveTo(450, 280, 410, 300, 380, 280);
    ctx.bezierCurveTo(380, 280, 340, 300, 310, 280);
    ctx.bezierCurveTo(310, 280, 270, 300, 240, 280);
    ctx.bezierCurveTo(240, 280, 200, 300, 170, 280);
    ctx.bezierCurveTo(170, 280, 130, 300, 100, 280);

    ctx.bezierCurveTo(100, 280, 70, 245, 100, 190);
    ctx.bezierCurveTo(100, 190, 70, 140, 100, 100);
    ctx.bezierCurveTo(100, 100, 70, 35, 100, 15);

    ctx.closePath();
    ctx.stroke();
    ctx.fill();


    // Отрисовка статистики
    const gap = 70;
    var i = 0;
    var j = 0;
    var myIndex = 0;
    
    const startWidth = 150;
    const heightText = 270;
    const heightBar = 250;

    const barRenderWidth = 40;
    const barHeightMax = 150;

    var barRenderHeight = 0;
    
    // Отрисовка имен играков
    ctx.fillStyle = "#000";
    players.forEach(function renderNames(playerName) {
        ctx.fillText(playerName, gap * players.indexOf(playerName) + startWidth, heightText);
        
        // if (playerName == "Вы") {
        //     myIndex = players.indexOf(playerName);
        // }
    });

    // Поиск макс вреемни прохождения
    var maxTime = times.reduce((firstTime, nextTime) => {
        if (nextTime > firstTime) {
            firstTime = nextTime;
        }

        return firstTime;
    }, 0);

    
    // Отрисовка гистограммы
    var color = null;
    times.forEach(function renderBar(barTime) {
        // Последовательная разная прозрачность
        // МИНУСЫ: Ограниченный массив
        // var arrOpacity = [0.2, 0.4, 0.6, 0.8];
        // var color = `rgba(0, 0, 255, ${arrOpacity[times.indexOf(barTime)]})`;

        // Рандомная прозрачность, по ТЗ так надо
        // МИНУСЫ: Могут быть неотличимые оттенки, может быть слишком большая прозрачность
        var color = `rgba(0, 0, 255, ${Math.random().toFixed(2)})`;
        ctx.fillStyle = color;

        barRenderHeight = Math.floor(barHeightMax / maxTime * barTime);
        ctx.fillRect(gap * times.indexOf(barTime) + startWidth, heightBar, barRenderWidth, -barRenderHeight); // Высота отрицательная чтобы отрисовка была снизу вверх

       
        // barRenderHeight = Math.floor(barHeightMax / maxTime * barTime);
        // if (times.indexOf(barTime) == myIndex) {
        //     color = rgba(255, 0, 0, 1);
        // } else {
        //     color = `rgba(0, 0, 255, ${Math.random().toFixed(2)})`;
        // }

        
        // ctx.fillStyle = color;
        // ctx.fillRect(gap * times.indexOf(barTime) + startWidth, heightBar, barRenderWidth, -barRenderHeight);      
    });


    ctx.fillStyle = "#000000";
    ctx.fillText("Ура вы победили!", 230, 50);
    ctx.fillText("Список результатов:", 230, 70);
};