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

# For this part of the project you'll be be asking yourself:
# TO QUERY OR NOT TO QUERY? 

# For that is the question!
# For each of the following problems you will try to write each
# problem WITH and WITHOUT subqueries, testing the efficiency
# of each query as you go. 

def frey_example
  # Find all the cats that are the same color as the cat named 'Freyja'.
  # Including 'Freyja' in the results.
  # DO NOT USE A SUBQUERY

  execute(<<-SQL)
    SELECT
      color_cats.name
    FROM
      cats AS freyja_cats
    JOIN
      cats AS color_cats ON freyja_cats.color = color_cats.color
    WHERE
      freyja_cats.name = 'Freyja'; 
  SQL
end

def frey_example_sub
  # Find all the cats that are the same color as the cat named 'Freyja'.
  # Including 'Freyja' in the results.

  # Using Explain you can see these queries are very similiar! Since our 
  # subquery is only performed on one table it is more efficient to use a subquery 
  # in this scenario instead of building the larger table.
  execute(<<-SQL)
    SELECT
      cats.name
    FROM
      cats
    WHERE
      cats.color = (
                    SELECT  
                      cats.color
                    FROM
                      cats
                    WHERE
                      name = 'Freyja'
                    );
  SQL
end

def harder_example
  # Find the toys and price for all the cats with the 
  # breed 'British Shorthair'.
  # Order alphabetically by toys name. 
  # DO NOT USE A SUBQUERY

  # Whereas in this query it is more efficient to not perform a subquery 
  # because we don't have to do the extra cost of a large subquery.
  execute(<<-SQL)
    SELECT
      toys.name, toys.price
    FROM
      cats
    JOIN
      cattoys ON cats.id = cattoys.cat_id
    JOIN
      toys ON toys.id = cattoys.toy_id
    WHERE
      cats.breed = 'British Shorthair'
    ORDER BY
      toys.name ASC;
  SQL
end

def harder_example_sub
  # Find the toys and price for all the cats with the 
  # breed 'British Shorthair'.
  # Order alphabetically by toys name. 

  # USE A SUBQUERY
  execute(<<-SQL)
    SELECT
      toys.name, toys.price
    FROM
      toys
    WHERE 
      toys.id IN (SELECT
                    toys.id
                  FROM 
                    toys
                  JOIN 
                    cattoys ON toys.id = cattoys.toy_id
                  JOIN 
                    cats ON cats.id = cattoys.cat_id
                  WHERE
                    cats.breed = 'British Shorthair')
    ORDER BY
      toys.name ASC;
  SQL
end


def no_apples_for_blair
  # Blair has was too many apple toys! Find the name of all the cats that
  # own toys named `Apple` that aren't `Blair`. 
  # Order by cat name alphabetically.

  # DO NOT USE A SUBQUERY
  execute(<<-SQL)
  SELECT
    cats.name
  FROM
    toys
  JOIN 
    cattoys ON toys.id = cattoys.toy_id
  JOIN 
    cats ON cats.id = cattoys.cat_id
  WHERE
    toys.name = 'Apple' AND cats.name != 'Blair'
  ORDER BY
    cats.name;
  SQL
end


def no_apples_for_blair_sub
  # Blair has was too many apple toys! Find the name of all the cats that
  # own toys named `Apple` that aren't `Blair`. 
  # Order by cat name alphabetically.

  # USE A SUBQUERY
  execute(<<-SQL)
  SELECT
      cats.name
  FROM
    toys
  JOIN
    cattoys ON toys.id = cattoys.toy_id 
  JOIN
    cats ON cats.id= cattoys.cat_id 
  WHERE
      cats.name != 'Blair' AND toys.id IN ( 
      SELECT 
        toys.id 
      FROM 
        toys
      WHERE 
        toys.name = 'Apple'
      )
  ORDER BY
    cats.name;

  SQL
end


def toys_that_brendon_owns
  # List the all the toy names for all the cats named 'Brendon'.
  # Order alphabetically by toy name. 

  # DO NOT USE A SUBQUERY
  execute(<<-SQL)
  SELECT
    toys.name
  FROM
    toys
  JOIN
    cattoys ON toys.id = cattoys.toy_id 
  JOIN
    cats ON cats.id= cattoys.cat_id 
  WHERE
    cats.name = 'Brendon'
  ORDER BY
    toys.name;
  SQL
end

