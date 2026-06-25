export type DonationFrequency = "once" | "monthly_pledge";
export type DonationStatus = "created" | "paid" | "failed" | "refunded";

export type DonationCause = {
  id: string;
  title: string;
  semanticColor: string;
  minimum: number;
  maximum: number;
  suggested: [number, number, number];
};

export const donationCauses: DonationCause[] = [
  {
    id: "street-hunger-relief",
    title: "Street Hunger Relief",
    semanticColor: "#EF9F27",
    minimum: 20,
    maximum: 5000,
    suggested: [20, 60, 150]
  },
  {
    id: "skill-india-youth-program",
    title: "Skill India Youth Program",
    semanticColor: "#378ADD",
    minimum: 20,
    maximum: 5000,
    suggested: [20, 40, 100]
  },
  {
    id: "children-nutrition-circle",
    title: "Children Nutrition Circle",
    semanticColor: "#D4537E",
    minimum: 20,
    maximum: 5000,
    suggested: [20, 40, 100]
  },
  {
    id: "women-care-empowerment",
    title: "Women Care & Empowerment",
    semanticColor: "#D4537E",
    minimum: 20,
    maximum: 5000,
    suggested: [20, 40, 100]
  },
  {
    id: "health-community-support",
    title: "Health & Community Support",
    semanticColor: "#1D9E75",
    minimum: 20,
    maximum: 5000,
    suggested: [20, 40, 100]
  },
  {
    id: "education-every-child",
    title: "Education for Every Child",
    semanticColor: "#378ADD",
    minimum: 20,
    maximum: 5000,
    suggested: [20, 40, 100]
  }
];

export function getDonationCause(causeId: string) {
  return donationCauses.find((cause) => cause.id === causeId);
}

export function requiresPan(amountRupees: number) {
  return amountRupees >= 50000;
}
