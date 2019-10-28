DROP TABLE users;
DROP TABLE questions;
DROP TABLE question_follows;
DROP TABLE replies;
DROP TABLE question_likes;

PRAGMA foreign_keys = ON;

CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    fname TEXT NOT NULL,
    lname TEXT NOT NULL
);

CREATE TABLE questions (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    associated_author_id INTEGER NOT NULL,

    FOREIGN KEY (associated_author_id) REFERENCES users(id)
);

CREATE TABLE question_follows (
    id INTEGER PRIMARY KEY,
    student_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,

    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (question_id) REFERENCES questions(id)
);

CREATE TABLE replies (
    id INTEGER PRIMARY KEY,
    question_id INTEGER NOT NULL,
    parent_id INTEGER,
    student_id INTEGER NOT NULL,
    body TEXT NOT NULL,

    FOREIGN KEY (question_id) REFERENCES questions(id),
    FOREIGN KEY (parent_id) REFERENCES replies(id),
    FOREIGN KEY (student_id) REFERENCES users(id)
);

CREATE TABLE question_likes (
    id INTEGER PRIMARY KEY,
    likes INTEGER,
    student_id INTEGER,
    question_id INTEGER,

    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (question_id) REFERENCES questions(id)
);

INSERT INTO 
    users (fname, lname)
VALUES
    ('Derek', 'Shue'),
    ('Paul', 'P');

INSERT INTO
    questions (title, body, associated_author_id)
VALUES
    ('What is an ORM?', 'halp idk what i''m doing', 1),
    ('most liked?', 'Am I the most liked?', 2),
    ('# likes?', 'How many likes do I have?', 2),
    ('no likes', 'This question has no likes', 1);

INSERT INTO
    question_follows (student_id, question_id)
VALUES
    (1, 1);

INSERT INTO
    replies (question_id, parent_id, student_id, body)
VALUES
    (1, NULL, 1, 'here is a reply'),
    (1, 1, 2, 'i''m the child of the first reply');

INSERT INTO 
    question_likes (likes, student_id, question_id)
VALUES
    (100, 1, 1),
    (200, 2, 1),
    (10000, 2, 2),
    (20, 1, 3),
    (10, 1, 3),
    (10, 2, 3);