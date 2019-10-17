require "byebug"
module Slideable

    def possible_moves
        x,y = pos
        if move_dirs.include?("diagonal")
            moves += get_bishop_moves(x,y)
        end
        if move_dirs.include?("h/v")
            moves = get_rook_moves(x,y)
        end
        moves
    end

    def check_valid_move(new_pos)
        if board.valid_move?(new_pos) == true
            moves << new_pos
        elsif board.valid_move?(new_pos) == color
            return false
        else
            moves << new_pos
            return false
        end
    end

    def get_rook_moves(x,y)
        # moving left
        temp = x
        until temp == 0
            temp -= 1
            #p moves
            break if !check_valid_move([temp,y])
        end
        # moving right
        temp = x
        until temp == 7
            temp += 1
            #p moves
            break if !check_valid_move([temp,y])
        end
        # moving up
        temp = y
        until temp == 7
            temp += 1
            break if !check_valid_move([x,temp])
        end
        # moving down
        temp = y
        until temp == 0
            temp -= 1
            break if !check_valid_move([x,temp])
        end
        moves
    end

    def get_bishop_moves(x, y)
        # diagonal up left
        count = 1
        until x-count < 0 || y+count > 7
            new_pos = [x-count,y+count]
            moves << new_pos
            count += 1
        end
        # diagonal up right
        count = 1
        until x+count > 7 || y+count > 7
            new_pos = [x+count,y+count]
            moves << new_pos
            count += 1
        end
        # diagonal down left
        count = 1
        until x-count < 0 || y-count < 0
            new_pos = [x-count,y-count]
            moves << new_pos
            count += 1
        end
        # diagonal down right
        count = 1
        until x+count > 7 || y-count < 0
            new_pos = [x+count,y-count]
            moves << new_pos
            count += 1
        end  
        moves      
    end

end

# [x,y]
# diagonal up left: [x-1,y+1]
# diagonal up right: [x+1,y+1]
# diagonal down left: [x-1,y-1]
# diagonal down right: [x+1,y-1]



#Rook: front, back, left, right any # spaces
#Bishop: D.front.right, D.front.left, D.back,right, D.back,left
#