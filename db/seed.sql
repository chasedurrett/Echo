create table users (
  user_id serial primary key,
  username varchar(30),
  user_email varchar(60),
  user_img text,
  user_banner text,
  cake_day timestamp,
  password text
)