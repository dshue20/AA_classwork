# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

users = User.create([{ username: 'derek' }, { username: 'yenisbel' }])
artworks = Artwork.create([{ title: 'derek\'s painting', image_url: 'derek.com', artist_id: users.first.id }, { title: 'yenisbel\'s painting', image_url: 'yenisbel.com', artist_id: users.last.id}])
artwork_shares = ArtworkShare.create([{ artwork_id: users.first.id, viewer_id: users.first.id }, { artwork_id: users.last.id, viewer_id: users.last.id }])