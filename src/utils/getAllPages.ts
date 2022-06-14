export async function getAllPages<T>(
  cb: (arg: { page: number }) => Promise<T[]>,
  pages: T[][] = [],
): Promise<T[][]> {
  const nextPage = pages.length + 1;
  console.log({ nextPage });
  const currentPage = await cb({ page: nextPage });
  if (!currentPage.length) return pages;
  return getAllPages(cb, [...pages, currentPage]);
}
