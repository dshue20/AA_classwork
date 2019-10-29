class Course < ApplicationRecord
    has_many :enrollments,
        foreign_key: :course_id,
        class_name: :Enrollment

    has_many :enrolled_students,
        through: :enrollments,
        source: :user
        
    belongs_to :prereq,
        foreign_key: :prereq_id,
        class_name: :Course    

    belongs_to :instructor,
        foreign_key: :instructor_id,
        class_name: :User
end
