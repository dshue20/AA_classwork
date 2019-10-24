def my_uniq(an_array)
  new_array = []
  an_array.each { |val| new_array << val unless new_array.include?(val)}
  new_array
end

class Array

    def two_sum
        new_arr = []
        self.each_with_index do |val,idx|
            self.each_with_index do |val2,idx2|
              if idx2 > idx
                val = self[idx] + self[idx2]
                new_arr << [idx,idx2] if val == 0
              end
            end
        end
        new_arr
    end

end

def my_transpose(matrix)
  matrix.each do |row|
    raise NotSquareMatrix if not(row.length == matrix.length)
  end

  new_array = Array.new(matrix.length) { [] }
  matrix.each_with_index do |row, row_idx|
    row.each_with_index do |col, col_idx|
      new_array[col_idx][row_idx] = matrix[row_idx][col_idx]  
    end
  end
  new_array
end

class NotSquareMatrix < ArgumentError
end

def stock_picker(stocks)
    raise NotArrayError unless stocks.is_a?(Array)
    stocks.each {|stock| raise NotNumberError unless stock.is_a?(Float) || stock.is_a?(Integer)}
    max_difference = [0, [nil, nil]]
    stocks.each_with_index do |val,idx|
        stocks.each_with_index do |val2,idx2|
            if idx2 > idx
              result = val2 - val
                if result > max_difference[0]
                    max_difference[0] = result
                    max_difference[1] = [idx,idx2]
                end
            end
        end
    end
    max_difference[1]
end

class NotArrayError < ArgumentError
end

class NotNumberError < ArgumentError
end