require_relative "Pieces/piece"
require_relative "Pieces/rook"
require "byebug"
class Board
    
    attr_accessor :grid

    def initialize
        @grid = Array.new(8) {Array.new(8)}
        @grid.each_with_index do |row,idx|
            row.each_index do |idx2|
                if [0,1].include?(idx)
                    row[idx2] = Piece.new([idx,idx2], :black, self)
                elsif [6,7].include?(idx)
                    row[idx2] = Piece.new([idx,idx2], :white, self)
                else
                    row[idx2] = NullPiece.new
                end
            end
        end
    end

    def [](pos)
        row,col = pos
        grid[row][col]
    end

    def []=(pos,val)
        grid[pos] = val
    end

    def is_empty?(pos)
        return true if grid[pos].is_a?(NullPiece)
        false
    end

    def move_piece(start,finish)
        raise EmptyPosError if grid.is_empty?(start)
        raise InvalidMoveError if !@grid[pos].moves.include?(finish)
        @grid[finish] = @grid[start]
        @grid[start] = NullPiece.new
    end
    # white rook 1: [3,3]
    # moves: [[0,3],[1,3],[2,3],[4,3],[5,3],[6,3],[7,3]]
    # white rook 2: [5,3]


    def valid_move?(pos)
        if self[pos].is_a?(NullPiece)
            return true 
        else
            return self[pos].color
        end
    end

end

class EmptyPosError < StandardError
end

class InvalidMoveError < StandardError
end

board = Board.new
# p board.grid
rook1 = Rook.new([3,3],:white,board)
rook2 = Rook.new([5,3],:white,board)
p rook1.possible_moves
# pos = [0,0]
# puts "color: #{board[pos].color}"