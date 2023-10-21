import { getGeocode, getLatLng } from 'use-places-autocomplete';

export default async function fetchDirections(
  origin: string,
  destination: string,
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

  const directionsService = new google.maps.DirectionsService();
  const results = await directionsService.route({
    origin: originLocation,
    destination: destinationLocation,
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
