class AddSessionToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :session_token, :string, null: false
  end
end
