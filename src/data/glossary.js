// Glossary providing standard technical descriptions alongside friendly simple English equivalents.

export const GLOSSARY = {
  anpr: {
    techKey: "ANPR / ALPR Edge Extraction",
    simpleKey: "Number Plate Scanner",
    descTech: "Automated license plate recognition using deep convolutional neural networks at the edge.",
    descSimple: "Smart bus camera reads vehicle registration numbers automatically to identify cars."
  },
  originDestination: {
    techKey: "Origin-Destination Matrix (O-D Flow)",
    simpleKey: "Where People Travel From & To",
    descTech: "Spatial-temporal commute pattern analytics derived from multi-bus edge telemetry.",
    descSimple: "Map showing popular bus routes and main travel paths across the city."
  },
  infrastructureDeficiency: {
    techKey: "Infrastructure Deficiencies",
    simpleKey: "Road Damage & Missing Signs",
    descTech: "Multi-class detection of road surface defects, missing traffic signs, and paint degradation.",
    descSimple: "Finds potholes, broken signs, missing zebra crossings, and flooded roads automatically."
  },
  vulnerablePedestrian: {
    techKey: "Vulnerable Road User (VRU) Index",
    simpleKey: "Child & Walker Safety Alert",
    descTech: "Pedestrian behavior classification and collision vulnerability calculation.",
    descSimple: "Warns when pedestrians or school children are crossing dangerously."
  },
  bandwidthOptimization: {
    techKey: "Edge-to-Cloud Compression Ratio",
    simpleKey: "Data Saved by Bus Computer",
    descTech: "Reduces 1080p raw video streams to lightweight structured JSON alert payloads.",
    descSimple: "Processes video on the bus so it uses almost zero cellular internet data."
  },
  vehicleDensity: {
    techKey: "Traffic Bottleneck & Density Index",
    simpleKey: "Road Traffic Crowdedness",
    descTech: "Multi-lane vehicle count, classification, and spatial congestion density metrics.",
    descSimple: "Measures how crowded streets are to help prevent traffic jams."
  },
  hitAndRun: {
    techKey: "Incident Rash Driving & ANPR Tracking",
    simpleKey: "Dangerous Driver & Crash Reporter",
    descTech: "Detects erratic vehicle motion, logs speed delta, extracts license plate & dispatches alert.",
    descSimple: "Catches speeders or crash-and-flee vehicles and alerts the police instantly with proof."
  }
};
