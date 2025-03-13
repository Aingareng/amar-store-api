import { CriteriaModel } from "../models";

import { calculateROCWeights } from "../services/rocService";

export async function getWeightsByROC() {
  const allCriteria = await CriteriaModel.findAll();

  // misalnya hasil findAll() => array Criteria
  // Pastikan data sudah urut rankOrder ASC,
  // atau biarkan service `calculateROCWeights()` men-sort
  const rankOrdered = allCriteria.map((c) => ({ rankOrder: c.rank_order }));

  const weights = calculateROCWeights();
  // [w1, w2, ..., wN]

  // return weights;
}
