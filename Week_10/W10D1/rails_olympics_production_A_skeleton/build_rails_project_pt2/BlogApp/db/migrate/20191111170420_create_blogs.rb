class CreateBlogs < ActiveRecord::Migration[5.2]
  def change
    create_table :blogs do |t|
      t.string :title, null: false
      t.string :body, null: false
      t.integer :author_id, null: false, unique: true, index: true
      t.timestamps
    end
  end
end
