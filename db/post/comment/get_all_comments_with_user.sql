select 
c.comment_id, 
c.comment_author_id, 
a.username, 
a.user_image, 
c.post_id,
c.comment,
c.comment_time,
c.vote_tracker,
p.post_id,
p.subforum_id,
u.user_id,
u.username,
cv.upvote,
cv.downvote
from comments c
full join users a on a.user_id = c.comment_author_id
full join posts p on p.post_id = c.post_id
full join users u on u.user_id = $2
full join comment_votes cv on (c.comment_id = cv.comment_id and cv.user_id = $2)
where c.post_id = $1
order by c.comment_id asc;