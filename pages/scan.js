import { useEffect, useState } from 'react';

export default function ScanPage() {
  const [left, setLeft] = useState(null);

  useEffect(() => {
    const fetchLeft = async () => {
      try {
        const res = await fetch('/api/offer');
        const json = await res.json();
        setLeft(json.left ?? 'Error');
      } catch {
        setLeft('读取失败');
      }
    };
    fetchLeft();
  }, []);

  return (
    <div style={{ padding: 30, textAlign: 'center' }}>
      <h1>🎉 早鸟优惠还剩下：</h1>
      <h2 style={{ fontSize: 60, color: 'orange' }}>{left ?? '读取中...'}</h2>
      <p style={{ marginTop: 20, fontSize: 18 }}>
        抓紧机会，下订前确认是否还有早鸟优惠！🔥
      </p>
    </div>
  );
}
