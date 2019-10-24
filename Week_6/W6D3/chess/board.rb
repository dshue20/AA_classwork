require_relative "Pieces/piece"
require_relative "Pieces/rook"
require_relative "Pieces/bishop"
require_relative "Pieces/queen"
require_relative "Pieces/knight"
require_relative "Pieces/king"
require_relative "Pieces/pawn"
require "byebug"
class Board
    
    attr_accessor :grid

    def initialize
        @grid = Array.new(8) {Array.new(8)}
        @grid.each_with_index do |row,idx|
            row.each_index do |idx2|
                pos = [idx,idx2]
                if idx == 0 || idx == 7
                    (idx == 0)? (color = :black) : (color = :white)
                    case idx2
                    when 0,7
                        row[idx2] = Rook.new(pos, color, self)
                    when 1,6
                        row[idx2] = Knight.new(pos, color, self)
                    when 2,5
                        row[idx2] = Bishop.new(pos, color, self)
                    when 3
                        row[idx2] = Queen.new(pos, color, self)
                    when 4
                        row[idx2] = King.new(pos, color, self)
                    end
                elsif idx == 1 || idx == 6
                    (idx == 1)? (color = :black) : (color = :white)
                    row[idx2] = Pawn.new(pos, color, self)
                else
                    row[idx2] = NullPiece.instance
                end
            end
        end
    end

    def [](pos)
        row,col = pos
        grid[row][col]
    end

    def []=(pos,val)
        grid[pos[0]][pos[1]] = val
    end

    def is_empty?(pos)
        return true if self[pos].is_a?(NullPiece)
        false
    end

    def move_piece(start,finish)
        raise EmptyPosError if self.is_empty?(start)
        raise InvalidMoveError if !self[start].possible_moves.include?(finish)
        self[finish] = self[start]
        self[finish].pos = finish
        self[start] = NullPiece.instance
    end

    def valid_move?(pos)
        if self[pos].is_a?(NullPiece)
            return true 
        else
            # p '_________________________________________________'
            # p self[pos].to_s + '  ' + pos.to_s
            return self[pos].color
        end
    end

    def on_board(move,x,y)
        return true if (move[0] + x < 8 && move[1] + y < 8 )  && (move[0] + x >= 0  && move[1] + y >= 0 )
        false
    end  

    def in_check?(color)
        king_pos = (self.grid.flatten.select {|piece| piece.symbol == :K && piece.color == color})[0].pos
        (0..7).each do |idx1|
            (0..7).each do |idx2|
                pos = [idx1,idx2]
                if self[pos].color != color && self[pos].color != :null
                    return true if self[pos].possible_moves.include?(king_pos)
                end
            end
        end
        false
    end 

    def checkmate?(color)
        if in_check?(color)
            (0..7).each do |idx1|
                (0..7).each do |idx2|
                    pos = [idx1,idx2]
                    return false if self[pos].color == color && !self[pos].valid_moves.empty?
                end
            end
        end
        true
    end

    def duplicate
        duped_board = self.dup
        (0..7).each do |idx1|
            (0..7).each do |idx2|
                pos = [idx1,idx2]
                duped_board[pos] = self[pos]
            end
        end
        duped_board
    end

end

class EmptyPosError < StandardError
end

class InvalidMoveError < StandardError
end