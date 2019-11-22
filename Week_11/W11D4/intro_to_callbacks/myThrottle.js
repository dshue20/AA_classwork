Function.prototype.myThrottle = function (interval) {
    // console.log(this.arguments);
    // debugger;
    let tooSoon = false;
    const that = this;
    const func = function() {
        if (!tooSoon) {
            that(...arguments);
            tooSoon = true;
            window.setTimeout(function () {
                tooSoon = false;
            }, interval);
        }
    };
    return func;
};


class Neuron {
    constructor() {
        this.fire = this.fire.myThrottle(1000);
    }

    fire() {
        console.log("Firing!");
    }
}
const neuron = new Neuron();

const interval = setInterval(() => {
    neuron.fire();
}, 10);

clearInterval(interval);


