CREATE TABLE reviews (
  id SERIAL PRIMARY KEY, 
  title TEXT NOT NULL, 
  review TEXT NOT NULL, 
  stars TEXT NOT NULL, 
  created_at TEXT NOT NULL, 
  product_id TEXT NOT NULL, 
  user_id TEXT NOT NULL
);

-- CREATE TABLE IF NOT EXISTS avatars(
--   id SERIAL PRIMARY KEY,
--   url VARCHAR(100)
-- );

-- CREATE TABLE IF NOT EXISTS products(
--   id SERIAL PRIMARY KEY,
--   name VARCHAR(200)
-- );

-- CREATE TABLE IF NOT EXISTS users(
--   id SERIAL PRIMARY KEY,
--   avatar_id int REFERENCES avatars(id),
--   name VARCHAR(30)
-- );

-- CREATE TABLE IF NOT EXISTS reviews(
--   id SERIAL PRIMARY KEY,
--   review TEXT NOT NULL,
--   stars INT NOT NULL, 
--   created_at TIMESTAMP DEFAULT NOW(),
--   product_id INT REFERENCES products(id),
--   user_id INT REFERENCES users(id)
-- );

-- CREATE TABLE IF NOT EXISTS reviews_but_better(
--   id SERIAL PRIMARY KEY,
--   review TEXT NOT NULL,
--   stars INT NOT NULL, 
--   title TEXT NOT NULL,
--   created_at TIMESTAMP DEFAULT NOW(),
--   user_id INT REFERENCES users(id),
--   product_id INT REFERENCES products(id)
-- );