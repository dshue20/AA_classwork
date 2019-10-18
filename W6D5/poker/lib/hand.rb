class Hand
  attr_reader :type, :high_card, :highest_important_card
  attr_accessor :cards

  def initialize(cards)
    @cards = cards
    #@type = determine_type
    @values = {
      'A' => 14, 'K' => 13, 'Q' => 12, 'J' => 11,
      '10' => 10, '9' => 9, '8' => 8, '7' => 7,
      '6' => 6, '5' => 5, '4' => 4, '3' => 3, '2' => 2
    }
    @card_values = @cards.map { |card| @values[card.value.upcase] }
    @high_card = determine_high
    @highest_important_card = 0
  end

  def determine_high
    return @values.key(@card_values.max)
  end

  def compare_hands(*hands) # array of hand_instances
    hand_values = {
      "royal flush":10,
      "straight flush":9,
      "four of a kind":8,
      "full house":7,
      "flush":6,
      "straight":5,
      "three of a kind":4,
      "two pair":3,
      "pair":2,
      "high card":1
    }
    p hands
    hands << self
    
    hand_vals = hands.map { |hand| hand_values[hand.determine_type] }
    p hand_vals
    return hand_values.key(hand_vals.max) if hand_vals.count(hand_vals.max) == 1
    best_hands = hands.map { |hand| hand if hand_values[hand.determine_type] == hand_vals.max}

    winning_hand = [nil, 0]
    for hand in best_hands
      #p "HEY HERE #{hand}"
      if hand.highest_important_card > winning_hand[1]
        winning_hand = [hand, hand.highest_important_card]
      end
    end
    return winning_hand[0]
  end

  def determine_type
    return "royal flush" if @highest_important_card = royal_flush?
    return "straight flush" if @highest_important_card = straight_flush?
    return "four of a kind" if @highest_important_card = four_kind?
    return "full house" if @highest_important_card = full_house?
    return "flush" if @highest_important_card = flush?
    return "straight" if @highest_important_card = straight?
    return "three of a kind" if @highest_important_card = three_kind?
    return "two pair" if @highest_important_card = two_pair?
    return "pair" if @highest_important_card = pair?
    return "high card"
  end

  def pair?(hand_vals = @card_values)
    hand_vals.each do |card|
        return card if hand_vals.count(card) > 1
    end
    false
  end

  def two_pair?(hand_vals = @card_values)
    arr = []
    hand_vals.each do |card|
        arr << card if hand_vals.count(card) > 1 && not(arr.include?(card))
    end
    return [arr.min, arr.max] if arr.length > 1
    false
  end

  def three_kind?(hand_vals = @card_values)
    if pair?
        card = pair?
        return card if hand_vals.count(card) > 2 
    end
    false
  end

  def straight?(hand_vals = @card_values)
    sorted = hand_vals.sort
    (0..3).each do |idx|
        return false if sorted[idx] != sorted[idx+1] - 1
    end
    sorted[-1]
  end

  def flush?(hand_vals = @card_values)
    return hand_vals.max if @cards.all? {|card| card.suit == @cards[0].suit }
    false
  end

  def full_house?(hand_vals = @card_values)
    if hand_vals.uniq.length == 2
      three = hand_vals.map{ |card| card if hand_vals.count(card) == 3 }.compact
      return three[0] 
    end
    false
  end

  def four_kind?(hand_vals = @card_values)
    if pair?
        card = pair?
        return card if hand_vals.count(card) > 3
    end
    false
  end

  def straight_flush?(hand_vals = @card_values)
    return hand_vals.max if straight? && flush?
  end

  def royal_flush?(hand_vals = @card_values)
    return 14 if straight_flush? && hand_vals.sort[0] == 10
    false
  end

end