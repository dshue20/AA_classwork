require 'action_view'

class Cat < ApplicationRecord

    COLORS = ['brown','black','orange','yellow']

    validates :birth_date, presence: true
    validates :color, presence: true, inclusion: COLORS
    validates :name, presence: true 
    validates :sex, presence: true, inclusion: ["M","F"]

    has_many :cat_rental_requests,
        foreign_key: :cat_id,
        class_name: :CatRentalRequest,
        dependent: :destroy

    def age
        time_ago_in_words(birth_date)
    end
end