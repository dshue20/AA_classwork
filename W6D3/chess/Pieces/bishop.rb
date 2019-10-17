require_relative "../slideable"
require_relative "piece"

class Bishop < Piece
    
    include Slideable

    attr_accessor :move_dirs

    def initialize(pos)
        super(pos,color,board)
        @move_dirs = ["diagonal"]
    end

end

bishop = Bishop.new([3,3])
#p bishop.valid_move?([2,2])
