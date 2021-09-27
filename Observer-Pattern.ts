import { channel } from "diagnostic_channel";
import { title } from "process";

interface Observable{
    attach(o: Observer);
    detach(o: Observer);
    notify();
}

interface Observer{
    update();
}

class Membresia implements Observable{
    private MembersSubscribers: Observer[] = [];
    private UltimoRegistro: string = '';
    attach(o: Observer){
        this.MembersSubscribers.push(o);
    }
    detach(o: Observer){
        //se elimina miembro
    }
    addNewNotification(title: string){
        this.UltimoRegistro = title;
        this.notify();
        console.log("Nuevo suscrriptor agregado a la pagina");
    }

    notify(){
        for (let suscriptor of this.MembersSubscribers){
            suscriptor.update();
        }
    }
}

class Subscriber implements Observer{
    private observable = null;
    constructor(observable: Observable){
        this.observable = observable;
    }

    update(){
        console.log("Nueva notificación");
        console.log(this.observable.UltimoRegistro());
    }
}

let pagina =  new Membresia();
let s1  = new Subscriber(pagina);
let s2 = new Subscriber(pagina);

pagina.attach(s1);
pagina.attach(s2);

pagina.addNewNotification('Observer Pattern');