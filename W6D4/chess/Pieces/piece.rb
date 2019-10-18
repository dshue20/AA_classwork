require 'singleton'
class Piece

    attr_reader :color, :board, :symbol
    attr_accessor :pos, :moves
    
    def initialize(pos,color,board)
        @pos = pos
        @moves = []
        @color = color
        @board = board
        @symbol = :S
    end


    def check_valid_move(new_pos)
        #p board.valid_move?(new_pos)
        if board.valid_move?(new_pos) == true
            moves << new_pos
            return true
        elsif board.valid_move?(new_pos) == color
            return false
        else
            moves << new_pos if symbol != :P
            return false
        end
    end

end

class NullPiece < Piece

    include Singleton

    def initialize
        @color = :null
        @symbol = '-'
    end

    def possible_moves
        moves
    end

end