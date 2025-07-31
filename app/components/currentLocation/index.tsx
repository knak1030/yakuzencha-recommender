

import { useState } from 'react';
import Button from '@mui/material/Button';

type Props = {
  value: { lat: number; lng: number } | null;
  setValue: (value: { lat: number; lng: number } | null) => void;
}

export default function CurrentLocation({ value, setValue }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError('このブラウザでは位置情報がサポートされていません');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setValue({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        setError(`位置情報の取得に失敗しました: ${err.message}`);
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleGetLocation}>現在地を取得</Button>

      {loading && <p>取得中...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {value && (
        <div>
          <p>緯度: {value.lat}</p>
          <p>経度: {value.lng}</p>
        </div>
      )}
    </div>
  );
}
