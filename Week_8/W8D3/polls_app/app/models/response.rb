class Response < ApplicationRecord
    belongs_to :respondent,
        foreign_key: :user_id,
        class_name: :User

    belongs_to :answer_choice,
        foreign_key: :answer_id,
        class_name: :AnswerChoice
end