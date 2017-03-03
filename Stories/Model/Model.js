/* @flow*/

import {equal} from './CompareObject';



export class Model {
    signals:?Object;
    attributes:Object;
    defaultAttributes:?Object;
    computed:?Object;
    computedObjects:?Object;
    constructor(object:?Object, options:?Object){
        this.attributes={};
        this.signals={};
        this.computed = {};
        this.computedObjects = {};
        if (object){
            if (options && options.reactive){
                this.observeAttributes(object)
            } else {
                this.setAttributes(object)
            }

        }
    }


    // подписка на обновления
    observe(property:Array<string> | string, signalHandler:Function){
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
    notify(signal:string, computed:boolean){
        if(!this.signals[signal] || this.signals[signal].length < 1) return;
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

    makeReactive=(key:string, obj:Object = this.attributes)=>{
        let val = obj[key];
        let that = this;
        Object.defineProperty(this.attributes, key, {
            enumerable:true,
            get(){
                that.checkFunc(null, "call", key);
                return val
            },
            set(newVal){
                val = newVal;
                that.notify(key)
            }
        });
    };

    observeAttributes(object:?Object){
        if (!object) {
            object = this.attributes;
        }
        this.setDefaultAttributes(object);
        for (let key in object){
            if (object.hasOwnProperty(key)){
                this.makeReactive(key, object)
            }
        }
    }

    setAttributes(object:Object){
        this.attributes = object;
        this.setDefaultAttributes(object)
    }

    setDefaultAttributes(object:Object){
        this.defaultAttributes = object;
    }

    // Set
    set(pair:Object){
        this.attributes = Object.assign(this.attributes, pair);
        //console.log("Model set", this.attributes);
    }

    currentComputedProp:?string;


    checkFunc(key:string, mode:string, observableKey:string){
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
    get(key:string){
        if (this.computed && this.computed[key]){
            // подписать свойство на обновление (set) Observable
            // начать запись
            this.checkFunc(key, "start");
            // вызвать функцию
            let func = this.computed[key]();
            // закончить запись
            this.checkFunc(key, "end");
            //console.log("Model get total", this.computedObjects);
            return func
        }
        return this.attributes[key]
    }

    isAttributesChanged(){
        return equal(this.attributes, this.defaultAttributes)
    }

}