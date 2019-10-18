require_relative "../slideable"
require_relative "piece"

class Queen < Piece

    include Slideable
    
    attr_accessor :move_dirs

    def initialize(pos,color,board)
        super(pos,color,board)
        @move_dirs = ["diagonal","h/v"]
        @symbol = :Q
    end

end