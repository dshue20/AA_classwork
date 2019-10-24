require 'rspec'
require 'card'
require 'deck'
require 'hand'

describe Card do
    subject(:card) { Card.new('9','d')}
    describe "Card#initialize" do
        it "creates a face-down 9 of diamonds card" do
            expect(card.value).to eq('9')
            expect(card.suit).to eq('d')
            expect(card.face_down).to eq(true)
        end
    end

    describe "Card#face_down?" do
        it "returns whether or not the card is face-down" do
            expect(card.face_down?).to eq(true)
            card.face_down = false
            expect(card.face_down?).to eq(false)
        end
    end
end

describe Deck do
    subject(:deck) { Deck.new }
    describe "Deck#initialize" do
        it "#initialize receives make_deck" do
          expect_any_instance_of(Deck).to receive(:make_deck)
          Deck.new
        end
    end

    describe "Deck#make_deck" do
      it "returns an array of 52 cards" do
        expect(deck.make_deck.length).to eq(52)
        deck.make_deck.each do |card|
            expect(card).to be_a(Card)
        end
      end
    end

    describe "Deck#deal_hand" do
      it "returns an array of five cards" do
        expect(deck.deal_hand).to be_a(Array)
        expect(deck.deal_hand.length).to eq(5)
        deck.deal_hand.each do |card|
            expect(card).to be_a(Card)
        end
        expect(deck.deal_hand.uniq.length).to eq(5)
      end
    end
end

describe Hand do
  subject(:hand) { Hand.new(deck.deal_hand) }
  let (:high_card) { [Card.new("A", "c"), Card.new("2", "c"), Card.new("3", "d"), Card.new("7", "d"), Card.new("10", "s")] }
  let (:pair) { [Card.new("A", "d"), Card.new("A", "c"), Card.new("2", "s"), Card.new("4", "s"), Card.new("7", "h")] }
  let (:two_pair) { [Card.new("A", "d"), Card.new("A", "c"), Card.new("4", "s"), Card.new("4", "c"), Card.new("7", "h")] }
  let (:three_kind) { [Card.new("A", "d"), Card.new("J", "c"), Card.new("4", "s"), Card.new("4", "c"), Card.new("4", "h")] }
  let (:straight) { [Card.new("8", "s"), Card.new("7", "h"), Card.new("6", "s"), Card.new("4", "c"), Card.new("5", "s")] }
  let (:flush) { [Card.new("A", "c"), Card.new("2", "c"), Card.new("6", "c"), Card.new("J", "c"), Card.new("5", "c")] }
  let (:full_house) { [Card.new("A", "d"), Card.new("A", "c"), Card.new("4", "s"), Card.new("4", "c"), Card.new("4", "h")] }
  let (:four_kind) { [Card.new("A", "c"), Card.new("A", "d"), Card.new("A", "h"), Card.new("A", "s"), Card.new("5", "c")] }
  let (:straight_flush) { [Card.new("8", "s"), Card.new("7", "s"), Card.new("6", "s"), Card.new("4", "s"), Card.new("5", "s")] }
  let (:royal_flush) { [Card.new("A", "c"), Card.new("K", "c"), Card.new("Q", "c"), Card.new("J", "c"), Card.new("10", "c")] }
  
  let(:deck) { Deck.new }

  describe "Hand#initialize" do
    it "should set a hand to an array of five cards" do
      expect(hand.cards).to be_a(Array)
        expect(hand.cards.length).to eq(5)
        hand.cards.each do |card|
            expect(card).to be_a(Card)
        end
        expect(hand.cards.uniq.length).to eq(5)
    end
  end

  describe "Hand#determine_high" do
    let (:ace_high) { [Card.new("A", "d"), Card.new("Q", "c"), Card.new("2", "s"), Card.new("4", "s"), Card.new("7", "h")] }
    let (:ten_high) { [Card.new("10", "d"), Card.new("3", "c"), Card.new("2", "s"), Card.new("4", "s"), Card.new("7", "h")] }
    it "should return the highest card in the hand" do
        expect(Hand.new(ace_high).determine_high).to eq("A")
        expect(Hand.new(ten_high).determine_high).to eq("10")
    end
  end

  describe "Hand#determine_type" do
    it "returns the type of the hand" do
      expect(Hand.new(high_card).determine_type).to eq("high card")
      expect(Hand.new(pair).determine_type).to eq("pair")
      expect(Hand.new(two_pair).determine_type).to eq("two pair")
      expect(Hand.new(three_kind).determine_type).to eq("three of a kind")
      expect(Hand.new(straight).determine_type).to eq("straight")
      expect(Hand.new(flush).determine_type).to eq("flush")
      expect(Hand.new(full_house).determine_type).to eq("full house")
      expect(Hand.new(four_kind).determine_type).to eq("four of a kind")
      expect(Hand.new(straight_flush).determine_type).to eq("straight flush")
      expect(Hand.new(royal_flush).determine_type).to eq("royal flush")
   end
  end

  describe "Hand#compare_hands" do
    let (:alt_high_card) { [Card.new("K", "c"), Card.new("2", "c"), Card.new("3", "d"), Card.new("7", "d"), Card.new("10", "s")] }
  
    it "should return the winning hand" do
      expect(Hand.new(high_card).compare_hands(Hand.new(alt_high_card))).to eq(Hand.new(high_card))
      #expect()
    end
  end

end