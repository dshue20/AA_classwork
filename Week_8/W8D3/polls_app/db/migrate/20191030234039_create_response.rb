class CreateResponse < ActiveRecord::Migration[5.1]
  def change
    create_table :responses do |t|
      t.integer :user_id, presence: true, uniqueness: true, index: true
      t.integer :answer_id, presence: true, uniqueness: true, index: true
      t.timestamps
    end
  end
end
