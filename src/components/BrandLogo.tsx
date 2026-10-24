/** Original MedMap mascot: a friendly capsule in a map pin. */
export function BrandLogo() {
  return (
    <>
      <img
        className="brand-mark"
        src={`${import.meta.env.BASE_URL}branding/medmap-mark.svg`}
        width="44"
        height="47"
        alt=""
        aria-hidden="true"
      />
      <span className="brand-wordmark">
        <span>Med</span><span>Map</span>
      </span>
    </>
  );
}
