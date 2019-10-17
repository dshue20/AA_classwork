require_relative "../slideable"
require_relative "piece"

class Queen < Piece

    include Slideable
    
    attr_accessor :move_dirs

    def initialize(pos)
        super(pos,color,board)
        @move_dirs = ["diagonal","h/v"]
    end

end

queen = Queen.new([3,3])
p queen.moves