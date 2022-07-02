export const NumberWithSpaces = (x: any, nbDec = 2) => {
    if (isNaN(x) === true || (x > -0.01 && x < 0.01)) {
      return (0).toFixed(nbDec);
    }
    var parts = Number.parseFloat(x)
      .toFixed(nbDec)
      .toString()
      .split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
  };
  
export const format = (nb: any, noTrail: any, flat = false) =>
flat
  ? nb
  : NumberWithSpaces(
      isNaN(nb) ? undefined : nb,
      noTrail === true ? 0 : noTrail !== undefined ? noTrail : 2,
    );