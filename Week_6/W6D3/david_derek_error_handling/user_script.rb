require_relative 'super_useful'

puts "'five' == #{convert_to_int('five')}"

feed_me_a_fruit

begin 
    sam = BestFriend.new('', 1, '')
rescue BestFriendYearsError
    puts "You haven't been friends long enough!"
    begin
        sam = BestFriend.new('', 5, '')
    rescue EmptyStrError
        puts 'Fill in name and pasttime!'
        sam = BestFriend.new('Sam', 5, 'baseball')
    end
end

sam.talk_about_friendship
sam.do_friendstuff
sam.give_friendship_bracelet
