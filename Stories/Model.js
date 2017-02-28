/* @flow*/

export class Model {
    signals:Object;
    attributes:Object;
    //defaultAttributes:Object;

    constructor(object:?Object){
        this.attributes={};
        this.signals={};
        if (object){
           this.observeAttributes(object)
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
            get(){
                return val
            },
            set(newVal){
                val = newVal;
                console.log("Model set", that);
                that.notify(key)
            }
        })

    };

    observeAttributes(obj:Object){
        for (let key in obj){
            if (obj.hasOwnProperty(key)){
                this.makeReactive(key, obj)
            }
        }
    }

    setAttributes(object:Object){
        this.attributes = object;
        //this.setDefaultAttributes(object)
    }

    //setDefaultAttributes(object:Object){
    //    this.defaultAttributes = object;
    //}

    // Set
    set(pair:Object){
        this.attributes = Object.assign(this.attributes, pair);
        console.log("Model set", this.attributes);
    }


    //Get
    get(key:string){
        return this.attributes[key]
    }

    //isAttributesChanged(){
    //    return this.attributes === this.defaultAttributes
    //}




}