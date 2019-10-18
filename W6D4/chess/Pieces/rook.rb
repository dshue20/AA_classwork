require_relative "../slideable"
require_relative "piece"

class Rook < Piece

    include Slideable
    
    attr_accessor :move_dirs

    def initialize(pos,color,board)
        super(pos,color,board)
        @move_dirs = ["h/v"]
        @symbol = :R
    end

end