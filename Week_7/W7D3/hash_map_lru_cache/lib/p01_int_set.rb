class MaxIntSet
  attr_reader :store

  def initialize(max)
    @max = max
    @store = Array.new(max, false)
  end

  def insert(num)
    raise "Out of bounds" if !num.between?(0, @max)
    @store[num] = true
  end

  def remove(num)
    @store[num] = false
  end

  def include?(num)
    @store[num]
  end

  private

  def is_valid?(num)
  end

  def validate!(num)
  end
end


class IntSet
  def initialize(num_buckets = 20)
    @store = Array.new(num_buckets) { Array.new }
  end

  def insert(num)
    self[num] << num
  end

  def remove(num)
    self[num].delete(num)
  end

  def include?(num)
    self[num].include?(num)
  end

  private

  def [](num)
    @store[num % num_buckets] 
  end

  def num_buckets
    @store.length
  end
end

require "byebug"
class ResizingIntSet
  attr_reader :count
  attr_accessor :store

  def initialize(num_buckets = 20)
    @store = Array.new(num_buckets) { Array.new }
    @count = 0
  end

  def insert(num)
    if !self.include?(num)
      @count += 1
      resize! if @count > @store.length
      self[num] << num
    end
  end

  def remove(num)
    if self.include?(num)
      self[num].delete(num) 
      @count -= 1
    end
  end

  def include?(num)
    self[num].include?(num)
  end

  private

  def [](num)
    @store[num % num_buckets] 
  end

  def num_buckets
    @store.length
  end

  def resize!
    # debugger
    old_store = @store.dup
    @store = Array.new(2 * num_buckets) { Array.new }
    old_store.each do |bucket|
      bucket.each { |ele| @store[ele % @store.length] << ele }
    end
    @store
  end
end
