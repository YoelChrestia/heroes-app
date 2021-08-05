import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={500}
    height={150}
    viewBox="0 0 500 150"
    backgroundColor="#6a4dbc"
    foregroundColor="#10092c"
    {...props}
  >
    <circle cx="590" cy="230" r="8" /> 
    <rect x="18" y="14" rx="5" ry="5" width="86" height="74" /> 
    <circle cx="583" cy="223" r="8" /> 
    <rect x="439" y="228" rx="5" ry="5" width="220" height="10" /> 
    <circle cx="584" cy="224" r="8" /> 
    <rect x="426" y="219" rx="5" ry="5" width="220" height="10" /> 
    <circle cx="574" cy="222" r="8" /> 
    <rect x="399" y="210" rx="5" ry="5" width="220" height="10" /> 
    <rect x="576" y="191" rx="0" ry="0" width="12" height="44" /> 
    <rect x="533" y="185" rx="5" ry="5" width="82" height="71" /> 
    <rect x="578" y="147" rx="5" ry="5" width="134" height="116" /> 
    <rect x="221" y="14" rx="5" ry="5" width="86" height="74" /> 
    <rect x="324" y="14" rx="5" ry="5" width="86" height="74" /> 
    <rect x="120" y="14" rx="5" ry="5" width="86" height="74" />
  </ContentLoader>
)

export default MyLoader