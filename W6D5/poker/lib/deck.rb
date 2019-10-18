require_relative "card"

class Deck
  attr_accessor :cards

    def initialize
        @cards = make_deck
    end
    
    def make_deck
      arr = []
      values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
      suits = ["d", "c", "s", "h"]
      for suit in suits
        for val in values
          arr << Card.new(val, suit)
        end
      end
      arr
    end

    def deal_hand
      hand = []
      5.times do |i|
        @cards.shuffle
        hand << @cards.pop
      end
      hand
    end

end