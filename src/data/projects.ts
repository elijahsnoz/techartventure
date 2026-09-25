import type { Project } from "../types/content";

export const PROJECTS: Project[] = [
  {
    slug: "palmpay",
    title: "PalmPay × TechArt Venture",
    category: "Art & Technology",
    relationship: "techart",
    status: "completed",
    year: "2025",
    summary:
      "A mixed-media canvas made with PalmPay Nigeria: the fintech's own debit-card leaflets collaged with newspaper and acrylic, installed beneath the PalmPay sign.",
    // Photographs and video, 10 June 2025.
    body: [
      "For a collaboration with PalmPay Nigeria, TechArt Venture made a canvas out of PalmPay itself. The company's debit-card leaflets, its welcome lines and card-activation steps, are cut up and layered with newspaper under PalmPay purple, then painted over with bold marks in red, blue, green and yellow.",
      "Beside the canvas hangs a small label with a QR code, signed SNOZ, so a viewer can scan from the wall to the art.",
      "On 10 June 2025 the canvas went up on a white wall, and the PalmPay letters were fixed beneath it.",
    ],
    cover: "pp-artwork",
    gallery: ["pp-artwork", "pp-wall", "pp-looking-1", "pp-looking-2", "pp-wide"],
    videos: ["palmpay-install"],
    artists: ["ajayi-elijah-snoz"],
    credits: [
      { name: "PalmPay Nigeria", role: "Collaboration" },
      { name: "Snoz", role: "Artist" },
    ],
    source: "Photographs and video, 10 June 2025.",
  },
  {
    slug: "do-hard-things",
    title: "Do Hard Things",
    category: "Art & Technology",
    relationship: "techart",
    status: "completed",
    year: "2024",
    location: "Abuja",
    summary:
      "A large mixed-media map of Africa built by the ALX Abuja TechArt Ventures Group: a welded steel frame, stretched canvas, and a continent assembled from upcycled fragments.",
    // ALX Abuja TechArt Ventures Group decks, 3 and 4 August 2024, and the process photographs.
    body: [
      "TechArt Venture began in 2024 as the ALX Abuja TechArt Ventures Group, a group of ALX learners in Abuja who set out to use art to present ALX's story, blending technology with creativity.",
      "Its prototype work, as the deck calls it, took ALX's own line, Do Hard Things, as its title. The group welded a steel frame, stretched canvas over it, drew the outline of Africa, and filled the continent with collaged fragments, finishing it with a textured border and the ALX mark.",
      "The deck lists the materials: stretcher and canvas, fabric, paint, sawdust, gum and Top Bond. The work was presented at an ALX hub in Abuja.",
    ],
    cover: "dht-installed",
    gallery: [
      "dht-welding", "dht-steel", "dht-frames", "dht-canvas", "dht-priming", "dht-outline",
      "dht-collage-1", "dht-collage-2", "dht-collage-3", "dht-border", "dht-finished", "dht-installed",
    ],
    artists: ["ajayi-elijah-snoz"],
    credits: [
      { name: "Snoz", role: "Artist; presentation and installation" },
      { name: "ALX Abuja TechArt Ventures Group", role: "Production" },
    ],
    source: "ALX Abuja TechArt Ventures Group presentation decks, 3–4 August 2024.",
  },
  {
    slug: "techart-institute",
    title: "TechArt Institute",
    category: "Education",
    relationship: "techart",
    year: "2025",
    location: "Abuja",
    summary:
      "Community art coaching for children and young people, fusing traditional art with digital tools, under TechArt Venture's registration.",
    // TechArt Institute proposal (Community Art Coaching Initiative) and admissions notice, 2025.
    body: [
      "TechArt Institute brings art coaching into communities, with programme pillars in artistic development, tech integration, community building and entrepreneurship.",
      "The sessions documented here include drawing and painting, and a large collaborative collage of a butterfly assembled by the children together on the classroom floor.",
      "The 2025 admissions notice lists an application period of 12 June to 19 July 2025, an age group of 7 to 29, and Nike Art Gallery, Airport Road, Abuja as its address.",
    ],
    cover: "ti-butterfly-finished",
    gallery: [
      "ti-drawings", "ti-class", "ti-group", "ti-butterfly-1", "ti-butterfly-2", "ti-butterfly-3",
      "ti-butterfly-finished", "ti-paintings", "ti-circle", "ti-outdoor", "ti-selfie",
    ],
    source: "Proposal for TechArt Institute: Community Art Coaching Initiative; TechArt Institute admissions notice, 2025.",
  },
  {
    slug: "planet-b",
    title: "Planet-B",
    category: "Environmental",
    relationship: "related",
    status: "ongoing",
    year: "2026",
    location: "Abuja",
    summary:
      "The digital archive of the movement Because There Is No Planet B, art for environmental action. Planet-B means humanity's plan B for the only Earth we have.",
    body: [
      "Planet-B preserves the people, works and contributions behind art for environmental action, so that the record outlives a single event.",
      "Its Genesis Chapter opened on World Environment Day, 5 June 2026, at Nike Art Gallery, Abuja: a five-day upcycling art masterclass, “From Waste to Resource: Art that Changes Perspectives”, sponsored by the Royal Norwegian Embassy in Abuja and hosted by Nike Art Gallery.",
      "The founder of TechArt Venture built the platform, and is one of the chapter's founding artists, with The Watchful Eye.",
    ],
    cover: "pb-watchful-eye",
    gallery: ["pb-watchful-eye", "pb-genesis-cover"],
    artists: ["ajayi-elijah-snoz"],
    source: "Planet-B Genesis Chapter catalogue.",
  },
  {
    slug: "waste-to-treasure",
    title: "Waste to Treasure",
    category: "Environmental",
    relationship: "related",
    status: "planning",
    summary:
      "A collaborative initiative connecting young people, artists, recyclers, institutions and communities to transform waste into art, useful products and economic opportunity.",
    body: [
      "Waste to Treasure explores how materials commonly treated as waste can be transformed into creative works, everyday objects and new opportunities for learning and livelihood.",
      "Its stated aim is to train 500 young adults in environmental sustainability and waste transformation, through practical workshops, creative production, community participation and documentation.",
      "The project is at the planning stage. It is documented on Planet-B.",
    ],
    source: "Waste to Treasure project concept, Planet-B.",
  },
];
