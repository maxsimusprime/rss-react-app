import {
  NavLink,
  useLocation,
  useNavigation,
  useOutletContext,
} from 'react-router-dom';
import './Details.css';
import Image from '../Item/Image';
import Loading from '../_ui/bars/Loading/Loading';
import { useGetItemByIdQuery } from '../../services/api';

export default function Details() {
  const [uid] = useOutletContext<string>();
  const { data } = useGetItemByIdQuery(uid);

  const navigation = useNavigation();

  const location = useLocation();
  const closeLink = new URLSearchParams(location.search);
  if (closeLink.has('details')) closeLink.delete('details');

  return (
    <div className="details" data-testid="details">
      {navigation.state === 'loading' ? (
        <Loading />
      ) : (
        <div className="details__content">
          {data?.astronomicalObject.astronomicalObjectType && (
            <Image
              astronomicalObjectType={
                data.astronomicalObject.astronomicalObjectType
              }
            />
          )}
          {data?.astronomicalObject.name && <div>Details:</div>}
          {data?.astronomicalObject.name && (
            <div>Name: {data?.astronomicalObject.name}</div>
          )}
          {data?.astronomicalObject.astronomicalObjectType && (
            <div>Type: {data?.astronomicalObject.astronomicalObjectType}</div>
          )}
          {data?.astronomicalObject.location?.name && (
            <div>Location: {data?.astronomicalObject.location?.name}</div>
          )}
          {data?.astronomicalObject.uid && (
            <div>ID: {data?.astronomicalObject.uid}</div>
          )}
          <NavLink to={`?${closeLink.toString()}`}>Close</NavLink>
        </div>
      )}
    </div>
  );
}
