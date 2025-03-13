// services/rocService.ts

import { CriteriaModel } from "../models";

/**
 * 1. Ambil semua kriteria (yang aktif)
 * 2. Hitung bobot ROC berdasarkan rankOrder
 * 3. Update kolom weight pada table Criteria sesuai hasil
 */
export async function calculateROCWeights() {
  // 1) Ambil data Criteria
  const allCriteria = await CriteriaModel.findAll();

  // 2) Sort by rankOrder
  //    rankOrder=1 => paling penting
  const sorted = [...allCriteria].sort((a, b) => a.rank_order - b.rank_order);

  const n = sorted.length;

  // 3) Hitung ROC
  //    w_j = (1/n) * Sum(1/i, i=j..n)
  let weights: number[] = [];
  for (let j = 1; j <= n; j++) {
    let sum = 0;
    for (let i = j; i <= n; i++) {
      sum += 1 / i;
    }
    const wj = (1 / n) * sum;
    weights.push(parseFloat(wj.toFixed(3))); // bulatkan ke 3 desimal
  }

  // 4) Mapping hasil ke object
  //    sorted[0] => bobot weights[0], sorted[1] => bobot weights[1], dst.
  for (let i = 0; i < sorted.length; i++) {
    const c = sorted[i];
    c.weight = weights[i];
  }

  // 5) Simpan perubahan (bulk update)
  await Promise.all(sorted.map((c) => c.save()));
  return weights;
}
