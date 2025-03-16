import { Employee } from "../models";
import { getWeightsByROC } from "./getWeightsByROC";

/**
 * Memanggil fungsi untuk:
 * 1. Ambil bobot ROC
 * 2. Ambil semua kandidat dari DB
 * 3. Hitung ARAS (ranking)
 */
export async function calculateRanking(whereClause: any) {
  const weights = await getWeightsByROC();
  // => [w1, w2, w3, w4, w5], misal => [0.457, 0.257, 0.157, 0.090, 0.040]

  // Ambil kandidat dari DB
  const candidates = await Employee.findAll({ where: whereClause });

  // Bentuk format array of CandidateData
  const candidateData = candidates.map((c) => ({
    ...c,
    id: c.id,
    name: c.username,
    k1: c.k1,
    k5: c.k5,
    k2: c.k2,
    k4: c.k4,
    k3: c.k3,
  }));

  // Hitung ARAS
  // const arasResults = calculateARAS5(candidateData, weights);

  // return arasResults;
}
