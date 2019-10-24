class Integer
  # Integer#hash already implemented for you
end

class Array
  def hash
    str = ''
    digits = []
    self.each {|num| digits << num.to_s.length}
    (0...digits.length).each {|idx| str += self[idx].to_s + digits[idx].to_s}
    str.to_i.hash
  end
end

class String
  def hash
    alph = ("a".."z").to_a
    num_str = ''
    self.each_char {|char| num_str += alph.index(char).to_s + '0'}
    num_str.to_i.hash
  end
end

class Hash
  def hash
    str = ''
    sorted = self.sort
    sorted.each {|x,y| str += x.to_s + y.to_s}
    str.hash
  end
end
