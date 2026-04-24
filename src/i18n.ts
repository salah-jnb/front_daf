import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      navbar: { home: "Home", services: "Services", about: "About Us", howWeWork: "How We Work", news: "News", contact: "Contact", getQuote: "Get a Quote" },
      footer: {
        rights: "All rights reserved.", international: "International Moving & Freight Services",
        partnerEyebrow: "International Partner Network", trustedPartner: "Trusted Partner in", morocco: "Morocco",
        tagline: "International relocation specialists delivering safe, seamless moves across the globe since 1961.",
        quickLinks: "Quick Links", policies: "Policies & Documents", offices: "Offices", yearsExp: "Yrs exp."
      },
      hero: {
        slide1: { title: "Air Freight", subtitle: "Fast Global Air Cargo", description: "Time-critical air freight solutions with secure handling, customs coordination, and reliable worldwide delivery." },
        slide2: { title: "Road Transport", subtitle: "Reliable Overland Logistics", description: "Flexible road transport across local and cross-border routes with clear communication and on-time performance." },
        slide3: { title: "Sea Freight", subtitle: "Cost-Effective Ocean Shipping", description: "FCL and LCL sea freight services designed for dependable transit times and competitive international shipping costs." },
        ourServices: "Our Services"
      },
      about: {
        whyChooseUs: "WHY CHOOSE US",
        metrics: { moves: "Moves Completed", space: "Secure Storage Space", years: "Years of Experience" },
        highlights: {
          storage: { title: "Secure Storage Facilities", desc: "Climate-controlled units monitored 24/7 to safeguard your most valuable assets and inventory." },
          movers: { title: "Professional Movers", desc: "A rigorously trained team devoted to handling your belongings with the utmost care and precision." },
          coordinators: { title: "Dedicated Coordinators", desc: "Your personal moving assistant managing every detail from door to door for total peace of mind." },
          accreditation: { title: "Worldwide Accreditation", desc: "Certified by top global logistics networks, guaranteeing international quality standards." }
        }
      },
      services: {
        eyebrow: "Featured Services", discover: "Discover Our ", expertise: "Moving Expertise", desc: "Explore our key services: household moving, office relocation, car shipping, secure storage, fine art logistics, and pet relocation.", learnMore: "Learn more", serviceTag: "Service",
        eyebrow2: "Moving & Freight Services", complete: "Complete ", relocation: "Relocation Solutions", desc2: "From local moving to global freight, we deliver secure, tailored logistics for homes, offices, and specialised cargo."
      },
      accreditations: {
        globalTrust: "Global Trust", our: "Our ", accrs: "Accreditations", desc: "We are proudly certified and recognized by the most prestigious international moving and logistics organizations across the globe."
      },
      news: {
        eyebrow: "Updates", title: "Latest News", updates: "Updates", description: "Stay informed about the latest trends in international transport and our company life.", viewAll: "View all news", readMore: "Read more",
        pageTitle: "Our News", pageDesc: "Discover the latest logistics trends, our new services, and global trade updates.", search: "Search articles...", filter: "Filter", empty: "No articles found.",
        recentLabel: "News", recentTitle: "Recent Articles", readAnother: "Read another article", swipe: "Swipe →", loading: "Loading...",
        support: "Priority Support", needHelp: "Need help?", supportDesc: "Our team of experts is available to assist you with your projects.", directCall: "Direct Call"
      },
      contact: {
        team: "Contact Our Team", plan: "Plan Your", nextMove: "Next Move", subtitle: "Need an international moving quote or logistics advice? Send us your request and we will get back quickly.",
        fields: { fullName: "Full Name", email: "Email Address", phone: "Phone Number", origin: "Origin City", dest: "Destination City", msg: "Tell us about your shipment..." },
        btn: { sending: "Sending...", send: "Send Message", success: "Thank you for your request. Our team will contact you shortly.", err: "Error while sending." },
        call: { title: "Call Us", desc: "Free moving estimate & support", tap: "Tap to call", support: "Support line", email: "Email us", loading: "Loading...", available: "Available" },
        tags: { t1: "Fast response", t2: "International moves", t3: "Storage & logistics" },
        help: { title: "What we can help with", desc: "Share your origin, destination and details — we’ll prepare your quote.", t1: "Professional moving", t2: "Included", t3: "Secure storage" },
        offices: { title: "Our Offices", desc: "Find us at these locations", loading: "Loading offices...", empty: "No offices available currently." }
      },
      process: {
        eyebrow: "How It Works", title: "Simple. Streamlined. Reliable.", desc: "A simple four-step process from planning to safe final delivery.",
        s1: { title: "Request Your Quote", desc: "Tell us about your move or shipment and receive a clear, competitive estimate." },
        s2: { title: "Custom Planning", desc: "Our logistics team builds the right plan, timeline, and packing strategy for your needs." },
        s3: { title: "Secure Handling", desc: "Your belongings are packed, handled, and loaded using strict safety and quality standards." },
        s4: { title: "Track and Deliver", desc: "Track your shipment progress and receive delivery on time with proactive support." }
      },
      howWeWork: {
        legacy: "Our Legacy", established: "Established in the",
        p1: "DEMENAGEMENTS JAF is a top leading family-owned company in the moving & storage industry in Tunisia and North Africa. With our highly qualified teams, we offer a full range of tailored services such as international and national moves, storage solutions, car shipping, pet relocation, and moving fine arts.",
        p2: "As one of the largest moving companies in North Africa, we are committed to providing the best, most professional, responsive, and safe relocation services available to corporate, government, residential, and commercial customers. We strive to provide our customers with a full service from door to door!",
        national: { title: "National Move", p1: "From the very first contact, until the completion of your local move, nothing is left to chance. Our goal is to provide excellent, stress-free services at an affordable rate. Once you decide you are ready to move, call us to schedule a no-cost in-home estimate. One of our professional estimators will visit your home and provide our best rate to have all your furniture wrapped by our experienced local movers!", p2: "With our extensive range of domestic moving services, we take care of every single detail of your transfer to make your experience the smoothest possible—from sorting household goods to packing, labeling, loading, transportation, unloading, unpacking, and even trash and debris removal." },
        intl: { title: "International Move", p1: "Moving to a new country isn’t easy as it involves numerous steps such as pre-move survey, packing, freight, storage, customs clearance, and delivery at destination. DEMENAGEMENTS JAF works hand in hand with our partners throughout the world to make your move a premier relocation experience.", p2: "We fully understand how critical planning and attention to detail are the keys to a successful moving project. To make you feel safe and comforted, each move is overseen by a designated move coordinator who will be in charge of advising, supporting, and updating our customers at every step from door to door.", shield: "For both Origin and Destination services, we only offer the best! We Deliver on Time—Every Time!" },
        processLabel: "The Process", howWeWorkLabel: "How We Work?",
        processSteps: {
          s1: { title: "Initial Survey", desc: "As soon as you contact us, we'll set up a physical or virtual survey to assess your belongings, listen to your needs (export documents, special artwork boxes, storage, insurance), and provide vital preliminary info." },
          s2: { title: "Financial Offer", desc: "Our sales department uses the survey report to collect all necessary details from shipping lines and destination partners, to prepare and present you with the most optimal and accurate financial offer." },
          s3: { title: "Packing & Loading", desc: "Once confirmed, an experienced team arrives on packing day. A team leader and a quality manager will oversee the entire process, ensuring everything is perfectly packed, inventoried, and securely loaded." },
          s4: { title: "Export & Delivery", desc: "Our export department manages your relocation end-to-end. We coordinate directly with the shipping lines and destination partners, keeping you closely updated on arrival dates and delivery timeframes." }
        }
      },
      svcDetails: {
        back: "All Services", service: "Service", included: "What's included", features: "Key Features", ctaHeading: "Ready to get started?",
        ctaSub: "Our team is available 6 days a week to answer your questions.", ctaBtn: "(+216) 71 906 446 — Call us now", more: "Explore more", otherSvc: "Other Services", quote: "Get a Free Quote — (+216) 71 906 446"
      },
      servicesData: {
        "international-moving": {
          title: "International Moving", subtitle: "Door-to-door relocation across borders", description: "End-to-end international relocation for households and companies, from export packing to final delivery.", longDescription: "JAF Logistics provides comprehensive international moving services tailored to households, expatriates, and corporations. We handle customs clearance, export packing, volume estimations, and door-to-door delivery across more than 50 countries. Our team of certified move managers coordinates every step so you can focus on your new beginning.",
          f0: "Full-service packing & crating", f1: "Customs documentation & clearance", f2: "Real-time shipment tracking", f3: "Marine & transit insurance", f4: "Destination agent network in 50+ countries", f5: "Dedicated move coordinator"
        },
        "pet-relocation": {
          title: "Pet Relocation", subtitle: "Safe, stress-free moves for your furry family", description: "Safe pet moving services with documentation support, route planning, and welfare-first handling.", longDescription: "Moving your pet internationally requires specialized knowledge of veterinary entry requirements, airline regulations, and quarantine rules. JAF Logistics coordinates health certificates, CITES permits when needed, approved crate sizing, and door-to-door care so your animals travel as safely and comfortably as possible.",
          f0: "Veterinary health certificate assistance", f1: "Airline-approved crate supply", f2: "Quarantine & import permit management", f3: "Microchip & vaccination coordination", f4: "Door-to-door pet delivery", f5: "24/7 welfare monitoring"
        },
        "office-moving": {
          title: "Office Moving", subtitle: "Minimise downtime, maximise efficiency", description: "Professional office relocation planned to reduce downtime and keep business operations running smoothly.", longDescription: "JAF Logistics plans and executes office relocations with minimal disruption to your business. Our project managers produce a detailed room-by-room move plan, IT equipment labelling system, and phased execution schedule. We move everything from workstations and servers to artwork and filing systems — reassembled and operational at destination.",
          f0: "Project management & move planning", f1: "IT equipment dismantling & reassembly", f2: "Furniture installation at destination", f3: "After-hours & weekend moves available", f4: "Secure document shredding & archiving", f5: "Space planning consultancy"
        },
        "car-shipping": {
          title: "Car Shipping", subtitle: "Your vehicle delivered safely, wherever you go", description: "Door-to-door vehicle shipping with secure handling for domestic and international routes.", longDescription: "Whether you are relocating a single family car or a full fleet, JAF Logistics offers RoRo (Roll-on Roll-off) and container vehicle shipping on all major trade lanes. We handle customs paperwork, pre-shipment inspection, and final delivery with comprehensive insurance coverage at every stage.",
          f0: "RoRo & container car shipping", f1: "Pre-shipment vehicle condition report", f2: "Customs export & import handling", f3: "Comprehensive vehicle insurance", f4: "Enclosed transport for luxury & classic cars", f5: "Port-to-port or door-to-door delivery"
        },
        "national-moving": {
          title: "National Moving", subtitle: "Reliable domestic relocation across Tunisia", description: "Reliable domestic moving services for apartments, houses, and corporate spaces.", longDescription: "JAF Logistics covers the full length of Tunisia with same-day and next-day domestic moving services. Our trained crews handle furniture disassembly, protective wrapping, loading, secure transport, and in-home placement at destination. Flexible scheduling, including evenings and weekends, ensures your move fits your life.",
          f0: "Same-city & cross-country moves", f1: "Furniture disassembly & reassembly", f2: "Protective blanket wrapping", f3: "Piano & heavy item specialists", f4: "Weekend & evening availability", f5: "Fixed-price quotes with no hidden fees"
        },
        "fine-art": {
          title: "Fine Art Logistics", subtitle: "Expert handling for your most precious pieces", description: "Specialized packing and transport for artworks, antiques, and fragile high-value items.", longDescription: "JAF Logistics applies museum-grade packing techniques and climate-controlled transport to safeguard paintings, sculptures, antiques, and high-value collectibles. Our team is trained in ISPM-15 compliant wooden crating, acid-free archival materials, and bespoke foam fitting — ensuring your artwork arrives in perfect condition.",
          f0: "ISPM-15 certified wooden crating", f1: "Acid-free & climate-stable packing materials", f2: "Climate-controlled transport vehicles", f3: "High-value art insurance brokerage", f4: "Gallery installation services", f5: "Customs ATA Carnet for temporary imports"
        },
        "storage-solutions": {
          title: "Storage Solutions", subtitle: "Secure, monitored facilities for any duration", description: "Flexible short and long-term storage in secure, monitored facilities.", longDescription: "JAF Logistics operates secure, CCTV-monitored warehouses with 4 500 m² of racking and bulk storage space. Our facilities are climate-controlled, fire-protected, and fully insured. Whether you need short-term bridging storage during a move or long-term business inventory management, we offer flexible plans with easy access.",
          f0: "4 500 m² of racking & bulk storage", f1: "24/7 CCTV monitoring & security", f2: "Climate-controlled environment", f3: "Fire suppression systems", f4: "Inventory management system", f5: "Flexible short-term & long-term contracts"
        }
      }
    }
  },
  fr: {
    translation: {
      navbar: { home: "Accueil", services: "Services", about: "À propos", howWeWork: "Notre Méthode", news: "Actualités", contact: "Contact", getQuote: "Obtenir un Devis" },
      footer: {
        rights: "Tous droits réservés.", international: "Déménagement International et Fret",
        partnerEyebrow: "Réseau de Partenariat International", trustedPartner: "Partenaire de Confiance au", morocco: "Maroc",
        tagline: "Spécialistes globaux du déménagement, garants d'un transfert sécurisé et sans failles depuis 1961.",
        quickLinks: "Liens Utiles", policies: "Documents & Politiques", offices: "Agences", yearsExp: "Années d'exp."
      },
      hero: {
        slide1: { title: "Fret Aérien", subtitle: "Cargaison Aérienne Mondiale", description: "Solutions de fret aérien urgentes avec manutention sécurisée, coordination douanière et livraison mondiale fiable." },
        slide2: { title: "Transport Routier", subtitle: "Logistique Terrestre Fiable", description: "Transport routier flexible sur les itinéraires locaux et transfrontaliers avec une communication claire et des délais respectés." },
        slide3: { title: "Fret Maritime", subtitle: "Expédition Océanique Rentable", description: "Services de fret maritime FCL et LCL conçus pour des temps de transit fiables et des coûts d'expédition internationaux compétitifs." },
        ourServices: "Nos Services"
      },
      about: {
        whyChooseUs: "POURQUOI NOUS CHOISIR",
        metrics: { moves: "Déménagements", space: "Espace de Stockage", years: "Années d'Expérience" },
        highlights: {
          storage: { title: "Garde-meubles", desc: "Unités climatisées sous surveillance 24/7 pour la sécurité de vos biens." },
          movers: { title: "Déménageurs Pro", desc: "Une équipe formée avec rigueur au traitement soigné de vos de biens." },
          coordinators: { title: "Coordinateurs Dévoués", desc: "Votre assistant dédié gérant chaque détail de porte à porte sereinement." },
          accreditation: { title: "Accréditations", desc: "Certifié par les réseaux logistiques au monde, garantissant l'excellence." }
        }
      },
      services: {
        eyebrow: "Services en vedette", discover: "Découvrez ", expertise: "Notre Expertise", desc: "Explorez nos services clés : déménagement résidentiel, transfert de bureaux, transport de véhicules, garde-meubles sécurisé, art et animaux.", learnMore: "En savoir plus", serviceTag: "Service",
        eyebrow2: "Déménagement & Fret", complete: "Solutions Complètes", relocation: "De Déménagement", desc2: "Du mouvement local au fret mondial, nous livrons une logistique sécurisée et sur-mesure pour les foyers et objets spécialisés."
      },
      accreditations: {
        globalTrust: "Confiance Mondiale", our: "Nos ", accrs: "Accréditations", desc: "Nous sommes fièrement certifiés et reconnus par les organisations internationales de déménagement et de logistique les plus prestigieuses."
      },
      news: {
        eyebrow: "Actualités", title: "Dernières Nouvelles", updates: "Mises à jour", description: "Restez informé des dernières tendances du transport international et de la vie de notre entreprise.", viewAll: "Voir toutes les actualités", readMore: "Lire la suite",
        pageTitle: "Notre Actualité", pageDesc: "Découvrez les dernières tendances logistiques, nos nouveaux services et les actualités du commerce mondial.", search: "Rechercher un article...", filter: "Filtrer", empty: "Aucun article trouvé.",
        recentLabel: "Actualités", recentTitle: "Articles récents", readAnother: "Lire un autre article", swipe: "Balayer →", loading: "Chargement...",
        support: "Support Prioritaire", needHelp: "Besoin d'aide ?", supportDesc: "Notre équipe d'experts est disponible pour vous accompagner dans vos projets.", directCall: "Appel Direct"
      },
      contact: {
        team: "Contactez-Nous", plan: "Planifiez Votre", nextMove: "Prochain Déménagement", subtitle: "Besoin d'un devis de déménagement ou de conseils? Envoyez-nous votre demande et nous vous répondrons rapidement.",
        fields: { fullName: "Nom complet", email: "Adresse E-mail", phone: "Numéro Téléphone", origin: "Ville de départ", dest: "Ville d'arrivée", msg: "Parlez-nous de votre envoi..." },
        btn: { sending: "Envoi...", send: "Envoyer le Message", success: "Merci pour votre demande. Notre équipe vous contactera bientôt.", err: "Erreur lors de l'envoi." },
        call: { title: "Appelez-nous", desc: "Estimation gratuite & assistance", tap: "Appuyez", support: "Ligne de Support", email: "Contact Mail", loading: "Chargement...", available: "Disponible" },
        tags: { t1: "Réponse rapide", t2: "Interventions Intl", t3: "Logistique & Stockage" },
        help: { title: "Gamme de services", desc: "Partagez l'origine, la destination et les détails — nous préparerons le devis.", t1: "Déménagement pro", t2: "Inclus", t3: "Stockage sécurisé" },
        offices: { title: "Nos Bureaux", desc: "Retrouvez-nous à ces endroits", loading: "Chargement...", empty: "Aucun bureau actuellement." }
      },
      process: {
        eyebrow: "Comment Ça Marche", title: "Simple. Efficace. Fiable.", desc: "Un processus simple en quatre étapes, de la planification à la livraison finale en toute sécurité.",
        s1: { title: "Demandez votre devis", desc: "Parlez-nous de votre déménagement ou de votre expédition et recevez un devis clair et compétitif." },
        s2: { title: "Planification Personnalisée", desc: "Notre équipe logistique élabore le plan, le calendrier et la stratégie d'emballage adaptés à vos besoins." },
        s3: { title: "Manipulation Sécurisée", desc: "Vos biens sont emballés, manipulés et chargés selon des normes strictes de sécurité et de qualité." },
        s4: { title: "Suivi et Livraison", desc: "Suivez la progression de votre envoi et recevez-le à temps avec une assistance proactive." }
      },
      howWeWork: {
        legacy: "Notre Héritage", established: "Fondé dans les années",
        p1: "DEMENAGEMENTS JAF est une entreprise familiale de premier plan dans le secteur du déménagement et du stockage en Tunisie et en Afrique du Nord. Avec nos équipes hautement qualifiées, nous proposons une gamme complète de services.",
        p2: "En tant que l'une des plus grandes entreprises de déménagement en Afrique du Nord, nous nous engageons à fournir les services de relocalisation les plus professionnels, réactifs et sûrs aux clients. Nous nous efforçons de fournir à nos clients un service de porte à porte !",
        national: { title: "Déménagement National", p1: "Dès le premier contact jusqu'à l'achèvement de votre déménagement local, rien n'est laissé au hasard. Notre objectif est de fournir d'excellents services sans stress à un tarif abordable. Une fois que vous avez décidé que vous êtes prêt à déménager, appelez-nous pour planifier une estimation gratuite à domicile !", p2: "Grâce à notre vaste gamme de services de déménagement national, nous prenons en charge chaque détail de votre transfert pour rendre votre expérience la plus fluide possible." },
        intl: { title: "Déménagement International", p1: "Déménager dans un nouveau pays n'est pas facile car cela implique de nombreuses étapes. DEMENAGEMENTS JAF travaille main dans la main avec nos partenaires à travers le monde pour faire de votre déménagement une expérience exceptionnelle.", p2: "Nous comprenons parfaitement à quel point la planification et l'attention aux détails sont essentielles. Pour vous rassurer, chaque déménagement est supervisé par un coordinateur de déménagement désigné.", shield: "Pour les services d'origine et de destination, nous ne proposons que le meilleur ! Nous livrons à temps — à chaque fois !" },
        processLabel: "Le Processus", howWeWorkLabel: "Comment nous travaillons?",
        processSteps: {
          s1: { title: "Etude Initiale", desc: "Dès que vous nous contactez, nous organiserons une visite virtuelle pour évaluer vos biens, écouter vos besoins et fournir des informations." },
          s2: { title: "Offre Financière", desc: "Notre service commercial utilise le rapport de visite pour recueillir tous les détails et vous présenter l'offre financière optimale." },
          s3: { title: "Emballage et Chargement", desc: "Une équipe expérimentée arrivera le jour de l'emballage en parfait control." },
          s4: { title: "Exportation et Livraison", desc: "Notre département export gère votre relocalisation de bout en bout avec mises à jour pour vous rassurer." }
        }
      },
      svcDetails: {
        back: "Tous les Services", service: "Service", included: "Au programme", features: "Caractéristiques Clés", ctaHeading: "Prêt à commencer ?",
        ctaSub: "Notre équipe est disponible 6 jours par semaine pour répondre à vos questions.", ctaBtn: "(+216) 71 906 446 — Appelez-nous", more: "Découvrir plus", otherSvc: "Autres Services", quote: "Obtenir un Devis Gratuit — (+216) 71 906 446"
      },
      servicesData: {
        "international-moving": {
          title: "Déménagement International", subtitle: "Transfert de porte à porte à l'étranger", description: "Déménagement international de bout en bout pour résidences et entreprises.", longDescription: "JAF Logistics fournit des services complets de déménagement international adaptés aux expatriés et aux entreprises. Nous gérons le dédouanement, l'emballage d'exportation et la livraison de porte à porte dans plus de 50 pays. Notre équipe coordonne chaque étape afin que vous puissiez vous concentrer sur votre nouveau départ.",
          f0: "Emballage complet et mise en caisse", f1: "Documentation douanière et dédouanement", f2: "Suivi en temps réel de votre expédition", f3: "Assurance maritime et transit", f4: "Réseau d'agents dans plus de 50 pays", f5: "Coordinateur de déménagement dédié"
        },
        "pet-relocation": {
          title: "Déménagement d'Animaux", subtitle: "Un transfert serein pour votre ami", description: "Services dédiés au transport d'animaux incluant les formalités sanitaires.", longDescription: "Déménager votre animal à l'étranger nécessite une connaissance spécialisée des exigences vétérinaires et d'importation. JAF Logistics coordonne les certificats de santé, la documentation de transport et la livraison de porte à porte de vos animaux de compagnie.",
          f0: "Assistance pour certificats de santé vétérinaire", f1: "Caisse de transport approuvée par compagnies", f2: "Gestion de la quarantaine et permis", f3: "Coordination des puces et vaccins", f4: "Livraison de porte à porte", f5: "Surveillance 24/7 du bien-être de l'animal"
        },
        "office-moving": {
          title: "Transfert d'Entreprise", subtitle: "Temps d'arrêt minimisé", description: "Relocalisation professionnelle planifiée pour maintenir vos opérations.", longDescription: "JAF Logistics planifie et exécute vos transferts de bureaux sans arrêt métier. Nos chefs de projet garantissent la manutention fluide, l'emballage de vos équipements informatiques et des archives sensibles, avec assurance et support immédiat à l'arrivée.",
          f0: "Gestion de projet de transfert", f1: "Démontage et remontage informatique", f2: "Installation du mobilier à l'arrivée", f3: "Transfert le week-end et soirées possible", f4: "Destruction sécurisée des archives", f5: "Conseil en aménagement de l'espace"
        },
        "car-shipping": {
          title: "Transport de Véhicules", subtitle: "Votre véhicule livré en toute sécurité", description: "Expédition de véhicules de porte à porte pour voies nationales ou globales.", longDescription: "Que vous déménagiez un véhicule ou une flotte, JAF Logistics offre un service d'expédition sécurisé via RoRo ou porte-conteneurs. Nous assurons l'import/export et dédouanement avec une police d'assurance complète.",
          f0: "Expédition par RoRo ou conteneur", f1: "Rapport d'état de votre véhicule", f2: "Gestion douanière Import/Export", f3: "Assurance véhicule complète", f4: "Transport de véhicules de luxe clos", f5: "Livraison de port à port ou de porte à porte"
        },
        "national-moving": {
          title: "Déménagement National", subtitle: "Transferts fiables partout en Tunisie", description: "Services sûrs de déménagement domestique pour maisons et entreprises.", longDescription: "JAF Logistics dessert l'ensemble du territoire tunisien pour vos transferts locaux. Nos équipes formées s'assurent de l'emballage, le transport, le montage et le bon placement de vos moindres items.",
          f0: "Déménagements d'une même ville/pays", f1: "Démontage et remontage de meubles", f2: "Emballage sous couverture de protection", f3: "Spécialistes objets lourds et pianos", f4: "Flexibilité le week-end et soirées", f5: "Devis à prix fixe sans frais cachés"
        },
        "fine-art": {
          title: "Logistique Œuvres d'Art", subtitle: "Manutention experte de vos joyaux", description: "Emballage spécialisé pour les antiquités, les œuvres d'art fragiles.", longDescription: "JAF Logistics utilise des technologies d'emballage dignes des musées avec contrôle climatique. Votre art reste entre de bonnes mains pour les imports, transferts privés ou vernissages sans tracas.",
          f0: "Caisse en bois certifié ISPM-15", f1: "Matériel d'emballage sans acide", f2: "Véhicules de transport climatisés", f3: "Coutage assurance d'œuvres d'art", f4: "Services d'installation en galerie", f5: "Carnet ATA pour imports temporaires"
        },
        "storage-solutions": {
          title: "Garde-Meubles", subtitle: "Installations sécurisées", description: "Stockage court ou long terme sous surveillance totale.", longDescription: "JAF Logistics met à votre disposition des locaux de 4 500 m² surveillés par vidéos, climatisés, et sécurisés contre les incendies. Offrez à vos biens professionnels et privés un lieu fiable de préservation.",
          f0: "4 500 m² d'espace de stockage", f1: "Surveillance CCTV 24/7", f2: "Environnement climatisé", f3: "Systèmes anti-incendie", f4: "Système de gestion des stocks", f5: "Contrats flexibles court et long terme"
        }
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "fr",
    fallbackLng: "fr",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
