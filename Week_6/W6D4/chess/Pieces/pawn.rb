require_relative "piece"

class Pawn < Piece

    attr_accessor :move_dirs

    def initialize(pos,color,board)
        super(pos,color,board)
        @symbol = :P
    end

    def possible_moves
        x,y = pos
        # check take a piece, move 1 space, move 2 spaces 
        if color == :white
            take_pos = [[1,1],[1,-1]]
            take_pos.each {|pos| 
                moves << [pos[0]+x,pos[1]+y] if board[pos].color == :black && board.on_board(pos,x,y)       
            }
            if check_valid_move([x+1,y]) 
                check_valid_move([x+2,y]) if x == 1
            end
        else
            take_pos = [[x-1,y+1],[x-1,y-1]]
            take_pos.each {|pos| moves << pos if board[pos].color == :white}
            if check_valid_move([x-1,y])
                check_valid_move([x-2,y]) if x==6
            end
        end
        moves
    end

end