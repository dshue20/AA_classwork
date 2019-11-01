require_relative 'db_connection'
require 'active_support/inflector'
# NB: the attr_accessor we wrote in phase 0 is NOT used in the rest
# of this project. It was only a warm up.

class SQLObject
  def self.columns
    return @columns if @columns
    @columns = DBConnection.execute2(<<-SQL)
      SELECT
        *
      FROM
        #{self.table_name}
    SQL
    @columns = @columns.first.map!(&:to_sym)
    #@columns = columns.first
  end

  def self.finalize!
    columns.each do |column|
      define_method(column) do 
        self.attributes[column]
      end

      define_method("#{column}=") {|val| self.attributes[column] = val}
    end
  end

  def self.table_name=(table_name)
    @table_name = table_name
  end

  def self.table_name
    @table_name || "#{self}".tableize
  end

  def self.all
    results = DBConnection.execute(<<-SQL)
      SELECT
        *
      FROM
        #{self.table_name}
    SQL
    parse_all(results)
  end

  def self.parse_all(results)
    results.map { |result| self.new(result) }
  end

  def self.find(id)
    results = DBConnection.execute(<<-SQL, id)
      SELECT
        *
      FROM
        #{self.table_name}
      WHERE
        id = ?
    SQL
    parsed = parse_all(results)
    return nil if parsed.empty?
    parsed[0]
    # parsed:   [<Cat:0x00007ffce412c8a0 @attributes={:id=>1, :name=>"Breakfast", :owner_id=>1}>]
    # expected: [<Cat:0x00007ffce412c8a0 @attributes={:id=>1, :name=>"Breakfast", :owner_id=>1}>]
  end

  def initialize(params = {})
    params.each do |name, val|
      name = name.to_sym
      raise "unknown attribute '#{name}'" if !self.class.columns.include?(name)
      self.send("#{name}=", val)
    end
  end

  def attributes
    @attributes ||= {}
  end

  def attribute_values
    self.class.columns.map {|column| self.send(column)}
  end

  def insert
    columns = self.class.columns.drop(1)
    col_names = columns.map(&:to_s).join(', ')
    question_marks = (["?"] * columns.length).join(', ')
    DBConnection.execute(<<-SQL, *attribute_values.drop(1))
    INSERT INTO
      #{self.class.table_name} (#{col_names})
    VALUES
      (#{question_marks})
    SQL
    self.id = DBConnection.last_insert_row_id
  end

  def update
    question_marks = self.class.columns.map {|attr_name| "#{attr_name} = ?"}.join(', ')
    DBConnection.execute(<<-SQL, *attribute_values, id)
      UPDATE
        #{self.class.table_name}
      SET
        #{question_marks}
      WHERE
        #{self.class.table_name}.id = ?
    SQL
  end

  def save
    id.nil? ? insert : update
  end
end
