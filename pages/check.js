import { useState } from 'react';
import dynamic from 'next/dynamic';

const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false });

export default function CheckPage() {
  const [left, setLeft] = useState(null);
  const [newLeft, setNewLeft] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [logs, setLogs] = useState([]);
  const [isScanning, setIsScanning] = useState(false);

  const ADMIN_PASSWORD = 'admin123';

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      appendLog('✅ 登录成功');
    } else {
      alert('密码错误');
      appendLog('❌ 密码错误尝试登录');
    }
  };

  const handleLogout = () => {
    appendLog('🚪 退出登录');
    setIsAuthenticated(false);
    setPassword('');
    setLeft(null);
    setNewLeft('');
  };

  const appendLog = (message) => {
    const timestamp = new Date().toLocaleString();
    setLogs((prev) => [`[${timestamp}] ${message}`, ...prev]);
  };

  const fetchLeft = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/offer');
      const json = await res.json();
      setLeft(json.left ?? 'Error');
      appendLog(`📦 当前剩余：${json.left ?? '失败'}`);
    } catch (err) {
      alert('读取失败');
      appendLog('❌ 读取失败');
    } finally {
      setIsLoading(false);
    }
  };

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
      appendLog(json.success ? `✅ 更新剩余为 ${newLeft}` : '❌ 更新失败');
      fetchLeft();
    } catch (err) {
      alert('更新失败');
      appendLog('❌ 更新失败');
    } finally {
      setIsLoading(false);
    }
  };

  const handleScan = (data) => {
    if (data) {
      appendLog(`📷 扫码成功：${data}`);
      setIsScanning(false);
    }
  };

  const handleScanError = () => {
    appendLog('❌ 扫码失败');
    setIsScanning(false);
  };

  if (!isAuthenticated) {
    return (
      <div style={{ padding: 20 }}>
        <h2>🔐 管理登录</h2>
        <input
          type="password"
          placeholder="输入密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <button onClick={handleLogin}>登录</button>
      </div>
    );
  }

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

      <button onClick={handleLogout} style={{ marginLeft: 10 }}>
        登出
      </button>

      <button onClick={() => setIsScanning(true)} style={{ marginLeft: 10 }}>
        📷 扫码
      </button>

      {isLoading && <div className="spinner" />}

      {isScanning && (
        <div style={{ marginTop: 20 }}>
          <QrReader
            delay={300}
            onError={handleScanError}
            onScan={handleScan}
            style={{ width: '100%' }}
          />
        </div>
      )}

      <div style={{ marginTop: 30 }}>
        <h3>🕒 操作记录：</h3>
        <div style={{ maxHeight: 150, overflowY: 'auto', background: '#111', padding: 10, borderRadius: 6 }}>
          {logs.length === 0 ? <p>暂无记录</p> : logs.map((log, idx) => <p key={idx}>{log}</p>)}
        </div>
      </div>

      <div style={{ marginTop: 40 }}>
        <h3>🔗 分享页面链接</h3>
        <p>
          网址：
          <a href={typeof window !== 'undefined' ? window.location.href : '#'} target="_blank" rel="noopener noreferrer">
            {typeof window !== 'undefined' ? window.location.href : '加载中...'}
          </a>
        </p>
        <div style={{ marginTop: 10 }}>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`}
            alt="Scan to open"
          />
          <p style={{ fontSize: 12, marginTop: 5 }}>📱 使用手机扫描二维码访问此页面</p>
        </div>
      </div>

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
