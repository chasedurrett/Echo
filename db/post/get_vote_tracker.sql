select p.post_id, p.vote_tracker, pv.upvote, pv.downvote
from posts p 
full join post_votes pv on (p.post_id = pv.post_id and pv.user_id = $1)
where p.post_id = $2
