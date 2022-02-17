export default function isCurrentPage(
  targetPathname: string,
  currentPathname: string,
): boolean {
  const regexp = new RegExp(`^((${targetPathname}/)|(${targetPathname}$))`);
  return regexp.test(currentPathname);
}
