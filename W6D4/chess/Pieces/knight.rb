require_relative "../stepable"
require_relative "piece"

class Knight < Piece
    
    include Stepable

    attr_accessor :move_dirs

    def initialize(pos,color,board)
        super(pos,color,board)
        @move_dirs = ["knight"]
        @symbol = :N
    end

end