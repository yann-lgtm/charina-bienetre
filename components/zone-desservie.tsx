import { Reveler } from "@/components/reveler";
import { TitreSection } from "@/components/titre-section";
import { ZONE } from "@/lib/marque";

/**
 * Zone desservie. Quatre lieux réels, décrits un par un : c’est plus utile à
 * une lectrice, et mieux traité par Google, qu’une liste de communes gonflée
 * pour ratisser large.
 */
const LIEUX = [
  {
    nom: "Ruoms",
    texte:
      "Le point de départ. C’est là qu’elle reçoit, et de là que vient une bonne part de la clientèle qui revient chaque mois.",
  },
  {
    nom: "Vallon-Pont-d’Arc",
    texte:
      "À quelques minutes. Beaucoup de clientes viennent après une journée de canoë ou de marche dans les gorges.",
  },
  {
    nom: "Salavas",
    texte:
      "Juste en face de Vallon-Pont-d’Arc, de l’autre côté de l’Ardèche. Un quart d’heure de route.",
  },
  {
    nom: "Sud Ardèche",
    texte:
      "Barjac, Vogüé, Lagorce, Saint-Ambroix : les vallées alentour sont toutes à moins de trente minutes.",
  },
] as const;

export function ZoneDesservie() {
  return (
    <section className="px-6 py-24 sm:px-10 lg:px-16">
      <TitreSection surtitre="Où elle reçoit" titre={`Elle travaille à ${ZONE.resume}.`} />

      <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2">
        {LIEUX.map((lieu, index) => (
          <Reveler
            key={lieu.nom}
            delai={index * 0.06}
            className="border-t border-sable-fonce/60 pt-6"
          >
            <h3 className="font-titre text-xl font-light text-encre">{lieu.nom}</h3>
            <p className="mt-3 leading-relaxed text-encre-doux">{lieu.texte}</p>
          </Reveler>
        ))}
      </div>
    </section>
  );
}
