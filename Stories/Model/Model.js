/* @flow*/

import {equal} from './CompareObject';



export class Model {
    signals:Object;
    attributes:Object;
    defaultAttributes:Object;
    computed:Object;

    constructor(object:?Object, options:?Object){
        this.attributes={};
        this.signals={};
        this.computed = {};
        if (object){
            if (options && options.reactive){
                this.observeAttributes(object)
            } else {
                this.setAttributes(object)
            }

        }
    }
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

    notify(signal:string){
        if(!this.signals[signal] || this.signals[signal].length < 1) return;
        this.signals[signal].forEach((signalHandler) => signalHandler())
    }

    makeReactive=(key:string, obj:Object = this.attributes)=>{

        let val = obj[key];
        let that = this;
        Object.defineProperty(this.attributes, key, {
            enumerable:true,
            get(){

                return val
            },
            set(newVal){
                val = newVal;
                console.log("Model set", that);
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


    //Get
    get(key:string){
        return this.attributes[key]
    }

    isAttributesChanged(){
        return equal(this.attributes, this.defaultAttributes)
    }

}