export default function Button({ children, onClick, className = "", style = {}, ...props }) {
  return (
    <button className={`btn ${className}`} onClick={onClick} style={style} {...props}>
      {children}
    </button>
  );
}
