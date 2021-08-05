import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => {

  const width = (window.innerWidth) - 100;

  return(
    <ContentLoader 
    speed={2}
    width={width}
    height={200}
    viewBox="0 0 600 200"
    backgroundColor="#6a4dbc"
    foregroundColor="#10092c"
    {...props}
    >
    <rect x="536" y="233" rx="3" ry="3" width="88" height="6" /> 
    <rect x="553" y="233" rx="3" ry="3" width="52" height="6" /> 
    <rect x="352" y="232" rx="3" ry="3" width="410" height="6" /> 
    <rect x="504" y="230" rx="3" ry="3" width="380" height="6" /> 
    <rect x="439" y="233" rx="3" ry="3" width="178" height="6" /> 
    <circle cx="579" cy="233" r="20" /> 
    <rect x="14" y="22" rx="14" ry="14" width="167" height="136" /> 
    <rect x="521" y="273" rx="14" ry="14" width="188" height="136" /> 
    <rect x="501" y="219" rx="16" ry="16" width="188" height="136" /> 
    <rect x="216" y="22" rx="14" ry="14" width="167" height="136" /> 
    <rect x="418" y="22" rx="14" ry="14" width="167" height="136" />
    </ContentLoader>
    )
  }

export default MyLoader;