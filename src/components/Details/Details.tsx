import { useSearchParams } from 'react-router-dom';
import { getAstronomicalObjectById } from '../../api/api';
import { useEffect, useState } from 'react';
import { AstronomicalObject } from '../../dto/types';
import './Details.css';
import Image from '../Item/Image';
import Loading from '../_ui/bars/Loading/Loading';

export default function Details() {
  const [details, setDetails] = useState<AstronomicalObject>();
  const [loadingState, setLoadingState] = useState({ loading: false });

  const [searchParams] = useSearchParams();
  const uid = searchParams.get('details') || '';

  useEffect(() => {
    setLoadingState({ loading: true });
    getAstronomicalObjectById({ uid })
      .then((res) => {
        if (!('error' in res)) {
          setDetails(res);
        }
      })
      .finally(() => {
        setLoadingState({ loading: false });
      });
  }, [uid]);

  return (
    <div className="details">
      {loadingState.loading ? (
        <Loading />
      ) : (
        <div className="details__content">
          {details?.astronomicalObjectType && (
            <Image astronomicalObjectType={details.astronomicalObjectType} />
          )}
          {details?.name && <div>Name: {details?.name}</div>}
          {details?.astronomicalObjectType && (
            <div>Type: {details?.astronomicalObjectType}</div>
          )}
          {details?.location?.name && (
            <div>Location: {details?.location?.name}</div>
          )}
          {details?.uid && <div>ID: {details?.uid}</div>}
        </div>
      )}
    </div>
  );
}
