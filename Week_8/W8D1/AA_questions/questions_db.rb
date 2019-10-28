require 'sqlite3'
require 'singleton'

class QuestionsDatabase < SQLite3::Database
  include Singleton

  def initialize
    super ('questions.db')
    self.type_translation = true
    self.results_as_hash = true
  end
end

class User
    attr_accessor :id, :fname, :lname
    
    def self.find_by_id(id)
        student = QuestionsDatabase.instance.execute(<<-SQL, id)
            SELECT
                *
            FROM
                users
            WHERE
                id = ?
        SQL
        User.new(student.first)
    end

    def self.find_by_name(fname, lname)
        student = QuestionsDatabase.instance.execute(<<-SQL, fname, lname)
            SELECT
                *
            FROM
                users
            WHERE
                fname = ? AND lname = ?
        SQL
        User.new(student.first)        
    end

    def self.all
         QuestionsDatabase.instance.execute(<<-SQL)
            SELECT
                *
            FROM
                users
        SQL
    end

    def initialize(hash)
        @id = hash['id']
        @fname = hash ['fname']
        @lname = hash['lname']
    end

    def authored_questions
        Question.find_by_author_id(@id)
    end

    def authored_replies
        Reply.find_by_user_id(@id)
    end

    def followed_questions
        QuestionFollow.followed_questions_for_user_id(@id)
    end
    
    def liked_questions
        QuestionLike.liked_questions_for_user_id(@id)
    end
    
    def average_karma
        karma = QuestionsDatabase.instance.execute(<<-SQL, @id)
            SELECT
                SUM(question_likes.likes), COUNT(DISTINCT questions.id)
            FROM
                questions
            LEFT OUTER JOIN
                question_likes ON question_likes.question_id = questions.id
            WHERE
                questions.associated_author_id = @id
        SQL
        karma[0].values[0] / karma[0].values[1]
    end

    def save
        if id.nil?
            QuestionsDatabase.instance.execute(<<-SQL, @fname, @lname)
                INSERT INTO
                    users (fname, lname)
                VALUES
                    (@fname, @lname)
            SQL
        else
            QuestionsDatabase.instance.execute(<<-SQL, @fname, @lname, @id)
                UPDATE
                    users
                SET
                    (fname = @fname, lname = @lname)
                WHERE
                    id = @id
            SQL
        end
        @id = QuestionsDatabase.instance.last_insert_row_id
    end
end

class Question
    attr_accessor :id, :title, :body, :associated_author_id

    def self.find_by_id(id)
        q = QuestionsDatabase.instance.execute(<<-SQL, id)
            SELECT
                *
            FROM
                questions
            WHERE
                id = ?
        SQL
        Question.new(q.first)
    end

    def self.find_by_author_id(author_id)
        author = QuestionsDatabase.instance.execute(<<-SQL, author_id)
            SELECT
                *
            FROM
                questions
            WHERE
                associated_author_id = ?
        SQL
        #author
        Question.new(author.first)
    end 

    def self.most_followed(n)
        QuestionFollow.most_followed_questions(n)
    end

    def self.most_liked(n)
        QuestionLike.most_liked_questions(n)
    end

    def initialize(hash)
        @id = hash['id']
        @title = hash['title']
        @body = hash['body']
        @associated_author_id = hash['associated_author_id']
    end

    def author
        User.find_by_id(@associated_author_id)
    end

    def replies
        Reply.find_by_question_id(@id)
    end

    def followers
        QuestionFollow.followers_for_question_id(@id)
    end

    def likers
        QuestionLike.likers_for_question_id(@id)
    end

    def num_likes
        QuestionLike.num_likes_for_question_id(@id)
    end

    def save
        if id.nil?
            QuestionsDatabase.instance.execute(<<-SQL, @title, @body, @associated_author_id)
                INSERT INTO
                    questions (title, body, associated_author_id)
                VALUES
                    (@title, @body, @associated_author_id)
            SQL
        else
            QuestionsDatabase.instance.execute(<<-SQL, @title, @body, @associated_author_id, @id)
                UPDATE
                    questions
                SET
                    (title = @title, body = @body, associated_author_id = @associated_author_id)
                WHERE
                    id = @id
            SQL
        end
        @id = QuestionsDatabase.instance.last_insert_row_id
    end
end

