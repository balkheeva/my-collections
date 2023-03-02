import { useState } from 'react';
import { Button } from 'react-bootstrap';

import { TItem } from '../../../api/items';
import InputForm from '../../../components/InputForm/InputForm';

type Props = {
  item: TItem | undefined;
  onSubmitComment: (data: any) => void;
};

export default function CommentsInput(props: Props) {
  const { item, onSubmitComment } = props;
  const [comment, setComment] = useState({});
  const [errors, setErrors] = useState({});
  const handleChangeComment = (data: any) => {
    setErrors({});
    setComment({ ...comment, ...data, itemId: item?.id });
  };
  const handleSubmitComment = (data: any) => {
    if (!data.comment) {
      const errText = 'This field is required';
      setErrors({ comment: !data.comment && errText });
      return;
    }
    setComment({ comment: '' });
    setErrors({});
    onSubmitComment(data);
  };
  return (
    <div className="mb-5 mt-3">
      <InputForm
        name="comment"
        placeholder="Leave a comment"
        onChange={handleChangeComment}
        values={comment}
        errors={errors}
        as="textarea"
      />
      <Button onClick={() => handleSubmitComment(comment)}>Submit</Button>
    </div>
  );
}
