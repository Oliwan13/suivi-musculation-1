// src/exercises.ts

import { Session } from './types';

export const defaultSessions: Session[] = [
  {
    name: "Haut du Corps (Force)",
    exercises: [
      { name: "Tractions scapulaires", rest: "60s", series: [] },
      { name: "Développé couché barre", rest: "120s", series: [] },
      { name: "Machine élévations latérales debout", rest: "", series: [] },
      { name: "Tractions", rest: "90s", series: [] },
      { name: "Développé incliné haltères", rest: "", series: [] },
      { name: "Rowing T-barre appuyé", rest: "90s", series: [] },
      { name: "Pec Deck", rest: "", series: [] },
      { name: "Bayesian Cable Curl", rest: "75s", series: [] },
      { name: "Extension triceps à la poulie haute", rest: "", series: [] }
    ]
  },
  {
    name: "Bas du Corps (Force)",
    exercises: [
      { name: "Soulevé de terre roumain (RDL)", rest: "120s", series: [] },
      { name: "Hip thrust", rest: "120s", series: [] },
      { name: "Hack squat", rest: "180s", series: [] },
      { name: "Fentes bulgares", rest: "90s", series: [] },
      { name: "Mollets debout", rest: "60s", series: [] }
    ]
  },
  {
    name: "Haut du Corps (Hypertrophie & Poigne)",
    exercises: [
      { name: "Dips", rest: "90s", series: [] },
      { name: "Tirage vertical prise large", rest: "", series: [] },
      { name: "Écarté incliné aux poulies", rest: "75s", series: [] },
      { name: "Face Pull", rest: "", series: [] },
      { name: "Élévations latérales à la poulie", rest: "60s", series: [] },
      { name: "Curl pupitre", rest: "75s", series: [] },
      { name: "Extension triceps overhead", rest: "", series: [] },
      { name: "Flexions poignets supination", rest: "60s", series: [] },
      { name: "Extensions de poignets pronation", rest: "", series: [] },
      { name: "Farmer’s Walk", rest: "90s", series: [] },
      { name: "Planche", rest: "", series: [] }
    ]
  },
  {
    name: "Bas du Corps (Hypertrophie & Focus Ischios/Fessiers)",
    exercises: [
      { name: "Pendulum Squat", rest: "90s", series: [] },
      { name: "Hip thrust", rest: "90s", series: [] },
      { name: "Leg curl assis", rest: "75s", series: [] },
      { name: "Mollets assis", rest: "60s", series: [] },
      { name: "Glute Ham Raise", rest: "", series: [] },
      { name: "Circuit abdos (relevé de jambe, crunches, planche)", rest: "90s", series: [] }
    ]
  },
  {
    name: "Trapèzes & Mobilité ",
    exercises: [
      { name: "Barbell Shrugs", rest: "60s", series: [] },
      { name: "Face Pull", rest: "60s", series: [] },
      { name: "Cable Y-Raise", rest: "60s", series: [] },
      { name: "Dead Hang", rest: "60s", series: [] }
    ]
  },
  {
    name: "Routine Mobilité",
    exercises: [
      { name: "Pass-throughs avec élastique", rest: "", series: ["2 x 15"] },
      { name: "Wall Slides (Glissements au mur)", rest: "", series: ["2 x 12"] },
      { name: "Cercles de tête lents", rest: "", series: ["1 x 5 dans chaque sens"] },
      { name: "Rétraction du menton", rest: "", series: ["2 x 10"] },
      { name: "90/90 Stretch", rest: "", series: ["2 x 30s par côté"] },
      { name: "Étirement du canapé (Couch Stretch)", rest: "", series: ["2 x 30s par côté"] },
      { name: "Maintien en Squat Profond", rest: "", series: ["2 x 45-60s"] }
    ]
  }
];
