class ChangeUsersColumns < ActiveRecord::Migration[6.0]
  def change
    remove_column :users, :name
    remove_column :users, :email
    add_column :users, :username, :string, presence: true, uniqueness: true
  end
end
