class User < ApplicationRecord
    validates :email, presence: true, uniqueness: true

    has_many :submitted_urls,
        foreign_key: :user_id,
        class_name: :ShortenedURL
     
    has_many :visits,
        foreign_key: :user_id,
        class_name: :Visit

    has_many :visited_urls,
        through: :visits,
        source: :url       

end