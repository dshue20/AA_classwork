# == Schema Information
#
# Table name: cats
#
#  id          :integer      not null, primary key
#  name        :string
#  color       :string
#  breed       :string
#
# Table name: toys
#
#  id          :integer      not null, primary key
#  name        :string
#  color       :string
#  price       :integer
#
# Table name: cattoys
#
#  id          :integer      not null, primary key
#  cat_id      :integer      not null, foriegn key
#  toy_id      :integer      not null, foreign key

require_relative '../data/query_tuning_setup.rb'

# Run the specs and make sure to make the query plans for the following 
# questions as efficient as possible.

# Experiment with adding and dropping indexes, and using subqueries vs. other 
# methods to see which are more efficient.

def example_find_jet
# Find the breed and color for the cat named 'Jet'.

# Get cost within the range of: 4..15

#  CREATE INDEX cats_name ON cats(name)

execute(<<-SQL)
  SELECT
    cats.name
  FROM
    cats
  WHERE 
    cats.name = 'Jet'
  SQL
end


def cats_and_toys_alike
  # Find all the cat names where the cat and the toy they own are both the color 'Blue'.

  # Order alphabetically by cat name
  # Get your overall cost lower than: 590
  execute(<<-SQL)
  EXPLAIN SELECT
    DISTINCT cats.name
  FROM
    cats
  JOIN
    cattoys ON cats.id = cattoys.cat_id
  JOIN
    toys ON cattoys.toy_id = toys.id
  WHERE
    cats.color = 'Blue' AND toys.color = 'Blue'
  ORDER BY
    cats.name;
  SQL
end
# CREATE INDEX cat_color ON cats(color);
# p cats_and_toys_alike

def toyless_blue_cats
  # Use a type of JOIN that will list the names of all the cats that are 'Navy Blue' and have no toys. 

  # Get your overall cost lower than: 95
  execute(<<-SQL)
  EXPLAIN SELECT
    cats.name
  FROM
    cats
  LEFT OUTER JOIN
    cattoys ON cats.id = cattoys.cat_id
  WHERE
    cats.color = 'Navy Blue' AND cattoys.toy_id IS NULL;
  SQL
end
p toyless_blue_cats

def find_unknown
  # Find all the toys names that belong to the cat who's breed is 'Unknown'.

  # Order alphabetically by toy name

  # Get your overall cost lower than: 406
  execute(<<-SQL)
  select 
    toys.name 
  from 
    cats
  join 
    cattoys on cattoys.cat_id = cats.id
  join 
    toys on cattoys.toy_id = toys.id
  where 
    cats.breed = 'Unknown'
  order by 
    toys.name ASC;
  SQL
end

def cats_like_johnson
  # Find the breed of the 'Lavender' colored cat named 'Johnson'. 
  # Then find all the name of the other cats that belong to that breed. 
  # Include the original Lavendar colored cat name Johnson in your results.

  # Order alphabetically by cat name

  # Get your overall cost lower than: 100
  execute(<<-SQL)

  SQL
end


def cheap_toys_and_their_cats
  # Find the cheapest toy. Then list the name of all the cats that own that toy.

  # Order alphabetically by cats name
  # Get your overall cost lower than: 230
  execute(<<-SQL)
  select 
    cats.name
  from 
    toys
  join 
    cattoys on cattoys.toy_id = toys.id
  join 
    cats on cats.id = cattoys.cat_id 
  where 
    toys.id in (
      select 
        toys.id 
      from 
        toys 
      order by 
        toys.price ASC
      limit 1
    )
  order by 
    cats.name;
  SQL
end

def cats_with_a_lot
  # Find the names of all cats with more than 7 toys.
  
  # Order alphabetically by cat name
  # Get your overall cost lower than: 1200
  execute(<<-SQL)

  SQL
end


def expensive_tastes
  # Find the most expensive toy then list the toys's name, toy's color, and the name of each cat that owns that toy.

  # Order alphabetically by cat name
  # Get your overall cost lower than: 720
  execute(<<-SQL)
  
  select 
    cats.name, toys.name, toys.color
  from 
    toys
  join cattoys on cattoys.toy_id = toys.id 
  join cats on cattoys.cat_id = cats.id 
  where toys.price = (
    select 
      toys.price 
    from 
      toys 
    group by 
      toys.price
    order by 
      toys.price DESC
    limit 1
      
  )
  order by 
    cats.name;

  SQL
end


def five_cheap_toys
  # Find the name and prices for the five cheapest toys.

  # Order alphabetically by toy name.
  # Get your overall cost lower than: 425
  execute(<<-SQL)


  SQL
end

def top_cat
  # Finds the name of the single cat who has the most toys and the number of toys.

  # Get your overall cost lower than: 1050
  execute(<<-SQL)
  select 
    cats.name, count(toys.name) as num_of_toys
  from 
    cats 
  join cattoys on cattoys.cat_id = cats.id
  join toys on cattoys.toy_id = toys.id 
  group by 
    cats.name 
  order by 
    count(toys.name) desc
  limit 
    1;

  SQL
end


