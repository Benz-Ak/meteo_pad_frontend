function Alerts({ data }) {
  if (!data) return null;

  const alerts = [];

  if (data.HUMIDITY > 90) alerts.push("Humidité très élevée !");
  if (data["WIND SPEED"] > 10) alerts.push("Vent fort détecté !");
  if (data["AIR PRESSURE"] < 1005)
    alerts.push("Pression atmosphérique basse !");

  return (
    <div>
      <h2>Alertes météo</h2>
      {alerts.length > 0 ? (
        <ul>
          {alerts.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      ) : (
        <p>Aucune alerte pour le moment.</p>
      )}
    </div>
  );
}

export default Alerts;
