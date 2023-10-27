import toast from 'react-hot-toast';
import {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

export default async function fetchDirections(
  origin: string,
  destination: string,
  waypoints: string[],
  TRAVELMODE: 'DRIVING' | 'WALKING',
  setDirectionsResponse: React.Dispatch<
    React.SetStateAction<
      google.maps.DirectionsResult | undefined
    >
  >,
  setDistance: React.Dispatch<React.SetStateAction<string>>,
  setDuration: React.Dispatch<React.SetStateAction<string>>
) {
  try {
    // Fetch geocode information for the origin and destination
    const [originResults, destinationResults] =
      await Promise.all([
        getGeocode({ address: origin }),
        getGeocode({ address: destination }),
      ]);

    // Extract latitude and longitude from the geocode results
    const [originLocation, destinationLocation] =
      await Promise.all([
        getLatLng(originResults[0]),
        getLatLng(destinationResults[0]),
      ]);

    // Create an array of DirectionsWaypoint objects
    const directionsWaypoints: google.maps.DirectionsWaypoint[] =
      waypoints.map((waypoint) => ({
        location: waypoint,
        stopover: true,
      }));

    // Create a DirectionsService object to interact with Google Maps Directions API.
    const directionsService =
      new google.maps.DirectionsService();

    const results = await directionsService.route({
      origin: originLocation,
      destination: destinationLocation,
      waypoints: directionsWaypoints,
      travelMode: google.maps.TravelMode[TRAVELMODE],
    });

    if (!results) {
      return;
    }

    const routes = results?.routes[0].legs;

    // reduce to get distance and duration because the total route
    // might be split between multiple waypoints
    const { distance, duration } = routes.reduce(
      (acc, el) => {
        const distanceValue = el.distance
          ? el.distance.value / 1000
          : 0;
        const durationValue = el.duration
          ? el.duration.value / 3600
          : 0;

        return {
          distance: acc.distance + distanceValue,
          duration: acc.duration + durationValue,
        };
      },
      { distance: 0, duration: 0 }
    );

    if (!distance || !duration) return;

    setDirectionsResponse(results);
    setDistance(distance.toFixed(1));
    setDuration(duration.toFixed(1));
  } catch (error) {
    toast.error(
      `No route could be found between ${origin} and ${destination}.`
    );
  }

  return;
}
