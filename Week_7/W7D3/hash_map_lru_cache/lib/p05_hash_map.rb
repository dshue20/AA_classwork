require_relative 'p04_linked_list'
include Enumerable 

class HashMap
  attr_accessor :count

  def initialize(num_buckets = 8)
    @store = Array.new(num_buckets) { LinkedList.new }
    @count = 0
  end

  def include?(key)
    !self.get(key).nil?
  end

  def set(key, val)
    list = self.which_list(key)
    if list.include?(key) 
      list.update(key, val)
    else 
      @count += 1
      resize! if @count > num_buckets  
      list.append(key, val)
    end
  end

  def which_list(key)
    @store[key.hash % @store.length] 
  end

  def get(key)
    list = self.which_list(key)
    return list.get(key) if list.include?(key)
    nil
  end

  def delete(key)
    list = self.which_list(key)
    list.remove(key)
    @count -= 1
  end

  def each(&prc)
    @store.each do |list| 
      list.each { |node| prc.call(node.key,node.val) }
    end
  end

  #uncomment when you have Enumerable included
  def to_s
    pairs = inject([]) do |strs, (k, v)|
      strs << "#{k.to_s} => #{v.to_s}"
    end
    "{\n" + pairs.join(",\n") + "\n}"
  end

  alias_method :[], :get
  alias_method :[]=, :set

  private

  def num_buckets
    @store.length
  end

  def resize!
    old_hash = self.dup
    @store = Array.new(2 * num_buckets) { LinkedList.new }
    @count = 0
    old_hash.each { |k,v| self.set(k,v) }
  end
  # hash = {first:1, second:2, third:3}
  # 7.times { |i| hash[i] = i + 1 }
  # hash = {first:2, second:3, third:4}
  # hash = {first:2, second:3, third:4, fourth:5, fifth:6, sixth:7}

  def bucket(key)
    # optional but useful; return the bucket corresponding to `key`
  end
end
