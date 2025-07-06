// src/exercises.ts

import { Session } from './types';

export const defaultSessions: Session[] = [
    {
        name: "Haut du Corps (Force)",
        exercises: [
            { name: "Développé couché barre", rest: "2 min", series: [] },
            { name: "Tractions", rest: "2 min", series: [] },
            { name: "Développé incliné haltères", rest: "90 sec", series: [] },
            { name: "Rowing T-barre appuyé", rest: "90 sec", series: [] },
            { name: "Machine élévations latérales debout", rest: "75 sec", series: [] },
            { name: "Curl incliné haltères", rest: "75 sec", series: [] },
            { name: "Extension triceps à la poulie haute", rest: "60 sec", series: [] }
        ]
    },
    {
        name: "Bas du Corps (Force)",
        exercises: [
            { name: "Hack squat", rest: "180 sec", series: [] },
            { name: "Soulevé de terre roumain (RDL)", rest: "120 sec", series: [] },
            { name: "Hip thrust", rest: "120 sec", series: [] },
            { name: "Mollets debout", rest: "60 sec", series: [] }
        ]
    },
    {
        name: "Haut du Corps (Hypertrophie)",
        exercises: [
            { name: "Dips", rest: "90 sec", series: [] },
            { name: "Tirage vertical prise large", rest: "90 sec", series: [] },
            { name: "Élévations latérales à la poulie", rest: "60 sec", series: [] },
            { name: "Écarté incliné aux poulies", rest: "75 sec", series: [] },
            { name: "Face Pull", rest: "75 sec", series: [] },
            { name: "Curl pupitre", rest: "75 sec", series: [] },
            { name: "Extension triceps overhead", rest: "75 sec", series: [] },
            { name: "Flexions poignets ", rest: "60 sec", series: [] },
            { name: "Extensions de poignets", rest: "60 sec", series: [] },
            { name: "Farmer’s Walk", rest: "40 sec", series: [] }
        ]
    },
    {
        name: "Bas du Corps (Hypertrophie)",
        exercises: [
            { name: "Squat pendule", rest: "90 sec", series: [] },
            { name: "Hip thrust", rest: "90 sec", series: [] },
            { name: "Leg curl assis", rest: "75 sec", series: [] },
            { name: "Fentes bulgares", rest: "75 sec", series: [] },
            { name: "Mollets assis", rest: "60 sec", series: [] },
            { name: "Circuit abdos (relevé de jambe, crunches, planche)", rest: "90 sec", series: [] }
        ]
    }
];

const rawExerciseList = `
ABS rolls,Abdos couché,Abducteurs,Adducteurs,Adduction poulie jambe pliée,Archer row,Arnold press,Ball slam,Ball slam côté,Bar hang,Bayesian curl,Bear push up,Biceps anneaux,Biceps-triceps extension superset,Bird dog,Bobine d'Andrieu,Bobine d'Andrieu inversée,Brignole cable press down,Brignole squat,Burpees,Cable crunch,Cable extension jambe,Cable glute kickback,Cable jambe étendue,Cable kickback,Cable leg extension,Cable press down,Cable cable press down brignole,Calf raise machine,Cat camel,Chest flies,Chest flies machine,Circuit cross training,Corde à sauter,Course sur tapis,Crunch,Crunch classique,Curl barre EZ,Curl incliné,Curl marteau assis,Curl pronation,Curl pronation haltères,Curl pupitre,Curl pupitre machine,Deadbug,Deadlift trap bar,Dips,Dips pectoraux anneaux,Dips verticaux barres fixes,Donkey kick,Drapeau humain,Drop jump single leg,Dév. couché partiel prise serrée,Dév. incliné,Dév. militaire assis haltères,Développé couché,Développé couché haltères,Développé couché incliné haltères,Développé devant landmine,Développé militaire,Développé militaire barre,Développé militaire haltère,Elevations tibialis,Extension haltères en hauteur,Extension triceps corde,Extension triceps élastique,Facepull,Facepull anneaux,Fentes bulgares,Fentes marchées,Flexion haltères en hauteur,Floor press haltères,Fly au sol bras à 60°,Front Squats,Front lever,Gainage rétroversion,Glute bridge,Glute extension,Glute ham raise,Glute kickback,High lat pull in,Hip thrust une jambe,Hula hoop,Inverted row,Jump squats,Jumping jacks,L-Fly,L-fly poulie,L-fly élastique,Landmine press,Landmine squat,Landmine squeeze press,Lat prayer,Leg curl allongé,Leg curl assis,Leg curl delavier,Leg curl haltères,Leg curl machine,Leg extension,Machine arrière épaules,Machine rowing divergent,Magyc triceps,Masse de force,ForceMedecine ball wall slam,Medicine ball wall slam,Modified row,Mollets assis,Mollets assis barre,Mollets assis machine,Mollets debout,Mollets machine,Mollets à la barre guidée,Mollets à la presse à cuisse,Montée de marches,Mountain climbers,Multi-hip,Musclets,Nordic hamstring,Oiseau,Oiseau poulie/anneaux,Oiseaux poulie,Pec deck,Pendlay row,Pistol assisté,Plank,Pompes archer,Pompes complètes,Pompes pliométriques,Pompes sur anneaux,Portée de grosse pierre,Poussée de poulie diagonale haute,Poussée de rouleau dans le mur,Presse Palof,Presse inclinée,Pull over haltères,Rack push,Relevé de jambes suspendu,Retourné de pneu,Romanian Deadlift,Romanian deadlift,Rowing Yates,Rowing bûcheron,Rowing divergent,Rowing haltères,Rowing uneven,Side bend,Side bend élastique,Side plank dynamique,Single leg hipthrust landmine,Single leg stiff leg deadlift,Sissy Mathias,Sissy squat,Sissy squat anneaux,Sissy squat appui anneaux,Sissy squat machine,Skull crusher,Sled push,Sprint,Sprint en montée,Squat barre,Squat talons très relevés,Standing cable leg curl,Step up,Step up accroché,Superman,Superset Crunch/relevé de jambes,Swing kettlebell + élastique,Swings,Tibialis anterior,Tirage arraché,Tirage horizontal,Tirage vertical machine,Tirage vertical unilatéral,Tire flip,Traction assistée,Traction supination,Tractions anneaux,Tractions porte,Tractions prise neutre focus coude,Tractions pronation,Tractions pronation prise serrée,Tractions scapulaires,Tractions scapulaires uneven,Tractions supination,Triceps anne