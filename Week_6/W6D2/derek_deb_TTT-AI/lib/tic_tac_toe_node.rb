require_relative 'tic_tac_toe'
require 'byebug'
class TicTacToeNode

  attr_reader :board, :next_mover_mark, :prev_move_pos

  def initialize(board, next_mover_mark, prev_move_pos = nil)
    @board = board
    @next_mover_mark = next_mover_mark
    @prev_move_pos = prev_move_pos
  end

  def losing_node?(mark) 
    # return true if board.over? && board.winner != mark
    # return false if board.over? && (board.winner == mark || board.winner == nil)
    if board.over? 
      return board.won? && board.winner != mark
    end
    if mark == @next_mover_mark
      children.all? {|child| child.losing_node?(mark)}
    else
      children.any? {|child| child.losing_node?(mark)}
    end

  end

  def winning_node?(mark)
    return board.won? && board.winner == mark if board.over?
    if mark == @next_mover_mark
      children.any? {|child| child.winning_node?(mark)}
    else
      children.all? {|child| child.winning_node?(mark)}
    end
  end

  # This method generates an array of all moves that can be made after
  # the current move.
  def children
    nodes = []
    (0..2).each do |row|
      (0..2).each do |col|
        pos = [row, col]
        if board.empty?(pos)
          duped = board.dup 
          duped[pos] = @next_mover_mark
          mark = (@next_mover_mark == :x) ? :o : :x
          node = TicTacToeNode.new(duped,mark,pos)
          nodes << node
        end
      end
    end
    nodes
  end
end