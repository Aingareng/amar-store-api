import { z } from "zod";

export interface ISkillCriteriaPayload {
  name: string;
  weight: number;
}

// Zod Schema untuk validasi
export const SkillCriteriaPayloadSchema = z.object({
  name: z
    .string()
    .min(1, "Nama kriteria harus diisi")
    .max(100, "Nama kriteria maksimal 100 karakter")
    .trim(),
  weight: z
    .number()
    .min(0.01, "Bobot harus lebih besar dari 0")
    .max(100, "Bobot maksimal 100")
    .refine((val) => !isNaN(val), { message: "Bobot harus berupa angka" }),
});

// Type dari Zod Schema (bisa digunakan sebagai pengganti interface)
export type SkillCriteriaPayload = z.infer<typeof SkillCriteriaPayloadSchema>;

// Fungsi validasi menggunakan Zod
export function validateSkillCriteriaPayload(payload: unknown): {
  isValid: boolean;
  errors: {
    name?: string;
    weight?: string;
  };
} {
  const result = SkillCriteriaPayloadSchema.safeParse(payload);

  if (!result.success) {
    const errors: { name?: string; weight?: string } = {};
    result.error.issues.forEach((issue) => {
      const path = issue.path[0] as keyof typeof errors;
      errors[path] = issue.message;
    });

    return {
      isValid: false,
      errors,
    };
  }

  return {
    isValid: true,
    errors: {},
  };
}
