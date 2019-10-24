require_relative "board"
require_relative "cursor"
require "colorize"

class Display

    def initialize(board)
        @board = board
        @cursor = Cursor.new([0,0], board)
        # Colorize colors: [:black, :light_black, :red, :light_red, 
        # :green, :light_green, :yellow, :light_yellow, :blue, 
        # :light_blue, :magenta, :light_magenta, :cyan, :light_cyan, 
        # :white, :light_white, :default]
    end
    
    def display
        result = nil
        until !result.nil?
            system ("clear")
            print '  0 1 2 3 4 5 6 7'
            puts
            @board.grid.each_with_index do |row,idx|
                print idx.to_s + ' '
                row.each_with_index do |square,idx2|
                    if idx == 0 || idx == 1
                        if @cursor.cursor_pos == [idx,idx2]
                            print (square.symbol.to_s + ' ').colorize(:background => :yellow, :color => :black)
                        else
                            print (square.symbol.to_s + ' ').colorize(:background => :light_black, :color => :black)
                        end
                    else
                        if @cursor.cursor_pos == [idx,idx2]
                            print (square.symbol.to_s + ' ').colorize(:background => :yellow, :color => :white)
                        else
                            print (square.symbol.to_s + ' ').colorize(:background => :light_black, :color => :white)
                        end
                    end
                end
                puts
            end
            result = @cursor.get_input
        end
    end

end

# board = Board.new
# knight = Knight.new([2,5],:white,board)
# board[[2,5]] = knight
# p board[[1,0]].possible_moves
# p board[[1,0]].move_into_check?([2,0])
# disp = Display.new(board)
# disp.display