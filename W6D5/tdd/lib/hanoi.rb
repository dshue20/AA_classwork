class Hanoi
  attr_accessor :board

    def initialize
        @board = Array.new(3) { [] }
        @board[0] = [7, 6, 5, 4, 3, 2, 1]
    end

    def move(peg1,peg2)
      unless @board[peg1].last.nil? 
        if @board[peg2].first.nil? || (@board[peg1].last < @board[peg2].first)
          @board[peg2] << @board[peg1].pop
        else
          puts "Sorry, gotta be less than."
        end
      end
    end

    def won?
      @board[1..-1].each do |peg|
        if peg == peg.sort.reverse && peg.length == 7
          p 'You won!'
          return true 
        end
      end
      false
    end

    def valid_move?(input)
      arr = input.split(',')
      if arr.length == 2
        return true if arr[0].to_i.between?(1,3) && arr[1].to_i.between?(1,3)
      end
      false
    end

    def take_turn
      print 'Input your starting peg and ending peg (e.g. 1,3): '
      input = gets.chomp
      if valid_move?(input)
        input = input.split(',')
        move(input[0].to_i-1, input[1].to_i-1)
      else
        p 'Invalid move'
      end
    end

    def display
      7.times do |idx|
        left = @board[0][(6 - idx)]
        mid = @board[1][(6 - idx)]
        right = @board[2][(6 - idx)]
        left ||= " "
        mid ||= " "
        right ||= " "
        puts "#{left} | #{mid} | #{right}"
      end
    end

end

game = Hanoi.new

until game.won?
  game.display
  game.take_turn
end