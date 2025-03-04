import { SettingModel } from "../models/setting.model";
import { calculateROCWeights } from "../services/rocService";

export async function getWeightsByROC(): Promise<number[]> {
  const allCriteria = await SettingModel.findAll();

  // misalnya hasil findAll() => array Criteria
  // Pastikan data sudah urut rankOrder ASC,
  // atau biarkan service `calculateROCWeights()` men-sort
  const rankOrdered = allCriteria.map((c) => ({ rankOrder: c.rank_order }));

  const weights = calculateROCWeights(rankOrdered);
  // [w1, w2, ..., wN]

  return weights;
}
