export type IHeadingProps = {
  name: string;
};

export default function Heading({ name }: IHeadingProps) {
  return (
    <div>
      <h2>Xin chào,</h2>
      <h1>{name}</h1>
    </div>
  );
}
