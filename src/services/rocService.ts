/**
 * Menghitung bobot kriteria menggunakan metode Rank Order Centroid (ROC)
 * @param rankOrderedCriteria array kriteria yang sudah diurutkan menurut rank (1 = terpenting)
 * @returns array bobot [w1, w2, ..., wN]
 */
export function calculateROCWeights(
  rankOrderedCriteria: { rankOrder: number }[]
): number[] {
  const n = rankOrderedCriteria.length;

  // Urutkan criteria berdasarkan rankOrder ASC
  // rankOrder=1 => paling penting
  const sorted = [...rankOrderedCriteria].sort(
    (a, b) => a.rankOrder - b.rankOrder
  );

  const weights: number[] = [];
  for (let j = 1; j <= n; j++) {
    // rumus w_j = (1/n) * sum(1/i, i=j..n)
    let sum = 0;
    for (let i = j; i <= n; i++) {
      sum += 1 / i;
    }
    const wj = (1 / n) * sum;
    weights.push(wj);
  }

  // weights.map(w => parseFloat(w.toFixed(3)));
  return weights;
}
