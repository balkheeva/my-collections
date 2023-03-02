import { useContext, useEffect, useState } from 'react';
import { Button, Stack } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { TComment } from '../../../api/comments';
import { localizationContext } from '../../../context/localization/localizationContext';
import { formatDate } from '../../../infrastructure/helpers/formatDate';

type Props = {
  comments: TComment[];
};
export default function CommentsList(props: Props) {
  const { comments } = props;
  const [list, setList] = useState<TComment[]>([]);
  const sliced = comments.slice(0, 3);
  const { currentLocale } = useContext(localizationContext);

  useEffect(() => {
    setList(sliced);
  }, [comments]);

  const handleShowAllComments = () => {
    setList(comments);
  };
  const showButton = comments.length > list.length && 3;
  return (
    <div>
      {comments &&
        list.map((comment: TComment) => (
          <div className="mb-4" key={comment.id}>
            <Stack
              direction="horizontal"
              gap={2}
              className="align-items-center"
            >
              <span>
                <strong>{comment.author.name}</strong>
              </span>
              <small className="text-muted">
                <small>{formatDate(comment.createdAt)}</small>
              </small>
            </Stack>
            <p className="mt-2">{comment.comment}</p>
          </div>
        ))}
      {showButton && (
        <Button variant="outline-primary" onClick={handleShowAllComments}>
          <FormattedMessage id="app.item.page.title" /> {comments.length}{' '}
          {currentLocale === 'ru'
            ? declOfNum(comments.length, [
                'комментарий',
                'комментария',
                'комментариев',
              ])
            : 'comments'}
        </Button>
      )}
    </div>
  );
}
export function declOfNum(number: number, words: Array<string>) {
  return words[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
  ];
}
