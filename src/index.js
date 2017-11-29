/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {
	for (var i = 0; i < array.length; i++) {
		fn(array[i], i, array);
	}
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
	var copy = [];

	for (var i = 0; i < array.length; i++) {
		copy[i] = fn(array[i], i, array);
	}

	return copy;
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {
	var x = initial || array[0];

	if (initial) {
		var i = 0;
	} else {
		var i = 1;
	}
	for (; i < array.length; i++) {
		x = fn(x, array[i], i, array);
	}

	return x;
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
    delete obj[prop];
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
    return (prop in obj);
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
    var array = [];

    for (var key in obj) {
        array.push(key);
    }

    return array;
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
    var array = [];

    for (var key in obj) {
        var Up = key.toUpperCase();
        array.push(Up);
    }

    return array;
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from, to) {
    var newArray = [],
        begin = from || 0,
        end = to || array.length,
        i;
  
    if (from === 0 && to === 0) {
        return newArray;
    }
    
    if ( begin < 0) {
    	var b = array.length*-1;

    	if (begin > b) {
    		begin = array.length + from;

    	} else {

    		begin = 0;
    	}
    }
    
    if ( end < 0) {
        end = array.length + to;
    }

	if (end > array.length) {
		end = array.length;
	}

	if (end < begin) {

        return newArray;

    } else {
        console.log(begin, end);

        for ( i = begin; i < end; i++ ) {
            newArray.push( array[i] );
        } 

        return newArray;
    }
}

/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
	var p = new Proxy(obj, {
		set(target, prop, value) {
			target[prop] = value * value;

			return true;
		}
	});

	return p;
}

export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};
