# == Schema Information
#
# Table name: actors
#
#  id   :bigint           not null, primary key
#  name :string           not null
#

class Actor < ApplicationRecord
  has_many :castings,
    class_name: :Casting,
    foreign_key: :actor_id,
    primary_key: :id

  has_many :movies,
    through: :castings,
    source: :movie

  has_many :directed_movies,
    class_name: :Movie,
    foreign_key: :director_id,
    primary_key: :id

# N+1 PORTION OF THE EVALUATION HERE:

# Below write a method named `title_and_director_of_movie`. This method will be 
# called on an Actor model instance and will return a return a HASH (not an ActiveRecord:Relation)
# with the title of the movies this actor has been in as the key and the value being 
# the director of that movie (which can be found via the director_id column on the movies table).

# Limit your results to the first three movies alphabetically.

# Naively solving this problem will inherently create an N+1 query. Full credit
# will only be given for methods that do NOT create an N+1 query.

# Scoring: 6 points maximum
#   3 points awarded for passing all five of the examples
#   3 additional points awarded if the implementation does not suffer from N+1


# This component of the evaluation is estimated to take 10 minutes.


# Use the below examples in the rails console:
# Examples:
#  Actor.find(15).title_and_director_of_movie  => {"1941"=>"Steven Spielberg",
#                                                  "Antz"=>"Eric Darnell",
#                                                  "Blues Brothers 2000"=>"John Landis"}

#  Actor.find(215).title_and_director_of_movie => {"Accused, The"=>"Jonathan Kaplan (I)",
#                                                  "Anna and the King"=>"Andy Tennant",
#                                                  "Contact"=>"Robert Zemeckis"}

#  Actor.find(1050).title_and_director_of_movie  =>{"Hard Day's Night, A"=>"Richard Lester",
#                                                   "Help!"=>"Richard Lester"}

#  Actor.find(476).title_and_director_of_movie  => {"Airport"=>"George Seaton",
#                                                   "Charade"=>"Stanley Donen",
#                                                   "Cool Hand Luke"=>"Stuart Rosenberg (I)"}

#  Actor.find(812).title_and_director_of_movie => {"10"=>"Blake Edwards",
#                                                  "Sound of Music, The"=>"Robert Wise",
#                                                  "Victor/Victoria"=>"Blake Edwards"}

  def title_and_director_of_movie
    hash = {}
    movies = self.movies.order(:title).limit(3).includes(:director)
    movies.each do |movie|
      hash[movie.title] = movie.director
    end
    hash
  end


end
