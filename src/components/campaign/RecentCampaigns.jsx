// src/components/campaign/RecentCampaigns.jsx
import './RecentCampaigns.css';

export function RecentCampaigns() {
  return (
    <div className="recent-campaigns">
      <h2>Suas Campanhas</h2>
      <div className="campaigns-list">
        <div className="campaign-card">
          <div className="campaign-icon">🗺️</div>
          <div className="campaign-info">
            <h3>Nova Campanha</h3>
            <p>0 sessões</p>
          </div>
        </div>
      </div>
    </div>
  );
}