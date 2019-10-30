class CreatePoll < ActiveRecord::Migration[5.1]
  def change
    create_table :polls do |t|
      t.string :title
      t.integer :user_id, presence: true, uniqueness: true, index: true
      t.timestamps
    end
  end
end
