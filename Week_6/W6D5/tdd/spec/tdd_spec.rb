require 'rspec'
require 'tdd'
require 'hanoi'

describe "#my_uniq" do
  
  let(:an_array) { [1, 2, 1, 3, 3] }
  
  it "accepts an array" do
    expect {my_uniq(an_array)}.to_not raise_error
  end

  it "returns an array without duplicates" do
    expect(my_uniq(an_array)).to match_array([1, 2, 3])
  end

  it "shouldn't mutate the original array" do
    expect(my_uniq(an_array)).to_not be(an_array)
  end
end

describe "Array#two_sum" do

    it "returns an array of summed pairs to 0" do
      arr = [-1, 0, 2, -2, 1]
      return_val = arr.two_sum
      return_val.each do |pair|
        expect(arr[pair[0]] + arr[pair[1]]).to eq(0)
      end
    end

    it "returns an array that has pairs sorted smaller index before bigger index" do
      arr = [-2, 7, 3, -7, 4, -1, 5, 1]

      return_val = arr.two_sum
      return_val.each do |pair|
        expect(pair).to match_array(pair.sort)
      end
    end

    it "returns an array that is sorted dictionary-wise" do
        arr = [-2, 7, 3, -7, 4, -1, 5, 1]

        expect(arr.two_sum).to match_array(arr.two_sum.sort)
    end
end

describe "#my_transpose" do

  it "accepts only a square matrix" do
    matrix = [[0, 1, 2],[3, 4, 5],[6, 7, 8, 9]]
    expect { my_transpose(matrix) }.to raise_error(NotSquareMatrix)

    matrix = [[0, 1, 2],[3, 4, 5],[6, 7, 8]]
    expect { my_transpose(matrix) }.to_not raise_error
  end

  it "should transpose rows to columns" do
    matrix = [[0, 1, 2],[3, 4, 5],[6, 7, 8]]
    expect(my_transpose(matrix)).to match_array([[0, 3, 6], [1, 4, 7], [2, 5, 8]])
  end

end

describe "#stock_picker" do
    subject(:stocks) {Array.new(100) {rand(0.0..100.0).round(2)}}
    let(:set_stocks) { [5,4,3,2,1,10,0] }

    it "accepts an array of numbers" do
        expect { stock_picker(stocks) }.to_not raise_error
        expect { stock_picker(["a", 1]) } .to raise_error(NotNumberError)
        expect { stock_picker(20) } .to raise_error(NotArrayError)
    end

    it "returns an array of two integers (days/indices)" do
        expect(stock_picker(stocks).length).to eq(2)
    end

    it "returns the most profitable chronological pair of days to buy and sell stock" do
        expect(stock_picker(set_stocks)).to match_array([4,5])
    end
end