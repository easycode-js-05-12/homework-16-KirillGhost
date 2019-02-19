// ----------------------------- Home Work 16 -----------------------------
// -------------------------- Biezdielnyi Kirill --------------------------
// Задачи. ООП.
// 1. Есть класс Planet.
// Создать наследника от Planet, который будет называться PlanetWithSatellite и будет принимать, кроме name,
// название спутника (satelliteName). Переопределите метод getName для PlanetWithSatellite так, чтобы он
// возвращал ту же самую строчку + дополнительный текст 'The satellite is' + satelliteName.
/**
 * @desc Planet class
 * @param {string} name - Planet name
 */
function Planet(name) {
    this.name = name;
}

Planet.prototype.getName = function () {
    return 'Planet name is ' + this.name;
}

/**
 * @desc Planet and it's satellite class
 * @param {string} name - Planet name
 * @param {string} satelliteName - Satellite name
 */
function PlanetWithSatellite(name, satelliteName) {
    Planet.call(this, name);

    this.satelliteName = satelliteName;
}

PlanetWithSatellite.prototype = Object.create(Planet.prototype);
PlanetWithSatellite.prototype.constructor = PlanetWithSatellite;

PlanetWithSatellite.prototype.getName = function () {
    let planetName = Planet.prototype.getName.call(this);
    return planetName + '. The satellite is ' + this.satelliteName;
}

let earth = new PlanetWithSatellite('earth', 'moon');
earth.getName();

// 2. Создайте класс “Здание” (пусть у него будет имя, количество этажей, метод “получить количество этажей”
// и метод “установить количество этажей”). Создайте наследников этого класса:
// классы “Жилой дом” и “Торговый центр”. Используйте функциональное наследование.
// У жилого дома появится свойство “количество квартир на этаже”, а метод “получить количество этажей” должен
// вернуть объект вида {этажи: 5, всегоКвартир: 5 * количествоКвартир}
// У торгового центра появится свойство “количество магазинов на этаже”, а метод “получить количество этажей”
// должен вернуть объект вида {этажи: 3, всегоМагазинов: 3 * количествоМагазинов}
// От каждого класса создать экземпляр (дом, торговый центр).
/**
 * @desc Building info class
 * @param {string} name - Building name
 * @param {number} numFloors - Number of floors in this building
 */
function Building(name, numFloors) {
    this.name = name;

    this.getFloors = function () {
        return this.numFloors;
    }

    this.setFloors = function (numFloors) {
        this.numFloors = numFloors;
    }
}

/**
 * @desc House info class
 * @param {string} name - House name
 * @param {number} numFloors - Number of floors in this house
 * @param {number} numFlat - Number of flat in this house
 */
function House(name, numFloors, numFlat) {
    Building.call(this, name, numFloors);
    
    this.numFlat = numFlat;
    this.numFloors = numFloors;    

    this.getFloors = function () {
        return {
            floorsNumber: this.numFloors,
            totalFlat: this.numFloors * this.numFlat
        };
    }
}
let newHouse = new House('New House', 5, 4);
newHouse.getFloors();

/**
 * @desc Shop center info class
 * @param {string} name - Shop center name
 * @param {number} numFloors - Number of floors in this shop center
 * @param {number} numShops - Number of shops in this shop center
 */
function ShopCenter(name, numFloors, numShops) {
    Building.call(this, name, numFloors);

    this.numShops = numShops;
    this.numFloors = numFloors;

    this.getFloors = function () {
        return {
            floorsNumber: this.numFloors,
            totalShops: this.numFloors * this.numShops
        };
    }
}
let newShopCenter = new ShopCenter('New Shop Center', 3, 10);
newShopCenter.getFloors();

// 3. Создать класс “Мебель” с базовыми свойствами “имя”, “цена” и методом “получить информацию” (метод должен
// вывести имя и цену). Метод должен быть объявлен с помощью прототипов (Func.prototype...). Создать два
// экземпляра класса “Мебель”: экземпляр “ОфиснаяМебель” и “Мебель для дома”. Придумайте им по одному свойству,
// которые будут характерны только для этих экземпляров (например, для офисной мебели - наличие компьютерного
// стола или шредера). Метод “получить информацию” должен учитывать и добавленное вами новое свойство.
// Задача на переопределение метода у экземпляров класса.
/**
 * @desc Furniture info class
 * @param {string} name - Furniture name
 * @param {number} price - Furniture price
 */
