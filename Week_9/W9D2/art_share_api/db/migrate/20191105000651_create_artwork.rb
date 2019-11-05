class CreateArtwork < ActiveRecord::Migration[6.0]
  def change
    create_table :artworks do |t|
      t.string :title, presence: true, unique: true
      t.string :image_url, presence: true
      t.integer :artist_id, presence: true, unique: true, index: true
      t.timestamps
    end
  end
end
