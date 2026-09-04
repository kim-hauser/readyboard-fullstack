function getRiskDotClass(riskScore) {
  if (riskScore >= 4) return 'risk-dot high'
  if (riskScore === 3) return 'risk-dot medium'
  return 'risk-dot low'
}

function getRiskLabel(riskScore) {
  if (riskScore === 5) return 'Very High'
  if (riskScore === 4) return 'High'
  if (riskScore === 3) return 'Medium'
  if (riskScore === 2) return 'Low'
  return 'Very Low'
}

function RiskDot({ riskScore }) {
  const riskLabel = getRiskLabel(riskScore)

  return (
    <span
      className={getRiskDotClass(riskScore)}
      title={`Risk: ${riskLabel}`}
      aria-label={`Risk: ${riskLabel}`}
    />
  )
}

export default RiskDot