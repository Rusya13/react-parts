/* @flow*/

//Returns the object's class, Array, Date, RegExp, Object are of interest to us
let getClass = function(val) {
    return Object.prototype.toString.call(val)
    .match(/^\[object\s(.*)\]$/)[1];
};

//Defines the type of the value, extended typeof
let whatis = function(val) {

    if (val === undefined)
        return 'undefined';
    if (val === null)
        return 'null';

    let type = typeof val;

    if (type === 'object')
        type = getClass(val).toLowerCase();

    if (type === 'number') {
        if (val.toString().indexOf('.') > 0)
            return 'float';
        else
            return 'integer';
    }

    return type;
};

let compareObjects = function(a, b) {
    if (a === b)
        return true;
    for (let i in a) {
        if (b.hasOwnProperty(i)) {
            if (!equal(a[i],b[i])) return false;
        } else {
            return false;
        }
    }

    for (let i in b) {
        if (!a.hasOwnProperty(i)) {
            return false;
        }
    }
    return true;
};

let compareArrays = function(a, b) {
    if (a === b)
        return true;
    if (a.length !== b.length)
        return false;
    for (let i = 0; i < a.length; i++){
        if(!equal(a[i], b[i])) return false;
    };
    return true;
};

let _equal = {};
_equal.array = compareArrays;
_equal.object = compareObjects;
_equal.date = function(a, b) {
    return a.getTime() === b.getTime();
};
_equal.regexp = function(a, b) {
    return a.toString() === b.toString();
};
//	uncoment to support function as string compare
//	_equal.fucntion =  _equal.regexp;



/*
 * Are two values equal, deep compare for objects and arrays.
 * @param a {any}
 * @param b {any}
 * @return {boolean} Are equal?
 */
let equal = function(a, b) {
    if (a !== b) {
        let atype = whatis(a), btype = whatis(b);

        if (atype === btype)
            return _equal.hasOwnProperty(atype) ? _equal[atype](a, b) : a==b;

        return false;
    }

    return true;
};

export class Model {
    constructor(object, options){
        console.log("constructor", object, options)
        this.set = this.set.bind(this);
        this.attributes = {};
        this.signals = {};
        this.computed = {};
        this.computedObjects = {};
        if (options){
            // observable
            console.log("observable")
            this.observeAttributes(object)
        } else {
            //  не observable
            console.log("not observable")
            this.setAttributes(object)
        }
        console.log(this);

    }


    // подписка на обновления
    observe(property, signalHandler){
        if (typeof property === "string"){
            if(!this.signals[property]) this.signals[property] = [];
            this.signals[property].push(signalHandler)
        } else {
            property.forEach(prop=>{
                if(!this.signals[prop]) this.signals[prop] = [];
                this.signals[prop].push(signalHandler)
            })
        }
    }



    // здесь исполняются сигналы по ключу поля (и observer и computed )
    notify(signal, computed){
        // проверяем есть ли на данный атрибут сигналы
        if(!this.signals[signal] || this.signals[signal].length < 1) return;

        // проходим по каждому сигналу
        this.signals[signal].forEach((signalHandler) => {
            // перед исполнением сигнала проверить
            // какие computed свойства должны отреагировать
            // проверяем
            if (!computed){
                for (let prop in this.computedObjects){
                    //console.log("Signals for", this.computedObjects[prop]);
                    if (this.computedObjects[prop].some(field=> field === signal)){
                        //console.log("Signal run ", signal);
                        this.notify(prop, true)
                    }
                }
            }
            return signalHandler && signalHandler()
        })
    }


    // и ставим слушатель на set и get
    makeReactive(key, obj){

        let val = obj[key];
        let that = this;
        console.log("makeReactive", this.attributes)
        Object.defineProperty(this.attributes, key, {
            enumerable:true,
            get(){
                // узнаем какие аттрибуты запрашивает computed
                console.log("make reactive", "call", key)
                that.checkFunc(null, "call", key);

                return val
            },
            set(newVal){
                val = newVal;

                // передаем событие в observer
                that.notify(key)
            }
        });
    };


    // делаем аттрибуты observable
    observeAttributes(object){
        console.log("observeAttributes", object,Object.keys(object).length, this.attributes)
        if (Object.keys(object).length === 0) {
            object = this.attributes;
        }
        console.log("attributes:",object)
        // копируем исходные значения
        this.setDefaultAttributes(object);

        // проходим по каждому аттрибуту
        for (let key in object){
            if (object.hasOwnProperty(key)){
                console.log("has own", key)
                this.makeReactive(key, object)
            }
        }
    }

    setAttributes(object){
        let ob = object || {};
        this.attributes = ob;
        this.setDefaultAttributes(ob)
    }

    setDefaultAttributes(object){
        this.defaultAttributes = object;
    }

    // Set
    set(pair){
        //console.log("set", this.attributes, pair);
        this.attributes = Object.assign(this.attributes, pair);
        //console.log("after set:", this.attributes);
    }


    checkFunc(key, mode, observableKey){
        //console.log("checkFunc", key, mode, observableKey)
        switch (mode) {
            case "start":
                //console.log("Model checkFunc", mode);
                this.currentComputedProp = key;
                break;

            case "call":
                if (!this.currentComputedProp) break;
                //console.log("Model checkFunc", mode, observableKey);
                let obs = this.computedObjects[this.currentComputedProp];

                if (!Array.isArray(obs)) {
                    this.computedObjects[this.currentComputedProp] =[];
                } else {
                    if(this.computedObjects[this.currentComputedProp].some(name=>observableKey===name)){
                        break;
                    }
                }
                this.computedObjects[this.currentComputedProp].push(observableKey);
                //console.log("Model computedObjects", this.computedObjects);
                break;
            case "end":
                //console.log("Model checkFunc", mode);
                this.currentComputedProp = null;
                break;
            default:
            //console.log("Model checkFunc", "default");

        }

    }

    //Get
    get(key){

        //console.log('get', key, this.computed[key])
        // если хотим получить computed
        if (this.computed && this.computed[key]){
            // подписать свойство на обновление (set) Observable
            // начать запись
            this.checkFunc(key, "start");
            // вызвать функцию

            let func = this.computed[key]();
            // закончить запись
            this.checkFunc(key, "end");
            console.log("Model get", func);

            // возвращаем значение
            return func
        }
        return this.attributes[key]
    }

    isAttributesChanged(){
        return equal(this.attributes, this.defaultAttributes)
    }
}


