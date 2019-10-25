DROP TABLE cattoys;
DROP TABLE cats;
DROP TABLE toys;


CREATE TABLE cats (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    color VARCHAR(255),
    breed VARCHAR(255)
);

CREATE TABLE toys (
    id SERIAL PRIMARY KEY,
    price FLOAT,
    color VARCHAR(255),
    name VARCHAR(255)
);

CREATE TABLE cattoys (
    id SERIAL PRIMARY KEY,
    cat_id INTEGER NOT NULL,
    toy_id integer NOT NULL,
    FOREIGN KEY(cat_id) references cats(id),
    FOREIGN KEY(toy_id) references toys(id)
 );

INSERT INTO 
    cats(id, name, color, breed)
VALUES 
    (1, 'Anna', 'brown', 'brown_cat'),
    (2, 'Bob', 'black', 'black_cat'),
    (3, 'Chris', 'yellow', 'yellow_cat'),
    (4, 'David', 'orange', 'orange_cat'),
    (5, 'Emily', 'brown', 'brown_cat');

INSERT INTO
    toys(id, price, color, name)
VALUES
    (1, 9.99, 'brown', 'scratching pole'),
    (2, 4.99, 'gray', 'toy mouse'),
    (3, 15.99, 'orange', 'cat doll'),
    (4, 3.99, 'orange', 'ball of yarn'),
    (5, 6.99, 'white', 'plush soccer ball');

INSERT INTO 
    cattoys(id, cat_id, toy_id)
VALUES
    (1, 1, 3),
    (2, 1, 1),
    (3, 1, 4),
    (4, 2, 1),
    (5, 2, 5);

/* Phase 2 */
EXPLAIN SELECT 
    * 
FROM 
    cats 
WHERE 
    name = 'Anna';

EXPLAIN SELECT
    toys
FROM
    cats
WHERE 
    id = 1;

EXPLAIN SELECT 
    toys.name, cats.name 
FROM 
    cattoys 
JOIN cats 
    ON cattoys.cat_id = cats.id 
JOIN toys 
    ON cattoys.toy_id = toys.id 
WHERE 
    cats.color = 'brown' AND toys.color = 'brown';

EXPLAIN SELECT
    toys.*
FROM 
    cattoys 
JOIN cats 
    ON cattoys.cat_id = cats.id 
JOIN toys 
    ON cattoys.toy_id = toys.id 
WHERE 
    cats.breed = 'brown_cat';

EXPLAIN UPDATE
    cats
SET 
    color = 'brown'
WHERE 
    id = 3;

EXPLAIN DELETE FROM
    toys
WHERE
    color = 'orange';

EXPLAIN INSERT INTO 
    cattoys(id, cat_id, toy_id)
VALUES 
    (6, 1, 3)