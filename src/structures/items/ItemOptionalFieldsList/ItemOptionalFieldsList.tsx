type Props = {
  fields: Array<{ id: string; name: string; type: string }>;
  item: any;
};
export default function ItemOptionalFieldsList(props: Props) {
  const { fields, item } = props;
  return (
    <div className="mt-5">
      {fields?.map((field) => (
        <div key={field.id}>
          {item.optionalFields[field.id] && (
            <p className="fw-bold">{field.name}</p>
          )}
          <p>{item.optionalFields[field.id]}</p>
        </div>
      ))}
    </div>
  );
}
