require_relative 'tic_tac_toe_node'
require "byebug"
class SuperComputerPlayer < ComputerPlayer
  def move(game, mark)
    node = TicTacToeNode.new(game.board,mark)
    # return winning node
    node.children.each do |child|
      #other_mark = (mark == :x) ? :o : :x
      return child.prev_move_pos if child.winning_node?(mark)
    end
    # return not losing node
    node.children.each do |child|
      return child.prev_move_pos if !child.losing_node?(mark)
    end
    raise 'something went wrong'
  end
end

if __FILE__ == $PROGRAM_NAME
  puts "Play the brilliant computer!"
  hp = HumanPlayer.new("Jeff")
  cp = SuperComputerPlayer.new

  TicTacToe.new(hp, cp).run
end
