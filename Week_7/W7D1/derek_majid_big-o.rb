def my_min1(arr)
  arr.each_with_index do |ele,i|
    return ele if i == arr.length - 1
    return ele if arr[i+1..-1].all? {|ele2| ele < ele2}
  end 
end
# time complexity = n^2
# space complexity = n^2

def my_min2(arr)
    arr.inject do |min,ele| 
        if min > ele
            min = ele
        else
            min
        end
    end
end
# time complexity = n
# space complexity = 1

# list = [ 0, 3, 5, 4, -5, 10, 1, 90 ]
# p my_min2(list)  # =>  -5

def largest_contiguous_subsum(arr)
  sub_arr = []
  sums = []
  arr.each_with_index do |ele,i|
    arr.each_with_index do |ele2, i2|
      sub_arr << arr[i..i2] if i2 >= i  
    end 
  end 
  sub_arr.each{ |array|  sums << array.sum} 
  sums.max
end  
# time complexity = n^3
# space complexity = n^3 

def largest_contiguous_subsum2(arr)
    first_ele = arr.shift
    largest, current = first_ele, first_ele
    arr.each do |ele|
        current = 0 if current < 0
        current += ele
        largest = current if current > largest
    end
    largest
end
# time complexity = n
# space complexity = 1

list = [5, 3, -7]
p largest_contiguous_subsum2(list) # => 8
list = [2, 3, -6, 7, -6, 7]
p largest_contiguous_subsum2(list) # => 8
list = [-5, -1, -3]
p largest_contiguous_subsum2(list) # => -1