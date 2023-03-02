import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';

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
  const intl = useIntl();
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
        placeholder={intl.formatMessage({ id: 'app.item.page.placeholder' })}
        onChange={handleChangeComment}
        values={comment}
        errors={errors}
        as="textarea"
      />
      <Button onClick={() => handleSubmitComment(comment)}>
        <FormattedMessage id="app.item.page.button" />
      </Button>
    </div>
  );
}
