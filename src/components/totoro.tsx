export function Totoro() {
  return (
    <video
      className="absolute -left-[12rem] -bottom-16"
      style={{ maxWidth: "60rem" }}
      autoPlay
      loop
      muted
    >
      <source src="/totoro.webm" type="video/webm" />
      Your browser does not support the video tag.
    </video>
  );
}
