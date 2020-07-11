insert into users (user_email, username, password)
values ($1, $2, $3)
returning *