import { useSearchParams } from 'react-router-dom';
import { getAstronomicalObjectById } from '../../api/api';
import { useEffect, useState } from 'react';
import { AstronomicalObject } from '../../dto/types';
import './Details.css';
import Image from '../Item/Image';

export default function Details() {
  const [details, setDetails] = useState<AstronomicalObject>();

  const [searchParams] = useSearchParams();
  const uid = searchParams.get('details') || '';

  useEffect(() => {
    getAstronomicalObjectById({ uid }).then((res) => {
      if (!('error' in res)) {
        setDetails(res);
      }
    });
  }, [uid]);

  return (
    <div className="details">
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
    </div>
  );
}
