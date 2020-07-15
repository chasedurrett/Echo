select 
c.comment_id,
c.comment_author_id,
u.username,
c.post_id,
c.comment,
c.comment_time,
c.vote_tracker
from comments c
join users u on u.user_id = c.comment_author_id
where post_id = $1