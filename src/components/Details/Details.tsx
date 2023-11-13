import {
  NavLink,
  useLoaderData,
  useLocation,
  useNavigation,
} from 'react-router-dom';
import { getAstronomicalObjectById } from '../../api/api';
import { AstronomicalObject } from '../../dto/types';
import './Details.css';
import Image from '../Item/Image';
import Loading from '../_ui/bars/Loading/Loading';

export const detailsLoader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const uid = url.searchParams.get('details');
  return uid ? await getAstronomicalObjectById({ uid }) : null;
};

export default function Details() {
  const astronomicalObject = useLoaderData() as AstronomicalObject;
  const navigation = useNavigation();

  const location = useLocation();
  const closeLink = new URLSearchParams(location.search);
  if (closeLink.has('details')) closeLink.delete('details');

  return (
    <div className="details">
      {navigation.state === 'loading' ? (
        <Loading />
      ) : (
        <div className="details__content">
          {astronomicalObject?.astronomicalObjectType && (
            <Image
              astronomicalObjectType={astronomicalObject.astronomicalObjectType}
            />
          )}
          {astronomicalObject?.name && <div>Details:</div>}
          {astronomicalObject?.name && (
            <div>Name: {astronomicalObject?.name}</div>
          )}
          {astronomicalObject?.astronomicalObjectType && (
            <div>Type: {astronomicalObject?.astronomicalObjectType}</div>
          )}
          {astronomicalObject?.location?.name && (
            <div>Location: {astronomicalObject?.location?.name}</div>
          )}
          {astronomicalObject?.uid && <div>ID: {astronomicalObject?.uid}</div>}
          <NavLink to={`?${closeLink.toString()}`}>Close</NavLink>
        </div>
      )}
    </div>
  );
}
