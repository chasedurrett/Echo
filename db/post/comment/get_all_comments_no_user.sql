select 
c.comment_id, 
c.comment_author_id, 
u.username, 
u.user_image, 
c.post_id,
c.comment,
c.comment_time,
c.vote_tracker,
p.post_id,
p.subforum_id
from comments c
full join users u on u.user_id = c.comment_author_id
full join posts p on p.post_id = c.post_id
where c.post_id = $1
order by c.comment_id asc;