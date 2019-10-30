class CreateQuestion < ActiveRecord::Migration[5.1]
  def change
    create_table :questions do |t|
      t.string :text
      t.integer :poll_id, presence: true, uniqueness: true, index: true
      t.timestamps
    end
  end
end
