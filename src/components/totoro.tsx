export function Totoro() {
  return (
    <video
      className="absolute -left-[12rem]"
      style={{ maxWidth: "60rem" }}
      autoPlay
      loop
      muted
    >
      <source src="/totoro.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
