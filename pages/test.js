import { useState } from 'react';

export default function TestPage() {
  const [left, setLeft] = useState(null);
  const [newLeft, setNewLeft] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 读取剩余数量
  const fetchLeft = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/offer');
      const json = await res.json();
      setLeft(json.left ?? 'Error');
    } catch (err) {
      alert('读取失败');
    } finally {
      setIsLoading(false);
    }
  };

  // 更新剩余数量
  const updateLeft = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ left: Number(newLeft) }),
      });
      const json = await res.json();
      alert(json.success ? '✅ 更新成功！' : '❌ 更新失败！');
      fetchLeft();
    } catch (err) {
      alert('更新失败');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🎯 Offer Package Checker</h1>

      <button onClick={fetchLeft} disabled={isLoading}>
        {isLoading ? '读取中...' : '读取剩余'}
      </button>
      <p>📦 当前剩余：{left ?? '未读取'}</p>

      <input
        type="number"
        value={newLeft}
        onChange={(e) => setNewLeft(e.target.value)}
        placeholder="输入新的数量"
        style={{ marginRight: 10 }}
        disabled={isLoading}
      />

      <button onClick={updateLeft} disabled={isLoading}>
        更新剩余
      </button>

      {isLoading && <div className="spinner" />}

      <style jsx>{`
        .spinner {
          margin-top: 20px;
          width: 24px;
          height: 24px;
          border: 4px solid rgba(255, 255, 255, 0.2);
          border-left-color: #fff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}