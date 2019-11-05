class Comment < ApplicationRecord
    validates :body, presence: true
    validates :user_id, :artwork_id, presence: true, uniqueness: true

    belongs_to :artwork,
        foreign_key: :artwork_id,
        class_name: 'Artwork',
        dependent: :destroy
    
    belongs_to :author,
        class_name: 'User',
        foreign_key: :user_id,
        dependent: :destroy
end