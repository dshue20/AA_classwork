def first_anagram?(str1,str2)
    possible_anagrams = str1.split('').permutation(str1.length).to_a
    possible_anagrams.map! {|subarr| subarr.join}
    possible_anagrams.include?(str2)
end
# time complexity: O(n!)
# space complexity: O(n!)

# p first_anagram?("gizmo", "sally")    #=> false
# p first_anagram?("elvis", "lives")    #=> true

def second_anagram?(str1,str2)
    str2_arr = str2.split('')
    str1.each_char do |char|
        idx = str2.index(char)
        return false if idx.nil?
        str2_arr.delete_at(str2.index(char))
    end
    true
end
# time complexity: O(n^2)
# space complexity: O(n)

# p second_anagram?("gizmo", "sally")    #=> false
# p second_anagram?("elvis", "lives")    #=> true

def third_anagram?(str1,str2)
    str1.split('').sort == str2.split('').sort
end
# time complexity: O(nlogn)
# space complexity: O(n)

# p third_anagram?("gizmo", "sally")    #=> false
# p third_anagram?("elvis", "lives")    #=> true

def fourth_anagram?(str1,str2)
    hash1,hash2 = Hash.new(0),Hash.new(0)
    str1.each_char {|char| hash1[char] += 1}
    str2.each_char {|char| hash2[char] += 1}
    hash1 == hash2
end
# time complexity: O(n)
# space complexity: O(1)

p fourth_anagram?("gizmo", "sally")    #=> false
p fourth_anagram?("elvis", "lives")    #=> true

