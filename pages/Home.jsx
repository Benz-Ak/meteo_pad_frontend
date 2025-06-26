import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-full">
      <div
      >
        <h1 className="text-4xl font-bold text-white">
          Bienvenue au Port Autonome de Douala
        </h1>
        <p className="text-lg mt-2">
          Situé au cœur du golfe de Guinée, le Port Autonome de Douala est un
          acteur stratégique du commerce maritime en Afrique centrale. Ce site
          vous propose un suivi météorologique moderne, précis et adapté aux
          enjeux portuaires : données en temps réel, prévisions, alertes et
          visualisation cartographique. Naviguez en toute confiance grâce à une
          météo fiable au service des professionnels et du public.
        </p>
      </div>

      <div className="p-4 flex flex-col justify-center ">
        <h2 className="text-blue-900 text-2xl font-bold">
          Données météorologiques en direct
        </h2>
        <p className="mb-4">
          Retrouvez ici les dernières mesures relevées sur la zone portuaire de
          Douala. Grâce à nos stations locales, les paramètres comme la
          température, la pression atmosphérique, l’humidité, la vitesse du vent
          et le niveau de la marée sont mis à jour en continu. Ces données sont
          essentielles pour la sécurité des opérations logistiques et maritimes.
        </p>
        <Link
          to="/live-data"
          className="text-white bg-blue-900 p-2 mt-4 w-fit rounded-md"
        >
          voir
        </Link>
      </div>
      <div className="p-4 flex flex-col justify-center">
        <h2 className="text-blue-900 text-2xl font-bold">
          Visualisation cartographique
        </h2>
        <p className="mb-4">
          Explorez le Port Autonome de Douala grâce à notre carte interactive.
          Visualisez les données météorologiques en temps réel directement sur
          la carte pour une meilleure compréhension des conditions locales.
        </p>
        <Link
          to="/map"
          className="text-white bg-blue-900 p-2 mt-4 w-fit rounded-md"
        >
          Voir la carte
        </Link>
      </div>
      <div className="p-4 flex flex-col justify-center">
        <h2 className="text-blue-900 text-2xl font-bold">Prévisions météo</h2>
        <p className="mb-4">
          Consultez les prévisions météorologiques pour les jours à venir. Nos
          modèles de prévision vous permettent de planifier vos activités en
          fonction des conditions attendues. <br /> Anticipez les conditions météo à
          venir Planifiez vos activités avec les prévisions sur plusieurs jours.
          Température, précipitations, humidité, vents dominants : les données
          sont agrégées à partir de sources fiables pour vous offrir une
          projection utile et exploitable, tant pour la navigation que pour la
          gestion portuaire.
        </p>
        <Link
          to="/forecast"
          className="text-white bg-blue-900 p-2 mt-4 w-fit rounded-md"
        >
          Voir les prévisions
        </Link>
      </div>
      <div className="p-4 flex flex-col justify-center">
        <h2 className="text-blue-900 text-2xl font-bold">Alertes météo</h2>
        <p className="mb-4">
          Restez informé des alertes météorologiques importantes. Recevez des
          notifications en cas de conditions extrêmes susceptibles d'affecter
          les opérations portuaires.
        </p>
        <Link
          to="/alerts"
          className="text-white bg-blue-900 p-2 mt-4 w-fit rounded-md"
        >
          Voir les alertes
        </Link>
        </div>
      <div className="p-4 flex flex-col justify-center">
        <h2 className="text-blue-900 text-2xl font-bold">Contact</h2>
        <p className="mb-4">
          Pour toute question ou demande d'information, n'hésitez pas à nous
          contacter via notre formulaire de contact ou par email.
        </p>
        <Link
          to="/contact"
          className="text-white bg-blue-900 p-2 mt-4 w-fit rounded-md"
        >
          Contactez-nous
        </Link>
      </div>
    </div>
  );
}
