const Skeleton = ({ width, height, color, children, visible, opacity }) => {
  if (!visible) {
    return children;
  }

  return (
    <div
      className="mt-1 rounded flex"
      style={{
        width: width,
        height: height,
        backgroundColor: color,
        opacity: opacity,
      }}
    ></div>
  );
};

export default Skeleton;
