create table users (
    user_id serial primary key,
    username varchar(30),
    password text,
    user_email varchar(90),
    user_image text, 
    user_banner text, 
    cake_day text
);

create table subforums(
    subforum_id serial primary key,
    subforum_name varchar(200),
    subforum_owner_id int,
    subforum_img text,
    subforum_banner text,
    rules_section varchar(5000), 
    description varchar(5000),
    cake_day text
);

CREATE TABLE subforum_users (
    subforum_user_id serial primary key,
    user_id INT references users(user_id),
    subforum_id INT references subforums(subforum_id)
);

create table followers (
    follower_id serial primary key,
    user_id int references users(user_id),
    following_id int references users(user_id)
);

create table post_type (
    post_type_id serial primary key,
    post_type text
);

create table posts (
    post_id serial primary key,
    post_title varchar(300),
    post_content varchar(40000),
    post_url text,
    post_author_id int references users(user_id),
    subforum_id int references subforums(subforum_id),
    post_type_id int references post_type(post_type_id),
    post_time text,
    vote_tracker int
);

create table comments (
    comment_id serial primary key,
    comment_author_id int references users(user_id),
    post_id int references posts(post_id),
    comment varchar(20000),
    comment_time text,
    vote_tracker int
);

insert into post_type(
    post_type
) values (
    'text'
)
