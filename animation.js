// Создание анимации в виде идущего дождя

// Размеры поля
var ScrinSize = {
    WIDTH: 800,
    HEIGHT: 600
};

var getRandomValue = function (min, max) {
    return Math.random() * (max - min) + min
};

// Конструктор описывающий капли дождя
var Raindrop = function () {
    this._reset();
};

// Создаем и записываем в объект прототипа функцию render которая
// будет отрисовывать капли дождя
Raindrop.prototype.render = function (ctx) {
    ctx.strokeStyle = 'white';
    ctx.beginPath();

    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.size, this.y - this.size);

    ctx.closePath();
    ctx.stroke();
};

// Перемещение капли
Raindrop.prototype.update = function () {
    this.x += this.hVelocity;
    this.y += this.velocity;

    // Проверяем ушла ли капля за пределы экрана, чтобы 
    // отрисовать ее заново(переместить снова наверх кадра), если это произошло
    // Таким образом мы переиспользуем тот же массив (капли) из 600
    // элементов созданный ниже и экономим память, вместо того чтобы создавать
    // новые капли и увеличивать массив
    if (this.isOffscreen()) {
        this._reset();
    }
};

// Проверяем ушла ли капля за пределы экрана во всех плоскостях
// и возвращаем булевое значение
Raindrop.prototype.isOffscreen = function () {
    return  this.y > ScrinSize.HEIGHT + this.size ||
            this.x > ScrinSize.WIDTH + this.size ||
            this.x < -this.size;
};

// Создание объекта с данными капли (её местоположение и размеры)
Raindrop.prototype._reset = function () {
    this.size = getRandomValue(1, 6);

    this.x = getRandomValue(-ScrinSize.WIDTH * 0.3, ScrinSize.WIDTH * 1.6);
    this.y = getRandomValue(0, ScrinSize.HEIGHT);

    // Задаем данные для смещения капли (падение)
    this.velocity = this.size; // Скорость падения по вертикали (у)
    this.hVelocity = -this.size / 3; // Скорость падения по горизонтали (х)
};

// Конструктор для огурцов. В нем вы вызываем (обращаемся/ссылаемся)
// на уже написанный конструктор для дождя Raindrop, тем самым копируя сюда
// все что написано в Raindrop
var Cucumber = function () {
    Raindrop.call(this);
};

// В протатипе огурцов создаем новый объект и записываем в него все данные с прототипа дождя
// Таким образом нам не нужно заного описывать поведеие огурцов.
// Нам достаточно будет просто переопределить для них некоторые св-ва.
Cucumber.prototype = Object.create(Raindrop.prototype);

// Полностью переопределяяем св-во render чтобы в нем отрисовывались огурцы
Cucumber.prototype.render = function (ctx) {
    ctx.fillStyle = 'green';
    ctx.beginPath();

    ctx.ellipse(this.x, this.y, this.size, this.size * 3, 
        this.angle, 0, Math.PI * 2, false);

    ctx.closePath();
    ctx.fill();
};

// Обращаемся к Raindrop.prototype.update (копируем все что в нем уже прописано)
// И дополняем (задаем) изменением angle
Cucumber.prototype.update = function () {
    Raindrop.prototype.update.call(this);
    this.angle += 0.01 // Угол поворота огурца
};

// Обращаемся к Raindrop.prototype._reset (копируем все что в нем уже прописано)
// И дополняем (создаем) св-вом angle
Cucumber.prototype._reset = function () {
    Raindrop.prototype._reset.call(this);
    this.angle = getRandomValue(0, Math.PI * 2);
};

// Создание чистого квадрата (кадр)
var cleanupFrame = function (ctx) {
    ctx.clearRect(0, 0, ScrinSize.WIDTH, ScrinSize.HEIGHT);
};

// Бесконечный цикл который вызывает отрисовку кадра с помощью requestAnimationFrame() (event loop)
// Функция для каждого кадра
var renderFrame = function (ctx, raindrops) {
    cleanupFrame(ctx);

    raindrops.forEach(function (it) {
        it.render(ctx);
        it.update();
    });

    requestAnimationFrame(renderFrame.bind(null, ctx, raindrops));
};

var setup = function () {
    var DROPS = 600;
    // Добавляем переменную которая будет определять количество
    // огурцов в зависимости от кол-ва капель
    var CUCUMBER_RATIO = 0.2;

    var canvas = document.querySelector('.canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = ScrinSize.WIDTH;
    canvas.height =  ScrinSize.HEIGHT;

    // Создаем массив из 600 (DROPS) элементов в которых будут храниться необходимые
    // для отрисовки капель объекты с данными + объекты с данными огурцов
    // В данном случае получается соотношение 80% (DROPS * (1 - CUCUMBER_RATIO)) капель 
    // и 20% огурцов (DROPS * CUCUMBER_RATIO)
    var raindrops = new Array(DROPS * (1 - CUCUMBER_RATIO))
        .fill('')
        .map(function () {
            return new Raindrop();
        })
        .concat(new Array(DROPS * CUCUMBER_RATIO)
            .fill('')
            .map(function () {
                return new Cucumber();
            })
        );

    renderFrame(ctx, raindrops);
};

setup();
// -----------------------------------------------------------
