class CreateComments < ActiveRecord::Migration[6.0]
  def change
    create_table :comments do |t|
      t.string :body, presence: true
      t.integer :user_id, presence: true, uniqueness: true, index: true
      t.integer :artwork_id, presence: true, uniqueness: true, index: true
      t.timestamps
    end
  end
end
