// services/arasService.ts

import { Op } from "sequelize";
import { Employee, CriteriaModel } from "../models";

interface EmployeeARAS extends Employee {
  score: number;
  ranking: number;
}

/**
 * Menghitung ARAS untuk setiap Employee
 */
interface IQueryParams {
  whereClause: any;
}
export async function calculateARAS5({
  whereClause,
}: IQueryParams): Promise<EmployeeARAS[]> {
  // 1. Ambil semua kriteria
  const criteriaList = await CriteriaModel.findAll({
    order: [["code", "ASC"]],
  });

  // 2. Ambil semua employees dari database

  const employees = await Employee.findAll({ where: whereClause });

  // 3. Hitung total nilai per kriteria
  const sumColumns: { [key: string]: number } = {};

  for (const criteria of criteriaList) {
    const col = criteria.name; // ex: "K1", "K2"

    sumColumns[col] =
      criteria.type === "cost"
        ? employees.reduce(
            (sum, e) =>
              sum +
              ((e as any)[col]
                ? 1 / Math.max(1, parseFloat((e as any)[col]) || 1)
                : 0),
            0
          )
        : employees.reduce(
            (sum, e) => sum + (parseFloat((e as any)[col]) || 0),
            0
          );
  }

  // 4. Hitung normalisasi & score untuk setiap employee
  const scoredEmployees = employees.map((e) => {
    let score = 0;

    for (const criteria of criteriaList) {
      const col = criteria.name;
      const weight = criteria.weight || 0;

      const normalized =
        criteria.type === "cost"
          ? 1 / (e as any)[col] / sumColumns[col]
          : (e as any)[col] / sumColumns[col];

      score += weight * normalized;
    }

    return {
      ...e.toJSON(), // Bawa semua data Employee
      score: parseFloat(score.toFixed(3)), // Bulatkan ke 3 desimal
      ranking: 0, // Nanti diisi setelah sorting
    };
  });

  // 5. Urutkan berdasarkan score (descending) & berikan ranking
  scoredEmployees.sort((a, b) => b.score - a.score);
  scoredEmployees.forEach((emp, index) => (emp.ranking = index + 1));

  return scoredEmployees;
}
