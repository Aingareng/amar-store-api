import { Employee } from "../models";
import { calculateARAS } from "../services/arasService";
import { getWeightsByROC } from "./getWeightsByROC";

/**
 * Memanggil fungsi untuk:
 * 1. Ambil bobot ROC
 * 2. Ambil semua kandidat dari DB
 * 3. Hitung ARAS (ranking)
 */
export async function calculateRanking() {
  const weights = await getWeightsByROC();
  // => [w1, w2, w3, w4, w5], misal => [0.457, 0.257, 0.157, 0.090, 0.040]

  // Ambil kandidat dari DB
  const candidates = await Employee.findAll();

  // Bentuk format array of CandidateData
  const candidateData = candidates.map((c) => ({
    ...c,
    id: c.id,
    name: c.username,
    skill: c.skill,
    leadership: c.leadership,
    education: c.education,
    experience: c.experience,
    age: c.age,
  }));

  // Hitung ARAS
  const arasResults = calculateARAS(candidateData, weights);

  return arasResults;
}
