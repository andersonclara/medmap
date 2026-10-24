/** Covering tissues are hidden by default in both reference assemblies. */
export function isCoveringTissue(name: string) {
  return /omentum|pleura|fascia|mesocolon|meso-appendix|peritoneum|peritoneal membrane|mesentery|mesenterium|adipose|fat tissue/i.test(name);
}
