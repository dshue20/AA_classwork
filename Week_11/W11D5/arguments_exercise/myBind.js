Function.prototype.myBind1 = function(subject){
    //func = this.call(subject);
    const func = this;
    const arr = Array.from(arguments);
    const forBinding = arr.slice(1);
    return function bindFunc(){
        const forCalling = Array.from(arguments);
        return func.apply(subject, forBinding.concat(forCalling));
    }
    // return this.apply(subject, forBinding);
}

Function.prototype.myBind2 = function(subject, ...bindArgs){
    return (...forCalling) => {
        this.apply(subject, bindArgs.concat(forCalling));
    }
}

class Cat {
    constructor(name) {
      this.name = name;
    }
  
    says(sound, person) {
      console.log(`${this.name} says ${sound} to ${person}!`);
      return true;
    }
  }
  
  class Dog {
    constructor(name) {
      this.name = name;
    }
  }
  
  const markov = new Cat("Markov");
  const pavlov = new Dog("Pavlov");
  
  markov.says("meow", "Ned");
  // Markov says meow to Ned!
  // true
  
  // bind time args are "meow" and "Kush", no call time args
  markov.says.myBind2(pavlov, "meow", "Kush")();
  // Pavlov says meow to Kush!
  // true
  
  // no bind time args (other than context), call time args are "meow" and "a tree"
  markov.says.myBind2(pavlov)("meow", "a tree");
  // Pavlov says meow to a tree!
  // true
  
  // bind time arg is "meow", call time arg is "Markov"
  markov.says.myBind2(pavlov, "meow")("Markov");
  // Pavlov says meow to Markov!
  // true
  
  // no bind time args (other than context), call time args are "meow" and "me"
  const notMarkovSays = markov.says.myBind2(pavlov);
  notMarkovSays("meow", "me");
  // Pavlov says meow to me!
  // true