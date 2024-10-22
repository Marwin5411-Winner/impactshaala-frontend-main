

const HexagonCard = ({ number, label }) => (
    <div
      className="hexagon-container"
      style={{
        position: "relative",
        width: "120px",
        height: "140px",
        marginBottom: "20px",
      }}
    >
      <div
        className="hexagon"
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#36454F",
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          padding: "10px",
        }}
      >
        <h4 style={{ margin: 0 }}>{number}</h4>
        <p style={{ fontSize: "14px", margin: 0 }}>{label}</p>
      </div>
    </div>
  );

export default HexagonCard;