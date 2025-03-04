interface CandidateData {
  id: number;
  name: string;
  skill: number; // K1
  leadership: number; // K2
  education: number; // K3
  experience: number; // K4
  age: number; // K5
}

interface ArasResult {
  id: number;
  username: string;
  score: number;
}

/**
 * Menghitung ranking kandidat menggunakan metode ARAS
 * @param candidates array data kandidat
 * @param weights array bobot kriteria (selaras dgn urutan: skill, leadership, education, experience, age)
 * @returns array hasil ARAS [ { name, score }, ... ] (descending)
 */
export function calculateARAS(
  candidates: CandidateData[],
  weights: number[]
): ArasResult[] {
  // 1. Bentuk matriks keputusan (X) sesuai urutan kriteria
  //    X[i, j] => baris i (kandidat ke-i), kolom j (kriteria ke-j)
  // 2. Normalisasi => r[i, j] = X[i, j] / sum(X[:, j]) (untuk benefit)

  // sum kolom
  const sumSkill = candidates.reduce((acc, c) => acc + c.skill, 0);
  const sumLeadership = candidates.reduce((acc, c) => acc + c.leadership, 0);
  const sumEducation = candidates.reduce((acc, c) => acc + c.education, 0);
  const sumExperience = candidates.reduce((acc, c) => acc + c.experience, 0);
  const sumAge = candidates.reduce((acc, c) => acc + c.age, 0);

  // 3. Hitung S_i = sum( w_j * r[i, j] )
  const results: ArasResult[] = candidates.map((candidate) => {
    const rSkill = candidate.skill / sumSkill;
    const rLeadership = candidate.leadership / sumLeadership;
    const rEducation = candidate.education / sumEducation;
    const rExperience = candidate.experience / sumExperience;
    const rAge = candidate.age / sumAge;

    const score =
      weights[0] * rSkill +
      weights[1] * rLeadership +
      weights[2] * rEducation +
      weights[3] * rExperience +
      weights[4] * rAge;

    return {
      id: candidate.id,
      username: candidate.name,
      score,
    };
  });

  // 4. Urutkan descending berdasar score
  results.sort((a, b) => b.score - a.score);
  const data = results.map((item) => {
    return {
      ...item,
      score: parseFloat(item.score.toFixed(3)),
    };
  });

  return data;
}
