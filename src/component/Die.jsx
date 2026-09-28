function Die(props) {
  return (
    <button
      onClick={() => props.hold(props.id)}
      className={props.isHeld ? "isheld-btn" : ""}
    >
      {props.value}
    </button>
  );
}

export default Die;
