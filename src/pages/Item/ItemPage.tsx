import { useEffect, useMemo, useState } from 'react';
import { Col, Row, Stack } from 'react-bootstrap';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

import { TComment, createComment } from '../../api/comments';
import { TItem, getItem, likeItem } from '../../api/items';
import LikeBar from '../../components/LikeBar/LikeBar';
import { formatDate } from '../../infrastructure/helpers/formatDate';
import CommentsInput from '../../structures/items/Comments/CommentsInput';
import CommentsList from '../../structures/items/Comments/CommentsList';
import ItemOptionalFieldsList from '../../structures/items/ItemOptionalFieldsList/ItemOptionalFieldsList';
import TagCloud from '../../structures/tags/TagBadges';

export default function ItemPage() {
  const params = useParams() as { id: string };
  const [comments, setComments] = useState<TComment[]>([]);
  const queryKey = 'items' + params.id;
  const { data: item } = useQuery<TItem>(queryKey, () => getItem(params.id), {
    onSuccess: (data) => setComments(data?.comments || []),
  });
  const { optionalFields } = item?.Collection || {};
  const queryClient = useQueryClient();
  const socket = useMemo(() => io(), []);
  const handleInvalidate = () => {
    queryClient.invalidateQueries(queryKey);
  };
  const commentMutationCreate = useMutation(createComment, {
    onSuccess: handleInvalidate,
  });
  const likesMutation = useMutation(likeItem, { onSuccess: handleInvalidate });

  const handleSubmitComment = (data: any) => {
    commentMutationCreate.mutate(data);
    commentMutationCreate.reset();
  };

  const handleLikeItem = (id: string) => {
    likesMutation.mutate(id);
    likesMutation.reset();
  };

  useEffect(() => {
    socket.emit('setRoom', params.id);
    socket.on('newComment', (comment: TComment) =>
      setComments((prevState) => [...prevState, comment]),
    );
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Row>
      <Col lg={8} md={12} xs={12} className="bg-light p-5 rounded-3 shadow-sm">
        <h2>{item?.name}</h2>
        <TagCloud tags={item?.tags} />
        <ItemOptionalFieldsList fields={optionalFields} item={item} />
        <LikeBar item={item} onLike={handleLikeItem} />
        <Stack direction="horizontal" gap={2} className="text-muted mb-5">
          <small>Created {formatDate(item?.createdAt)}</small>
          <small>
            Author: <strong>{item?.Collection.author.name}</strong>{' '}
          </small>
        </Stack>
        <hr />
        <h5>
          <strong>{comments.length} comments</strong>
        </h5>
        <CommentsInput onSubmitComment={handleSubmitComment} item={item} />
        <CommentsList comments={comments} />
      </Col>
    </Row>
  );
}
