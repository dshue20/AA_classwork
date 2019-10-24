include Enumerable

class Node
  attr_reader :key
  attr_accessor :val, :next, :prev

  def initialize(key = nil, val = nil)
    @key = key
    @val = val
    @next = nil
    @prev = nil
  end

  def to_s
    "#{@key}: #{@val}"
  end

  def remove
    # optional but useful, connects previous link to next link
    # and removes self from list.
    @prev.next = @next
    @next.prev = @prev
  end
end

class LinkedList
  def initialize
    @head, @tail = Node.new, Node.new
    @head.next = @tail
    @tail.prev = @head
  end

  def [](i)
    each_with_index { |link, j| return link if i == j }
    nil
  end

  def first
    @head.next
  end

  def last
    @tail.prev
  end

  def empty?
    @head.next == @tail
  end

  def get(key)
    self.each {|node| return node.val if node.key == key}
  end

  def include?(key)
    # nil ---> head ---> x,1 ---> y,2 ---> z,3 ---> tail ---> nil
    # include?("y") -> false
    self.each {|node| return true if node.key == key}
    false
  end

  def append(key, val)
    node = Node.new(key,val)
    node.prev = @tail.prev
    @tail.prev.next = node
    @tail.prev = node
    node.next = @tail
  end

  def update(key, val)
    self.each {|node| node.val = val if node.key == key}
  end

  def remove(key)
    self.each {|node| node.remove if node.key == key}
  end

  def each(&prc)
    node = @head.next
    until node == @tail
      prc.call(node) 
      node = node.next
    end
  end

  # uncomment when you have `each` working and `Enumerable` included
  def to_s
    inject([]) { |acc, link| acc << "[#{link.key}, #{link.val}]" }.join(", ")
  end
end