function Furniture(name, price) {
    this.name = name;
    this.price = price;
}

Furniture.prototype.getInfo = function () {
    return {
        name: this.name,
        price: this.price
    };
}

/**
 * @desc Office furniture info class
 * @param {string} name - Office furniture name
 * @param {number} price - Office furniture price
 * @param {boolean} hasCompTable - Has computer table or not
 */
function OfficeFurniture(name, price, hasCompTable) {
    Furniture.call(this, name, price);

    this.hasCompTable = hasCompTable;
}

OfficeFurniture.prototype = Object.create(Furniture.prototype);
OfficeFurniture.prototype.constructor = OfficeFurniture;

OfficeFurniture.prototype.getInfo = function () { 
    let furInfo = Furniture.prototype.getInfo.call(this);
    furInfo.hasCompTable = this.hasCompTable;
    return furInfo;
}
let newOfficeFur = new OfficeFurniture('New Office Furniture', 250, true);
newOfficeFur.getInfo();

/**
 * @desc Home furniture info class
 * @param {string} name - Home furniture name
 * @param {number} price - Home furniture price
 * @param {boolean} hasTelevision - Has television or not
 */
function HomeFurniture(name, price, hasTelevision) {
    Furniture.call(this, name, price);

    this.hasTelevision = hasTelevision;
}

HomeFurniture.prototype = Object.create(Furniture.prototype);
HomeFurniture.prototype.constructor = HomeFurniture;

HomeFurniture.prototype.getInfo = function () {
    let furInfo = Furniture.prototype.getInfo.call(this);
    furInfo.hasTelevision = this.hasTelevision;
    return furInfo;
}
let newHomeFur = new HomeFurniture('New Home Furniture', 150, true);
newHomeFur.getInfo();

// 4. Создать класс “Пользователь” с базовыми свойствами “имя”, “дата регистрации” и методом “получить
// информацию” (метод должен вывести имя и дату регистрации). Метод должен быть объявлен с помощью прототипов
// (Func.prototype...) Создать два наследника класса “Пользователь”: класс “Админ” и класс “Гость”.
// У класса “Админ” должно быть дополнительное свойство “суперАдмин” (может быть true/false, должно быть
// скрытым). Свойства определяются в момент вызова конструктора.
// У класса “Гость” должно быть свойство “срокДействия” (validDate, например), содержащее дату (например,
// одну неделю от момента регистрации).
// У классов-наследников метод “получить информацию” должен так же содержать информацию о дополнительных
// свойствах (“суперАдмин” и “срокДействия”).
/**
 * @desc User info class
 * @param {string} name - User name
 * @param {date} regDate - Registration date
 */
function User(name, regDate) {
    this.name = name;
    this.regDate = regDate;
}

User.prototype.getInfo = function () {
    return {
        name: this.name,
        regDate: this.regDate
    };
}

/**
 * @desc Admin info class
 * @param {string} name - User name
 * @param {date} regDate - Registration date
 * @param {boolean} superAdmin - Has super admin rights or not
 */
function Admin(name, regDate, superAdmin) {
    User.call(this, name, regDate);

    this._superAdmin = superAdmin;
}

Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;

Admin.prototype.getInfo = function () {
    let info = User.prototype.getInfo.call(this);
    info.superAdmin = this._superAdmin;
    return info;
}
let newAdmin = new Admin('Peter', '01.01.2019', true);
newAdmin.getInfo();

/**
 * @desc Guest info class
 * @param {string} name - User name
 * @param {date} regDate - Registration date
 * @param {date} validDate - Period of validity
 */
function Guest(name, regDate, validDate) {
    User.call(this, name, regDate);

    this.validDate = validDate;
}

Guest.prototype = Object.create(User.prototype);
Guest.prototype.constructor = Guest;

Guest.prototype.getInfo = function () {
    let info = User.prototype.getInfo.call(this);
    info.validDate = this.validDate;
    return info;
}
let newGuest = new Guest('Ivan', '01.02.2019', '15.02.2019');
newGuest.getInfo();