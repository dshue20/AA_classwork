class CreateAnswerChoice < ActiveRecord::Migration[5.1]
  def change
    create_table :answer_choices do |t|
      t.string :text
      t.integer :question_id, presence: true, uniqueness: true, index: true
      t.timestamps
    end
  end
end
