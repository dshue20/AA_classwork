module Stepable

    def possible_moves
        x,y = pos
        get_knight_moves(x,y) if move_dirs.include?("knight")
        get_king_moves(x,y) if move_dirs.include?("king")
        moves
    end

    def get_knight_moves(x, y)
        knight_moves = [ [2, 1], [1, 2], [-2, -1], [-1, -2], [2, -1], [-2, 1], [-1, 2], [1, -2] ]
        knight_moves.each do |move| 
            new_pos = [x+move[0],y+move[1]]
            check_valid_move(new_pos) if board.on_board(move,x,y)
            #p new_pos.to_s + ": " + check_valid_move(new_pos).to_s if board.on_board(move,x,y)
      end 
    end 

    def get_king_moves(x,y)
        king_moves = [[1,0],[1,-1],[1,1],[-1,0],[-1,-1],[-1,1],[0,1],[0,-1]]
        king_moves.each do |move| 
            new_pos = [x+move[0],y+move[1]]
            check_valid_move(new_pos) if board.on_board(move,x,y)
      end 
    end

    # def on_board(move,x,y)
    #     return true if (move[0] + x < 8 && move[1] + y < 8 )  && (move[0] + x >= 0  && move[1] + y >= 0 )
    #     false
    # end

end

