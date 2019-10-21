def bad_two_sum?(arr,target)
    arr.each_with_index do |ele,idx|
        arr.each_with_index do |ele2,idx2|
            return true if idx2 > idx && ele + ele2 == target
        end
    end
    false
end
# time complexity: O(n^2)
# space complexity: O(1)

def okay_two_sum?(arr,target)
  new_arr = arr.sort
  new_arr.each_with_index do |ele,idx|
    searched = new_arr.bsearch_index {|ele2| ele + ele2 == target}
    return true if searched && searched != idx
  end
  false
end
# time complexity: O(nlogn)
# space complexity: O(n)

def two_sum?(arr,target)
    hash = {}
    arr.each do |ele|
        return true if hash[target - ele]
        hash[ele] = true
    end
    false
end
# time complexity: O(n)
# space complexity: O(n)

arr = [0, 1, 5, 7]
p two_sum?(arr, 6) # => should be true
p two_sum?(arr, 10) # => should be false