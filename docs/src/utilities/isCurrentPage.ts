export default function isCurrentPage(
  targetPathname: string,
  currentPathname: string,
): boolean {
  console.log(targetPathname);
  console.log(currentPathname);
  const regexp = new RegExp(`^((${targetPathname}/)|(${targetPathname}$))`);
  return regexp.test(currentPathname);
}
