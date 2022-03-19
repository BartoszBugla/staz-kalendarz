interface CircleProps {
  count: number;
  color: string;
}
const Circle: React.FC<CircleProps> = (props) => {
  return (
    <div
      style={{
        backgroundColor: props.color,
        borderRadius: "100%",
        height: "1.1rem",
        width: "1.1rem",
        textAlign: "center",
        color: "white",
        lineHeight: "1.1rem",
      }}
    >
      <small> {props.count}</small>
    </div>
  );
};
export default Circle;
