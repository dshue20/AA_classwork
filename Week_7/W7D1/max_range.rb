def windowed_max_range(array, window_size)
    current_max_range = 0
    (0..array.length-window_size).each do |idx|
        subarr = array[idx...idx+window_size]
        diff = subarr.max - subarr.min
        current_max_range = diff if diff > current_max_range
    end
    current_max_range
end
# time complexity: O(n^2)
# space complexity: O(n)

# p windowed_max_range([1, 0, 2, 5, 4, 8], 2) # == 4 # 4, 8
# p windowed_max_range([1, 0, 2, 5, 4, 8], 3) # == 5 # 0, 2, 5
# p windowed_max_range([1, 0, 2, 5, 4, 8], 4) # == 6 # 2, 5, 4, 8
# p windowed_max_range([1, 3, 2, 5, 4, 8], 5) # == 6 # 3, 2, 5, 4, 8

class MyQueue
  def initialize
    @store = []
  end

  def peek
    @store[0]
  end

  def size
    @store.length
  end

  def empty?
    @store.empty?
  end

  def enqueue(ele)
    @store << ele
  end

  def dequeue
    @store.shift
  end
end
  
class MyStack
  def initialize
    @store = []
  end

  def peek
    @store[-1]
  end

  def size
    @store.length
  end

  def empty?
    @store.empty?
  end  

  def pop
    @store.pop
  end

  def push(ele)
    @store.push(ele)
  end
end

class StackQueue
    def initialize
        @stack1 = MyStack.new
        @stack2 = MyStack.new
    end

    def size
        @stack1.length + @stack2.length
    end

    def empty?
        @stack1.empty? && @stack2.empty?
    end

    def enqueue(ele)
        @stack2.push(ele)
    end

    def dequeue
        @stack1.pop
    end
end

class MinMaxStack < MyStack
    def max
        
    end

    def min

    end
end