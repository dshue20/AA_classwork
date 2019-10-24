require 'rspec'
require 'hanoi'

describe "Hanoi" do
    subject(:hanoi) { Hanoi.new }

    describe "Hanoi#initialize" do

    it "should set @board to an array of three elements (all arrays)" do
      expect(hanoi.board).to be_a(Array)
      expect(hanoi.board.length).to eq(3)
      hanoi.board.each do |stack|
        expect(stack).to be_a(Array)
      end
    end

    it "should set @board[0] to be an array of numbers in descending order (idx[0] is max)" do
      expect(hanoi.board[0]).to match_array(hanoi.board[0].sort.reverse)
    end
    
    
  end

  describe "Hanoi#move" do
    it "correctly moves from one peg (array) to another" do
        hanoi.move(0,1)
        expect(hanoi.board[0]).to_not include(1)
        expect(hanoi.board[1]).to match_array([1])
    end

    it "doesn't move a bigger piece onto a smaller piece" do
      hanoi.board = [[7,6,5,4,3,2],[1],[]]
      hanoi.move(0, 1)
      expect(hanoi.board[0]).to include(2)
      expect(hanoi.board[1]).to_not include(2)
    end
  end

  describe "Hanoi#won?" do
    it "checks if a peg that is not peg0 is in order and has 7 elements" do
        expect(hanoi.won?).to eq(false)
        hanoi.board = [[], [7, 6, 5, 4, 3, 2, 1], []]
        expect(hanoi.won?).to eq(true)
    end
  end

  describe "Hanoi#valid_move?" do
    it "determines whether the user-input move is valid" do
        expect(hanoi.valid_move?("string")).to eq(false)
        expect(hanoi.valid_move?("1,3")).to eq(true)
        expect(hanoi.valid_move?("1, 3")).to eq(true)
        expect(hanoi.valid_move?("1,5")).to eq(false)
    end
  end
end