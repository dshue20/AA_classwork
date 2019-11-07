class CatRentalRequest < ApplicationRecord
    validates :cat_id, :start_date, :end_date, :status, presence: true
    validates :cat_id, uniqueness: true 
    validates :status, inclusion: ["APPROVED","DENIED","PENDING"]

    belongs_to :cat,
        foreign_key: :cat_id,
        class_name: :Cat

    def overlapping_requests
    end
end