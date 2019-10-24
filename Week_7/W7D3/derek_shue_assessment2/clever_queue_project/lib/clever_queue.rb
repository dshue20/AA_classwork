class CleverQueue < SimpleQueue
    attr_reader :capacity
    attr_accessor :soft_limit

    def initialize(num1,num2)
        @capacity = num1
        @soft_limit = num2
        raise 'invalid args' if @soft_limit > @capacity
        @hidden_array = []
    end

    def enqueue(*args)
        raise 'queue is full' if args.length + self.size > @capacity
        args.each {|arg| @hidden_array << arg}
        self.size
    end

    def dequeue(n=1)
        extra = n - self.size
        arr = @hidden_array.shift(n)
        extra.times {arr << nil} if extra > 0
        arr
    end

    def trim
        return false if self.size <= @soft_limit
        @hidden_array.pop until self.size == @soft_limit
        true
    end

end