class QuestionFollow

    def self.find_by_id(id)
        qf = QuestionsDatabase.instance.execute(<<-SQL, id)
            SELECT
                *
            FROM
                question_follows
            WHERE
                id = ?
        SQL
        QuestionFollow.new(qf.first)
    end

    def self.followers_for_question_id(question_id)
        QuestionsDatabase.instance.execute(<<-SQL, question_id)
            SELECT
                *
            FROM
                users
            JOIN
                question_follows ON users.id = question_follows.student_id
            WHERE
                question_follows.question_id = ?
        SQL
    end

    def self.followed_questions_for_user_id(user_id)
        QuestionsDatabase.instance.execute(<<-SQL, user_id)
            SELECT
                *
            FROM
                questions
            JOIN
                question_follows ON questions.id = question_follows.question_id
            WHERE
                question_follows.student_id = ?
        SQL
    end

    def self.most_followed_questions(n)
        QuestionsDatabase.instance.execute(<<-SQL, n)
            SELECT DISTINCT questions.*
            FROM questions
            JOIN question_follows ON questions.id = question_follows.question_id
            GROUP BY questions.title
            ORDER BY count(*) DESC LIMIT ?
        SQL
    end

    def initialize(hash)
        @id = hash['id']
        @student_id = hash['student_id']
        @question_id = hash['question_id']
    end
end

class Reply
    def self.find_by_id(id)
        rep = QuestionsDatabase.instance.execute(<<-SQL, id)
            SELECT
                *
            FROM
                replies
            WHERE
                id = ?
        SQL
        Reply.new(rep.first)
    end

    def self.find_by_user_id(user_id)
        user = QuestionsDatabase.instance.execute(<<-SQL, user_id)
            SELECT *
            FROM replies
            WHERE student_id = ?
        SQL
        Reply.new(user.first)
    end

    def self.find_by_question_id(question_id)
        question = QuestionsDatabase.instance.execute(<<-SQL, question_id)
            SELECT *
            FROM replies
            WHERE question_id = ?
        SQL
        Reply.new(question.first)
    end

    def self.all
        QuestionsDatabase.instance.execute(<<-SQL)
            SELECT 
                *
            FROM 
                replies
        SQL
    end

    def initialize(hash)
        @id = hash['id']
        @question_id = hash['question_id']
        @parent_id = hash['parent_id']
        @student_id = hash['student_id']
        @body = hash['body']
    end

    def author
        User.find_by_id(@student_id)
    end

    def question
        Question.find_by_id(@question_id)
    end

    def parent_reply
        Reply.find_by_id(@parent_id)
    end

    def child_replies
        child = QuestionsDatabase.instance.execute(<<-SQL, @id)
            SELECT 
                *
            FROM 
                replies
            WHERE 
                replies.parent_id = @id
        SQL
        child
    end 

    def save
        if id.nil?
            QuestionsDatabase.instance.execute(<<-SQL, @question_id, @parent_id, @student_id, @body)
                INSERT INTO
                    replies (question_id, parent_id, student_id, body)
                VALUES
                    (@question_id, @parent_id, @student_id, @body)
            SQL
        else
            QuestionsDatabase.instance.execute(<<-SQL, @question_id, @parent_id, @student_id, @body, @id)
                UPDATE
                    replies
                SET
                    (question_id = @question_id, parent_id = @parent_id, student_id = @student_id, body = @body)
                WHERE
                    id = @id
            SQL
        end
        @id = QuestionsDatabase.instance.last_insert_row_id
    end

end

class QuestionLike
    def self.find_by_id(id)
        ql = QuestionsDatabase.instance.execute(<<-SQL, id)
            SELECT
                *
            FROM
                question_likes
            WHERE
                id = ?
        SQL
        QuestionLike.new(ql.first)
    end

    def self.likers_for_question_id(question_id)
        QuestionsDatabase.instance.execute(<<-SQL, question_id)
            SELECT
                *
            FROM
                users
            JOIN
                question_likes ON question_likes.student_id = users.id
            WHERE
                question_id = ?
        SQL
    end

    def self.num_likes_for_question_id(question_id)
        num = QuestionsDatabase.instance.execute(<<-SQL, question_id)
            SELECT
                SUM(likes)
            FROM
                question_likes
            WHERE
                question_id = ?
        SQL
        num[0].values[0]  
    end

    def self.liked_questions_for_user_id(user_id)
        QuestionsDatabase.instance.execute(<<-SQL, user_id)
            SELECT
                questions.*
            FROM
                questions
            JOIN
                question_likes ON question_likes.question_id = questions.id
            WHERE
                question_likes.student_id = ?
        SQL
    end

    def self.most_liked_questions(n)
        QuestionsDatabase.instance.execute(<<-SQL, n)
            SELECT DISTINCT questions.*
            FROM questions
            JOIN question_likes ON questions.id = question_likes.question_id
            GROUP BY questions.title
            ORDER BY SUM(question_likes.likes) DESC LIMIT ?
        SQL
    end

    def initialize(hash)
        @id = hash['id']
        @likes = hash['likes']
        @student_id = hash['student_id']
        @question_id = hash['question_id']
    end
end