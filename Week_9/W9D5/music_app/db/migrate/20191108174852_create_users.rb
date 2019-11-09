class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :email, nulL: false, unique: true
      t.string :password_digest, null: false 
      t.string :session_token, null: false, unique: true, index: true
      t.timestamps
    end
  end
end
