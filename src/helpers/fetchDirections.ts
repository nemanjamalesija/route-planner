import { getGeocode, getLatLng } from 'use-places-autocomplete';

export default async function fetchDirections(
  origin: string,
  destination: string,
  waypoints: string[],
  TRAVELMODE: 'DRIVING' | 'WALKING',
  setDirectionsResponse: React.Dispatch<
    React.SetStateAction<google.maps.DirectionsResult | undefined>
  >,
  setDistance: React.Dispatch<React.SetStateAction<string>>,
  setDuration: React.Dispatch<React.SetStateAction<string>>
) {
  const [originResults, destinationResults] = await Promise.all([
    getGeocode({ address: origin }),
    getGeocode({ address: destination }),
  ]);

  const [originLocation, destinationLocation] = await Promise.all([
    getLatLng(originResults[0]),
    getLatLng(destinationResults[0]),
  ]);

  // Create an array of DirectionsWaypoint objects
  const directionsWaypoints: google.maps.DirectionsWaypoint[] = waypoints.map(
    (waypoint) => ({
      location: waypoint,
      stopover: true, // or false, depending on whether you want to stop at the waypoint
    })
  );

  const directionsService = new google.maps.DirectionsService();
  const results = await directionsService.route({
    origin: originLocation,
    destination: destinationLocation,
    waypoints: directionsWaypoints,
    travelMode: google.maps.TravelMode[TRAVELMODE],
  });

  if (!results) return;

  const distance = results?.routes[0]?.legs[0]?.distance?.text;
  const duration = results?.routes[0]?.legs[0]?.duration?.text;

  if (!distance || !duration) return;

  console.log(results);
  console.log(distance, duration);
  setDirectionsResponse(results);
  setDistance(distance);
  setDuration(duration);

  return;
}
