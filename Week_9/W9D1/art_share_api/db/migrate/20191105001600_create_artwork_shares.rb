class CreateArtworkShares < ActiveRecord::Migration[6.0]
  def change
    create_table :artwork_shares do |t|
      t.integer :artwork_id, presence: true, index: true, unique: true
      t.integer :viewer_id, presence: true, index: true, unique: true
      t.timestamps
    end
  end
end
