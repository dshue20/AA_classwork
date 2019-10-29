class CreateShortenedUrLs < ActiveRecord::Migration[5.1]
  def change
    create_table :shortened_urls do |t|
      t.string :long_url, unique: true
      t.string :short_url, unique: true
      t.integer :user_id, unique: true, index: true
    end
  end
end
