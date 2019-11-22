class Clock {
    constructor() {
      // 1. Create a Date object.
      // 2. Store the hours, minutes, and seconds.
      // 3. Call printTime.
      // 4. Schedule the tick at 1 second intervals.
      const date = new Date();
      this.hour = date.getHours();
      this.min = date.getMinutes();
      this.sec = date.getSeconds();
      this.printTime();
      let that = this;
      setInterval(this._tick.bind(this), 1000);
    }
  
    printTime() {
      // Format the time in HH:MM:SS
      // Use console.log to print it.
      const time = `${this.hour}:${this.min}:${this.sec}`;
      console.log(time);
    };
  
    _tick() {
      // 1. Increment the time by one second.
      // 2. Call printTime.
        if (this.sec === 59) {
          this.sec = 0;
          this.min ++;
        }
        else if (this.sec > 59) {
          throw new Error("Seconds over 60");
        }
        else {
          this.sec ++;
        }

        // if (this.min === 59) {
        //   this.min = 0;
        //   this.hour ++;
        // }
        // else if (this.min > 59) {
        //   throw new Error("Minutes over 60");
        // }
        // else {
        //   this.min ++;
        // }
        
        this.printTime();    
    };
  }
  
  const clock = new Clock();