def toys_that_brendon_owns_sub
  # List the all the toy names for all the cats named 'Brendon'.
  # Order alphabetically by toy name. 

  # USE A SUBQUERY
  execute(<<-SQL)
  select 
    toys.name 
  from 
    cats 
  join cattoys on cats.id = cattoys.cat_id
  join toys on  cattoys.toy_id = toys.id
  where 
    cats.id IN (
      select 
        cats.id 
      from 
        cats
      where 
        name = 'Brendon'
    )
  
  order by 
    toys.name ASC;

  SQL
end

def price_like_shiny_mouse
  # There are multiple 'Shiny Mouse' toys that all have different prices.
  # Your goal is to list all names and prices of the toys with the same prices 
  # as the different 'Shiny Mouse' toys. 

  # Exclude the 'Shiny Mouse' toy from your results.
  # Order your alphabetically by toy name.

  # DO NOT USE A SUBQUERY
  execute(<<-SQL) 
  SELECT
    t1.name, t1.price
  FROM
    toys t1
  JOIN
    toys t2 ON t1.price = t2.price
  WHERE
    t1.name != 'Shiny Mouse' AND t2.name = 'Shiny Mouse';
  SQL
end

def price_like_shiny_mouse_sub
  # There are multiple 'Shiny Mouse' toys that all have different prices.
  # Your goal is to list all names and prices of the toys with the same prices 
  # as the different 'Shiny Mouse' toys. 

  # Exclude the 'Shiny Mouse' toy from your results.
  # Order your alphabetically by toy name.

  # USE A SUBQUERY
  execute(<<-SQL) 
  select 
    toys.name, toys.price 
  from 
    toys 
  where 
    toys.name != 'Shiny Mouse' and toys.price in (
      select 
        toys.price
      from 
        toys
      where 
        toys.name = 'Shiny Mouse'
    )
  order by 
    toys.name;

  SQL
end

def just_like_orange
  # Find the breed of the cat named 'Orange'. 
  # Then list the cats names and the breed of all the cats of Orange's breed.
  # Exclude the cat named 'Orange' from your results.
  # Order by cats name alphabetically.

  # DO NOT USE A SUBQUERY
  execute(<<-SQL)
  SELECT
    c1.name, c1.breed
  FROM
    cats c1
  JOIN
    cats c2 ON c1.breed = c2.breed
  WHERE
    c1.name != 'Orange' AND c2.name = 'Orange'
  ORDER BY
    c1.name;
  SQL
end

def just_like_orange_sub
  # Find the breed of the cat named 'Orange'. 
  # Then list the cats names and the breed of all the cats of Orange's  breed.
  # Exclude the cat named 'Orange' from your results.
  # Order by cats name alphabetically.

  # USE A SUBQUERY
  execute(<<-SQL)
  select 
    name, breed
  from 
    cats
  where 
    cats.name != 'Orange' and cats.breed in (
      select 
        cats.breed 
      from cats
      where 
        cats.name = 'Orange'
    )
  order by 
    cats.name;

  SQL
end



def toys_that_jet_owns
  # Find all of the toys that Jet owns. Then list the the names of all 
  # the other cats that own those toys as well as the toys names.
  # Exclude Jet from the results.
  # Order alphabetically by cat name. 

  # DO NOT USE A SUBQUERY
  execute(<<-SQL)
  SELECT
    DISTINCT c2.name, toys.name
  FROM
    toys
  JOIN
    cattoys jettoys ON toys.id = jettoys.toy_id 
  JOIN
    cats c1 ON c1.id= jettoys.cat_id 
  JOIN
    cattoys jettoys2 on toys.id = jettoys2.toy_id 
  Join
    cats c2 ON c2.id = jettoys2.cat_id     
  WHERE
    c1.name = 'Jet' and c2.name != 'Jet'
  ORDER BY 
    c2.name;
  SQL
end

def toys_that_jet_owns_sub
  # Find all of the toys that Jet owns. Then list the the names of all 
  # the other cats that own those toys as well as the toys names.
  # Exclude Jet from the results.
  # Order alphabetically by cat name. 

  # USE A SUBQUERY
  execute(<<-SQL)
  select 
    cats.name, toys.name
  from 
    toys
  join 
    cattoys on toys.id = cattoys.toy_id 
  join 
    cats on cats.id = cattoys.cat_id 
  where 
    cats.name != 'Jet' and toys.id in (
      select 
        toys.id 
      from 
        toys 
      join cattoys on toys.id = cattoys.toy_id 
      join cats on cats.id = cattoys.cat_id
      where 
        cats.name = 'Jet'
    )
  order by 
    cats.name;
  SQL
end