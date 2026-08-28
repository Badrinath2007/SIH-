// Mock Dataset for Bus Fleet operating in the city

export const MOCK_BUSES = [
  {
    id: "BUS-101",
    routeName: "Route 12 - Metro Express",
    routeSimple: "Line 12 - City Center to Airport",
    driver: "Rajesh Kumar",
    lat: 19.0760,
    lng: 72.8777,
    speed: 38, // km/h
    status: "Active Sensing",
    statusSimple: "Running Smoothly",
    passengers: 42,
    edgeHealth: "100%",
    bandwidthSaved: "99.2%",
    cameras: {
      front: true,
      rear: true,
      side: true,
      cabin: true
    },
    currentStreet: "MG Road Sector 4",
    waypoints: [
      [19.0760, 72.8777],
      [19.0790, 72.8820],
      [19.0830, 72.8860],
      [19.0880, 72.8910]
    ]
  },
  {
    id: "BUS-104",
    routeName: "Route 45 - Western Corridor",
    routeSimple: "Line 45 - West Station to School District",
    driver: "Amina Shaikh",
    lat: 19.0850,
    lng: 72.8620,
    speed: 24,
    status: "Hazard Detected",
    statusSimple: "Found Road Problem!",
    passengers: 58,
    edgeHealth: "98%",
    bandwidthSaved: "98.7%",
    cameras: {
      front: true,
      rear: true,
      side: true,
      cabin: true
    },
    currentStreet: "St. Xavier School Zone",
    waypoints: [
      [19.0850, 72.8620],
      [19.0890, 72.8660],
      [19.0940, 72.8700]
    ]
  },
  {
    id: "BUS-209",
    routeName: "Route 88 - Southern Commute",
    routeSimple: "Line 88 - South Terminal to Tech Park",
    driver: "David Miller",
    lat: 19.0620,
    lng: 72.8900,
    speed: 45,
    status: "Active Sensing",
    statusSimple: "Running Smoothly",
    passengers: 31,
    edgeHealth: "100%",
    bandwidthSaved: "99.5%",
    cameras: {
      front: true,
      rear: true,
      side: true,
      cabin: true
    },
    currentStreet: "Harbor Link Highway",
    waypoints: [
      [19.0620, 72.8900],
      [19.0680, 72.8950],
      [19.0720, 72.9010]
    ]
  },
  {
    id: "BUS-312",
    routeName: "Route 05 - Ring Road Shuttle",
    routeSimple: "Line 05 - City Outer Circle",
    driver: "Suresh Patil",
    lat: 19.0980,
    lng: 72.8510,
    speed: 18,
    status: "High Congestion",
    statusSimple: "Slow Heavy Traffic",
    passengers: 64,
    edgeHealth: "99%",
    bandwidthSaved: "98.9%",
    cameras: {
      front: true,
      rear: true,
      side: true,
      cabin: true
    },
    currentStreet: "Central Market Boulevard",
    waypoints: [
      [19.0980, 72.8510],
      [19.1020, 72.8560],
      [19.1060, 72.8600]
    ]
  }
];
