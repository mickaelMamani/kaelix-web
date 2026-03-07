export interface CityData {
  slug: string
  name: string
  region: string
  description: string
  economicContext: string
  population: string
  coordinates: { lat: number; lng: number }
}

export const cities: CityData[] = [
  {
    slug: "montpellier",
    name: "Montpellier",
    region: "Occitanie",
    description:
      "Capitale de l'Occitanie, Montpellier est une ville dynamique et innovante, berceau de startups tech et de PME en pleine croissance. Son écosystème numérique en fait un terrain fertile pour les entreprises qui veulent se démarquer en ligne.",
    economicContext:
      "Avec plus de 4 000 entreprises créées chaque année et un pôle French Tech reconnu, Montpellier attire les entrepreneurs du numérique. Le secteur tertiaire représente 85 % de l'emploi local, et la concurrence en ligne y est de plus en plus forte.",
    population: "295 000",
    coordinates: { lat: 43.6108, lng: 3.8767 },
  },
  {
    slug: "paris",
    name: "Paris",
    region: "Île-de-France",
    description:
      "Paris, première place économique européenne, concentre des milliers d'entreprises de toutes tailles qui rivalisent pour capter l'attention en ligne. Dans un marché aussi concurrentiel, un site web performant et sur mesure est un avantage décisif.",
    economicContext:
      "Le Grand Paris rassemble plus de 800 000 entreprises et génère 31 % du PIB national. La densité concurrentielle impose aux entreprises une présence digitale irréprochable pour se démarquer dans les résultats de recherche.",
    population: "2 145 000",
    coordinates: { lat: 48.8566, lng: 2.3522 },
  },
  {
    slug: "lyon",
    name: "Lyon",
    region: "Auvergne-Rhône-Alpes",
    description:
      "Deuxième pôle économique de France, Lyon est une métropole où l'industrie traditionnelle côtoie l'innovation digitale. Les entreprises lyonnaises, des artisans aux grands groupes, recherchent des solutions web à la hauteur de leur ambition.",
    economicContext:
      "Lyon abrite un tissu de 150 000 entreprises, avec des secteurs forts comme la santé, la chimie et le numérique. Le label French Tech et les incubateurs locaux stimulent la transformation digitale des PME de la région.",
    population: "522 000",
    coordinates: { lat: 45.764, lng: 4.8357 },
  },
  {
    slug: "marseille",
    name: "Marseille",
    region: "Provence-Alpes-Côte d'Azur",
    description:
      "Porte d'entrée de la Méditerranée, Marseille est une ville en pleine renaissance numérique. Son port, son tourisme et son tissu de PME diversifié créent une demande croissante pour des sites web professionnels et performants.",
    economicContext:
      "Marseille connaît une croissance économique soutenue, portée par le commerce maritime, le tourisme et l'essor des startups. Le numérique y représente un levier stratégique pour les entreprises qui veulent toucher une clientèle locale et internationale.",
    population: "873 000",
    coordinates: { lat: 43.2965, lng: 5.3698 },
  },
  {
    slug: "toulouse",
    name: "Toulouse",
    region: "Occitanie",
    description:
      "Capitale européenne de l'aéronautique, Toulouse est aussi un hub technologique majeur. Les entreprises toulousaines, qu'elles soient dans l'industrie ou les services, ont besoin de sites web qui reflètent leur excellence technique.",
    economicContext:
      "Avec Airbus, le CNES et un écosystème de sous-traitants high-tech, Toulouse concentre une expertise technologique unique. La ville attire chaque année des milliers de créateurs d'entreprises séduits par son dynamisme et sa qualité de vie.",
    population: "498 000",
    coordinates: { lat: 43.6047, lng: 1.4442 },
  },
  {
    slug: "bordeaux",
    name: "Bordeaux",
    region: "Nouvelle-Aquitaine",
    description:
      "Bordeaux allie patrimoine et modernité. La métropole bordelaise connaît un essor économique remarquable, avec des entreprises qui misent sur le digital pour valoriser leur savoir-faire, du vignoble aux startups tech.",
    economicContext:
      "Bordeaux est devenue l'une des villes les plus attractives de France pour les entrepreneurs. Son écosystème numérique, porté par Darwin, la Cité du Vin et des incubateurs de renom, dynamise la création d'entreprises innovantes.",
    population: "260 000",
    coordinates: { lat: 44.8378, lng: -0.5792 },
  },
  {
    slug: "nantes",
    name: "Nantes",
    region: "Pays de la Loire",
    description:
      "Nantes s'impose comme une référence en matière de numérique responsable et d'innovation. Les entreprises nantaises, souvent engagées dans une démarche durable, recherchent des sites web performants et éco-conçus.",
    economicContext:
      "Élue capitale verte de l'Europe, Nantes séduit par son dynamisme économique et sa qualité de vie. Le secteur numérique y emploie plus de 35 000 personnes, et les PME locales investissent massivement dans leur transformation digitale.",
    population: "320 000",
    coordinates: { lat: 47.2184, lng: -1.5536 },
  },
  {
    slug: "lille",
    name: "Lille",
    region: "Hauts-de-France",
    description:
      "Carrefour européen au croisement de Paris, Londres et Bruxelles, Lille est une métropole commerçante et entrepreneuriale. Son tissu de PME et de commerces de proximité bénéficie directement d'une présence en ligne soignée.",
    economicContext:
      "Lille est la troisième agglomération française par son PIB. Le commerce, la distribution et les services aux entreprises constituent les piliers de son économie. EuraTechnologies, l'un des plus grands incubateurs d'Europe, y accélère l'innovation numérique.",
    population: "236 000",
    coordinates: { lat: 50.6292, lng: 3.0573 },
  },
]

export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find((city) => city.slug === slug)
}
