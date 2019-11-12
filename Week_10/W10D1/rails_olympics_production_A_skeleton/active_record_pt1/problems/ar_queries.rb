# == Schema Information
#
# Table name: actors
#
#  id          :integer      not null, primary key
#  name        :string
#
# Table name: movies
#
#  id          :integer      not null, primary key
#  title       :string
#  yr          :integer
#  score       :float
#  votes       :integer
#  director_id :integer
#
# Table name: castings
#  id          :integer      not null, primary key
#  movie_id    :integer      not null
#  actor_id    :integer      not null
#  ord         :integer

# IMPORTANT:
# For all of the following problems return an ActiveRecord::Association unless
# otherwise specified. 

def to_lead_or_not_to_lead
  # Find the id and ord of the casting where the movie_id is `612`
  # and the actor_id is `703`
  Casting
    .select(:id, :ord)
    .where("movie_id = 612")
    .where("actor_id = 703")
end

def highest_score
  # Find the id and title of movies with scores higher than 8.9
  Movie
    .select(:id, :title)
    .where("score > 8.9")
end

def star_wars_movies
  # Find the id, title and year of each of the "Star Wars" movies
  Movie
    .select(:id, :title, :yr)
    .where("title LIKE 'Star Wars%'")
end

def wesley_movies
  # Find the id, title, and score of all the movies the actor "Wesley Snipes"
  # was in.
  Movie
    .select(:id, :title, :score)
    .joins(:actors)
    .where("name = 'Wesley Snipes'")
end

def michelle_movies
  # Find the id, title, and year of movies Michelle Pfeiffer has acted in.
  # Order them in descending order by score.
  Movie
    .select(:id, :title, :yr)
    .joins(:actors)
    .where("name = 'Michelle Pfeiffer'")
    .order("score DESC")
end

def actor_ids_from_grease
  # Return an array (NOT an ActiveRecord:Association) of the `ids` of 
  # all the actors that were in the movie "Grease"
  Actor
    .joins(:movies)
    .where("movies.title = 'Grease'")
    .pluck(:id)
end

def susan_supporting_roles
  # Find the id and title of all movies in which Susan Sarandon
  # appeared but not as a lead actor.

  # Reminder: In the castings table the lead actor for a movie will
  # have an ord = 1 
  Movie
    .select(:id, :title)
    .distinct
    .joins(:actors, :castings)
    .where("actors.name = 'Susan Sarandon'")
    .where("castings.ord != 1")
end

def best_years
  # Return an array of the years (NOT an ActiveRecord:Association) 
  # in which every movie released had a minimum rating of 8 or above.
  Movie
    .group(:yr)
    .having("MIN(score) >= 8")
    .pluck(:yr)
end

def smallest_cast
  # Find the id and title of the 3 movies with the
  # smallest casts (i.e least amount of actors)
  Movie
    .select(:id,:title)
    .joins(:castings)
    .group(:id)
    .order("COUNT(*)")
    .limit(3)
end


def not_too_good
  # Below we've provided a SQL statement:
  # SELECT  movies.id, movies.title
  # FROM "movies"
  # INNER JOIN "castings" ON "castings"."movie_id" = "movies"."id"
  # INNER JOIN "actors" ON "actors"."id" = "castings"."actor_id"
  # WHERE (director_id = actors.id) AND (NOT (castings.ord = 1))
  # ORDER BY movies.score ASC
  # LIMIT 5

  # Below write an Active Record method that will return the same results
  # as the above SQL query.
  Movie
    .select(:id, :title)
    .joins(:castings)
    .joins(:actors)
    .where("director_id = actors.id")
    .where("castings.ord != 1")
    .group(:id)
    .order(:score)
    .limit(5)
end
