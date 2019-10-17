class Piece

    attr_reader :color, :board
    attr_accessor :pos, :moves
    
    def initialize(pos,color,board)
        @pos = pos
        @moves = []
        @color = color
        @board = board
    end

end

class NullPiece < Piece

    def initialize
    end

end