class HashSet
  attr_reader :count

  def initialize(num_buckets = 8)
    @store = Array.new(num_buckets) { Array.new }
    @count = 0
  end

  def insert(key)
    if !self.include?(key)
      @count += 1
      resize! if @count > @store.length
      self[key] << key.hash
    end
  end

  def include?(key)
    self[key].include?(key.hash)
  end

  def remove(key)
    if self.include?(key)
      self[key].delete(key.hash) 
    @count -= 1
    end
  end

  private

  def [](num)
    @store[num.hash % num_buckets] 
  end

  def num_buckets
    @store.length
  end

  def resize!
    old_store = @store.dup
    @store = Array.new(2 * num_buckets) { Array.new }
    old_store.each do |bucket|
      bucket.each { |ele| @store[ele % @store.length] << ele }
    end
    @store
  end
end
