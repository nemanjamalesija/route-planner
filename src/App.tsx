import { useJsApiLoader, LoadScriptProps } from '@react-google-maps/api';
import Loader from './components/Loader';

const libs: LoadScriptProps['libraries'] = ['places'];

const googleMapsKey = import.meta.env.GOOGLE_MAPS_KEY;

export default function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapsKey,
    libraries: libs,
  });

  if (!isLoaded) {
    return <Loader />;
  }

  return <h1>Success</h1>;
}
