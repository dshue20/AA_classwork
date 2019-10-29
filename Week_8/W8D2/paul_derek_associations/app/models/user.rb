class User < ApplicationRecord
    has_many :enrollments,
        foreign_key: :student_id,
        class_name: :Enrollment 

    has_many :enrolled_courses,
        through: :enrollments,
        source: :course 
     
    has_many :taught_courses,
        foreign_key: :instructor_id,
        class_name: :Course    
end