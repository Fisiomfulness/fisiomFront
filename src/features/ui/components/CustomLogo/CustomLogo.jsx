export default function CustomLogo(props) {
  const { color, ...otherProps } = props;

  return (
    <img
      src={`/logo_${color === "dark" ? color : "light"}.webp`}
      loading="lazy"
      alt="logo_fisiomfulness"
      {...otherProps}
    />
  );
}
